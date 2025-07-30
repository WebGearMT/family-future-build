export const MovingFundsContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Moving Funds
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Guidelines and regulations for transferring financial assets when relocating to North Carolina.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Bank Account Transfer
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Contact your current bank about international transfers
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Research US banking options and requirements
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Understand exchange rates and transfer fees
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consider keeping some funds in original currency initially
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          US Tax Implications
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Report foreign bank accounts (FBAR requirements)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Understand FATCA reporting obligations
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consider tax implications of currency conversion
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consult with a tax professional familiar with expat issues
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Investment Transfers
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Review investment portfolio for international accessibility
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Understand US securities regulations
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consider tax-efficient transfer strategies
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Research US-based investment options
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">
          💡 Pro Tip
        </h3>
        <p className="text-sm text-muted-foreground">
          Start the fund transfer process early as it can take several weeks. Keep detailed records of all transactions for tax purposes.
        </p>
      </div>
    </div>
  );
};