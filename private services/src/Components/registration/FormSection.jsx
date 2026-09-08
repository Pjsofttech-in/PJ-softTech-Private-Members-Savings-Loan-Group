function FormSection({ number, title, children, className = "" }) {
  return (
    <section className={`form-section ${className}`}>
      <div className="section-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default FormSection;
