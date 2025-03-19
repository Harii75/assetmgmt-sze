import { LOGIN_URL, ACS_URL } from "../constants";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import szeLogo from "../assets/sze-logo.svg";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ Redirect to home if user is already logged in and didn't explicitly visit "/login"
    useEffect(() => {
        if (user && location.pathname === "/login") {
            navigate("/");
        }
    }, [user, navigate, location]);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(LOGIN_URL);
            const data = await response.json();
            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                setError("Invalid login response. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            setError("Login failed. Check your connection.");
            setLoading(false);
        }
    };

    return (
    <div className="w-full h-screen bg-[#1E2235] flex items-center justify-center overflow-hidden">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
            <div className="flex flex-col items-center mb-6">
                <img src={szeLogo} alt="Széchenyi Egyetem" className="h-16 mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Széchenyi Egyetem</h2>
                <h3 className="text-lg text-gray-600">Eszközmenedzsment</h3>
            </div>
            <button
                onClick={handleLogin}
                className={`w-full py-3 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 transition ${
                    loading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                {loading ? "Bejelentkezés..." : "Bejelentkezés"}
            </button>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
    </div>
);
};

export default LoginPage;

