import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import type { LoginRequest } from "../../types/auth";

import logo from "../../assets/logo.png";
import lady from "../../assets/skbloginlady.png";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex h-screen">

        {/* LEFT SIDE */}
        <div className="hidden lg:block w-2/3 bg-gradient-to-br from-black via-gray-900 to-orange-900 relative overflow-hidden">

          {/* Background Glow */}
          <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-600/20 rounded-full blur-3xl"></div>

          {/* Logo & Text */}
          <div className="absolute left-18 z-20 pt-20">
            <img
              src={logo}
              alt="SKB Logo"
              className="w-100"
            />
          </div>

          <div className="absolute left-20 z-20 pt-100">
             <h1 className=" text-5xl font-bold text-white leading-tight">
              Your No.1
              <br />
              Banking Partner
            </h1>

            <p className="mt-4 text-xl text-gray-300 max-w-lg leading-9">
              Secure, fast and reliable digital banking for you.
            </p>
          </div>

          {/* Lady Image */}
          <div className="absolute inset-0 flex items-center justify-end pt-10 z-10">
            <img
              src={lady}
              alt="Banking"
              className="w-[600px] select-none pointer-events-none"
              draggable={false}
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/3 flex items-center justify-center bg-slate-100 px-8">

          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

            <h2 className="text-4xl font-bold text-gray-900">
              Welcome!
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Sign in to your SKB account
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
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

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white rounded-xl py-3 text-lg font-semibold disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-8">
              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-orange-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}