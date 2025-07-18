import React, { useEffect, useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import Image from 'next/image';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return null;

  return (
    <div className="p-6 card">
      <h2 className="heading-secondary mb-2">{content.title}</h2>
      <div className="mb-4 text-sm text-brand-warm-brown">Content Type: {content.contentType}</div>
      <div className="mb-4">
        <strong>Description:</strong>
        <div>{content.description}</div>
      </div>
      <div className="mb-4">
        <strong>Instruction:</strong>
        <div>{content.instruction}</div>
      </div>
      <div className="mb-4">
        <strong>Caption:</strong>
        <div>{content.caption}</div>
      </div>
      <div className="mb-4">
        <strong>Categories:</strong>
        <div>{content.categories && content.categories.join(', ')}</div>
      </div>
      <div className="mb-4">
        <strong>Tags:</strong>
        <div>{content.tags && content.tags.join(', ')}</div>
      </div>
      <div className="mb-4">
        <strong>Created At:</strong>
        <div>{new Date(content.createdAt).toLocaleString()}</div>
      </div>
      <div className="mb-4">
        <strong>Updated At:</strong>
        <div>{new Date(content.updatedAt).toLocaleString()}</div>
      </div>
      {/* Images and Videos */}
      {content.imageUrl && content.imageUrl.length > 0 && (
        <div className="mb-4">
          <strong>Images:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {content.imageUrl.map((url, idx) => (
              <Image key={idx} src={url} alt="content" width={128} height={128} className="w-32 h-32 object-cover rounded" />
            ))}
          </div>
        </div>
      )}
      {content.videoUrl && content.videoUrl.length > 0 && (
        <div className="mb-4">
          <strong>Videos:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {content.videoUrl.map((url, idx) => (
              <video key={idx} src={url} controls className="w-64 h-36 rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentById; 