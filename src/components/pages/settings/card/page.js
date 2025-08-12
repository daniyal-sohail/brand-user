"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Check, Star } from "lucide-react";

const PlanCard = ({ plan }) => {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to join page with plan data
    router.push(`/admin/settings/join?planId=${plan._id}&planName=${encodeURIComponent(plan.name)}&planAmount=${plan.amount}`);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100); // Convert cents to dollars
  };

  return (
    <div 
      className="bg-white border border-brand-light-beige rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Plan Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          {plan.name.toLowerCase().includes('pro') && (
            <Star className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" />
          )}
          <h3 className="text-xl font-bold text-brand-charcoal">{plan.name}</h3>
        </div>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-brand-warm-brown">
            {formatPrice(plan.amount)}
          </span>
          <span className="text-brand-warm-brown ml-1">/month</span>
        </div>
        
        <p className="text-brand-warm-brown text-sm leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Features List */}
      <div className="mb-6">
        <h4 className="font-semibold text-brand-charcoal mb-3">What&apos;s included:</h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-brand-warm-brown text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <button 
        className="w-full bg-brand-warm-brown text-brand-cream py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition group-hover:scale-105"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
      >
        Choose {plan.name}
      </button>

      {/* Status Badge */}
      {plan.isActive && (
        <div className="mt-4 text-center">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Active
          </span>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
