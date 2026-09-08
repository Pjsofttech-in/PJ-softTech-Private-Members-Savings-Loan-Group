function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
  min,
  step,
  inputMode,
  children,
  className = "",
}) {
  const errorId = `${id}-error`;
  const common = {
    id,
    name: id,
    value,
    onChange: (event) => onChange(event.target.value),
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    placeholder,
    min,
    step,
    inputMode,
  };
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children || <input type={type} {...common} />}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
