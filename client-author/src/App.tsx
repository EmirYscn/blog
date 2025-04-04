import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import Home from "./pages/HomePage";

import AppLayout from "./ui/AppLayout";

import { ThemeContextProvider } from "./contexts/DarkMode/ThemeContextProvider";
import AuthSuccess from "./pages/AuthSuccess";
import Subscribe from "./pages/Subscribe";
import ProtectedRoute from "./hooks/ProtectedRoute";
import ArchivePage from "./pages/ArchivePage";
import PublishedPage from "./pages/PublishedPage";
import UnpublishedPage from "./pages/UnpublishedPage";
import FeaturedPage from "./pages/FeaturedPage";
import PostEditPage from "./pages/PostEditPage";
import SettingsLayout from "./ui/SettingsLayout";
import ProfileSettings from "./pages/Settings/Profile";
import PasswordSettings from "./pages/Settings/Password";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

function App() {
  return (
    <>
      <ThemeContextProvider>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                {/* <Route path="feed" element={<Feed />} /> */}
                <Route path="featured" element={<FeaturedPage />} />
                <Route path="archive" element={<ArchivePage />} />
                <Route path="published" element={<PublishedPage />} />
                <Route path="unpublished" element={<UnpublishedPage />} />
                <Route path="post/:postId" element={<PostPage />} />
                <Route path="post/edit/:postId" element={<PostEditPage />} />
                <Route path="profile/:profileId" element={<Profile />} />
              </Route>

              <Route
                path="settings"
                element={
                  <ProtectedRoute>
                    <SettingsLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProfileSettings />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="password" element={<PasswordSettings />} />
              </Route>

              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="subscribe" element={<Subscribe />} />
              <Route path="login" element={<Login />} />
              <Route path="auth-success" element={<AuthSuccess />} />
              {/* <Route path="signup" element={<Signup />} /> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
