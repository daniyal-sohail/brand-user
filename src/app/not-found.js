"use client";
import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-beige flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-brand-warm-brown p-4 rounded-full">
            <AlertTriangle size={48} className="text-brand-cream" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl sm:text-8xl font-bold text-brand-warm-brown mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal mb-4">
          Page Not Found
        </h2>
        
        <p className="text-brand-warm-brown text-base sm:text-lg mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/admin"
            className="flex items-center justify-center gap-2 bg-brand-warm-brown text-brand-cream px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <Home size={20} />
            Go to Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-brand-soft-beige text-brand-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-brand-light-beige transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-brand-soft-beige rounded-lg">
          <p className="text-sm text-brand-warm-brown">
            Need help? Contact support or check the URL for typos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
