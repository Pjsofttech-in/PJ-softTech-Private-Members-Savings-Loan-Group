import { useRef, useState } from "react";
import { useMemberForm } from "../../hooks/useMemberForm";
import Footer from "../../Components/Footer";
import { getSectionErrors } from "../../utils/formHelpers";
import {
  MemberDeclaration,
  MemberDetails,
  MembershipDetails,
  NomineeDetails,
  WitnessDetails,
  PaymentDetails,
} from "./RegistrationSections";

function RegistrationForm() {
  const {
    form,
    errors,
    updateField,
    resetForm,
    saveDraft,
    handleSubmit,
    isSubmitting,
    message,
    totalShareValue,
  } = useMemberForm();
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { id: "member-details", label: "Member details" },
    { id: "membership-details", label: "Membership" },
    { id: "nominee-details", label: "Nominee" },
    { id: "member-declaration", label: "Declaration" },
    { id: "witness-details", label: "Witnesses" },
    { id: "payment-details", label: "Payment" },
  ];
  const formRef = useRef(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <div className="registration-page">
      <header className="site-header">
        <div className="brand-mark">PM</div>
        <div>
          <p className="eyebrow">Private Members Savings &amp; Loan Group</p>
          <h1>New member file</h1>
        </div>
        <div className="header-status">
          <span className="status-dot" /> Secure form
        </div>
      </header>
      <main className="page-content">
        <div className="member-file-toolbar">
          <div>
            <strong>Add a new member</strong>
            <span>Enter details to create a complete member file.</span>
          </div>
          <button
            type="button"
            className="button primary"
            onClick={scrollToForm}
          >
            + Add member
          </button>
        </div>
        <nav className="registration-steps" aria-label="Registration sections" role="tablist">
          {sections.map((section, index) => (
            <button
              type="button"
              key={section.id}
              className={activeSection === index ? "active" : ""}
              role="tab"
              aria-selected={activeSection === index}
              aria-current={activeSection === index ? "step" : undefined}
              onClick={() => setActiveSection(index)}
            >
              <span>{index + 1}</span> {section.label}
            </button>
          ))}
        </nav>
        <div className="registration-layout">
          <div className="registration-form-column">
            {message && (
              <div className={`notice ${message.type}`} role="status">
                <span>{message.type === "success" ? "✓" : "!"}</span>
                {message.text}
              </div>
            )}
            <form
              ref={formRef}
              id="member-registration-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <MemberDetails
                data={form.memberDetails}
                errors={getSectionErrors(errors, "memberDetails")}
                updateField={updateField}
                active={activeSection === 0}
              />
              <MembershipDetails
                data={form.membershipDetails}
                errors={getSectionErrors(errors, "membershipDetails")}
                updateField={updateField}
                totalShareValue={totalShareValue}
                active={activeSection === 1}
              />
              <NomineeDetails
                data={form.nomineeDetails}
                errors={getSectionErrors(errors, "nomineeDetails")}
                updateField={updateField}
                active={activeSection === 2}
              />
              <MemberDeclaration
                data={form.declaration}
                errors={getSectionErrors(errors, "declaration")}
                updateField={updateField}
                active={activeSection === 3}
              />
              <WitnessDetails
                form={form}
                errors={{
                  witness1: getSectionErrors(errors, "witness1"),
                  witness2: getSectionErrors(errors, "witness2"),
                }}
                updateField={updateField}
                active={activeSection === 4}
              />
              <PaymentDetails
                data={form.paymentDetails}
                errors={getSectionErrors(errors, "paymentDetails")}
                updateField={updateField}
                active={activeSection === 5}
              />
              <div className="tab-actions">
                <button
                  type="button"
                  className="button ghost"
                  onClick={() => setActiveSection((current) => Math.max(0, current - 1))}
                  disabled={activeSection === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setActiveSection((current) => Math.min(sections.length - 1, current + 1))}
                  disabled={activeSection === sections.length - 1}
                >
                  Next
                </button>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="button secondary"
                  onClick={saveDraft}
                >
                  Save draft
                </button>
                <button type="button" className="button ghost" onClick={resetForm}>
                  Reset
                </button>
                <button
                  type="submit"
                  className="button primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Preparing..."
                  ) : (
                    <>
                      Submit registration <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegistrationForm;
