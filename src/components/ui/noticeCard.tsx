// NewsCard Component - UI boilerplate for each post

import React from "react";
import { Link } from "react-router-dom";

// TypeScript interfaces
interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  author: string;
}

interface NoticeCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ post, onClick}) => {
  // Function to truncate text to exactly 20 words
  const truncateToWords = (text : String, wordCount : number) => {
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 hover:border-gray-300 transform hover:-translate-y-1"
      onClick={() => onClick(post)}
    >
      <Link to={`/notice/${post.id}`} className="block">
        <img 
          src="/images/news-placeholder.jpg" 
          alt={post.title} 
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      </Link>
      <div className="space-y-3">
        {/* Post Title */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        
        {/* Post Excerpt - exactly 20 words */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateToWords(post.content, 20)}
        </p>
        
        {/* Post Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;