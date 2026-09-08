function FormField({ id, label, value, onChange, error, type = "text", required = false, placeholder, min, step, inputMode, children, className = "" }) {
  const errorId = `${id}-error`;
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children || (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          min={min}
          step={step}
          inputMode={inputMode}
        />
      )}
      {error && <p className="field-error" id={errorId}>{error}</p>}
    </div>
  );
}

function SelectField({ id, label, value, onChange, error, options, required = false }) {
  const errorId = `${id}-error`;
  return (
    <FormField id={id} label={label} value={value} onChange={onChange} error={error} required={required}>
      <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}>
        <option value="">Select an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </FormField>
  );
}

function RadioField({ id, label, value, onChange, options, error, required = false }) {
  const errorId = `${id}-error`;
  return (
    <div className="field radio-field">
      <span className="label-text" id={`${id}-label`}>
        {label}
        {required && <span className="required"> *</span>}
      </span>
      <div className="radio-options" role="radiogroup" aria-labelledby={`${id}-label`} aria-describedby={error ? errorId : undefined}>
        {options.map((option) => (
          <label className="radio-option" key={option}>
            <input type="radio" name={id} value={option} checked={value === option} onChange={(event) => onChange(event.target.value)} required={required && !value} aria-invalid={Boolean(error)} />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="field-error" id={errorId}>{error}</p>}
    </div>
  );
}

function FormSection({ id, number, title, children, className = "" }) {
  return (
    <section id={id} className={`form-section ${className}`}>
      <div className="section-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export { FormField, SelectField, RadioField, FormSection };