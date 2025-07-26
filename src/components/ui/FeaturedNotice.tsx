import React from "react";
import useState from "react";
import { Link } from "react-router-dom";
import {
  useReputableAgents,
  useReputableCompanies,
  useClassifiedAds,
  useServiceProviders,
  useTipsTricks,
} from "@/hooks/useNoticeBoards";

/*
elke notice se json gaan 'n property genaamd "featured" kry wat aanvanklik fals sal wees maar gestel kan word om "true" te wees. Wanneer "featured" true is, sal <FeaturedNotice /> gaan deur al die notice data en enige notice vertoon waarop "featured" true is.
*/

interface FeaturedNoticeProps {
  /**
   * The title of the featured notice
   */
  title: string;
  /**
   * The description text for the featured notice
   */
  description: string;
  /**
   * The link/route where the notice should navigate to
   */
  link: string;
}

export const FeaturedNotice: React.FC<FeaturedNoticeProps> = ({
  title,
  description,
  link,
}) => {

	// Fetch data for all notice boards to display counts
	const reputableAgents = useReputableAgents();
	const reputableCompanies = useReputableCompanies();
	const classifiedAds = useClassifiedAds();
	const serviceProviders = useServiceProviders();
	const tipsTricks = useTipsTricks();

	const featuredNoticeData = [
		reputableAgents,
		reputableCompanies,
		classifiedAds,
		serviceProviders,
		tipsTricks,
	];

  if (!featuredNoticeData.length) {
    return (
      <div className="flex relative flex-col gap-2.5 justify-center items-start px-3 py-5 min-h-[164px] w-[241px] max-md:w-full max-sm:flex-col max-sm:gap-4 max-sm:items-start max-sm:p-4 max-sm:h-auto">
        <div className="flex absolute top-0 left-0 justify-between items-center w-[241px] max-md:w-full">
          <div className="shrink-0 bg-white rounded-md border border border-solid min-h-[164px] w-[241px] max-md:w-full" />
        </div>
        <div className="flex relative flex-col gap-3 items-start w-[196px] z-[1] max-sm:p-0 max-sm:w-full">
          <div className="text-lg font-bold text-black">
            No featured content for today.
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className="flex relative flex-col gap-2.5 justify-center items-start px-3 py-5 min-h-[164px] w-[241px] max-md:w-full max-sm:flex-col max-sm:gap-4 max-sm:items-start max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex absolute top-0 left-0 justify-between items-center w-[241px] max-md:w-full">
        <div className="shrink-0 bg-white rounded-md border border border-solid min-h-[164px] w-[241px] max-md:w-full" />
      </div>
      <div className="flex relative flex-col gap-3 items-start w-[196px] z-[1] max-sm:p-0 max-sm:w-full">
        <div className="text-lg font-bold text-black">{title}</div>
        <div className="text-xs text-gray-600">{description}</div>
        <div className="text-base text-sky-600 underline">More</div>
      </div>
    </Link>
  );
};

export default FeaturedNotice;
