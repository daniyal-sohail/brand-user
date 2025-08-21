"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const authPages = ["/login", "/register"];
const homePage = "/";

const RouterGuard = ({ children }) => {
  const { isLoggedIn, authChecked, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!authChecked || !isClient) {
      return; // Wait for auth check and client-side rendering
    }

    // If not logged in, block all /admin/* and home, redirect to /login
    if (
      !isLoggedIn &&
      (pathname.startsWith("/admin") || pathname === homePage)
    ) {
      router.replace("/login");
      return;
    }

    // If logged in, check role for admin access
    if (isLoggedIn && pathname.startsWith("/admin")) {
      // Only check role if it's been set (not empty string)
      if (role && role !== "USER") {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }
    }

    // If logged in, block /login and /register, redirect to /admin
    if (isLoggedIn && authPages.includes(pathname)) {
      router.replace("/admin");
      return;
    }

    // After login, if on /login or /, redirect to /admin
    if (isLoggedIn && (pathname === "/login" || pathname === "/")) {
      router.replace("/admin");
      return;
    }
  }, [isLoggedIn, authChecked, pathname, router, role, isClient]);

  // Show loading while auth is being checked or during SSR
  if (!authChecked || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-warm-brown mx-auto mb-4"></div>
          <p className="text-brand-warm-brown">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if allowed
  if (!isLoggedIn && (pathname.startsWith("/admin") || pathname === homePage))
    return null;
  if (isLoggedIn && authPages.includes(pathname)) return null;
  // Wait for role to be set before checking admin access
  if (isLoggedIn && pathname.startsWith("/admin") && role && role !== "USER")
    return null;

  return children;
};

export default RouterGuard;
