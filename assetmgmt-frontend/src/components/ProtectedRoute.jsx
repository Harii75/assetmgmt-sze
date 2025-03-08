import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => localStorage.getItem("jwt_token") ? children : <Navigate to="/login" />;
export default ProtectedRoute;
