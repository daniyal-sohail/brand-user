"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const { postAuthData, apiAuthLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const result = await postAuthData("/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (result?.status === 201) {
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      toast.success(result?.message || "Registration successful! Please log in.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      toast.error(result?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="card w-full max-w-md p-8 fade-in relative">
        <h1 className="heading-primary text-center mb-6">Create Account</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-brand-charcoal font-poppins mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-brand-beige rounded-md bg-brand-light-beige focus:outline-none focus:ring-2 focus:ring-brand-warm-brown font-poppins"
              placeholder="Your Name"
              autoComplete="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
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
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-brand-charcoal font-poppins mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border border-brand-beige rounded-md bg-brand-light-beige focus:outline-none focus:ring-2 focus:ring-brand-warm-brown font-poppins"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full btn-primary mt-2" disabled={apiAuthLoading}>
            {apiAuthLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-brand-charcoal font-poppins text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-warm-brown hover:underline font-semibold">
              Sign In
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

export default RegisterPage; 