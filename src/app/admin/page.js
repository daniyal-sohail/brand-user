"use client";
import React from "react";
import {
  Sparkles,
  House,
  GraduationCap,
  Bell,
  RefreshCcw,
  Calendar,
  Flame,
  BookOpen,
  ChevronDown,
  MessagesSquare,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";

// Main Dashboard Component
const Dashboard = () => {
  const { getFAQ } = useDashboard();
  const { user } = useAuth();
  const [openIndexes, setOpenIndexes] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [FAQ, setFAQ] = useState([]);
  
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await getFAQ("/faqs");
        if (res?.status === 200 && res?.data?.data) {
          setFAQ(res.data.data);
        } else {
          setFAQ([]);
        }
      } catch (error) {
        console.error("Failed to fetch FAQ:", error);
        setFAQ([]);
      }
    };
    
    fetchFAQ();
  }, [getFAQ]);
  
  const toggleFAQ = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  
  return (
    <div className="px-2 sm:px-4 lg:px-0">
      <div className="flex items-center mb-4">
        <div className="bg-brand-beige p-2 sm:p-3 rounded-xl">
          <House className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold ml-2 sm:ml-3">Dashboard</h1>
      </div>
      <div className="bg-brand-beige p-4 sm:p-6 mt-4 rounded-xl">
        <div className="flex items-center">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-xs sm:text-sm font-semibold ml-2 sm:ml-3">Good to see you</p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ml-4 sm:ml-6 mt-2 sm:mt-3">
          Welcome Back, {user?.name || 'User'}.
        </h1>
        <p className="text-sm sm:text-base font-semibold ml-4 sm:ml-6 mt-2 sm:mt-3">
          Let&apos;s create something amazing!
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4 sm:mt-6 justify-evenly">
        <div className="w-full shadow-sm p-3 sm:p-4 rounded">
          <div className="flex items-center">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="text-base sm:text-lg font-semibold ml-2 sm:ml-3">Getting Started</h2>
          </div>
          <p className="mt-2 font-semibold text-lg sm:text-xl">
            Welcome to Our Academy!
          </p>
          <p className="mt-2 text-sm sm:text-base">
            New here? Our getting started module will help you master the
            platform and create stunning social media content.
          </p>
          <button className="w-full mt-4 bg-brand-warm-brown hover:bg-[#a88e78]/90 text-white px-4 py-2 rounded transition text-sm sm:text-base">
            Start Learning
          </button>
        </div>

        <div className="w-full shadow-sm p-3 sm:p-4 rounded">
          <div className="flex items-center mb-4">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="text-base sm:text-lg font-semibold ml-2 sm:ml-3">Recent Updates</h2>
          </div>

          <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4 text-xs sm:text-sm">
            <li>
              <p className="font-medium">New Content Drop: June 2025</p>
              <p>
                Usher in the summer with our latest content update! Head over to
                the calendar and get a jump start on your summer content with
                our new templates and captions.
              </p>
              <p className="text-xs opacity-60">May 28</p>
            </li>
            <li>
              <p className="font-medium">System maintenance scheduled</p>
              <p>
                Over 120 new templates and captions added for May. Explore the
                calendar and enjoy fresh content for Mother&apos;s Day, National
                Nurse&apos;s Day, and much more!
              </p>
              <p className="text-xs opacity-60">June 28</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-brand-beige p-4 sm:p-6 mt-4 rounded-xl">
        <div className="flex items-center">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-base font-semibold ml-2 sm:ml-3">
            Upgrade to Member{" "}
          </p>
        </div>
        <p className="text-xs sm:text-sm mt-2 sm:mt-3">
          Get access to exclusive content, advanced features, and premium
          resources to take your content creation to the next level.
        </p>
        <button className="mt-3 sm:mt-4 bg-brand-warm-brown text-white px-4 py-2 rounded transition hover:bg-[#a88e78]/90 text-sm sm:text-base">
          Upgrade Now
        </button>
      </div>
      <div className="w-full shadow-sm p-3 sm:p-4 rounded mt-4">
        <div className="flex items-center">
          <div className="bg-brand-beige p-2 rounded-xl">
            <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold ml-2 sm:ml-3">Quick Action</h2>
        </div>

        <p className="opacity-60 mt-3 sm:mt-4 text-sm sm:text-base">
          Quickly access common tasks and features
        </p>

        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
          {/* View Calendar */}
          <button className="w-full flex items-start gap-3 bg-brand-beige text-black px-4 py-3 rounded-xl hover:opacity-90 transition">
            <div className="bg-white p-2 rounded-xl">
              <Calendar size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold leading-tight">View Calendar</p>
              <p className="text-sm opacity-60">
                View the monthly content calendar
              </p>
            </div>
          </button>

          {/* Trending */}
          <button className="w-full flex items-start gap-3 bg-brand-beige text-black px-4 py-3 rounded-xl hover:opacity-90 transition">
            <div className="bg-white p-2 rounded-xl">
              <Flame size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold leading-tight">Trending</p>
              <p className="text-sm opacity-60">
                Explore trending content and topics
              </p>
            </div>
          </button>

          {/* Library */}
          <button className="w-full flex items-start gap-3 bg-brand-beige text-black px-4 py-3 rounded-xl hover:opacity-90 transition">
            <div className="bg-white p-2 rounded-xl">
              <BookOpen size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold leading-tight">Library</p>
              <p className="text-sm opacity-60">
                Access your saved templates and captions
              </p>
            </div>
          </button>

          {/* Academy */}
          <button className="w-full flex items-start gap-3 bg-brand-beige text-black px-4 py-3 rounded-xl hover:opacity-90 transition">
            <div className="bg-white p-2 rounded-xl">
              <GraduationCap size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold leading-tight">Academy</p>
              <p className="text-sm opacity-60">
                Learn more about using Social Spa effectively
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="w-full shadow-sm p-3 sm:p-4 rounded mt-4">
        <div className="flex items-center">
          <div className="bg-brand-beige p-2 rounded-xl mb-3">
            {showFAQ ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
          <h2 className="text-base sm:text-lg font-semibold ml-2 sm:ml-3">
            Frequently Asked Questions
          </h2>
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="ml-auto bg-brand-beige px-3 sm:px-4 py-2 rounded-xl hover:opacity-90 transition text-sm sm:text-base"
          >
            {showFAQ ? "Hide FAQ" : "Show FAQ"}
          </button>
        </div>

        {showFAQ &&
          FAQ.map((faq, index) => (
            <div key={index} className="bg-brand-beige rounded p-2 m-2">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndexes.includes(index) ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {openIndexes.includes(index) && (
                <p className="mt-2 text-sm text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
      </div>
      <div className="w-full shadow-sm p-3 sm:p-4 rounded mt-4">
        <div className="flex items-center">
          <div className="bg-brand-beige p-2 rounded-xl">
            <MessagesSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold ml-2 sm:ml-3">Need Help?</h2>
        </div>
        <p className="mt-2 text-sm sm:text-base">
          If you have any questions or need assistance, feel free to reach out
          to our support team.
        </p>
        <button className="w-full flex items-center gap-3 bg-brand-beige text-black px-4 py-3 rounded-xl hover:opacity-90 transition mt-4">
          <div className="bg-white p-2 rounded-xl">
            <MessagesSquare size={20} />
          </div>
          <div className="text-left">
            <p className="font-semibold leading-tight">Contact Support</p>
            <p className="text-sm opacity-60 mt-2">
              Get in touch with our support team for assistance
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
