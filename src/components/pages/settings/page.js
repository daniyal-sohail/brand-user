"use client";
import React from "react";
import {
  Mail,
  Lock,
  CreditCard,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-brand-light-beige px-4 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Page Heading */}
        <div className="flex items-center align-middle">
          <div className="bg-brand-beige p-3 rounded-xl">
            <Sparkles />
          </div>
          <h1 className="text-3xl font-semibold ml-3 heading-primary">
            Account Settings
          </h1>
        </div>
        <p className="text-base font-semibold ml-6 mt-0 text-brand-warm-brown body-text">
          Manage your account settings and subscription.
        </p>

        {/* Account Information */}
        <div className="bg-brand-beige p-6 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="bg-white p-3 rounded-xl">
            <Mail className="text-brand-warm-brown" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold heading-secondary mb-1">
              Account Information
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-brand-warm-brown mr-2 font-poppins">
                Email address
              </span>
              <span className="font-semibold text-brand-charcoal font-poppins break-all">
                {user?.email || "Loading..."}
              </span>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="bg-brand-beige p-6 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl">
              <Lock className="text-brand-warm-brown" />
            </div>
            <div>
              <h2 className="text-lg font-semibold heading-secondary mb-1">
                Password
              </h2>
              <p className="body-text text-sm text-brand-warm-brown">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>
          <button className="btn-secondary mt-4 sm:mt-0">
            Change password
          </button>
        </div>

        {/* Subscription */}
        <div className="bg-brand-beige p-6 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="bg-white p-3 rounded-xl">
            <CreditCard className="text-brand-warm-brown" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold heading-secondary mb-1">
              Subscription{" "}
              <span className="ml-2 px-2 py-1 text-xs rounded bg-brand-soft-beige text-brand-charcoal">
                None
              </span>
            </h2>
            <p className="body-text text-sm text-brand-warm-brown">
              Manage your subscription and billing information.
            </p>
          </div>
        </div>

        {/* Unlock Premium Features Banner */}
        <div className="bg-brand-cream p-8 flex flex-col items-center justify-center text-center rounded-xl card mt-2">
          <h2 className="text-2xl font-bold heading-primary mb-2">
            Unlock Premium Features
          </h2>
          <p className="body-text mb-4 text-brand-warm-brown">
            Upgrade your plan to access exclusive features and benefits.
          </p>
          <Link href="/admin/settings/plan" className="btn-primary">
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
