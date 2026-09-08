import { useRef } from "react";
import { useMemberForm } from "../../hooks/useMemberForm";
import Footer from "../Footer";
import { getSectionErrors } from "../../utils/formHelpers";
import {
  MemberDeclaration,
  MemberDetails,
  MembershipDetails,
  NomineeDetails,
  WitnessDetails,
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
        <div className="intro">
          <div>
            <p className="eyebrow">New member application</p>
            <h2>Create a member file</h2>
            <p>
              Complete the details below. Your information will be reviewed by
              the group office.
            </p>
          </div>
          <div className="intro-meta">
            <strong>01—05</strong>
            <span>Registration sections</span>
          </div>
        </div>
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
        <div className="registration-layout">
          <aside className="registration-progress" aria-label="Registration progress">
            <div>
              <p className="eyebrow">Registration flow</p>
              <h2>Complete each section</h2>
              <p>Start with personal details and finish with office records.</p>
            </div>
            <nav>
              <a href="#member-details"><span>01</span> Member details</a>
              <a href="#membership-details"><span>02</span> Membership details</a>
              <a href="#nominee-details"><span>03</span> Nominee details</a>
              <a href="#member-declaration"><span>04</span> Declaration</a>
              <a href="#witness-details"><span>05</span> Witnesses</a>
            </nav>
          </aside>
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
              />
              <MembershipDetails
                data={form.membershipDetails}
                errors={getSectionErrors(errors, "membershipDetails")}
                updateField={updateField}
                totalShareValue={totalShareValue}
              />
              <NomineeDetails
                data={form.nomineeDetails}
                errors={getSectionErrors(errors, "nomineeDetails")}
                updateField={updateField}
              />
              <MemberDeclaration
                data={form.declaration}
                errors={getSectionErrors(errors, "declaration")}
                updateField={updateField}
              />
              <WitnessDetails
                form={form}
                errors={{
                  witness1: getSectionErrors(errors, "witness1"),
                  witness2: getSectionErrors(errors, "witness2"),
                }}
                updateField={updateField}
              />
              <div className="form-actions">
                <button
                  type="button"
                  className="button secondary"
                  onClick={saveDraft}
                >
                  Save draft
                </button>
                <button type="button" className="button ghost" onClick={resetForm}>
                  Reset form
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
