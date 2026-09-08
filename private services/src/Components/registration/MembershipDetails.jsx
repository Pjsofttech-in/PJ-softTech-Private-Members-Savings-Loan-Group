import FormSection from "./FormSection";
import FormField from "./FormField";
import { formatIndianCurrency } from "../../utils/formHelpers";

function MembershipDetails({ data, errors, updateField, totalShareValue }) {
  const field = (name, label, props = {}) => (
    <FormField
      id={`membership-${name}`}
      label={label}
      value={data[name]}
      onChange={(value) => updateField("membershipDetails", name, value)}
      error={errors[name]}
      {...props}
    />
  );
  return (
    <FormSection number="02" title="Membership details">
      <div className="field-grid">
        {field("registrationNumber", "Member Registration No.", {
          required: true,
        })}
        {field("joiningDate", "Date of Joining", {
          type: "date",
          required: true,
        })}
        {field("shares", "Number of Shares", {
          type: "number",
          min: "1",
          step: "1",
          required: true,
        })}
        {field("shareValue", "Share Value", {
          type: "number",
          min: "0.01",
          step: "0.01",
          inputMode: "decimal",
          className: "currency-field",
          required: true,
        })}
        {field("monthlySaving", "Monthly Saving Amount", {
          type: "number",
          min: "0.01",
          step: "0.01",
          inputMode: "decimal",
          className: "currency-field",
          required: true,
        })}
      </div>
      <div className="calculation">
        <span>Total share value</span>
        <strong>{formatIndianCurrency(totalShareValue)}</strong>
        <small>
          {data.shares || 0} shares × {formatIndianCurrency(data.shareValue)}
        </small>
      </div>
    </FormSection>
  );
}

export default MembershipDetails;
