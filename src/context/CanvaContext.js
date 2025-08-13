"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import axiosInstance from '@/service/api';
import { toast } from 'react-toastify';

const CanvaContext = createContext();

export const useCanva = () => {
  const context = useContext(CanvaContext);
  if (!context) {
    throw new Error('useCanva must be used within a CanvaProvider');
  }
  return context;
};

export const CanvaProvider = ({ children }) => {
  const [canvaStatus, setCanvaStatus] = useState('checking'); // 'checking', 'connected', 'pending', 'not_requested'
  const [isConnected, setIsConnected] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  // Check Canva access status
  const checkCanvaAccessStatus = useCallback(async () => {
    try {
      setError('');
      const response = await axiosInstance.get('/user/canva/access-status');
      
      if (response.data?.data?.isConnected) {
        setCanvaStatus('connected');
        setIsConnected(true);
      } else if (response.data?.data?.hasRequested) {
        setCanvaStatus('pending');
        setIsConnected(false);
      } else {
        setCanvaStatus('not_requested');
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error checking Canva access status:', error);
      setCanvaStatus('not_requested');
      setIsConnected(false);
      setError('Failed to check Canva access status');
    }
  }, []);

  // Request Canva access
  const requestCanvaAccess = useCallback(async () => {
    try {
      setIsRequesting(true);
      setError('');
      
      const response = await axiosInstance.post('/user/canva/request-access');
      
      if (response.data?.status === 200) {
        toast.success('Canva access request submitted successfully!');
        setCanvaStatus('pending');
        return { success: true };
      } else {
        throw new Error(response.data?.message || 'Failed to submit access request');
      }
    } catch (error) {
      console.error('Error requesting Canva access:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit access request';
      toast.error(errorMessage);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsRequesting(false);
    }
  }, []);

  // Connect to Canva
  const connectCanva = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError('');
      
      const response = await axiosInstance.get('/canva/connect');
      
      if (response.data?.authUrl) {
        // Open the auth URL in a new tab
        window.open(response.data.authUrl, '_blank', 'noopener,noreferrer');
        toast.success("Redirecting to Canva for authorization...");
        return { success: true, authUrl: response.data.authUrl };
      } else {
        throw new Error(response.data?.message || 'Failed to get Canva authorization URL');
      }
    } catch (error) {
      console.error('Error connecting to Canva:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to connect to Canva';
      toast.error(errorMessage);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Check Canva connection status
  const checkCanvaConnection = useCallback(async () => {
    try {
      setError('');
      const response = await axiosInstance.get('/canva/connection-status');
      
      if (response.data?.connected) {
        setIsConnected(true);
        setCanvaStatus('connected');
        return { connected: true };
      } else {
        setIsConnected(false);
        return { connected: false };
      }
    } catch (error) {
      console.error('Error checking Canva connection:', error);
      setIsConnected(false);
      setError('Failed to check Canva connection status');
      return { connected: false };
    }
  }, []);

  const value = {
    canvaStatus,
    isConnected,
    isRequesting,
    isConnecting,
    error,
    checkCanvaAccessStatus,
    requestCanvaAccess,
    connectCanva,
    checkCanvaConnection,
  };

  return (
    <CanvaContext.Provider value={value}>
      {children}
    </CanvaContext.Provider>
  );
};
