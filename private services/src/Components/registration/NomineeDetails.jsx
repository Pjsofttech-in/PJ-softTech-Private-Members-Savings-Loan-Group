import FormField from "./FormField";
import FormSection from "./FormSection";

function NomineeDetails({ data, errors, updateField }) {
  const field = (name, label, props = {}) => (
    <FormField
      id={`nominee-${name}`}
      label={label}
      value={data[name]}
      onChange={(value) => updateField("nomineeDetails", name, value)}
      error={errors[name]}
      {...props}
    />
  );
  return (
    <FormSection number="03" title="Nominee details">
      <div className="field-grid">
        {field("name", "Nominee Name", { required: true })}
        {field("relationship", "Relationship with Member", { required: true })}
        {field("mobile", "Nominee Mobile Number", {
          type: "tel",
          inputMode: "numeric",
          required: true,
        })}
      </div>
    </FormSection>
  );
}

export default NomineeDetails;
