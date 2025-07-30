import React from 'react';
import { useAuth, useAuthNavigation } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SignIn from './SignIn';
import AppHeader from "@/components/ui/app-header";

interface PrivateRouteProps {
  children: React.ReactNode;
}


const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { 
		isAuthenticated, 
		user, 
		handleSignIn, 
		handleSignUp, 
		handleSignOut, 
		handleSwitchToSignUp 
	} = useAuthNavigation();
	
	/*
	const { user, isAuthenticated, signOut } = useAuth();
	const navigate = useNavigate();
	
  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    signOut();
    
  }
  
  const handleSwitchToSignUp = () => {
    navigate("/signup");
  };
  */
  if (!isAuthenticated) {
    return (
    
    	<div className="relative w-full bg-indigo-50 min-h-screen">
      <AppHeader
        mode={isAuthenticated ? "dashboard" : "welcome"}
        user={user}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
      />

      <div className="flex flex-row items-center px-4 pt-12 pb-12">
        <div className="flex flex-col items-center w-full">
          <SignIn
            onSwitchToSignUp={handleSwitchToSignUp}
          />
        </div>
      </div>
    </div>
    
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
