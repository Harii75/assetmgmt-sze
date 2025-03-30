import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, isUnauthorized } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (isUnauthorized) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
