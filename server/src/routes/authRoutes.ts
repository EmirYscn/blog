import { Router } from "express";
import { validateSignup } from "../middlewares/validate";
import * as authController from "../controllers/authController";
import passport, { generateToken } from "../strategies/passport";
import { User } from "@prisma/client";

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_AUTHOR_URL = process.env.CLIENT_AUTHOR_URL;

router.post("/signup", validateSignup, authController.signup);
router.post("/login", authController.login);
router.get(
  "/getCurrentUser",
  authController.requireAuth,
  authController.getCurrentUser
);

// Google OAuth routes
router.get("/google", (req, res, next) => {
  const redirect = req.query.redirect || req.headers.referer; // Capture frontend origin
  const allowedRedirects = [CLIENT_URL, CLIENT_AUTHOR_URL];

  // Ensure the redirect is a valid frontend URL
  const safeRedirect = allowedRedirects.includes(redirect?.toString())
    ? redirect
    : CLIENT_URL;

  const state = Buffer.from(
    JSON.stringify({ redirect: safeRedirect })
  ).toString("base64");

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state, // Pass encoded state
  })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    (err: any, user: User) => {
      if (err) return next(err);

      let redirectUrl = CLIENT_URL; // Default redirect

      try {
        const stateString = Array.isArray(req.query.state)
          ? req.query.state[0]
          : req.query.state;

        if (stateString && typeof stateString === "string") {
          const parsedState = JSON.parse(
            Buffer.from(stateString, "base64").toString()
          );

          // Ensure redirect is valid and safe
          if ([CLIENT_URL, CLIENT_AUTHOR_URL].includes(parsedState.redirect)) {
            redirectUrl = parsedState.redirect;
          }
        }
      } catch (error) {
        console.error("Failed to parse state:", error);
      }

      if (!user) return res.redirect(`${CLIENT_URL}/login?error=auth_failed`);

      // Check for author access
      if (redirectUrl === CLIENT_AUTHOR_URL && user.role === "USER") {
        return res.redirect(`${redirectUrl}login?error=unauthorized`);
      }

      // Generate a JWT token
      const token = generateToken(user);

      // Include user data
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
      };

      // Encode as base64 to avoid URL issues
      const payload = Buffer.from(
        JSON.stringify({
          token,
          user: userData,
          provider: "Google",
        })
      ).toString("base64");

      // Redirect to frontend with token
      return res.redirect(`${redirectUrl}auth-success?data=${payload}`);
    }
  )(req, res, next);
});

// GitHub OAuth routes
router.get("/github", (req, res, next) => {
  const redirect = req.query.redirect || req.headers.referer; // Capture frontend origin
  const allowedRedirects = [CLIENT_URL, CLIENT_AUTHOR_URL];

  // Ensure the redirect is a valid frontend URL
  const safeRedirect = allowedRedirects.includes(redirect?.toString())
    ? redirect
    : CLIENT_URL;

  const state = Buffer.from(
    JSON.stringify({ redirect: safeRedirect })
  ).toString("base64");

  passport.authenticate("github", {
    scope: ["user:email"],
    state, // Pass encoded state
  })(req, res, next);
});

router.get("/github/callback", (req, res, next) => {
  passport.authenticate(
    "github",
    { session: false },
    (err: any, user: User) => {
      if (err) return next(err);

      let redirectUrl = CLIENT_URL; // Default redirect

      try {
        const stateString = Array.isArray(req.query.state)
          ? req.query.state[0]
          : req.query.state;

        if (stateString && typeof stateString === "string") {
          const parsedState = JSON.parse(
            Buffer.from(stateString, "base64").toString()
          );

          // Ensure redirect is valid and safe
          if ([CLIENT_URL, CLIENT_AUTHOR_URL].includes(parsedState.redirect)) {
            redirectUrl = parsedState.redirect;
          }
        }
      } catch (error) {
        console.error("Failed to parse state:", error);
      }

      if (!user) return res.redirect(`${CLIENT_URL}/login?error=auth_failed`);

      // Check for author access
      if (redirectUrl === CLIENT_AUTHOR_URL && user.role === "USER") {
        return res.redirect(`${redirectUrl}login?error=unauthorized`);
      }

      // Generate a JWT token
      const token = generateToken(user);

      // Include user data
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
      };

      // Encode as base64 to avoid URL issues
      const payload = Buffer.from(
        JSON.stringify({
          token,
          user: userData,
          provider: "GitHub",
        })
      ).toString("base64");

      // Redirect to frontend with token
      return res.redirect(`${redirectUrl}auth-success?data=${payload}`);
    }
  )(req, res, next);
});

export { router };
