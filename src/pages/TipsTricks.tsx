"use client";
import * as React from "react";
import { Brand } from "@/components/ui/brand";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { MobileSearchOverlay } from "@/components/ui/mobile-search-overlay";
import { DesktopSearchBar } from "@/components/ui/desktop-search-bar";
import { MobileSearchIcon } from "@/components/ui/mobile-search-icon";
import { NoticeBoardHeader } from "@/components/ui/notice-board-header";
import { NoticeItemGrid } from "@/components/ui/notice-item-grid";
import type { NoticeItem } from "@/components/ui/notice-item-card";
import "@/components/ui/notice-board-styles.css";

function TipsTricks() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showFilter, setShowFilter] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const mobileSearchRef = React.useRef<HTMLInputElement>(null);

  const tips: NoticeItem[] = [
    {
      id: 1,
      name: "Greg Kirkby",
      category: "Automotive",
      company: "GM Service Parts Operations",
      experience: 20,
    },
    {
      id: 2,
      name: "Sandy Wilder",
      category: "Real Estate",
      company: "Stone Realty Group",
      experience: 15,
    },
    {
      id: 3,
      name: "Chris Todd",
      category: "Insurance",
      company: "Pegram Insurance",
      experience: 8,
    },
    {
      id: 4,
      name: "Christine Bauer",
      category: "Real Estate",
      company: "The Agency RE",
      experience: 20,
    },
  ];

  const categories = ["Automotive", "Real Estate", "Insurance"];

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(tip.category);
    return matchesSearch && matchesFilter;
  });

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const toggleFilter = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  // Mobile detection
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 853);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mobile search overlay
  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "Backspace") {
        setShowMobileSearch(false);
      }
    };

    const handlePopstate = () => {
      if (showMobileSearch) {
        setShowMobileSearch(false);
      }
    };

    if (showMobileSearch) {
      document.addEventListener("keydown", handleKeydown);
      window.addEventListener("popstate", handlePopstate);

      // Push a state when opening search to handle back button
      window.history.pushState({ mobileSearch: true }, "");
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [showMobileSearch]);

  // Focus search input when mobile search opens
  React.useEffect(() => {
    if (showMobileSearch && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [showMobileSearch]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div className="relative w-full bg-gray-50 min-h-[927px] overflow-x-hidden">
      <div className="flex relative items-center px-3.5 py-0 w-full h-14 bg-white max-sm:px-2.5 max-sm:py-0">
        <Brand />
      </div>

      <NoticeBoardHeader
        title="Tips & Tricks"
        description="Browse our selection of highly reputable tips to get the services you need."
        isMobile={isMobile}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
      />

      {/* Mobile Search Icon */}
      {isMobile && (
        <MobileSearchIcon onClick={() => setShowMobileSearch(true)} />
      )}

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay
        showMobileSearch={showMobileSearch}
        searchTerm={searchTerm}
        searchTitle="Search Tips"
        onClose={() => setShowMobileSearch(false)}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        mobileSearchRef={mobileSearchRef}
      />

      <FilterDropdown
        showFilter={showFilter}
        selectedFilters={selectedFilters}
        categories={categories}
        onToggleFilter={() => setShowFilter(!showFilter)}
        onToggleCategory={toggleFilter}
        onClearFilters={clearFilters}
        filterRef={filterRef}
      />

      <NoticeItemGrid
        items={filteredTips}
        searchTerm={searchTerm}
        selectedFilters={selectedFilters}
        noResultsMessage="No tips found matching your criteria."
      />
    </div>
  );
}

export default TipsTricks;
