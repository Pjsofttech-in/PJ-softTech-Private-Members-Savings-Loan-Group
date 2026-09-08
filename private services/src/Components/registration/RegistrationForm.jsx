import { useRef } from "react";
import { useMemberForm } from "../../hooks/useMemberForm";
import { getSectionErrors } from "../../utils/formHelpers";
import MemberDeclaration from "./MemberDeclaration";
import MemberDetails from "./MemberDetails";
import MemberSummary from "./MemberSummary";
import MembershipDetails from "./MembershipDetails";
import NomineeDetails from "./NomineeDetails";
import OfficeUseOnly from "./OfficeUseOnly";
import WitnessDetails from "./WitnessDetails";

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
            <strong>01—06</strong>
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
        <MemberSummary form={form} />
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
          <OfficeUseOnly data={form.officeUse} updateField={updateField} />
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
      </main>
      <footer>
        <strong>Private Members Savings &amp; Loan Group</strong>
        <span>Member Registration System</span>
      </footer>
    </div>
  );
}

export default RegistrationForm;
