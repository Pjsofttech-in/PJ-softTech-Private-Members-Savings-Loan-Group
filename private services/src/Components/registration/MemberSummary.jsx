function MemberSummary({ form }) {
  const details = [
    ["Full name", form.memberDetails.fullName],
    ["Father's / spouse's name", form.memberDetails.guardianName],
    ["Date of birth", form.memberDetails.dateOfBirth],
    ["Occupation", form.memberDetails.occupation],
    ["Mobile number", form.memberDetails.mobile],
    ["Email", form.memberDetails.email],
    [
      "ID proof",
      form.memberDetails.identityType && form.memberDetails.identityNumber
        ? `${form.memberDetails.identityType} - ${form.memberDetails.identityNumber}`
        : "",
    ],
    ["Registration number", form.membershipDetails.registrationNumber],
    ["Nominee", form.nomineeDetails.name],
  ];

  return (
    <section className="member-summary" aria-labelledby="member-summary-title">
      <div className="member-summary-heading">
        <div>
          <p className="eyebrow">Member file overview</p>
          <h2 id="member-summary-title">Member information</h2>
        </div>
        <span>Live preview</span>
      </div>
      <div className="member-summary-grid">
        {details.map(([label, value]) => (
          <div className="member-summary-item" key={label}>
            <span>{label}</span>
            <strong>{value || "Not entered"}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MemberSummary;
