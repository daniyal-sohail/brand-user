"use client";
import React from "react";
import ContentById from "@/components/pages/library/byId/page";
import { useParams } from "next/navigation";

const LibraryDetailPage = () => {
  const params = useParams();
  const contentId = params?.id;

  return (
    <div className="container-width section-padding">
      <ContentById contentId={contentId} />
    </div>
  );
};

export default LibraryDetailPage;
