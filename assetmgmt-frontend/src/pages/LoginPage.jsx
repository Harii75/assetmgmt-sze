import { LOGIN_URL, ACS_URL } from "../constants";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const samlResponse = new URLSearchParams(window.location.search).get("SAMLResponse");
        if (samlResponse) {
            fetch(ACS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ SAMLResponse: samlResponse }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("jwt_token", data.token);
                    navigate("/");
                } else {
                    setError("Authentication failed.");
                }
            })
            .catch(() => setError("Failed to process SAML response."));
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Eszközmenedzsment</h2>
                <p className="text-gray-600 mb-6">Log in using your institution's Shibboleth account.</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    onClick={handleLogin}
                    className={`w-full px-6 py-3 rounded-md font-semibold text-white transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Redirecting..." : "Login with Shibboleth"}
                </button>

                <p className="mt-4 text-sm text-gray-500">You will be redirected to your institution’s login page.</p>
            </div>
        </div>
    );
};

export default LoginPage;
