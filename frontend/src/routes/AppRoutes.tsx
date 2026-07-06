import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Accounts from "../pages/accounts/Accounts";
import CreateAccount from "../pages/accounts/CreateAccount";
import Transactions from "../pages/transactions/Transactions";
import Transfer from "../pages/transactions/Transfer";
import Users from "../pages/profile/Profile";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route
                element={
                    <ProtectedRoute>
                        
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard/>}/>

                <Route path="/accounts" element={<Accounts/>}/>
                <Route path="/accounts/create" element={<CreateAccount/>}/>
                
                <Route path="/transactions" element={<Transactions/>}/>
                <Route path="/transactions/transfer" element={<Transfer/>}/>

                <Route path="/users" element={<Users/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace/>}/>

        </Routes>
    );
}