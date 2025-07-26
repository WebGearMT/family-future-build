import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { JobListing } from "@/components/ui/job-listing";
import { FeaturedNotice } from "@/components/featured-notice/FeaturedNotice";
import  AppHeader from "@/components/ui/app-header";

interface JobPost {
  id: number;
  title: string;
  company: string;
  qualifications: string;
  yearsOfExp: number;
  category: string;
}

interface FeaturedNotice {
  id: number;
  title: string;
  description: string;
  link: string;
  created_at?: string;
}

const ServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [featuredNoticeData, setFeaturedNoticeData] = useState<
    FeaturedNotice[]
  >([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const jobPosts: JobPost[] = [
    {
      id: 1,
      title: "Machine Operator",
      company: "PrecisionEdge",
      qualifications: "1+ year of experience as a machine operator.",
      yearsOfExp: 1,
      category: "Manufacturing",
    },
    {
      id: 2,
      title: "Electrician",
      company: "VoltPro Solutions",
      qualifications: "Valid state electrician license",
      yearsOfExp: 2,
      category: "Electrical",
    },
    {
      id: 3,
      title: "Plumber",
      company: "PipeMasters",
      qualifications: "Journeyman/Master Plumbing License",
      yearsOfExp: 4,
      category: "Plumbing",
    },
    {
      id: 4,
      title: "HVAC Technician",
      company: "ClimateCare",
      qualifications: "HVAC certification or apprenticeship",
      yearsOfExp: 3,
      category: "HVAC",
    },
    {
      id: 5,
      title: "Welder",
      company: "Ironclad Fabrications",
      qualifications: "2+ years of welding experience",
      yearsOfExp: 3,
      category: "Welding",
    },
    {
      id: 6,
      title: "Brick Layer",
      company: "StoneHearth",
      qualifications: "3+ years of masonry experience",
      yearsOfExp: 3,
      category: "Masonry",
    },
  ];

  const categories = [
    "Manufacturing",
    "Electrical",
    "Plumbing",
    "HVAC",
    "Welding",
    "Masonry",
  ];

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

  const filteredJobPosts = jobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.qualifications.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(job.category);
    return matchesSearch && matchesFilter;
  });

  // Fetch featured notices from the database
  useEffect(() => {
    const fetchFeaturedNotices = async () => {
      try {
        const response = await fetch(
          "../server/api.php?table=featured_notices",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const notices = Array.isArray(result) ? result : [];

        setFeaturedNoticeData(notices);
      } catch (error) {
        console.error("Error fetching featured notices:", error);
        setFeaturedNoticeData([]);
      }
    };

    fetchFeaturedNotices();
  }, []);

  // Handle click outside to close filter dropdown
  useEffect(() => {
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
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />
      <div className="relative w-full bg-gray-50 min-h-[1425px] max-md:min-h-[auto]">
        {/* Site Navigation */}
        <AppHeader />

        {/* Notice Board Navigation */}
        <div className="flex absolute left-0 justify-between items-center px-6 py-0 w-full bg-zinc-100 h-[97px] top-[55px] max-md:flex-col max-md:gap-5 max-md:p-5 max-md:h-auto max-sm:p-4">
          <div className="flex flex-col gap-6 justify-center items-start pt-11 max-md:gap-4">
            <div className="flex gap-1.5 items-center">
              <Link
                to="/notice-boards"
                className="flex gap-1.5 items-center hover:text-gray-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
                <div className="text-xl text-black max-sm:text-base">
                  Back to Notice Boards
                </div>
              </Link>
            </div>
            <div className="text-4xl font-bold text-black max-md:text-3xl max-sm:text-2xl">
              Service Providers
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative h-14 w-[530px] max-md:w-full max-md:max-w-[400px] max-sm:max-w-[300px]">
            <div className="absolute top-0 left-0 h-14 bg-white w-[530px] max-md:w-full" />
            <div className="absolute top-0 h-14 bg-zinc-500 right-0 w-[90px] max-sm:w-[70px]" />
            <Search className="absolute left-[15px] top-[13px] w-[30px] h-[30px] text-black opacity-54" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="absolute left-[55px] top-0 h-14 w-[calc(100%-145px)] max-sm:w-[calc(100%-125px)] bg-transparent border-none outline-none text-black placeholder-gray-500 text-base px-2"
            />
            <button
              onClick={handleSearch}
              className="absolute top-4 h-6 text-xl text-white right-[12px] w-[66px] max-sm:text-base max-sm:right-[4px] max-sm:w-[58px] bg-transparent border-none cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="absolute h-6 text-xl text-black left-[135px] top-[200px] w-[739px] max-md:static max-md:px-5 max-md:py-0 max-md:mx-0 max-md:my-5 max-md:w-full max-md:text-center max-sm:px-4 max-sm:py-0 max-sm:text-base">
          Browse our selection of highly reputable agents to get the services
          you need.
        </div>

        {/* Filter Dropdown */}
        <FilterDropdown
          showFilter={showFilter}
          selectedFilters={selectedFilters}
          categories={categories}
          filterTitle="Filter by Job Category"
          onToggleFilter={() => setShowFilter(!showFilter)}
          onToggleCategory={toggleFilter}
          onClearFilters={clearFilters}
          filterRef={filterRef}
        />

        {/* Job Posts Grid */}
        <div className="grid absolute grid-cols-3 grid-rows-2 gap-x-10 gap-y-12 pb-0.5 h-[776px] left-[135px] top-[350px] w-[1013px] max-md:static max-md:gap-5 max-md:px-5 max-md:py-0 max-md:mb-10 max-md:w-full max-md:grid-cols-[repeat(2,1fr)] max-sm:gap-4 max-sm:px-4 max-sm:py-0 max-sm:grid-cols-[1fr]">
          {/* First Row */}
          <div className="flex gap-10 items-center col-[1/span_3] row-[1/span_1] max-md:flex-wrap max-md:justify-center max-md:col-[1/span_2] max-sm:flex-col max-sm:gap-4 max-sm:col-[1/span_1]">
            {filteredJobPosts.slice(0, 3).map((job) => (
              <JobListing
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                qualifications={job.qualifications}
                yearsOfExp={job.yearsOfExp}
                onClick={() =>
                  console.log(`Viewing more details for ${job.title}`)
                }
              />
            ))}
          </div>

          {/* Second Row */}
          <div className="flex gap-10 items-center col-[1/span_3] row-[2/span_1] max-md:flex-wrap max-md:justify-center max-md:col-[1/span_2] max-sm:flex-col max-sm:gap-4 max-sm:col-[1/span_1]">
            {filteredJobPosts.slice(3, 6).map((job) => (
              <JobListing
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                qualifications={job.qualifications}
                yearsOfExp={job.yearsOfExp}
                onClick={() =>
                  console.log(`Viewing more details for ${job.title}`)
                }
              />
            ))}
          </div>
        </div>

        {/* Featured Notices Section */}
        {featuredNoticeData.length > 0 && (
          <div className="absolute left-[135px] top-[1200px] w-[1013px] max-md:static max-md:px-5 max-md:py-10 max-md:w-full max-sm:px-4">
            <h2 className="text-2xl font-bold text-black mb-6 max-md:text-xl max-sm:text-lg">
              Featured Notices
            </h2>
            <div className="flex flex-wrap gap-6 max-md:justify-center max-sm:flex-col max-sm:items-center">
              {featuredNoticeData
                .filter(
                  (notice) =>
                    notice.title &&
                    notice.title.trim() !== "" &&
                    notice.description &&
                    notice.description.trim() !== "" &&
                    notice.link &&
                    notice.link.trim() !== "",
                )
                .map((notice) => (
                  <FeaturedNotice
                    key={notice.id}
                    title={notice.title}
                    description={notice.description}
                    link={notice.link}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceProviders;
