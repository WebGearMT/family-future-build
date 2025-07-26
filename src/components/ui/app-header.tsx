import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut, MessageCircleQuestion, BookOpen, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  mode?: "welcome" | "dashboard" | "simple";
  user?: any;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
  showMenu?: boolean;
  showNavButtons?: boolean;
}

const AppHeader = ({
  mode = "welcome",
  user,
  onSignIn,
  onSignUp,
  onSignOut,
  showMenu = false,
  showNavButtons = false,
}: AppHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="brand flex items-center mr-4 transition duration-300 ease-in-out transform hover:scale-110"
            >
              <img
                src="/images/logo.jpeg"
                alt="Gotta Be NC Logo"
                className="h-10 w-auto mr-3"
              />
              <h1 className="text-2xl font-bold text-gray-900 hidden xl:block">
                <Link to="/">GOTTA BE NC</Link>
              </h1>
            </Link>
          </div>

          {showNavButtons && (
            <div className="flex items-center">
              <Button
                variant="link"
                onClick={() => navigate("/FAQ")}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-400 transition-colors border-blue-300"
              >
                <MessageCircleQuestion className="h-4 w-4" />
                <span>FAQ</span>
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/GettingStarted")}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-400 transition-colors border-blue-300"
              >
                <MessageCircleQuestion className="h-4 w-4" />
                <span>Getting Started</span>
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/resources")}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-400 transition-colors border-blue-300"
              >
                <BookOpen className="h-4 w-4" />
                <span>NC Resources</span>
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/shipping")}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-400 transition-colors border-blue-300"
              >
                <BookOpen className="h-4 w-4" />
                <span>Shipping</span>
              </Button>
            </div>
          )}

          {mode === "welcome" && onSignIn && onSignUp && (
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={onSignIn}
                className="hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Button>
              <Button
                onClick={onSignUp}
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Button>
            </div>
          )}

          {mode === "dashboard" && user && onSignOut && (
            <div className="flex items-center space-x-4">
              <span className="text-blue-900">Welcome, {user.name}</span>
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Button
                variant="outline"
                onClick={onSignOut}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          )}

          {mode === "simple" && (
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 hover:bg-blue-200 hover:border-blue-400 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
