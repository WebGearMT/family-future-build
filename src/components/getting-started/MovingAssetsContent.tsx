export const MovingAssetsContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Moving Assets
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Guide for transferring physical and digital assets when relocating to North Carolina.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Physical Assets
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Household goods and personal belongings
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Vehicles (consider import regulations and costs)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Artwork and collectibles
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Electronics and appliances (voltage considerations)
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Property and Real Estate
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Decide whether to sell or retain foreign property
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Understand US tax implications of foreign property ownership
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consider property management options if retaining
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Research North Carolina real estate market
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Business Assets
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Business ownership and equity transfers
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Intellectual property rights and patents
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Professional licenses and certifications
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Equipment and machinery relocation
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">
          📋 Important Note
        </h3>
        <p className="text-sm text-muted-foreground">
          Create a comprehensive inventory of all assets and their values. This documentation will be crucial for customs, insurance, and tax purposes.
        </p>
      </div>
    </div>
  );
};