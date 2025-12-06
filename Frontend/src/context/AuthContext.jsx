import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setToken(token);
            setUser(user);

            return { success: true, user };
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    // Signup function
    const signup = async (name, email, password) => {
        try {
            const response = await authAPI.signup({ name, email, password });
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Signup error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Signup failed",
            };
        }
    };

    // Guest login function
    const loginAsGuest = () => {
        const guestUser = {
            id: 0,
            name: "Guest",
            email: "guest@stylee.com",
            role: "GUEST",
        };

        localStorage.setItem("token", "guest-token"); // Save token to localStorage
        localStorage.setItem("isGuest", "true");
        localStorage.setItem("user", JSON.stringify(guestUser));
        setUser(guestUser);
        setToken("guest-token"); // Dummy token for guest

        return { success: true, user: guestUser };
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isGuest");
        setToken(null);
        setUser(null);
    };

    // Check if user is guest
    const isGuest = () => {
        return user?.role === "GUEST" || localStorage.getItem("isGuest") === "true";
    };

    // Check if user is admin
    const isAdmin = () => {
        return user?.role === "ADMIN";
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        loginAsGuest,
        logout,
        isGuest,
        isAdmin,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
