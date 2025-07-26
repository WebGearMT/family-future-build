//"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/ui/app-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function ChatRoomDashboard() {
  const navigate = useNavigate();

  const handleCreateChatroom = () => {
    // TODO: Implement create chatroom functionality
    console.log("Create new chatroom clicked");
  };

  const handleTabClick = (roomType: string) => {
    navigate(`/chatrooms/${roomType}`);
  };

  return (
    <div className="relative w-full bg-indigo-50 min-h-[973px]">
      <AppHeader mode="simple" showMenu={true} />
      <div className="absolute text-3xl font-bold text-center text-black h-[76px] left-[298px] top-[175px] w-[685px] max-md:static max-md:px-6 max-md:pt-10 max-md:pb-5 max-md:w-full max-md:text-3xl max-sm:px-4 max-sm:pt-8 max-sm:pb-5 max-sm:text-2xl max-sm:leading-tight">
        Find the chatroom where your issue is discussed,
        <br />
        or start a new one!
      </div>
      <div
        className="flex absolute gap-2.5 justify-center items-center px-8 py-4 h-12 bg-blue-600 rounded-md cursor-pointer left-[526px] top-[311px] w-[260px] max-md:flex max-md:static max-md:mx-auto max-md:mt-0 max-md:mb-10 max-sm:mx-4 max-sm:mt-0 max-sm:mb-6 max-sm:w-[calc(100%_-_32px)] hover:bg-blue-700 transition-colors"
        onClick={handleCreateChatroom}
      >
        <div className="text-xl font-bold text-center text-white max-sm:text-lg whitespace-nowrap">
          + Create New Chatroom
        </div>
      </div>
      <div className="flex absolute flex-col gap-8 items-start h-[318px] left-[259px] top-[415px] w-[762px] max-md:static max-md:gap-5 max-md:px-6 max-md:py-0 max-md:w-full max-sm:gap-6 max-sm:px-4 max-sm:py-0">
        <div className="flex gap-8 items-center self-stretch max-md:flex-wrap max-md:gap-5 max-md:justify-center max-sm:flex-col max-sm:gap-6">
          <Card
            className="h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50"
            onClick={() => handleTabClick("shipping")}
          >
            <CardHeader className="flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5">
              <CardTitle className="text-xl font-bold text-center text-blue-600 max-sm:text-lg">
                All things Shipping
              </CardTitle>
              <CardDescription className="text-base text-center text-blue-600 max-sm:text-sm">
                Where shipping is discussed
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50"
            onClick={() => handleTabClick("schools")}
          >
            <CardHeader className="flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5">
              <CardTitle className="text-xl font-bold text-center text-blue-600 max-sm:text-lg">
                All things schools
              </CardTitle>
              <CardDescription className="text-base text-center text-blue-600 max-sm:text-sm">
                Where school enrollment is discussed.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50"
            onClick={() => handleTabClick("financial")}
          >
            <CardHeader className="flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5">
              <CardTitle className="text-xl font-bold text-center text-blue-600 max-sm:text-lg">
                Financial Advice
              </CardTitle>
              <CardDescription className="text-base text-center text-blue-600 max-sm:text-sm">
                Where we discuss finances
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex gap-8 items-center self-stretch max-md:flex-wrap max-md:gap-5 max-md:justify-center max-sm:flex-col max-sm:gap-6">
          <Card
            className="h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50"
            onClick={() => handleTabClick("legal")}
          >
            <CardHeader className="flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5">
              <CardTitle className="text-xl font-bold text-center text-blue-600 max-sm:text-lg">
                Legal tips
              </CardTitle>
              <CardDescription className="text-base text-center text-blue-600 max-sm:text-sm">
                Where we share legal advice
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50"
            onClick={() => handleTabClick("airports")}
          >
            <CardHeader className="flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5">
              <CardTitle className="text-xl font-bold text-center text-blue-600 max-sm:text-lg">
                Aeroports
              </CardTitle>
              <CardDescription className="text-base text-center text-blue-600 max-sm:text-sm">
                Tips for when you arrive at the aeroport
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="h-36 bg-white border-slate-300 shadow-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] w-[234px] max-md:min-w-[280px] max-md:w-[calc(50%_-_10px)] max-sm:w-full max-sm:min-w-[auto] hover:shadow-lg hover:border-blue-300 hover:bg-blue-50"
            onClick={() => handleTabClick("interviews")}
          >
            <CardHeader className="flex flex-col gap-1.5 items-center justify-center h-full p-8 max-sm:p-5">
              <CardTitle className="text-xl font-bold text-center text-blue-600 max-sm:text-lg">
                Interview tips
              </CardTitle>
              <CardDescription className="text-base text-center text-blue-600 max-sm:text-sm">
                Where we discuss best ideas for interviews
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomDashboard;
