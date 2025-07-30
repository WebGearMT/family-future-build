import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="w-full border-b border-border bg-card relative">
      <div className="flex overflow-x-auto scrollbar-hide relative">
        {/* Left blur gradient for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none xl:hidden" />
        
        {/* Right blur gradient for mobile */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none xl:hidden" />
        
        <div className="flex xl:flex-wrap xl:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-shrink-0 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap xl:whitespace-normal",
                "hover:bg-secondary/50",
                activeTab === tab.id
                  ? "border-tab-active text-tab-active-foreground bg-tab-active"
                  : "border-transparent text-tab-inactive-foreground hover:text-foreground hover:border-tab-hover"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};