"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Edit, Bookmark, TrendingUp, ExternalLink, Calendar, Tag, FileText } from "lucide-react";
import { useBookmark } from "@/context/BookmarkContext";
import { toast } from "react-toastify";

const TemplateTable = ({ templates }) => {
  const router = useRouter();
  const { bookmarkPostData, bookmarkDeleteData, bookmarkLoading } = useBookmark();
  const [bookmarkedTemplates, setBookmarkedTemplates] = useState(new Set());

  const handleBookmark = async (e, templateId) => {
    e.stopPropagation();
    
    if (bookmarkLoading) return;

    try {
      const isBookmarked = bookmarkedTemplates.has(templateId);
      
      if (isBookmarked) {
        // Unbookmark
        const result = await bookmarkDeleteData(`/templates/${templateId}/bookmark`);
        if (result && result.status === 200) {
          setBookmarkedTemplates(prev => {
            const newSet = new Set(prev);
            newSet.delete(templateId);
            return newSet;
          });
          toast.success("Template removed from bookmarks");
        }
      } else {
        // Bookmark
        const result = await bookmarkPostData(`/templates/${templateId}/bookmark`);
        if (result && result.status === 200) {
          setBookmarkedTemplates(prev => new Set([...prev, templateId]));
          toast.success("Template bookmarked successfully");
        }
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };
  
  if (!templates || templates.length === 0) {
    return (
      <div className="text-center text-brand-warm-brown font-poppins py-8">
        <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>No templates found.</p>
        <p className="text-sm mt-2">Create your first template to get started!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
                 <div
           key={template._id}
           className="card p-6 flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow"
           onClick={() => router.push(`/admin/template/${template._id}`)}
         >
          {/* Thumbnail */}
          {template.thumbnailUrl && (
            <div className="relative mb-4">
              <Image
                src={template.thumbnailUrl}
                alt={template.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              {template.isTrending && (
                <div className="absolute top-2 right-2 bg-brand-warm-brown text-brand-cream px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <TrendingUp size={12} />
                  Trending
                </div>
              )}
              {!template.isPublished && (
                <div className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Draft
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <h2 className="heading-secondary mb-2 line-clamp-2">{template.title}</h2>
            <p className="body-text text-brand-warm-brown mb-3 line-clamp-2">{template.description}</p>
            
            {/* Content Type */}
            <div className="mb-3">
              <span className="inline-block bg-brand-soft-beige text-brand-charcoal px-2 py-1 rounded-full text-xs font-semibold">
                {template.contentType}
              </span>
            </div>

            {/* Tags */}
            {template.tags && template.tags.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <Tag size={12} className="text-brand-warm-brown" />
                  <span className="text-xs text-brand-warm-brown font-semibold">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-brand-light-beige text-brand-charcoal px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="bg-brand-light-beige text-brand-charcoal px-2 py-1 rounded text-xs">
                      +{template.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-brand-warm-brown mb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {template.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  <Edit size={12} />
                  {template.editCount}
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark size={12} />
                  {template.bookmarkCount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(template.createdAt)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              <button 
                className="flex-1 flex items-center justify-center gap-2 bg-brand-warm-brown text-brand-cream px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(template.canvaEditUrl, '_blank');
                }}
              >
                <Edit size={14} />
                Edit
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-brand-soft-beige text-brand-charcoal px-3 py-2 rounded-lg text-sm font-semibold hover:bg-brand-light-beige transition"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(template.canvaTemplateUrl, '_blank');
                }}
              >
                <ExternalLink size={14} />
              </button>
              <button 
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  bookmarkedTemplates.has(template._id)
                    ? "bg-brand-warm-brown text-brand-cream"
                    : "bg-brand-soft-beige text-brand-charcoal hover:bg-brand-light-beige"
                }`}
                onClick={(e) => handleBookmark(e, template._id)}
                disabled={bookmarkLoading}
              >
                <Bookmark 
                  size={14} 
                  className={bookmarkedTemplates.has(template._id) ? "fill-current" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateTable; 