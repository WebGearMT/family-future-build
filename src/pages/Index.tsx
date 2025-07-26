import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppHeader from "@/components/ui/app-header";
import {
  Luggage,
  MessageSquare,
  MessageCircle,
  Ticket,
  HelpCircle,
  BookOpen,
  Ship,
  User,
} from "lucide-react";

function Index() {
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
  };
  return (
    <div className="relative w-full bg-indigo-50 min-h-[973px] max-sm:h-screen">
      <AppHeader
        mode={isAuthenticated ? "dashboard" : "welcome"}
        user={user}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
        showMenu={false}
      />
      <div className="flex flex-col gap-8 items-center px-12 pt-24 pb-12 max-md:gap-6 max-md:px-6 max-md:pt-16 max-md:pb-6 max-sm:gap-5 max-sm:px-4 max-sm:pt-10 max-sm:pb-6">
        <div className="text-3xl font-bold text-center text-black h-[38px] w-[643px] max-md:w-auto max-md:h-auto max-md:text-3xl max-sm:text-2xl max-sm:leading-tight">
          Get the Assistance You Need for the Big Move!
        </div>
        <div className="h-12 text-xl font-bold text-center text-slate-600 w-[739px] max-md:w-auto max-md:h-auto max-md:text-lg max-sm:text-base max-sm:leading-tight">
          Whether it means asking for help, getting a cost-saving voucher, or
          just information,
          <br />
          we got you covered!
        </div>
        {/* Mobile button - appears above Getting Started tab on mobile only */}
        <div className="sm:hidden flex shrink-0 gap-2.5 justify-center items-center px-8 py-4 h-12 bg-blue-600 rounded-md cursor-pointer w-full max-w-[280px]">
          <div className="text-xl font-bold text-center text-white">
            Get Started Today!
          </div>
        </div>
        <Link to="/commingSoon">
        <div className="flex flex-col shrink-0 gap-2.5 items-start px-3.5 py-5 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-1.5 items-center w-52 max-sm:w-full">
            <div>
              <Luggage className="w-6 h-6 text-blue-600" />
            </div>
            <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
              Getting Started
            </div>
            <div className="self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full">
              Your first steps to take to prepare for the move
            </div>
          </div>
        </div>
        </Link>
        <div className="flex flex-col gap-8 items-start h-[318px] w-[762px] max-md:w-full max-md:max-w-[762px]">
          <div className="flex gap-8 items-center self-stretch max-md:flex-wrap max-md:gap-5 max-md:justify-center max-sm:flex-col max-sm:gap-4 max-sm:items-center">
            <Link to="/notice-boards">
              <div className="flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full">
                  <div>
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
                    Notice Boards
                  </div>
                  <div className="self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full">
                    Find an agent, a job,
                    <br />
                    or even a place to sell!
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/ChatRoomDashboard">
              <div className="flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full">
                  <div>
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
                    Community Chat
                  </div>
                  <div className="self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full">
                    Need more help?
                    <br />
                    talk to the community.
                  </div>
                </div>
              </div>
            </Link>
            <Link to="vouchers-coupons-page">
            <div className="flex flex-col gap-2.5 items-center px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-1.5 items-center w-52 max-sm:w-full">
                <Ticket className="w-8 h-8 text-blue-600" />
                <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
                  Coupons &amp; Vouchers
                </div>
                <div className="self-stretch text-base font-medium text-center text-blue-600">
                  Need a discount? Look no further!
                </div>
              </div>
            </div>
            </Link>
          </div>
          <div className="flex gap-8 items-center self-stretch max-md:flex-wrap max-md:gap-5 max-md:justify-center max-sm:flex-col max-sm:gap-4 max-sm:items-center">
            <Link to="/FAQ">
              <div className="flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full">
                  <div>
                    <HelpCircle className="w-[18px] h-[18px] text-blue-600" />
                  </div>
                  <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
                    FAQ
                  </div>
                  <div className="self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full">
                    Got a question? The answer might be here.
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/resources">
              <div className="flex flex-col gap-2.5 items-start px-8 py-6 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-1.5 items-center w-[171px] max-sm:w-full">
                  <div>
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
                    Resources
                  </div>
                  <div className="self-stretch text-base font-medium text-center text-blue-600 max-sm:w-full">
                    All the info you need about NC in one place.
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-2.5 items-center px-3.5 py-5 h-36 bg-white rounded-md border border-solid shadow-sm border-slate-300 w-[234px] max-md:w-[220px] max-sm:max-w-full max-sm:w-[280px] cursor-pointer hover:shadow-lg transition-shadow">
              <Link to="/shipping">
              <div className="flex flex-col gap-1.5 items-center w-52 max-sm:w-full">
                <Ship className="w-6 h-6 text-blue-600" />
                <div className="self-stretch text-xl font-extrabold text-center text-blue-600">
                  Shipping
                </div>
                <div className="self-stretch text-base font-medium text-center text-blue-600">
                  Get what you need to get your possessions to NC.
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Desktop button - hidden on mobile */}
        <div className="hidden sm:flex shrink-0 gap-2.5 justify-center items-center px-8 py-4 h-12 bg-blue-600 rounded-md cursor-pointer w-[240px]">
          <div className="text-xl font-bold text-center text-white">
            Get Started Today!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
