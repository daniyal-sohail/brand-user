import React from 'react';
import { Menu, Bell, Search, Settings} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Header Component
const Header = ({ onMenuClick }) => {
  const { user, role, isLoggedIn } = useAuth();
  return (
    <header className="bg-brand-cream border-b border-brand-beige sticky top-0 z-40 lg:ml-80 transition-all duration-300 ease-in-out">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden mr-3 text-brand-charcoal hover:text-brand-warm-brown transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="lg:hidden">
              <div className="h-8 w-32 bg-brand-beige rounded flex items-center justify-center">
                <span className="text-sm font-bold text-brand-charcoal font-poppins">Brand Appeal</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <h1 className="font-semibold text-xl text-brand-charcoal font-poppins">
                Admin Dashboard
              </h1>
            </div>
          </div>

          {/* Search bar removed */}

          <div className="flex items-center space-x-3">
            {/* Mobile search button removed */}
            <button className="relative text-brand-charcoal hover:text-brand-warm-brown transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                <span className="block h-2 w-2 bg-brand-cream rounded-full"></span>
              </span>
            </button>
            <button className="hidden sm:block text-brand-charcoal hover:text-brand-warm-brown transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center">
                <span className="text-sm font-bold text-brand-charcoal font-poppins">
                  {isLoggedIn && user?.name ? user.name[0].toUpperCase() : 'U'}
                </span>
              </div>
              <div className="text-brand-charcoal font-medium hidden sm:flex flex-col text-sm font-poppins">
                {isLoggedIn && user ? (
                  <>
                    <span>{user.name}</span>
                    <span className="text-xs text-brand-warm-brown">{user.email}</span>
                    <span className="text-xs text-brand-warm-brown capitalize">{role}</span>
                  </>
                ) : (
                  <span>Guest</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
