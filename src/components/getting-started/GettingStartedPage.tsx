import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppHeader from "@/components/ui/app-header";
import { TabNavigation } from "./TabNavigation";
import { WelcomeContent } from "./WelcomeContent";
import { RequirementsContent } from "./RequirementsContent";
import { MovingContent } from "./MovingContent";
import { SAExitContent } from "./SAExitContent";
import { MovingFundsContent } from "./MovingFundsContent";
import { MovingAssetsContent } from "./MovingAssetsContent";
import { WeaponsContent } from "./WeaponsContent";
import { KrugerCoinsContent } from "./KrugerCoinsContent";
import { InvestmentDiamondsContent } from "./InvestmentDiamondsContent";

const tabs = [
  { id: "welcome", label: "Welcome" },
  { id: "moving", label: "Moving" },
  { id: "sa-exit", label: "SA Exit Requirements for minors." },
  { id: "moving-funds", label: "Moving Funds" },
  { id: "moving-assets", label: "Moving Assets" },
  { id: "weapons", label: "Weapons" },
  { id: "kruger-coins", label: "Kruger Coins" },
  { id: "investment-diamonds", label: "Investment Diamonds" },
];

export const GettingStartedPage = () => {
  const [activeTab, setActiveTab] = useState("welcome");
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "welcome":
        return <WelcomeContent />;
      case "moving":
        return <MovingContent />;
      case "sa-exit":
        return <SAExitContent />;
      case "moving-funds":
        return <MovingFundsContent />;
      case "moving-assets":
        return <MovingAssetsContent />;
      case "weapons":
        return <WeaponsContent />;
      case "kruger-coins":
        return <KrugerCoinsContent />;
      case "investment-diamonds":
        return <InvestmentDiamondsContent />;
      default:
        return <WelcomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        mode={isAuthenticated ? "dashboard" : "welcome"}
        user={user}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignOut={handleSignOut}
        showMenu={false}
      />

      {/* Page Title */}
      <div className="bg-white px-4 py-3 border-b border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Getting Started</h2>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content Area */}
      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};
