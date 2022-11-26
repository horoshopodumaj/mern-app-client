import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

export const UseRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/registration" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
