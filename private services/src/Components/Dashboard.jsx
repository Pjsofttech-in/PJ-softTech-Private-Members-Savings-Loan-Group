function Dashboard({ onStartRegistration }) {
  const summaryCards = [
    {
      label: "Total members",
      value: "—",
      detail: "Connect your member records",
    },
    {
      label: "Pending applications",
      value: "—",
      detail: "Applications awaiting review",
    },
    {
      label: "Monthly savings",
      value: "₹—",
      detail: "Summary appears after setup",
    },
  ];

  return (
    <main className="dashboard-page mx-auto max-w-[1440px] px-6 py-8 lg:px-10">
      <section className="dashboard-hero flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Good morning, Administrator</h1>
          <p>Manage member applications and keep the savings group moving.</p>
        </div>
        <button
          className="button primary self-start rounded-md px-5 py-3 text-sm font-bold lg:self-auto"
          type="button"
          onClick={onStartRegistration}
        >
          + Add member
        </button>
      </section>
      <section
        className="summary-grid grid gap-4 md:grid-cols-3"
        aria-label="Group summary"
      >
        {summaryCards.map((card) => (
          <article className="summary-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.detail}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-grid grid gap-4 lg:grid-cols-2">
        <article className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Member information</p>
              <h2>Add a new member</h2>
            </div>
            <span className="panel-icon">+</span>
          </div>
          <p>
            Open the single registration page to enter member details, ID proof,
            nominee information, and the remaining office records.
          </p>
          <button
            className="text-button"
            type="button"
            onClick={onStartRegistration}
          >
            Add member <span>→</span>
          </button>
        </article>
        <article className="dashboard-panel membership-dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Workspace column</p>
              <h2>Membership details</h2>
            </div>
            <span className="panel-icon">₹</span>
          </div>
          <div className="dashboard-detail-list">
            <div>
              <span>Member registration</span>
              <strong>Ready to complete</strong>
            </div>
            <div>
              <span>Shares and savings</span>
              <strong>Captured in registration</strong>
            </div>
            <div>
              <span>Nominee details</span>
              <strong>Included on the same page</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
