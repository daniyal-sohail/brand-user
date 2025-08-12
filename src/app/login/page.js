"use client"
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { postAuthData, apiAuthLoading, setUser, setRole, setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postAuthData("/auth/login", {
      email: form.email,
      password: form.password,
    });
    
    if (result?.status === 200 && result?.data?.accessToken) {
      const userRole = result.data.user.role;
      
      // Check if user role is allowed to access the dashboard
      if (userRole !== "USER") {
        toast.error("Access denied. Only users can access this dashboard.");
        return;
      }
      
      localStorage.setItem("token", result.data.accessToken);
      setUser(result.data.user);
      setRole(userRole);
      setIsLoggedIn(true);
      toast.success(result?.message || "Login successful!");
      // Redirect to admin dashboard using Next.js router
      router.push("/admin");
    } else {
      toast.error(result?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="card w-full max-w-md p-8 fade-in">
        <h1 className="heading-primary text-center mb-6">Sign In</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-brand-charcoal font-poppins mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-brand-beige rounded-md bg-brand-light-beige focus:outline-none focus:ring-2 focus:ring-brand-warm-brown font-poppins"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-brand-charcoal font-poppins mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-brand-beige rounded-md bg-brand-light-beige focus:outline-none focus:ring-2 focus:ring-brand-warm-brown font-poppins"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full btn-primary mt-2" disabled={apiAuthLoading}>
            {apiAuthLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-brand-charcoal font-poppins text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-brand-warm-brown hover:underline font-semibold">
              Register
            </Link>
          </span>
          <div className="mt-4">
            <Link href="/" className="text-brand-warm-brown hover:underline font-poppins text-sm font-semibold">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 