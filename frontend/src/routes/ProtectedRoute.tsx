import type React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
    children : React.ReactNode;
}

export default function ProtectedRoute({children}: Props) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>
}