export const RequirementsContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Requirements for Minors
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Important documentation and legal requirements when relocating to North Carolina with children.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Essential Documents
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Birth certificates (certified copies)
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Passport and visa documentation
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Medical records and vaccination history
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            School transcripts and academic records
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Custody agreements (if applicable)
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Legal Considerations
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Consent letters from non-traveling parent
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Notarized permission documents
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Proof of financial support
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Insurance coverage verification
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          School Enrollment
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Register with local school district
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Provide proof of residence
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Submit immunization records
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Schedule placement assessments
          </li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">
          ⚠️ Important Note
        </h3>
        <p className="text-sm text-muted-foreground">
          Processing times can vary. Start documentation collection early and consider consulting with an immigration attorney for complex cases.
        </p>
      </div>
    </div>
  );
};