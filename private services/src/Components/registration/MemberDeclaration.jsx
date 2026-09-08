import FormField from "./FormField";
import FormSection from "./FormSection";

function MemberDeclaration({ data, errors, updateField }) {
  return (
    <FormSection number="04" title="Member declaration">
      <div className="declaration-copy">
        I hereby declare that the information provided above is true and
        correct. I agree to follow all rules and regulations of the Private
        Members Savings &amp; Loan Group relating to membership, shares,
        savings, loans, guarantors, repayments, and withdrawal/exit.
      </div>

      <div className="field-grid">
        <FormField
          id="declaration-member-name"
          label="Member Name"
          value={data.memberName}
          onChange={(value) => updateField("declaration", "memberName", value)}
          error={errors.memberName}
          required
        />
        <FormField
          id="declaration-date"
          label="Date"
          value={data.date}
          onChange={(value) => updateField("declaration", "date", value)}
          error={errors.date}
          type="date"
          required
        />
      </div>

      <label className={`agreement ${errors.agreed ? "has-error" : ""}`}>
        <input
          type="checkbox"
          checked={data.agreed}
          onChange={(event) =>
            updateField("declaration", "agreed", event.target.checked)
          }
          aria-invalid={Boolean(errors.agreed)}
          aria-describedby={
            errors.agreed ? "declaration-agreed-error" : undefined
          }
        />
        <span>I agree to the above declaration.</span>
      </label>

      {errors.agreed && (
        <p className="field-error" id="declaration-agreed-error">
          {errors.agreed}
        </p>
      )}
    </FormSection>
  );
}

export default MemberDeclaration;
