export const KrugerCoinsContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Kruger Coins
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Information about transporting and declaring Krugerrand gold coins when moving to North Carolina.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Declaration Requirements
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Must declare monetary instruments over $10,000 (FinCEN 105)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Include current market value of gold coins
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Accurate count and description of coins
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Documentation of legal acquisition
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Transportation Guidelines
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Secure packaging and insurance for shipping
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consider professional precious metals transport services
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Carry-on restrictions for air travel
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Bank safe deposit box transfer options
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Tax Considerations
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Capital gains implications when selling
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Record keeping for cost basis determination
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            IRS reporting requirements for precious metals
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            State tax implications in North Carolina
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Storage and Security
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Bank safe deposit boxes in NC
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Private vault storage facilities
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Home safe installation considerations
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Insurance coverage for precious metals
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">
          🏆 Gold Standard Tip
        </h3>
        <p className="text-sm text-muted-foreground">
          Keep detailed records of purchase dates, prices, and certificates of authenticity. This documentation is crucial for tax purposes and insurance claims.
        </p>
      </div>
    </div>
  );
};