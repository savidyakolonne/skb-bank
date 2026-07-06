import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
});

export default function Register(){
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm<RegisterRequest>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: RegisterRequest) => {
        try {
            setLoading(true);

            await registerUser(data);

            toast.success("Account created successfully");

            navigate("/login");

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Register failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-100 ">
            <div className=" w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className=" text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                <form
                 onSubmit={handleSubmit(onSubmit)}
                 className="space-y-5"
                >
                    <div>
                        <input
                            placeholder="Name"
                            {...register("name")}
                            className=" w-full border rounded-lg p-3"
                        />

                        <p>
                            {errors.name?.message}
                        </p>
                    </div>

                    <div>
                        <input 
                            type="email" 
                            placeholder="Email"
                            {...register("email")}
                            className=" w-full border rounded-lg p-3" 
                        />

                        <p className=" text-red-500 text-sm mt-1">
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

                        <p className=" text-red-500 text-sm mt-1">
                            {errors.password?.message}
                        </p>
                    </div>

                    <button
                        disabled={loading}
                        className=" w-full bg-black text-white rounded-lg p-3 hover:bg-gray-800"
                    >
                        {loading ? "Creating...": "Register"}
                    </button>
                </form>

                <p className=" text-center mt-5">
                    Already have an account?

                    <Link
                        to="/login"
                        className=" ml-2 text-blue-600"
                    >
                        Login
                    </Link>
                </p>
            </div>

        </div>
    );
}