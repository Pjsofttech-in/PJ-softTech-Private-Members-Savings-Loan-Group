import FormField from "./FormField";
import FormSection from "./FormSection";
import SelectField from "./SelectField";
import { ID_OPTIONS } from "../../constants/formOptions";

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
    {
      name: "idType",
      label: "ID Proof Type",
      type: "select",
      options: ID_OPTIONS,
      required: true,
    },
    { name: "idNumber", label: "ID Proof Number", required: true },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      className: "span-two",
      required: true,
    },
  ];

  const renderField = ({ name, label, type = "text", options, ...props }) => {
    const id = `${prefix}-${name}`;
    const onChange = (value) => updateField(prefix, name, value);
    if (type === "select")
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
    if (type === "textarea")
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
    return (
      <FormField
        key={name}
        id={id}
        label={label}
        value={data[name]}
        onChange={onChange}
        error={errors[name]}
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
    <FormSection number="05" title="Witness details">
      <div className="witness-grid">
        <WitnessCard
          number={1}
          data={form.witness1}
          errors={errors.witness1}
          updateField={updateField}
        />
        <WitnessCard
          number={2}
          data={form.witness2}
          errors={errors.witness2}
          updateField={updateField}
        />
      </div>
    </FormSection>
  );
}

export default WitnessDetails;
