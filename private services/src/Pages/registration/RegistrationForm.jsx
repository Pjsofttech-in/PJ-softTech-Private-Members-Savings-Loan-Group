// src/Pages/registration/RegistrationForm.jsx
import { useRef, useState } from "react";
import { useMemberForm } from "../../hooks/useMemberForm";
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
  const formRef = useRef(null);

  // The 6 steps mapping directly to your UI tabs
  const sections = [
    { id: "member-details", label: "Member details" },
    { id: "membership-details", label: "Membership" },
    { id: "nominee-details", label: "Nominee" },
    { id: "member-declaration", label: "Declaration" },
    { id: "witness-details", label: "Witnesses" },
    { id: "payment-details", label: "Payment" },
  ];

  return (
    <div className="registration-page">
      <main className="page-content">
        {/* Dynamic Multi-Step Navigation Tabs */}
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

        {/* Main Form Area */}
        <div className="registration-layout">
          <div className="registration-form-column">
            
            {/* Success/Error Notifications */}
            {message && (
              <div className={`notice ${message.type} mb-4 p-4 border`} role="status">
                <strong className="mr-2">{message.type === "success" ? "✓" : "!"}</strong>
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

              {/* Bottom Tab Navigation Controls (Back / Next) */}
              <div className="tab-actions">
                <button
                  type="button"
                  className="button ghost"
                  onClick={() => setActiveSection((current) => Math.max(0, current - 1))}
                  disabled={activeSection === 0}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setActiveSection((current) => Math.min(sections.length - 1, current + 1))}
                  disabled={activeSection === sections.length - 1}
                >
                  Next →
                </button>
              </div>

              {/* Final Submission & Save Controls */}
              <div className="form-actions mt-6">
                <button type="button" className="button ghost" onClick={resetForm}>
                  Reset
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={saveDraft}
                >
                  Save draft
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
    </div>
  );
}

export default RegistrationForm;