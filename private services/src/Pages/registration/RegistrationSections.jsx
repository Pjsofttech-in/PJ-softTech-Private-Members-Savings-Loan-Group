import {
  FormField,
  FormSection,
  RadioField,
  SelectField,
} from "./RegistrationFields";
import { ID_OPTIONS, PAYMENT_METHODS, YES_NO_OPTIONS, REGISTRATION_FEE } from "../../constants/formOptions";
import { formatIndianCurrency } from "../../utils/formHelpers";

function readPdfUpload(event, onUpload) {
  const file = event.target.files?.[0];
  if (!file || file.type !== "application/pdf") {
    onUpload(null);
    return;
  }
  const reader = new FileReader();
  reader.onload = () =>
    onUpload({
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: reader.result,
    });
  reader.readAsDataURL(file);
}

function PdfUploadField({ id, label, value, error, onUpload, description }) {
  return (
    <FormField
      id={id}
      label={label}
      value={value?.name || ""}
      onChange={() => {}}
      error={error}
      className="span-two proof-upload-field"
      required
    >
      <input
        id={id}
        name={id}
        type="file"
        accept="application/pdf,.pdf"
        onChange={(event) => readPdfUpload(event, onUpload)}
        required={!value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <small>PDF only. {value ? `Attached: ${value.name}` : description}</small>
    </FormField>
  );
}

function MemberDetails({ data, errors, updateField, active }) {
  const handleProofUpload = (event) => {
    readPdfUpload(event, (file) => updateField("memberDetails", "identityProof", file));
  };

  const fields = [
    ["fullName", "Full Name", { required: true }],
    ["guardianName", "Father's / Spouse's Name", { required: true }],
    ["dateOfBirth", "Date of Birth", { type: "date", required: true }],
    ["occupation", "Occupation", { required: true }],
    ["mobile", "Mobile Number", {
      type: "tel",
      inputMode: "numeric",
      placeholder: "10-digit mobile number",
      required: true,
    }],
    ["email", "Email ID", { type: "email", placeholder: "name@example.com" }],
    ["identityNumber", "ID Proof Number", { required: true }],
  ];

  return (
    <FormSection id="member-details" number="01" title="Member details" active={active}>
      <div className="field-grid member-details-grid">
        {fields.map(([name, label, props]) => (
          <FormField
            key={name}
            id={`member-${name}`}
            label={label}
            value={data[name]}
            onChange={(value) => updateField("memberDetails", name, value)}
            error={errors[name]}
            {...props}
          />
        ))}
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
            onChange={(event) => updateField("memberDetails", "address", event.target.value)}
            required
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "member-address-error" : undefined}
          />
        </FormField>
        <PdfUploadField
          id="member-address-proof"
          label="Upload Address Proof PDF"
          value={data.addressProof}
          error={errors.addressProof}
          onUpload={(file) => updateField("memberDetails", "addressProof", file)}
          description="Attach the member residential address proof copy."
        />
        <SelectField
          id="identity-type"
          label="ID Proof Type"
          value={data.identityType}
          onChange={(value) => updateField("memberDetails", "identityType", value)}
          error={errors.identityType}
          options={ID_OPTIONS}
          required
        />
        <RadioField
          id="identity-attached"
          label="ID Proof Copy Attached"
          value={data.identityAttached}
          onChange={(value) => updateField("memberDetails", "identityAttached", value)}
          options={YES_NO_OPTIONS}
          error={errors.identityAttached}
          required
        />
        <FormField
          id="member-identity-proof"
          label="Upload ID Proof PDF"
          value={data.identityProof?.name || ""}
          onChange={() => {}}
          error={errors.identityProof}
          className="span-two proof-upload-field"
          required
        >
          <input
            id="member-identity-proof"
            name="member-identity-proof"
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleProofUpload}
            required={!data.identityProof}
            aria-invalid={Boolean(errors.identityProof)}
            aria-describedby={errors.identityProof ? "member-identity-proof-error" : undefined}
          />
          <small>PDF only. {data.identityProof ? `Attached: ${data.identityProof.name}` : "Attach the member identity proof copy."}</small>
        </FormField>
      </div>
    </FormSection>
  );
}

