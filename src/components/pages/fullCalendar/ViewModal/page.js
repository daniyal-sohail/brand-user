"use client";
import React from "react";
import { X, Edit, ExternalLink, Calendar, Tag, Eye, TrendingUp } from "lucide-react";
import Image from "next/image";

const ViewModal = ({ template, isOpen, onClose, historyItem, action }) => {

  if (!isOpen || !template) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-brand-cream rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-beige">
          <h2 className="text-xl sm:text-2xl font-semibold heading-primary">Template Details</h2>
          <button
            onClick={onClose}
            className="text-brand-warm-brown hover:text-brand-charcoal transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Template Image */}
            <div className="flex justify-center order-2 lg:order-1">
              {template.thumbnailUrl && (
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
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
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-brand-warm-brown text-brand-cream px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                      <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span className="hidden xs:inline">Trending</span>
                    </div>
                  )}
                  {!template.isPublished && (
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gray-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Draft
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div>
                <h3 className="heading-secondary text-xl sm:text-2xl mb-2">{template.title}</h3>
                <p className="body-text text-brand-warm-brown text-sm sm:text-base">{template.description}</p>
              </div>

              {/* Content Type */}
              <div>
                <span className="inline-block bg-brand-soft-beige text-brand-charcoal px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {template.contentType}
                </span>
              </div>

              {/* Tags */}
              {template.tags && template.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Tag size={14} className="sm:w-4 sm:h-4 text-brand-warm-brown" />
                    <span className="text-xs sm:text-sm font-semibold text-brand-warm-brown">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {template.tags.map((tag, index) => (
                      <span key={index} className="bg-brand-light-beige text-brand-charcoal px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
                             <div className="grid grid-cols-2 gap-2 sm:gap-4">
                 <div className="text-center p-2 sm:p-3 bg-brand-soft-beige rounded-lg">
                   <div className="flex items-center justify-center gap-1 mb-1">
                     <Eye size={14} className="sm:w-4 sm:h-4 text-brand-warm-brown" />
                   </div>
                   <div className="text-sm sm:text-lg font-bold text-brand-charcoal">{template.viewCount}</div>
                   <div className="text-xs text-brand-warm-brown">Views</div>
                 </div>
                 <div className="text-center p-2 sm:p-3 bg-brand-soft-beige rounded-lg">
                   <div className="flex items-center justify-center gap-1 mb-1">
                     <Edit size={14} className="sm:w-4 sm:h-4 text-brand-warm-brown" />
                   </div>
                   <div className="text-sm sm:text-lg font-bold text-brand-charcoal">{template.editCount}</div>
                   <div className="text-xs text-brand-warm-brown">Edits</div>
                 </div>
               </div>

              {/* Dates */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-warm-brown">
                  <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span>Created: {formatDate(template.createdAt)}</span>
                </div>
                {template.publishedAt && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-warm-brown">
                    <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                    <span>Published: {formatDate(template.publishedAt)}</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              {template.instruction && (
                <div>
                  <h4 className="heading-secondary text-base sm:text-lg mb-2">Instructions</h4>
                  <p className="body-text text-brand-warm-brown text-sm sm:text-base">{template.instruction}</p>
                </div>
              )}

              {/* Caption */}
              {template.caption && (
                <div>
                  <h4 className="heading-secondary text-base sm:text-lg mb-2">Caption</h4>
                  <p className="body-text text-brand-warm-brown text-sm sm:text-base">{template.caption}</p>
                </div>
              )}

              {/* History Information */}
              {historyItem && action && (
                <div className="bg-brand-light-beige p-3 sm:p-4 rounded-lg">
                  <h4 className="heading-secondary text-base sm:text-lg mb-2">Activity Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                      <span className="font-semibold text-brand-charcoal">Action:</span>
                      <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        action === 'viewed' ? 'bg-brand-beige text-brand-charcoal' :
                        action === 'bookmarked' ? 'bg-brand-warm-brown text-brand-cream' :
                        action === 'edited' ? 'bg-brand-charcoal text-brand-cream' :
                        'bg-gray-300 text-gray-700'
                      }`}>
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                      <span className="font-semibold text-brand-charcoal">Date:</span>
                      <span className="text-brand-warm-brown">{formatDate(historyItem.createdAt)}</span>
                    </div>
                    {historyItem.editDuration > 0 && (
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <span className="font-semibold text-brand-charcoal">Edit Duration:</span>
                        <span className="text-brand-warm-brown">{historyItem.editDuration} minutes</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

                     {/* Action Buttons - Moved outside grid for better mobile layout */}
           <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-brand-beige">
             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
               <button 
                 className="flex-1 flex items-center justify-center gap-2 bg-brand-warm-brown text-brand-cream px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition"
                 onClick={() => window.open(template.canvaEditUrl, '_blank')}
               >
                 <Edit size={14} className="sm:w-4 sm:h-4" />
                 Edit in Canva
               </button>
               <button 
                 className="flex-1 flex items-center justify-center gap-2 bg-brand-soft-beige text-brand-charcoal px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-brand-light-beige transition"
                 onClick={() => window.open(template.canvaTemplateUrl, '_blank')}
               >
                 <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                 View Template
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;