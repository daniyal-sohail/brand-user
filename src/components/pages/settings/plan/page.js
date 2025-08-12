"use client";
import React, { useState, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/pages/settings/card/page";

const PlanPage = () => {
  const { planLoading, planError, planFetchData } = usePlan();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const result = await planFetchData("/plans");
      if (result?.data) {
        setPlans(result.data);
      }
    };

    fetchPlans();
  }, [planFetchData]);

  if (planLoading) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-warm-brown mx-auto mb-4"></div>
            <p className="text-brand-warm-brown">Loading plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (planError) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Plans</h2>
            <p className="text-red-600 mb-4">{planError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand-warm-brown text-brand-cream px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-width fade-in min-h-screen px-2 sm:px-4 lg:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-charcoal mb-2">Subscription Plans</h1>
        <p className="text-brand-warm-brown text-sm sm:text-base">
          Choose the perfect plan for your needs and unlock premium features.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </div>

      {/* Empty State */}
      {plans.length === 0 && !planLoading && (
        <div className="text-center py-12">
          <div className="bg-brand-soft-beige rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-brand-charcoal mb-2">No Plans Available</h3>
            <p className="text-brand-warm-brown">
              There are currently no subscription plans available. Please check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPage;
