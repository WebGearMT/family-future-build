"use client";
import * as React from "react";
import ServiceProviderPost from "./posts/ServiceProviderPost";

// This component is kept for backward compatibility
// New implementations should use the specific post components directly
interface NoticePostProps {
  title?: string;
  noticeBody?: string;
  tip?: any;
}

export const NoticePost: React.FC<NoticePostProps> = (props) => {
  // For backward compatibility, default to ServiceProviderPost
  // This assumes the legacy route was primarily used for service providers
  return <ServiceProviderPost />;
}

export default NoticePost;
