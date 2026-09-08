import {
  FormField,
  FormSection,
  RadioField,
  SelectField,
} from "./RegistrationFields";
import { ID_OPTIONS, YES_NO_OPTIONS } from "../../constants/formOptions";
import { formatIndianCurrency } from "../../utils/formHelpers";

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
    <FormSection id="member-details" number="01" title="Member details">
      <div className="field-grid member-details-grid">
        {field("fullName", "Full Name", { required: true })}
        {field("guardianName", "Father's / Spouse's Name", { required: true })}
        {field("dateOfBirth", "Date of Birth", { type: "date", required: true })}
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
            aria-describedby={errors.address ? "member-address-error" : undefined}
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
          onChange={(value) => updateField("memberDetails", "identityType", value)}
          error={errors.identityType}
          options={ID_OPTIONS}
          required
        />
        {field("identityNumber", "ID Proof Number", { required: true })}
        <RadioField
          id="identity-attached"
          label="ID Proof Copy Attached"
          value={data.identityAttached}
          onChange={(value) => updateField("memberDetails", "identityAttached", value)}
          options={YES_NO_OPTIONS}
          error={errors.identityAttached}
          required
        />
      </div>
    </FormSection>
  );
}

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
    <FormSection id="membership-details" number="02" title="Membership details">
      <div className="field-grid">
        {field("registrationNumber", "Member Registration No.", { required: true })}
        {field("joiningDate", "Date of Joining", { type: "date", required: true })}
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
          {data.shares || 0} shares x {formatIndianCurrency(data.shareValue)}
        </small>
      </div>
    </FormSection>
  );
}

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
    <FormSection id="nominee-details" number="03" title="Nominee details">
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

function MemberDeclaration({ data, errors, updateField }) {
  return (
    <FormSection id="member-declaration" number="04" title="Member declaration">
      <div className="declaration-copy">
        I hereby declare that the information provided above is true and
        correct. I agree to follow all rules and regulations of the Private
        Members Savings &amp; Loan Group relating to membership, shares,
        savings, loans, guarantors, repayments, and withdrawal/exit.
      </div>
      <div className="field-grid">
        <FormField
          id="declaration-member-name"
          label="Member Name"
          value={data.memberName}
          onChange={(value) => updateField("declaration", "memberName", value)}
          error={errors.memberName}
          required
        />
        <FormField
          id="declaration-date"
          label="Date"
          value={data.date}
          onChange={(value) => updateField("declaration", "date", value)}
          error={errors.date}
          type="date"
          required
        />
      </div>
      <label className={`agreement ${errors.agreed ? "has-error" : ""}`}>
        <input
          type="checkbox"
          checked={data.agreed}
          onChange={(event) => updateField("declaration", "agreed", event.target.checked)}
          aria-invalid={Boolean(errors.agreed)}
          aria-describedby={errors.agreed ? "declaration-agreed-error" : undefined}
        />
        <span>I agree to the above declaration.</span>
      </label>
      {errors.agreed && (
        <p className="field-error" id="declaration-agreed-error">
          {errors.agreed}
        </p>
      )}
    </FormSection>
  );
}

function WitnessCard({ number, data, errors, updateField }) {
  const prefix = `witness${number}`;
  const fields = [
    { name: "fullName", label: "Full Name", required: true },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "tel",
      inputMode: "numeric",
      placeholder: "10-digit mobile number",
      required: true,
    },
    { name: "idType", label: "ID Proof Type", type: "select", options: ID_OPTIONS, required: true },
    { name: "idNumber", label: "ID Proof Number", required: true },
    { name: "address", label: "Address", type: "textarea", className: "span-two", required: true },
  ];

  const renderField = ({ name, label, type = "text", options, ...props }) => {
    const id = `${prefix}-${name}`;
    const onChange = (value) => updateField(prefix, name, value);
    if (type === "select") {
      return (
        <SelectField
          key={name}
          id={id}
          label={label}
          value={data[name]}
          onChange={onChange}
          error={errors[name]}
          options={options}
          {...props}
        />
      );
    }
    if (type === "textarea") {
      return (
        <FormField
          key={name}
          id={id}
          label={label}
          value={data[name]}
          onChange={onChange}
          error={errors[name]}
          {...props}
        >
          <textarea
            id={id}
            name={id}
            value={data[name]}
            onChange={(event) => onChange(event.target.value)}
            required={props.required}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `${id}-error` : undefined}
          />
        </FormField>
      );
    }
    return (
      <FormField
        key={name}
        id={id}
        label={label}
        value={data[name]}
        onChange={onChange}
        error={errors[name]}
        type={type}
        {...props}
      />
    );
  };

  return (
    <div className="witness-card">
      <div className="witness-title">
        <span>0{number}</span>
        <h3>Witness {number}</h3>
      </div>
      <div className="field-grid">{fields.map(renderField)}</div>
    </div>
  );
}

function WitnessDetails({ form, errors, updateField }) {
  return (
    <FormSection id="witness-details" number="05" title="Witness details">
      <div className="witness-grid">
        <WitnessCard number={1} data={form.witness1} errors={errors.witness1} updateField={updateField} />
        <WitnessCard number={2} data={form.witness2} errors={errors.witness2} updateField={updateField} />
      </div>
    </FormSection>
  );
}

export {
  MemberDetails,
  MembershipDetails,
  NomineeDetails,
  MemberDeclaration,
  WitnessDetails,
};