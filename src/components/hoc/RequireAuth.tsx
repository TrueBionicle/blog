import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const login = useAppSelector((state) => state.user.login);
  if (!login) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
