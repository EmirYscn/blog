import { Navigate, useLocation } from "react-router";
import { useUser } from "./useUser";
import styled from "styled-components";
import Spinner from "../ui/Spinner";

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  const hasToken = !!localStorage.getItem("jwt");

  if (hasToken && isLoading) {
    <Loading>
      <Spinner />
    </Loading>;
  }

  if (!hasToken || (!isLoading && !isAuthenticated)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
