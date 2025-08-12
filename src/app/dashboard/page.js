"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Home } from 'lucide-react';
import { toast } from 'react-toastify';

const DashboardSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handleSuccess = async () => {
      // If no session_id, redirect to admin dashboard
      if (!sessionId) {
        router.push('/admin');
        return;
      }

      try {
        toast.success("Payment successful!");
      } catch (error) {
        console.error('Error verifying subscription:', error);
        toast.error("There was an issue verifying your payment");
      } finally {
        setIsLoading(false);
      }
    };

    handleSuccess();
  }, [sessionId, router]);

  const handleGoHome = () => {
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-warm-brown mx-auto mb-4"></div>
          <p className="text-brand-warm-brown">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light-beige flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white border border-brand-light-beige rounded-xl p-8 shadow-lg text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-brand-charcoal mb-2">
            Payment Successful!
          </h1>
          <p className="text-brand-warm-brown mb-6">
            Your payment has been processed successfully. Thank you for your subscription.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoHome}
            className="w-full bg-brand-charcoal text-brand-cream py-3 px-6 rounded-lg font-semibold hover:bg-brand-warm-brown transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-4">
          <p className="text-xs text-brand-warm-brown">
            You&apos;ll receive a confirmation email shortly. 
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSuccessPage;
