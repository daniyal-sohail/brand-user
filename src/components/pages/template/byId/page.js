"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserTemplate } from "@/context/UserTemplateContext";
import { useBookmark } from "@/context/BookmarkContext";
import { ArrowLeft, Edit, ExternalLink, Calendar, Tag, Eye, Bookmark, TrendingUp } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

const TemplateByIdPage = () => {
  const params = useParams();
  const router = useRouter();
  const { templateFetchData, templateLoading, templateError } = useUserTemplate();
  const { bookmarkPostData, bookmarkDeleteData, bookmarkLoading } = useBookmark();
  const [template, setTemplate] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (params.id) {
        try {
          const result = await templateFetchData(`/templates/${params.id}`);
          if (result && result.status === 200 && result.data) {
            setTemplate(result.data);
          }
        } catch (error) {
          console.error("Error fetching template:", error);
          // Don't set templateError here as it's handled by the context
        }
      }
    };
    fetchTemplate();
  }, [params.id, templateFetchData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBookmark = async () => {
    if (!template || bookmarkLoading) return;

    try {
      if (isBookmarked) {
        // Unbookmark
        const result = await bookmarkDeleteData(`/templates/${template._id}/bookmark`);
        if (result && result.status === 200) {
          setIsBookmarked(false);
          toast.success("Template removed from bookmarks");
        }
      } else {
        // Bookmark
        const result = await bookmarkPostData(`/templates/${template._id}/bookmark`);
        if (result && result.status === 200) {
          setIsBookmarked(true);
          toast.success("Template bookmarked successfully");
        }
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  if (templateLoading) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-brand-warm-brown"></div>
        </div>
      </div>
    );
  }

  if (templateError) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Template Not Found</h2>
            <p className="text-red-600 mb-4">
              The template you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <button
              onClick={() => router.push('/admin/template')}
              className="bg-brand-warm-brown text-brand-cream px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Back to Templates
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!template && !templateLoading) {
    return (
      <div className="container-width fade-in min-h-screen">
        <div className="text-center py-12">
          <div className="bg-brand-soft-beige border border-brand-beige rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-brand-charcoal mb-2">Template Not Found</h2>
            <p className="text-brand-warm-brown mb-4">
              The template you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <button
              onClick={() => router.push('/admin/template')}
              className="bg-brand-warm-brown text-brand-cream px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Back to Templates
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-width fade-in min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-brand-warm-brown hover:text-brand-charcoal transition-colors mr-4"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-3xl font-semibold heading-primary">Template Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Template Image */}
         <div className="flex justify-center">
           {template.thumbnailUrl && (
             <div className="relative w-full h-96 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
               <Image
                 src={template.thumbnailUrl}
                 alt={template.title}
                 width={600}
                 height={400}
                 className="rounded-lg"
                 style={{ 
                   objectFit: 'contain',
                   width: '100%',
                   height: '100%'
                 }}
               />
               {template.isTrending && (
                 <div className="absolute top-4 right-4 bg-brand-warm-brown text-brand-cream px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                   <TrendingUp size={14} />
                   Trending
                 </div>
               )}
               {!template.isPublished && (
                 <div className="absolute top-4 left-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                   Draft
                 </div>
               )}
             </div>
           )}
         </div>

        {/* Template Info */}
        <div className="space-y-6">
          <div>
            <h2 className="heading-secondary text-2xl mb-2">{template.title}</h2>
            <p className="body-text text-brand-warm-brown">{template.description}</p>
          </div>

          {/* Content Type */}
          <div>
            <span className="inline-block bg-brand-soft-beige text-brand-charcoal px-3 py-1 rounded-full text-sm font-semibold">
              {template.contentType}
            </span>
          </div>

          {/* Tags */}
          {template.tags && template.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-brand-warm-brown" />
                <span className="text-sm font-semibold text-brand-warm-brown">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <span key={index} className="bg-brand-light-beige text-brand-charcoal px-3 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-brand-soft-beige rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Eye size={16} className="text-brand-warm-brown" />
              </div>
              <div className="text-lg font-bold text-brand-charcoal">{template.viewCount}</div>
              <div className="text-xs text-brand-warm-brown">Views</div>
            </div>
            <div className="text-center p-3 bg-brand-soft-beige rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Edit size={16} className="text-brand-warm-brown" />
              </div>
              <div className="text-lg font-bold text-brand-charcoal">{template.editCount}</div>
              <div className="text-xs text-brand-warm-brown">Edits</div>
            </div>
            <div className="text-center p-3 bg-brand-soft-beige rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bookmark size={16} className="text-brand-warm-brown" />
              </div>
              <div className="text-lg font-bold text-brand-charcoal">{template.bookmarkCount}</div>
              <div className="text-xs text-brand-warm-brown">Bookmarks</div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-brand-warm-brown">
              <Calendar size={14} />
              <span>Created: {formatDate(template.createdAt)}</span>
            </div>
            {template.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-brand-warm-brown">
                <Calendar size={14} />
                <span>Published: {formatDate(template.publishedAt)}</span>
              </div>
            )}
          </div>

          {/* Instructions */}
          {template.instruction && (
            <div>
              <h3 className="heading-secondary text-lg mb-2">Instructions</h3>
              <p className="body-text text-brand-warm-brown">{template.instruction}</p>
            </div>
          )}

          {/* Caption */}
          {template.caption && (
            <div>
              <h3 className="heading-secondary text-lg mb-2">Caption</h3>
              <p className="body-text text-brand-warm-brown">{template.caption}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              className="flex-1 flex items-center justify-center gap-2 bg-brand-warm-brown text-brand-cream px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              onClick={() => window.open(template.canvaEditUrl, '_blank')}
            >
              <Edit size={16} />
              Edit in Canva
            </button>
            <button 
              className="flex items-center justify-center gap-2 bg-brand-soft-beige text-brand-charcoal px-4 py-3 rounded-lg font-semibold hover:bg-brand-light-beige transition"
              onClick={() => window.open(template.canvaTemplateUrl, '_blank')}
            >
              <ExternalLink size={16} />
              View Template
            </button>
            <button 
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                isBookmarked
                  ? "bg-brand-warm-brown text-brand-cream"
                  : "bg-brand-soft-beige text-brand-charcoal hover:bg-brand-light-beige"
              }`}
              onClick={handleBookmark}
              disabled={bookmarkLoading}
            >
              <Bookmark 
                size={16} 
                className={isBookmarked ? "fill-current" : ""}
              />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateByIdPage; 