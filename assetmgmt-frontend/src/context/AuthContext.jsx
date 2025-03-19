import { createContext, useEffect, useState, useContext } from "react";

// ✅ API URLs (Shibboleth backend)
const AUTH_API_URL = "https://192.168.101.60";

// ✅ Create authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Extract token from URL if present and store it
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            console.log("🔹 Received JWT Token:", token);
            localStorage.setItem("jwt_token", token); // ✅ Store JWT token
            window.history.replaceState({}, document.title, "/"); // ✅ Remove token from URL
            setTimeout(() => {
                window.location.href = "/"; // ✅ Redirect to home page (NOT /login)
            }, 100);
        }
    }, []);

    // ✅ Check authentication status using JWT token
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                console.log("🔹 No JWT token found. User not authenticated.");
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                console.log("🔹 Decoding JWT Token:", token);
                const payload = JSON.parse(atob(token.split(".")[1]));
                console.log("🔹 Decoded User Data:", payload);

                setUser(payload.sub); // ✅ Set user data from JWT
            } catch (err) {
                console.error("❌ Invalid token:", err);
                setError("Invalid token.");
                setUser(null);
                localStorage.removeItem("jwt_token"); // ✅ Remove invalid token
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // ✅ Handle login (redirects to Shibboleth SSO)
    const login = () => {
        console.log("🔹 Redirecting to Shibboleth SSO:", `${AUTH_API_URL}/login`);
        window.location.href = `${AUTH_API_URL}/login`;
    };

    // ✅ Handle logout (clears JWT token and redirects to /login)
    const logout = () => {
        console.log("🔹 Logging out user.");
        localStorage.removeItem("jwt_token");
        setUser(null);
        window.location.href = "/login"; // ✅ Redirect to /login only after logout
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Hook to use authentication context
export const useAuth = () => useContext(AuthContext);

