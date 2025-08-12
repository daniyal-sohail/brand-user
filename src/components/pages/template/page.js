"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TemplatePagination from "./pagination/page";
import TemplateTable from "./table/page";
import { useUserTemplate } from "@/context/UserTemplateContext";
import { FileText, Sparkles } from "lucide-react";

const TemplatePage = () => {
  const router = useRouter();
  const { templateFetchData, templateLoading, templateError } = useUserTemplate();
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10); // Fixed limit
  const [userLimits, setUserLimits] = useState({
    plan: "free",
    templateLimit: 10,
    isUnlimited: false,
    hasActiveSubscription: false
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await templateFetchData(`/templates?page=${page}&limit=${limit}`);

      if (result && result.status === 200 && result.data) {
        setTemplates(result.data.templates || []);
        setTotal(result.data.pagination?.totalItems || 0);
        setPages(result.data.pagination?.totalPages || 1);
        setUserLimits(result.data.userLimits || {
          plan: "free",
          templateLimit: 10,
          isUnlimited: false,
          hasActiveSubscription: false
        });
      }
    };
    fetchTemplates();
  }, [page, limit, templateFetchData]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleUpgradeClick = () => {
    router.push('/admin/settings/plan');
  };

  return (
    <div className="container-width fade-in px-2 sm:px-4 lg:px-0">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="bg-brand-beige p-2 sm:p-3 rounded-xl">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold ml-2 sm:ml-3 heading-primary">Templates</h1>
      </div>

      {/* Welcome/Intro Card */}
      <div className="bg-brand-beige p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-2 sm:p-3 rounded-xl flex-shrink-0">
          <Sparkles className="text-brand-warm-brown w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold heading-primary mb-1">Your Creative Templates</h2>
          <p className="body-text text-brand-warm-brown text-sm sm:text-base">Discover, customize, and manage your social media templates.</p>
        </div>
      </div>

      {/* Plan Status Card */}
      <div className="bg-brand-soft-beige p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h3 className="heading-secondary text-brand-charcoal text-base sm:text-lg">Current Plan: {userLimits.plan.toUpperCase()}</h3>
            <p className="body-text text-brand-warm-brown text-sm sm:text-base">
              {userLimits.isUnlimited 
                ? "Unlimited templates available" 
                : `${templates.length} of ${userLimits.templateLimit} templates used`
              }
            </p>
          </div>
          {!userLimits.hasActiveSubscription && (
            <button 
              className="btn-primary text-sm w-full sm:w-auto"
              onClick={handleUpgradeClick}
            >
              Upgrade Plan
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-brand-beige p-3 sm:p-4 rounded-xl shadow-sm">
        {templateLoading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-4 border-b-4 border-brand-warm-brown"></div>
          </div>
        ) : templateError ? (
          <div className="text-center py-8 sm:py-12 font-poppins text-red-600 text-sm sm:text-base">{templateError}</div>
        ) : (
          <TemplateTable templates={templates} />
        )}
      </div>

      {/* Pagination - Outside main content container */}
      {!templateLoading && !templateError && pages > 1 && (
        <div className="mt-4 sm:mt-6">
          <TemplatePagination page={page} pages={pages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default TemplatePage; 