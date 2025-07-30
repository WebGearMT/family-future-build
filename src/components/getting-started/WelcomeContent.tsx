export const WelcomeContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Welcome to North Carolina!
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Start your journey here. This guide helps you settle in smoothly.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          How to Use This Page
        </h2>
        <p className="text-muted-foreground">
          Tap each tab above for key topics:
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Key Resources
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Moving Money
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Shipping Belongings
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Firearms Rules
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Valuables (Coins/Diamonds)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            SA Exit Requirements for Minors
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Quick Tips
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Tap tabs for details
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Bookmark this page
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Need Help? [Contact Us]
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Next Steps
        </h2>
        <ol className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">1.</span>
            Handle urgent tasks first
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">2.</span>
            Learn NC laws
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">3.</span>
            Join expat community
          </li>
        </ol>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-foreground font-medium">
          Welcome to your new home! 🏠
        </p>
      </div>
    </div>
  );
};