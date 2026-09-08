function RadioField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
}) {
  const errorId = `${id}-error`;
  return (
    <div className="field radio-field">
      <span className="label-text" id={`${id}-label`}>
        {label}
        {required && <span className="required"> *</span>}
      </span>
      <div
        className="radio-options"
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        aria-describedby={error ? errorId : undefined}
      >
        {options.map((option) => (
          <label className="radio-option" key={option}>
            <input
              type="radio"
              name={id}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
              required={required && !value}
              aria-invalid={Boolean(error)}
            />
            {option}
          </label>
        ))}
      </div>
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

export default RadioField;
