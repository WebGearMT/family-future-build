import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/ui/app-header";
import SignUp from "@/components/auth/SignUp";

function SignUpPage() {
  const navigate = useNavigate();

  const handleSwitchToSignIn = () => {
    navigate("/signin");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative w-full bg-indigo-50 min-h-screen">
      <AppHeader mode="simple" showMenu={false} showNavButtons={false} />

      <div className="flex flex-col items-center px-4 pt-12 pb-12">
        <div className="w-full max-w-md">
          <SignUp
            onSwitchToSignIn={handleSwitchToSignIn}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
