import { BrowserRouter, Route, Routes } from "react-router";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import { ThemeContextProvider } from "./contexts/DarkMode/ThemeContextProvider";
import Profile from "./pages/Profile";

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
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="login" element={<Login />} />
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
