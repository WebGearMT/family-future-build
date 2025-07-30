export const SAExitContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          SA Exit Requirements for Minors
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Comprehensive guide to ensure compliance with South African exit requirements when traveling with children.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Required Documentation
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Unabridged birth certificate (certified copy)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Valid passport with at least 2 blank pages
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consent affidavit from non-traveling parent/guardian
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Court order (if applicable for custody arrangements)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Death certificate (if one parent is deceased)
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Consent Affidavit Requirements
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Must be notarized or commissioned by a police officer
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Include full details of the trip (destination, duration, purpose)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Contact details of accompanying adult
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Original document required (not photocopies)
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">
          ⚠️ Critical Notice
        </h3>
        <p className="text-sm text-muted-foreground">
          Non-compliance with these requirements may result in denied boarding or entry. Always verify current requirements with the relevant authorities before travel.
        </p>
      </div>
    </div>
  );
};