import { Geist, Geist_Mono } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UserTemplateProvider } from "@/context/UserTemplateContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { PlanProvider } from "@/context/PlanContext";
import RouterGuard from "@/components/router/router";
import { DashboardProvider } from "@/context/DashboardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brand Appeal - Social Media Content Management",
  description:
    "Create stunning social media content with our comprehensive template library and content management tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <DashboardProvider>
            <UserTemplateProvider>
              <BookmarkProvider>
                <PlanProvider>
                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <RouterGuard>{children}</RouterGuard>
                </PlanProvider>
              </BookmarkProvider>
            </UserTemplateProvider>
          </DashboardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
