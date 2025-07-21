import React, { useEffect, useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import Image from 'next/image';
import { BookOpen, Sparkles, Tag, Layers, Calendar as CalendarIcon, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

const ContentById = ({ contentId }) => {
  const { libraryFetchData } = useLibrary();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!contentId) return;
    setLoading(true);
    libraryFetchData(`/content/${contentId}`)
      .then((result) => {
        if (result && result.data) {
          setContent(result.data);
        } else {
          setError('No data found');
        }
      })
      .catch(() => setError('Failed to fetch content'))
      .finally(() => setLoading(false));
  }, [contentId, libraryFetchData]);

  if (loading) return <div className="flex justify-center items-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-brand-warm-brown"></div></div>;
  if (error) return <div className="text-center py-12 font-poppins text-red-600">{error}</div>;
  if (!content) return null;

  return (
    <div className="container-width fade-in">
      {/* Header Row */}
      <div className="flex items-center align-middle mb-8">
        <div className="bg-brand-beige p-3 rounded-xl">
          <BookOpen />
        </div>
        <h1 className="text-3xl font-semibold ml-3 heading-primary">{content.title}</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-brand-beige p-8 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-brand-warm-brown" />
              <span className="text-brand-warm-brown font-poppins text-sm">{content.contentType}</span>
            </div>
            <div className="mb-4">
              <h3 className="heading-secondary mb-1 flex items-center gap-2"><Layers className="w-5 h-5 text-brand-warm-brown" />Description</h3>
              <div className="body-text">{content.description}</div>
            </div>
            <div className="mb-4">
              <h3 className="heading-secondary mb-1 flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-warm-brown" />Instruction</h3>
              <div className="body-text">{content.instruction}</div>
            </div>
            <div className="mb-4">
              <h3 className="heading-secondary mb-1 flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-warm-brown" />Caption</h3>
              <div className="body-text">{content.caption}</div>
            </div>
            <div className="mb-4 flex gap-8">
              <div>
                <span className="text-brand-warm-brown font-poppins text-xs flex items-center gap-1"><CalendarIcon className="w-4 h-4" />Created:</span>
                <span className="body-text ml-1">{new Date(content.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-brand-warm-brown font-poppins text-xs flex items-center gap-1"><CalendarIcon className="w-4 h-4" />Updated:</span>
                <span className="body-text ml-1">{new Date(content.updatedAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="mb-4 flex gap-8">
              <div>
                <h3 className="heading-secondary mb-1 flex items-center gap-2"><Tag className="w-5 h-5 text-brand-warm-brown" />Tags</h3>
                <div className="body-text">{content.tags && content.tags.join(', ')}</div>
              </div>
              <div>
                <h3 className="heading-secondary mb-1 flex items-center gap-2"><Layers className="w-5 h-5 text-brand-warm-brown" />Categories</h3>
                <div className="body-text">{content.categories && content.categories.join(', ')}</div>
              </div>
            </div>
          </div>
          {/* Media Section */}
          <div className="flex-1 flex flex-col gap-6">
            {content.imageUrl && content.imageUrl.length > 0 && (
              <div>
                <h3 className="heading-secondary mb-2 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-brand-warm-brown" />Images</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.imageUrl.map((url, idx) => (
                    <Image key={idx} src={url} alt="content" width={128} height={128} className="w-32 h-32 object-cover rounded" />
                  ))}
                </div>
              </div>
            )}
            {content.videoUrl && content.videoUrl.length > 0 && (
              <div>
                <h3 className="heading-secondary mb-2 flex items-center gap-2"><VideoIcon className="w-5 h-5 text-brand-warm-brown" />Videos</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.videoUrl.map((url, idx) => (
                    <video key={idx} src={url} controls className="w-64 h-36 rounded" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentById; 