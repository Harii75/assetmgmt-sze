import { createContext, useEffect, useState, useContext } from "react";

const AUTH_API_URL = "https://192.168.101.60";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            //console.log("🔹 Received JWT Token:", token);
            localStorage.setItem("jwt_token", token);
            window.history.replaceState({}, document.title, "/");
            setTimeout(() => {
                window.location.href = "/";
            }, 100);
        }
    }, []);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                //console.log("🔹 No JWT token found. User not authenticated.");
                setUser(null);
                setIsUnauthorized(false);
                setLoading(false);
                return;
            }

            try {
                //console.log("🔹 Decoding JWT Token:", token);
                const payload = JSON.parse(atob(token.split(".")[1]));
                //console.log("🔹 Decoded User Data:", payload);

                const rawSub = payload.sub || {};

                const username = Array.isArray(rawSub.eduPersonPrincipalName)
                    ? rawSub.eduPersonPrincipalName[0]
                    : "unknown";

                const displayName = Array.isArray(rawSub.displayName)
                    ? rawSub.displayName[0]
                    : username;

                const rawAffiliation = Array.isArray(rawSub.eduPersonScopedAffiliation)
                    ? rawSub.eduPersonScopedAffiliation[0]
                    : "";

                const isStudent =
                    typeof rawAffiliation === "string" &&
                    rawAffiliation.toLowerCase().includes("student"); //itt majd student legyen

                //console.log("🔹 username:", username);
                //console.log("🔹 displayName:", displayName);
                //console.log("🔹 isStudent:", isStudent);

                setUser({ username, displayName });
                setIsUnauthorized(isStudent);
            } catch (err) {
                console.error("Invalid token:", err);
                setError("Invalid token.");
                setUser(null);
                setIsUnauthorized(false);
                localStorage.removeItem("jwt_token");
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = () => {
        //console.log("🔹 Redirecting to Shibboleth SSO:", `${AUTH_API_URL}/login`);
        window.location.href = `${AUTH_API_URL}/login`;
    };

    const logout = () => {
        //console.log("🔹 Logging out user.");
        localStorage.removeItem("jwt_token");
        setUser(null);
        setIsUnauthorized(false);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, isUnauthorized }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);