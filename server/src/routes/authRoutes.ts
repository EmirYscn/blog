import { Router } from "express";
import { validateSignup } from "../middlewares/validate";
import * as authController from "../controllers/authController";
import passport, { generateToken } from "../strategies/passport";
import { User } from "@prisma/client";

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

router.post("/signup", validateSignup, authController.signup);
router.post("/login", authController.login);
router.get(
  "/getCurrentUser",
  authController.requireAuth,
  authController.getCurrentUser
);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    (err: any, user: User) => {
      if (err) return next(err);
      if (!user) return res.redirect(`${CLIENT_URL}/login?error=auth_failed`);

      // Generate a JWT token
      const token = generateToken(user);

      // Include user data
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      // Encode as base64 to avoid URL issues
      const payload = Buffer.from(
        JSON.stringify({
          token,
          user: userData,
        })
      ).toString("base64");

      // Redirect to frontend with token
      return res.redirect(`${CLIENT_URL}/auth-success?data=${payload}`);
    }
  )(req, res, next);
});

// GitHub OAuth routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback", (req, res, next) => {
  passport.authenticate(
    "github",
    { session: false },
    (err: any, user: User) => {
      if (err) return next(err);
      if (!user) return res.redirect(`${CLIENT_URL}/login?error=auth_failed`);

      // Generate a JWT token
      const token = generateToken(user);

      // Include user data
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      // Encode as base64 to avoid URL issues
      const payload = Buffer.from(
        JSON.stringify({
          token,
          user: userData,
        })
      ).toString("base64");

      // Redirect to frontend with token
      return res.redirect(`${CLIENT_URL}/auth-success?data=${payload}`);
    }
  )(req, res, next);
});

export { router };
