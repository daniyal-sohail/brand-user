"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LibraryTable = ({ data }) => {
  const router = useRouter();
  if (!data || data.length === 0) {
    return <div className="text-center text-brand-warm-brown font-poppins py-8">No content found.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item._id}
          className="card p-6 flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push(`/admin/library/${item._id}`)}
        >
          {item.imageUrl && item.imageUrl.length > 0 && (
            <Image
              src={item.imageUrl[0]}
              alt={item.title}
              width={400}
              height={160}
              className="w-full h-40 object-cover rounded mb-4"
              style={{ objectFit: 'cover' }}
            />
          )}
          <h2 className="heading-secondary mb-2">{item.title}</h2>
          <p className="body-text mb-2">{item.description}</p>
          <div className="mb-2">
            <span className="text-brand-warm-brown font-poppins text-xs">Categories: </span>
            {item.categories && item.categories.length > 0
              ? item.categories.join(", ")
              : "None"}
          </div>
          <div className="mb-2">
            <span className="text-brand-warm-brown font-poppins text-xs">Tags: </span>
            {item.tags && item.tags.length > 0 ? item.tags.join(", ") : "None"}
          </div>
          <div className="mt-auto">
            <span className="text-xs text-brand-charcoal font-poppins">Type: {item.contentType}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryTable; 