import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DesktopSearchBar } from "./desktop-search-bar";

interface NoticeBoardHeaderProps {
  title: string;
  description: string;
  backLink?: string;
  backText?: string;
  // Search props
  isMobile: boolean;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

export const NoticeBoardHeader: React.FC<NoticeBoardHeaderProps> = ({
  title,
  description,
  backLink = "/notice-boards",
  backText = "Back to Notice Boards",
  isMobile,
  searchTerm,
  onSearchTermChange,
  onSearch,
}) => {
  return (
    <>
      <div className="relative w-full h-[97px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full bg-zinc-100 h-[97px]" />

        <Link
          to={backLink}
          className="absolute left-[25px] top-[35px] flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-200 group max-md:left-5 max-sm:left-2.5 max-w-[calc(100%-50px)]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform duration-200" />
          <span className="text-sm font-medium">{backText}</span>
        </Link>

        {/* Desktop Search - now inside header container */}
        {!isMobile && (
          <DesktopSearchBar
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
          />
        )}
      </div>

      <div className="page-title absolute text-4xl font-bold text-black left-[47px] top-[130px] max-md:left-5 max-md:text-3xl max-sm:left-2.5 max-sm:text-3xl max-sm:top-[110px]">
        {title}
      </div>

      <div className="page-description absolute text-xl text-black left-[135px] top-[200px] w-[739px] max-md:left-5 max-md:text-lg max-md:w-[90%] max-sm:left-2.5 max-sm:text-base max-sm:top-[180px] max-sm:w-[95%]">
        {description}
      </div>
    </>
  );
};
