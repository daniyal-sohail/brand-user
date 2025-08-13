"use client";
import React, { useEffect } from 'react';
import { Mail, Lock, CreditCard, Sparkles, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCanva } from '@/context/CanvaContext';
import { useAuth } from '@/context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const { 
    canvaStatus, 
    isConnected,
    isRequesting, 
    isConnecting,
    error,
    checkCanvaAccessStatus, 
    requestCanvaAccess, 
    connectCanva, 
    checkCanvaConnection 
  } = useCanva();

  useEffect(() => {
    checkCanvaAccessStatus();
    
    // Retry status check if it fails initially
    const retryTimer = setTimeout(() => {
      if (canvaStatus === 'checking') {
        console.log('Retrying Canva status check...');
        checkCanvaAccessStatus();
      }
    }, 2000);

    return () => clearTimeout(retryTimer);
  }, [canvaStatus, checkCanvaAccessStatus]);

  const handleConnectCanva = async () => {
    try {
      const result = await connectCanva();
      if (result?.success) {
        // Check connection status after a delay
        setTimeout(() => {
          checkCanvaConnection();
        }, 3000);
      }
    } catch (error) {
      console.error('Error connecting to Canva:', error);
    }
  };

  const getCanvaStatusDisplay = () => {
    switch (canvaStatus) {
      case 'connected':
        if (isConnected) {
          return {
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            text: 'Connected',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
          };
        } else {
          return {
            icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
            text: 'Access Granted',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
          };
        }
      case 'pending':
        return {
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          text: 'Pending Approval',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'not_requested':
        return {
          icon: <AlertCircle className="w-5 h-5 text-gray-500" />,
          text: 'Not Connected',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-gray-400" />,
          text: 'Checking...',
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const statusDisplay = getCanvaStatusDisplay();

  return (
    <div className="min-h-screen bg-brand-light-beige px-4 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Page Heading */}
        <div className="flex items-center align-middle">
          <div className="bg-brand-beige p-3 rounded-xl">
            <Sparkles />
          </div>
          <h1 className="text-3xl font-semibold ml-3 heading-primary">Account Settings</h1>
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
            <h2 className="text-lg font-semibold heading-secondary mb-1">Account Information</h2>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-brand-warm-brown mr-2 font-poppins">Email address</span>
                <span className="font-semibold text-brand-charcoal font-poppins break-all">
                  {user?.email || 'Loading...'}
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
              <h2 className="text-lg font-semibold heading-secondary mb-1">Password</h2>
              <p className="body-text text-sm text-brand-warm-brown">Update your password to keep your account secure.</p>
            </div>
          </div>
          <button className="btn-secondary mt-4 sm:mt-0">Change password</button>
        </div>

        {/* Subscription */}
        <div className="bg-brand-beige p-6 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="bg-white p-3 rounded-xl">
            <CreditCard className="text-brand-warm-brown" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold heading-secondary mb-1">
              Subscription <span className="ml-2 px-2 py-1 text-xs rounded bg-brand-soft-beige text-brand-charcoal">None</span>
            </h2>
            <p className="body-text text-sm text-brand-warm-brown">Manage your subscription and billing information.</p>
          </div>
        </div>

        {/* Canva Integration */}
        <div className="bg-brand-beige p-6 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl">
              <ExternalLink className="text-brand-warm-brown" />
            </div>
            <div>
              <h2 className="text-lg font-semibold heading-secondary mb-1">Canva Integration</h2>
              <p className="body-text text-sm text-brand-warm-brown mb-2">
                Connect your Canva account to access and edit templates directly.
              </p>
              <div className="flex items-center gap-2">
                {statusDisplay.icon}
                <span className={`text-sm font-medium ${statusDisplay.color}`}>
                  {statusDisplay.text}
                </span>
              </div>
              {error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            {canvaStatus === 'not_requested' && (
              <button 
                onClick={requestCanvaAccess}
                disabled={isRequesting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequesting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Requesting...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Request Access
                  </>
                )}
              </button>
            )}
            {canvaStatus === 'pending' && (
              <div className={`px-3 py-2 rounded-lg ${statusDisplay.bgColor} ${statusDisplay.borderColor} border`}>
                <span className={`text-sm font-medium ${statusDisplay.color}`}>
                  Request Submitted
                </span>
              </div>
            )}
            {canvaStatus === 'connected' && !isConnected && (
              <button 
                onClick={handleConnectCanva}
                disabled={isConnecting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Connect Canva
                  </>
                )}
              </button>
            )}
            {canvaStatus === 'connected' && isConnected && (
              <div className={`px-3 py-2 rounded-lg ${statusDisplay.bgColor} ${statusDisplay.borderColor} border`}>
                <span className={`text-sm font-medium ${statusDisplay.color}`}>
                  Connected
                </span>
              </div>
            )}
            {canvaStatus === 'checking' && (
              <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-sm font-medium text-gray-500">
                  Checking...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Unlock Premium Features Banner */}
        <div className="bg-brand-cream p-8 flex flex-col items-center justify-center text-center rounded-xl card mt-2">
          <h2 className="text-2xl font-bold heading-primary mb-2">Unlock Premium Features</h2>
          <p className="body-text mb-4 text-brand-warm-brown">Upgrade your plan to access exclusive features and benefits.</p>
          <Link href="/admin/settings/plan" className="btn-primary">
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
