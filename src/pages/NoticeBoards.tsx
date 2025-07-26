"use client";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "@/components/ui/app-header";
import { useAuth } from '@/contexts/AuthContext';
import {
  useReputableAgents,
  useReputableCompanies,
  useClassifiedAds,
  useServiceProviders,
  useTipsTricks,
} from "@/hooks/useNoticeBoards";
import { NoticeList } from "@/components/notice-cards/NoticeList";
import { FeaturedNotice } from "@/components/ui/FeaturedNotice";

function NoticeBoards() {
  const navigate = useNavigate();

  // Fetch data for all notice boards to display counts
  const reputableAgents = useReputableAgents();
  const reputableCompanies = useReputableCompanies();
  const classifiedAds = useClassifiedAds();
  const serviceProviders = useServiceProviders();
  const tipsTricks = useTipsTricks();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const { user, signOut } = useAuth();

  // Data is now handled by individual ProgressBar components

  return (
    <div className="relative bg-gray-50 h-[868px] w-full max-md:h-auto">
      <AppHeader
        mode="dashboard"
        user={user}
        onSignOut={signOut}
        showMenu={false}
      />
      <div className="flex absolute left-0 top-16 flex-col gap-2.5 items-center px-6 py-5 bg-zinc-100 h-[97px] w-full max-md:p-5 max-md:h-auto">
        <div className="flex justify-center items-center w-[1208px] max-md:w-[calc(100%_-_50px)]">
          <div className="text-4xl font-bold text-black max-md:text-3xl max-sm:text-2xl">
            Notice Boards
          </div>
        </div>
      </div>
      <div className="inline-flex absolute gap-24 items-start h-[609px] left-[138px] top-[192px] w-[1004px] max-md:left-5 max-md:flex-col max-md:gap-10 max-md:h-auto max-md:top-[184px] max-md:w-[calc(100%_-_40px)] max-sm:left-2.5 max-sm:top-44 max-sm:gap-5 max-sm:w-[calc(100%_-_20px)]">
        <div className="flex flex-col gap-9 items-start w-[517px] max-md:w-full">
          <Link
            to="/notice-boards/reputable-agents"
            className="flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex absolute top-0 left-0 items-center w-[517px] max-md:w-full">
              <div className="shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full" />
            </div>
            <div className="flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full">
              <div className="text-xl font-bold text-black">
                Reputable Agents
              </div>
              <div className="text-base text-black">
                Get the service you need from these highly reputable agents.
              </div>
            </div>
          </Link>
          <Link
            to="/notice-boards/reputable-companies"
            className="flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex absolute top-0 left-0 items-center w-[517px] max-md:w-full">
              <div className="shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full" />
            </div>
            <div className="flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full">
              <div className="text-xl font-bold text-black">
                Reputable Companies
              </div>
              <div className="text-base text-black">
                Get the products/services you need from these well respected
                companies.
                {reputableCompanies.data.length > 0 && (
                  <span className="text-green-600 font-medium">
                    {" "}
                    ({reputableCompanies.data.length} available)
                  </span>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/notice-boards/classified-ads"
            className="flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex absolute top-0 left-0 items-center w-[517px] max-md:w-full">
              <div className="shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full" />
            </div>
            <div className="flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full">
              <div className="text-xl font-bold text-black">Classified ADs</div>
              <div className="text-base text-black">
                Find your next bargain by browsing this catalog of deals.
                {classifiedAds.data.length > 0 && (
                  <span className="text-green-600 font-medium">
                    {" "}
                    ({classifiedAds.data.length} available)
                  </span>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/notice-boards/service-providers"
            className="flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex absolute top-0 left-0 gap-2.5 items-center bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full">
              <div className="absolute top-0 left-0 shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full" />
            </div>
            <div className="flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full">
              <div className="text-xl font-bold text-black">
                Service Providers
              </div>
              <div className="text-base text-black">
                Find your first job in NC by exploring the opportunities listed.
                {serviceProviders.data.length > 0 && (
                  <span className="text-green-600 font-medium">
                    {" "}
                    ({serviceProviders.data.length} available)
                  </span>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/notice-boards/tips-tricks"
            className="flex relative gap-14 items-center px-8 py-3 h-[93px] w-[517px] max-md:gap-5 max-md:px-5 max-md:py-3 max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-stretch max-sm:p-4 max-sm:h-auto hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex absolute top-0 left-0 gap-2.5 items-center bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full">
              <div className="absolute top-0 left-0 shrink-0 bg-white rounded-md border border-solid h-[93px] w-[517px] max-md:w-full" />
            </div>
            <div className="flex relative flex-col shrink-0 gap-1.5 items-start w-72 z-[1] max-md:flex-1 max-md:w-auto max-sm:w-full">
              <div className="text-xl font-bold text-black">Tips & Tricks</div>
              <div className="text-base text-black">
                Make your journey to NC easier with these unforgettable hacks
                and tips!
                {tipsTricks.data.length > 0 && (
                  <span className="text-green-600 font-medium">
                    {" "}
                    ({tipsTricks.data.length} available)
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="bg-zinc-300 h-[609px] w-[3px] max-sm:hidden" />
        <div className="flex gap-2.5 items-center px-8 py-10 bg-gray-50 h-[609px] w-[303px] border-l border-gray-300 max-md:p-5 max-md:w-full max-md:border-l-0 max-sm:p-4">
          <div className="flex flex-col shrink-0 gap-10 justify-center items-center w-[241px] max-md:w-full">
            <div className="self-stretch text-xl font-bold text-black">
              Featured Notices
            </div>
            <FeaturedNotice />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeBoards;
