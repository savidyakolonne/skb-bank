import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Register/>
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}