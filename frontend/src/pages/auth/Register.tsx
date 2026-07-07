import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import logo from "../../assets/logo.png";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export default function Register() {
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
      toast.error(error?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-8">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-6">
            <img
            src={logo}
            alt="SKB Logo"
            className="w-50"
            draggable={false}
            />
        </div>

        <h2 className="text-4xl font-bold text-gray-900 text-center">
            Create Account
        </h2>

        <p className="text-gray-500 mt-2 mb-8 text-center">
            Create your own SKB account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white rounded-xl py-3 text-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-8">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}