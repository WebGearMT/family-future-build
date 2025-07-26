import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/ui/app-header";
import SignIn from "@/components/auth/SignIn";

function SignInPage() {
  const navigate = useNavigate();

  const handleSwitchToSignUp = () => {
    navigate("/signup");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative w-full bg-indigo-50 min-h-screen">
      <AppHeader mode="simple" showMenu={false} showNavButtons={false} />

      <div className="flex flex-col items-center px-4 pt-12 pb-12">
        <div className="w-full max-w-md">
          <SignIn
            onSwitchToSignUp={handleSwitchToSignUp}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
