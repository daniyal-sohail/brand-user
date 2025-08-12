"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const authPages = ["/login", "/register"];
const homePage = "/";

const RouterGuard = ({ children }) => {
  const { isLoggedIn, authChecked, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authChecked) {
      return; // Wait for auth check
    }

    // If not logged in, block all /admin/* and home, redirect to /login
    if (!isLoggedIn && (pathname.startsWith("/admin") || pathname === homePage)) {
      router.replace("/login");
      return;
    }

    // If logged in, check role for admin access
    if (isLoggedIn && pathname.startsWith("/admin")) {
      if (role !== "USER") {
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
    
  }, [isLoggedIn, authChecked, pathname, router, role]);

  // Only render children if allowed
  if (!authChecked) return null; // Or a loading spinner
  if (!isLoggedIn && (pathname.startsWith("/admin") || pathname === homePage)) return null;
  if (isLoggedIn && authPages.includes(pathname)) return null;
  if (isLoggedIn && pathname.startsWith("/admin") && role !== "USER") return null;

  return children;
};

export default RouterGuard;
