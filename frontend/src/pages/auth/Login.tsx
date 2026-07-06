import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast"

import { useAuth } from "../../hooks/useAuth";
import type { LoginRequest } from "../../types/auth";


const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

export default function Login(){
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}, 
    } = useForm<LoginRequest>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginRequest) => {
        try {
            setLoading(true);

            const loggedUser = await login(data);

            toast.success("Login successful!");

            if (loggedUser.role === "ADMIN") {
            navigate("/admin/dashboard");
            } else {
            navigate("/dashboard");
            }

        } catch (error: any) {
            toast.error(
            error?.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className=" w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email"
                            {...register("email")}
                            className="w-full border rounded-lg p-3"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <input 
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className=" w-full border rounded-lg p-3"
                        />

                        <p className="text-red-500 text-sm mt-1" >
                            {errors.password?.message}
                        </p>
                    </div>

                    <button
                        disabled={loading}
                        className=" w-full bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        {loading ? "Signing in...": "Login"}
                    </button>
                </form>

                <p className="text-center mt-5">
                    Don't have an account?

                    <Link
                        to="/register"
                        className=" ml-2 text-blue-600"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}