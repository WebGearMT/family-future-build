export const MovingContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Moving to North Carolina
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Comprehensive guide for relocating your belongings and settling into your new home state.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Before You Move
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Research moving companies and get quotes
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Create an inventory of valuable items
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Notify banks and financial institutions
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Update address with government agencies
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Transfer prescriptions and medical records
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Shipping and Customs
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Declare all items accurately on customs forms
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Keep receipts for valuable electronics
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Pack fragile items with extra protection
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consider insurance for high-value shipments
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          First Week Checklist
        </h2>
        <ol className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">1.</span>
            Apply for North Carolina driver's license
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">2.</span>
            Register to vote in your new district
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">3.</span>
            Open local bank account
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">4.</span>
            Register vehicle with NC DMV
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2 font-medium">5.</span>
            Find local healthcare providers
          </li>
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-sm text-muted-foreground">
            Keep important documents in carry-on luggage when flying. Make digital copies as backup.
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">
            📞 Need Help?
          </h3>
          <p className="text-sm text-muted-foreground">
            Contact local relocation services for personalized assistance with your move.
          </p>
        </div>
      </div>
    </div>
  );
};