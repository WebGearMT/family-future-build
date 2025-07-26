"use client";
import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import '../../server/data/shipping_data.json';
import AppHeader from "@/components/ui/app-header";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";


// Sample menu items for demonstration
const businessAssetsItems = [
  "Office Equipment",
  "Furniture & Fixtures",
  "Machinery",
  "Inventory",
  "Technology Assets"
];

const personalEffectsItems = [
  "General",
  "Household",
  "Furniture",
  "Linen",
  "Clothing",
  "Crockery",
  "Cutlery",
  "Ornaments",
  "Artefacts",
  "Weapons",
  "Musical Instruments",
  "Workshop Tools",
  "Valuables",
  "Sport Equipment",
  "Hobbies"
];

function Shipping() {

const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    signOut();
    
  }

  return (
    <div className="flex relative flex-col items-start pb-80 w-full bg-indigo-50 min-h-screen max-md:w-full max-md:max-w-screen-md max-sm:w-full max-sm:max-w-full">
      <AppHeader
        mode={isAuthenticated ? "dashboard" : "welcome"}
        user={user}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
        showMenu={false}
      />

      {/* Page Header */}
      <div className="box-border flex gap-2.5 items-center px-2.5 py-2 w-full bg-white shadow-sm h-[30px]">
        <div className="text-xs font-bold text-center text-black">
          Shipping
        </div>
      </div>

      {/* Main Content Container - Responsive */}
      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-80 xl:max-w-[calc(66.666667%)] xl:w-[calc(66.666667%)] relative">
          {/* Section Tabs Container */}
          <div className="relative w-full h-[177px] max-md:w-full max-sm:w-full">
            {/* Tab Headers */}
            <div className="flex w-full">
              {/* Goods Tab Header - Static Visual */}
              <div className="box-border flex shrink-0 justify-center items-center px-16 py-1.5 w-1/2 bg-zinc-300 h-[30px]">
                <div className="text-xs text-center text-black">
                  Goods
                </div>
              </div>
              {/* Shipping Options Tab Header - Static Visual */}
              <div className="box-border flex shrink-0 justify-center items-center px-16 py-1.5 w-1/2 bg-white h-[30px]">
                <div className="text-xs text-center text-black">
                  Shipping Options
                </div>
              </div>
            </div>

            {/* Accordion Content */}
            <div className="absolute top-[90px] left-0 w-full xl:top-[120px]">
              <Accordion type="single" collapsible className="w-full">
                {/* Goods Section */}
                <AccordionItem value="goods" className="border-none">
                  <div className="flex gap-8 justify-center items-center h-[71px] w-full py-[35px] xl:gap-12 xl:py-12 max-sm:gap-5 max-sm:px-4">
                    <AccordionTrigger className="box-border flex flex-col shrink-0 gap-2.5 justify-center items-center px-7 py-5 bg-white rounded-md shadow-sm h-[71px] w-[99px] xl:h-[120px] xl:w-[160px] xl:px-12 xl:py-8 max-sm:min-w-20 max-sm:w-[calc(50%-10px)] hover:no-underline">
                      <div className="text-xs text-center text-black xl:text-base max-sm:text-xs">
                        Business
                        <br />
                        Assets
                      </div>
                    </AccordionTrigger>

                    <AccordionTrigger className="box-border flex flex-col shrink-0 gap-2.5 justify-center items-center px-7 py-5 bg-white rounded-md shadow-sm h-[71px] w-[99px] xl:h-[120px] xl:w-[160px] xl:px-12 xl:py-8 max-sm:min-w-20 max-sm:w-[calc(50%-10px)] hover:no-underline">
                      <div className="text-xs text-center text-black xl:text-base max-sm:text-xs">
                        Personal Effects
                      </div>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className="px-4 pb-4 xl:px-8 xl:pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-8 xl:max-w-4xl xl:mx-auto">
                      {/* Business Assets Menu */}
                      <div className="bg-white rounded-md shadow-sm p-4 xl:p-6">
                        <h3 className="text-sm font-semibold mb-3 text-black xl:text-lg xl:mb-4">Business Assets</h3>
                        <ul className="space-y-2 xl:space-y-3">
                          {businessAssetsItems.map((item, index) => (
                            <li key={index} className="text-xs text-gray-700 hover:text-black cursor-pointer py-1 px-2 hover:bg-gray-50 rounded xl:text-sm xl:py-2 xl:px-3">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Personal Effects Menu */}
                      <div className="bg-white rounded-md shadow-sm p-4 xl:p-6">
                        <h3 className="text-sm font-semibold mb-3 text-black xl:text-lg xl:mb-4">Personal Effects</h3>
                        <ul className="space-y-2 xl:space-y-3">
                          {personalEffectsItems.map((item, index) => (
                            <li key={index} className="text-xs text-gray-700 hover:text-black cursor-pointer py-1 px-2 hover:bg-gray-50 rounded xl:text-sm xl:py-2 xl:px-3">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
