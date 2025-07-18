
import React, { useState } from 'react';
import {Users, FileText, Calendar, MessageSquare, ChevronDown, ChevronRight, X, Home, BarChart3, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
    const [expandedSections, setExpandedSections] = useState({
      'Dashboard': true
    });
    const { isLoggedIn, logOut } = useAuth();

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
      }));
    };

  const menuItems = [
    {
        title: "Dashboard",
        icon: Home,
        items: [
          { name: "Overview", href: "/admin", icon: BarChart3 },
          { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        ],
      },
      {
        title: "Client Management",
        icon: Users,
      items: [
          { name: "All Clients", href: "/admin/clients", icon: Users },
          { name: "New Inquiries", href: "/admin/clients/inquiries", icon: MessageSquare },
          { name: "Active Projects", href: "/admin/clients/projects", icon: FileText },
      ],
    },
    {
        title: "Content & Marketing",
        icon: FileText,
      items: [
          { name: "Content Calendar", href: "/admin/content", icon: Calendar },
          { name: "Social Media", href: "/admin/social", icon: MessageSquare },
          { name: "Email Campaigns", href: "/admin/email", icon: FileText },
          { name: "Blog Posts", href: "/admin/blog", icon: FileText },
      ],
    },
    {
        title: "Financial",
        icon: CreditCard,
      items: [
          { name: "Invoices", href: "/admin/invoices", icon: CreditCard },
          { name: "Payments", href: "/admin/payments", icon: CreditCard },
          { name: "Reports", href: "/admin/financial-reports", icon: BarChart3 },
      ],
    },
    ];

  return (
    <>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-brand-charcoal bg-opacity-50 z-30 lg:hidden" 
            onClick={onClose} 
          />
        )}
  
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-brand-cream border-r border-brand-beige z-40 transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-brand-beige">
              <div className="flex items-center justify-between">
                <div className="h-10 w-40 bg-brand-beige rounded flex items-center justify-center">
                  <span className="font-bold text-brand-charcoal font-poppins">Brand Appeal</span>
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden text-brand-charcoal hover:text-brand-warm-brown transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
          </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
            {menuItems.map((section) => (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between py-3 px-4 text-left font-semibold text-brand-charcoal font-poppins hover:bg-brand-light-beige rounded-lg transition-colors duration-200"
                >
                      <div className="flex items-center space-x-3">
                        <section.icon className="h-5 w-5 text-brand-warm-brown" />
                        <span>{section.title}</span>
                      </div>
                  {expandedSections[section.title] ? (
                    <ChevronDown className="h-4 w-4 text-brand-warm-brown" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-brand-warm-brown" />
                  )}
                </button>

                {expandedSections[section.title] && (
                      <div className="ml-4 mt-2 space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                            className="flex items-center space-x-3 py-2 px-4 text-brand-charcoal font-poppins hover:text-brand-warm-brown hover:bg-brand-soft-beige rounded-lg transition-colors duration-200"
                        onClick={onClose}
                      >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
              </div>
          </nav>

            <div className="p-4 border-t border-brand-beige">
              <div className="p-4 bg-brand-light-beige rounded-lg">
                <h3 className="font-semibold text-brand-charcoal mb-2 text-sm font-poppins">
                  Need Help?
                </h3>
                <p className="text-xs text-brand-warm-brown mb-3 font-poppins">
                  Contact support or check our knowledge base.
                </p>
                <button className="w-full btn-primary text-sm font-poppins">
                  Get Support
            </button>
              </div>
          </div>

            {isLoggedIn && (
              <div className="p-4 border-t border-brand-beige">
                <button
                  onClick={logOut}
                  className="w-full flex items-center justify-center space-x-2 text-brand-warm-brown hover:text-brand-cream hover:bg-brand-warm-brown font-poppins font-semibold py-2 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

export default Sidebar;