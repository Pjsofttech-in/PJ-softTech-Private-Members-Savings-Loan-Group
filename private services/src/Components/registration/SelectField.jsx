import FormField from "./FormField";

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
  required = false,
}) {
  const errorId = `${id}-error`;
  return (
    <FormField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
    >
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export default SelectField;