function MembershipDetails({ data, errors, updateField, totalShareValue, active }) {
  const fields = [
    ["registrationNumber", "Member Registration No.", { required: true }],
    ["joiningDate", "Date of Joining", { type: "date", required: true }],
    ["shares", "Number of Shares", { type: "number", min: "1", step: "1", required: true }],
    ["shareValue", "Share Value", {
      type: "number",
      min: "0.01",
      step: "0.01",
      inputMode: "decimal",
      className: "currency-field",
      required: true,
    }],
    ["monthlySaving", "Monthly Saving Amount", {
      type: "number",
      min: "0.01",
      step: "0.01",
      inputMode: "decimal",
      className: "currency-field",
      required: true,
    }],
  ];

  return (
    <FormSection id="membership-details" number="02" title="Membership details" active={active}>
      <div className="field-grid">
        {fields.map(([name, label, props]) => (
          <FormField
            key={name}
            id={`membership-${name}`}
            label={label}
            value={data[name]}
            onChange={(value) => updateField("membershipDetails", name, value)}
            error={errors[name]}
            {...props}
          />
        ))}
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

function NomineeDetails({ data, errors, updateField, active }) {
  const fields = [
    ["name", "Nominee Name", { required: true }],
    ["relationship", "Relationship with Member", { required: true }],
    ["mobile", "Nominee Mobile Number", {
      type: "tel",
      inputMode: "numeric",
      required: true,
    }],
  ];

  return (
    <FormSection id="nominee-details" number="03" title="Nominee details" active={active}>
      <div className="field-grid">
        {fields.map(([name, label, props]) => (
          <FormField
            key={name}
            id={`nominee-${name}`}
            label={label}
            value={data[name]}
            onChange={(value) => updateField("nomineeDetails", name, value)}
            error={errors[name]}
            {...props}
          />
        ))}
      </div>
    </FormSection>
  );
}

function MemberDeclaration({ data, errors, updateField, active }) {
  return (
    <FormSection id="member-declaration" number="04" title="Member declaration" active={active}>
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
    const baseProps = { key: name, id, label, value: data[name], onChange, error: errors[name], ...props };

    if (type === "select") return <SelectField {...baseProps} options={options} />;
    if (type === "textarea")
      return (
        <FormField {...baseProps}>
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

    return <FormField {...baseProps} type={type} />;
  };

  return (
    <div className="witness-card">
      <div className="witness-title">
        <span>0{number}</span>
        <h3>Witness {number}</h3>
      </div>
      <div className="field-grid">
        {fields.map(renderField)}
        <PdfUploadField
          id={`${prefix}-address-proof`}
          label="Upload Address Proof PDF"
          value={data.addressProof}
          error={errors.addressProof}
          onUpload={(file) => updateField(prefix, "addressProof", file)}
          description="Attach the witness residential address proof copy."
        />
      </div>
    </div>
  );
}

function WitnessDetails({ form, errors, updateField, active }) {
  return (
    <FormSection id="witness-details" number="05" title="Witness details" active={active}>
      <div className="witness-grid">
        <WitnessCard number={1} data={form.witness1} errors={errors.witness1} updateField={updateField} />
        <WitnessCard number={2} data={form.witness2} errors={errors.witness2} updateField={updateField} />
      </div>
    </FormSection>
  );
}

function PaymentDetails({ data, errors, updateField, active }) {
  return (
    <FormSection id="payment-details" number="06" title="Registration payment" active={active}>
      <div className="payment-panel">
        <div>
          <span className="payment-panel-label">One-time registration fee</span>
          <strong>{formatIndianCurrency(REGISTRATION_FEE)}</strong>
          <small>Record the payment method used for this new member.</small>
        </div>
        <label className="payment-panel-field" htmlFor="registration-payment-method">
          Payment method <span className="required">*</span>
          <select
            id="registration-payment-method"
            value={data.paymentMethod}
            onChange={(event) => updateField("paymentDetails", "paymentMethod", event.target.value)}
            aria-invalid={Boolean(errors.paymentMethod)}
            aria-describedby={errors.paymentMethod ? "registration-payment-method-error" : undefined}
            required
          >
            <option value="">Select payment method</option>
            {PAYMENT_METHODS.map((method) => <option key={method} value={method}>{method}</option>)}
          </select>
          {errors.paymentMethod && <small className="payment-method-error" id="registration-payment-method-error">{errors.paymentMethod}</small>}
        </label>
        <button type="submit" className="button primary payment-button">
          Complete payment <span>→</span>
        </button>
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
  PaymentDetails,
};