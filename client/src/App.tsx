import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import Home from "./pages/HomePage";

import AppLayout from "./ui/AppLayout";

import { ThemeContextProvider } from "./contexts/DarkMode/ThemeContextProvider";
import AuthSuccess from "./pages/AuthSuccess";
import Subscribe from "./pages/Subscribe";
import ArchivePage from "./pages/ArchivePage";
import FeaturedPage from "./pages/FeaturedPage";

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
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                {/* <Route path="feed" element={<Feed />} /> */}
                <Route path="featured" element={<FeaturedPage />} />
                <Route path="archive" element={<ArchivePage />} />
                <Route path="post/:postId" element={<PostPage />} />
                <Route path="profile/:profileId" element={<Profile />} />
              </Route>

              <Route path="subscribe" element={<Subscribe />} />
              <Route path="login" element={<Login />} />
              <Route path="auth-success" element={<AuthSuccess />} />
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="signup" element={<Signup />} />
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
