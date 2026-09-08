import FormField from "./FormField";
import FormSection from "./FormSection";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import { ID_OPTIONS, YES_NO_OPTIONS } from "../../constants/formOptions";

function MemberDetails({ data, errors, updateField }) {
  const field = (name, label, props = {}) => (
    <FormField
      id={`member-${name}`}
      label={label}
      value={data[name]}
      onChange={(value) => updateField("memberDetails", name, value)}
      error={errors[name]}
      {...props}
    />
  );
  return (
    <FormSection number="01" title="Member details">
      <div className="field-grid member-details-grid">
        {field("fullName", "Full Name", { required: true })}
        {field("guardianName", "Father's / Spouse's Name", { required: true })}
        {field("dateOfBirth", "Date of Birth", {
          type: "date",
          required: true,
        })}
        {field("occupation", "Occupation", { required: true })}
        <FormField
          id="member-address"
          label="Residential Address"
          value={data.address}
          onChange={(value) => updateField("memberDetails", "address", value)}
          error={errors.address}
          className="span-two"
          required
        >
          <textarea
            id="member-address"
            name="member-address"
            value={data.address}
            onChange={(event) =>
              updateField("memberDetails", "address", event.target.value)
            }
            required
            aria-invalid={Boolean(errors.address)}
            aria-describedby={
              errors.address ? "member-address-error" : undefined
            }
          />
        </FormField>
        {field("mobile", "Mobile Number", {
          type: "tel",
          inputMode: "numeric",
          placeholder: "10-digit mobile number",
          required: true,
        })}
        {field("email", "Email ID", {
          type: "email",
          placeholder: "name@example.com",
        })}
        <SelectField
          id="identity-type"
          label="ID Proof Type"
          value={data.identityType}
          onChange={(value) =>
            updateField("memberDetails", "identityType", value)
          }
          error={errors.identityType}
          options={ID_OPTIONS}
          required
        />
        <FormField
          id="identity-number"
          label="ID Proof Number"
          value={data.identityNumber}
          onChange={(value) =>
            updateField("memberDetails", "identityNumber", value)
          }
          error={errors.identityNumber}
          required
        />
        <RadioField
          id="identity-attached"
          label="ID Proof Copy Attached"
          value={data.identityAttached}
          onChange={(value) =>
            updateField("memberDetails", "identityAttached", value)
          }
          options={YES_NO_OPTIONS}
          error={errors.identityAttached}
          required
        />
      </div>
    </FormSection>
  );
}

export default MemberDetails;
