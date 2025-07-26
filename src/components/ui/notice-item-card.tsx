import React from "react";
import { Link } from "react-router-dom";

export interface NoticeItem {
  id: number;
  name: string;
  category: string;
  company: string;
  experience: number;
  image?: string;
}

interface NoticeItemCardProps {
  item: NoticeItem;
  className?: string;
  linkPath?: string; // Optional custom link path
}

export const NoticeItemCard: React.FC<NoticeItemCardProps> = ({
  item,
  className = "",
  linkPath,
}) => {
  const defaultLinkPath = `/notice-boards/classified-ads/item/${item.id}`;
  const finalLinkPath = linkPath || defaultLinkPath;

  return (
    <div className={`notice-card ${className}`}>
      <div className="notice-content">
        <div className="notice-title">{item.name}</div>
        <div className="notice-category">{item.category}</div>
        <div className="notice-detail">
          <span className="font-bold">Company:</span> {item.company}
        </div>
        <div className="notice-detail">
          <span className="font-bold">Years of Exp.:</span> {item.experience}
        </div>
        <Link
          to={finalLinkPath}
          className="notice-more hover:text-sky-700 transition-colors duration-200"
        >
          More
        </Link>
      </div>
    </div>
  );
};
