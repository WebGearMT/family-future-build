export const WeaponsContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Weapons
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Critical information regarding firearm regulations and restrictions for relocation to North Carolina.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Federal Import Requirements
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            ATF Form 6 (Application to Import Firearms)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Federal Firearms License (FFL) dealer required
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Detailed inventory and valuation of firearms
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Proof of legal ownership in country of origin
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          North Carolina State Laws
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Pistol purchase permit or concealed handgun permit required
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Background check through local sheriff's office
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Storage and transportation regulations
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Registration requirements for certain firearms
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Prohibited Items
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Fully automatic weapons (manufactured after 1986)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Short-barreled rifles and shotguns (without proper permits)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Certain ammunition types and accessories
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Weapons on banned import lists
          </li>
        </ul>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <h3 className="font-semibold text-destructive mb-2">
          🚫 Critical Warning
        </h3>
        <p className="text-sm text-destructive/80">
          Firearm importation is heavily regulated. Consult with a qualified attorney specializing in firearms law and work with a licensed FFL dealer. Violations can result in serious criminal charges.
        </p>
      </div>
    </div>
  );
};