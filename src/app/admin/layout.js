"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const AdminDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="lg:ml-80 transition-all duration-300 ease-in-out">
        <div className="p-4 pt-16 bg-brand-light-beige">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;