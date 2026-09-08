import FormField from "./FormField";
import FormSection from "./FormSection";
import RadioField from "./RadioField";
import { YES_NO_OPTIONS } from "../../constants/formOptions";

function OfficeUseOnly({ data, updateField }) {
  const field = (name, label, props = {}) => (
    <FormField
      id={`office-${name}`}
      label={label}
      value={data[name]}
      onChange={(value) => updateField("officeUse", name, value)}
      {...props}
    />
  );
  return (
    <FormSection number="06" title="Office use only" className="office-section">
      <p className="office-note">Administrative review and approval record</p>
      <div className="field-grid">
        {field("receivedDate", "Application Received Date", { type: "date" })}
        <RadioField
          id="office-documents-verified"
          label="Documents Verified"
          value={data.documentsVerified}
          onChange={(value) =>
            updateField("officeUse", "documentsVerified", value)
          }
          options={YES_NO_OPTIONS}
        />
        <RadioField
          id="office-approved"
          label="Membership Approved"
          value={data.approved}
          onChange={(value) => updateField("officeUse", "approved", value)}
          options={YES_NO_OPTIONS}
        />
        {field("registerNumber", "Membership Register Entry No.")}
        {field("approvedBy", "Approved By")}
        {field("presidentSignature", "President Signature")}
        {field("secretarySignature", "Secretary Signature")}
      </div>
    </FormSection>
  );
}

export default OfficeUseOnly;
