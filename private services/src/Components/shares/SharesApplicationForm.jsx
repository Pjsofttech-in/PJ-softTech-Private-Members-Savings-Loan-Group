import { useState } from "react";
import Footer from "../Footer";
import { formatIndianCurrency } from "../../utils/formHelpers";
import { saveSharesApplication } from "../../services/sharesApplicationService";
import { ApplicantDetails, ShareDetails, ShareDeclaration } from "./SharesApplicationSections";
import { SHARE_PRICE } from "./sharesConstants";

const sections = ["Applicant", "Share details", "Declaration"];
const sectionComponents = [
  ["applicant", ApplicantDetails],
  ["shares", ShareDetails],
  ["declaration", ShareDeclaration],
];
const requiredFields = {
  applicant: [["registrationNumber", "Member registration number"], ["fullName", "Member name"], ["mobile", "Mobile number"], ["address", "Member address"], ["applicationDate", "Application date"]],
  shares: [["numberOfShares", "Number of shares"], ["monthlySaving", "Monthly saving amount"], ["paymentMethod", "Payment method"]],
  declaration: [["name", "Applicant name"], ["date", "Declaration date"]],
};
const initialForm = {
  applicant: { registrationNumber: "", fullName: "", mobile: "", address: "", applicationDate: "" },
  shares: { numberOfShares: "", monthlySaving: "", paymentMethod: "" },
  declaration: { name: "", date: "", agreed: false },
};

function getTotalShareValue(numberOfShares) {
  return (Number(numberOfShares) || 0) * SHARE_PRICE;
}

function validateForm(form) {
  const errors = {};
  const required = (section, fields) => {
    fields.forEach(([name, label]) => {
      if (!form[section][name]) errors[`${section}.${name}`] = `${label} is required.`;
    });
  };
  Object.entries(requiredFields).forEach(([section, fields]) => required(section, fields));
  if (Number(form.shares.numberOfShares) < 1) errors["shares.numberOfShares"] = "Number of shares must be at least 1.";
  if (Number(form.shares.monthlySaving) <= 0) errors["shares.monthlySaving"] = "Monthly saving must be greater than 0.";
  if (!form.declaration.agreed) errors["declaration.agreed"] = "Please confirm the declaration.";
  return errors;
}

function getSectionErrors(errors, section) {
  return Object.fromEntries(
    Object.entries(errors)
      .filter(([key]) => key.startsWith(`${section}.`))
      .map(([key, value]) => [key.slice(section.length + 1), value]),
  );
}

function getSampleApplicant() {
  const sampleNumber = Math.floor(1000 + Math.random() * 9000);
  const sampleApplicants = [
    { fullName: "Aarav Kulkarni", address: "12 Green Park, Pune" },
    { fullName: "Meera Joshi", address: "44 River View Road, Nashik" },
    { fullName: "Rohan Patil", address: "8 Shahu Nagar, Kolhapur" },
  ];
  const sample = sampleApplicants[Math.floor(Math.random() * sampleApplicants.length)];
  return {
    registrationNumber: `MEM-${sampleNumber}`,
    fullName: sample.fullName,
    mobile: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
    address: sample.address,
    applicationDate: new Date().toISOString().slice(0, 10),
  };
}

function SharesApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalShareValue = getTotalShareValue(form.shares.numberOfShares);

  const updateField = (section, field, value) => {
    setForm((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
    setErrors((current) => {
      const next = { ...current };
      delete next[`${section}.${field}`];
      return next;
    });
  };

  const fillSampleData = () => {
    const sampleApplicant = getSampleApplicant();
    const sampleDate = new Date().toISOString().slice(0, 10);
    setForm((current) => ({
      ...current,
      applicant: sampleApplicant,
      shares: { numberOfShares: String(Math.floor(1 + Math.random() * 5)), monthlySaving: "1000", paymentMethod: "UPI" },
      declaration: { name: sampleApplicant.fullName, date: sampleDate, agreed: true },
    }));
    setErrors({});
    setMessage({ type: "success", text: "Sample member number, name, and address added." });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setMessage({ type: "error", text: "Please review the highlighted fields before submitting." });
      return;
    }
    setIsSubmitting(true);
    saveSharesApplication({ ...form, shares: { ...form.shares, shareValue: SHARE_PRICE }, totalShareValue, paymentAmount: totalShareValue });
    setForm(initialForm);
    setActiveSection(0);
    setMessage({ type: "success", text: "Shares application submitted successfully." });
    setIsSubmitting(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="brand-mark">SH</div>
        <div>
          <p className="eyebrow">Private Members Savings &amp; Loan Group</p>
          <h1>Shares application</h1>
        </div>
        <div className="header-status"><span className="status-dot" /> Secure form</div>
      </header>
      <main className="page-content">
        <div className="member-file-toolbar">
          <div>
            <strong>Apply for additional shares</strong>
            <span>Enter the member details and share allocation requested.</span>
          </div>
          <button type="button" className="button secondary" onClick={fillSampleData}>
            Fill sample data
          </button>
          <div className="member-fee-summary">
            <div><span>Application value</span><strong>{formatIndianCurrency(totalShareValue)}</strong></div>
          </div>
        </div>
        <nav className="registration-steps" aria-label="Shares application sections" role="tablist">
          {sections.map((label, index) => (
            <button type="button" key={label} className={activeSection === index ? "active" : ""} role="tab" aria-selected={activeSection === index} onClick={() => setActiveSection(index)}>
              <span>{index + 1}</span> {label}
            </button>
          ))}
        </nav>
        <div className="registration-layout">
          <div className="registration-form-column">
            {message && <div className={`notice ${message.type}`} role="status"><span>{message.type === "success" ? "✓" : "!"}</span>{message.text}</div>}
            <form onSubmit={handleSubmit} noValidate>
              {sectionComponents.map(([section, Component], index) => (
                <Component
                  key={section}
                  data={form[section]}
                  errors={getSectionErrors(errors, section)}
                  updateField={updateField}
                  totalShareValue={totalShareValue}
                  active={activeSection === index}
                />
              ))}
              <div className="tab-actions">
                <button type="button" className="button ghost" onClick={() => setActiveSection((current) => Math.max(0, current - 1))} disabled={activeSection === 0}>Back</button>
                <button type="button" className="button secondary" onClick={() => setActiveSection((current) => Math.min(sections.length - 1, current + 1))} disabled={activeSection === sections.length - 1}>Next</button>
              </div>
              <div className="form-actions">
                <button type="submit" className="button primary" disabled={isSubmitting}>Pay {formatIndianCurrency(totalShareValue)} &amp; submit <span>→</span></button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SharesApplicationForm;
