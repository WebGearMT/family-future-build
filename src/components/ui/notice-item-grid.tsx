import React from "react";
import { NoticeItemCard, type NoticeItem } from "./notice-item-card";

interface NoticeItemGridProps {
  items: NoticeItem[];
  searchTerm: string;
  selectedFilters: string[];
  noResultsMessage?: string;
  noResultsSubMessage?: string;
}

export const NoticeItemGrid: React.FC<NoticeItemGridProps> = ({
  items,
  searchTerm,
  selectedFilters,
  noResultsMessage = "No items found matching your criteria.",
  noResultsSubMessage = "Try adjusting your search or filters.",
}) => {
  return (
    <div className="responsive-grid">
      {items.length === 0 ? (
        <div className="col-span-2 text-center py-12">
          <p className="text-gray-500 text-lg">{noResultsMessage}</p>
          {(selectedFilters.length > 0 || searchTerm) && (
            <p className="text-gray-400 text-sm mt-2">{noResultsSubMessage}</p>
          )}
        </div>
      ) : (
        items.map((item) => <NoticeItemCard key={item.id} item={item} />)
      )}
    </div>
  );
};
