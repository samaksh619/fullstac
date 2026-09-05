const money = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value);

export default function EMIPlanSelector({ plans, selectedId, onSelect }) {
  return (
    <div className="plan-list" role="radiogroup" aria-label="Choose an EMI plan">
      {plans.map((plan) => (
        <button
          className={`emi-plan ${selectedId === plan.id ? 'is-selected' : ''}`}
          key={plan.id}
          type="button"
          onClick={() => onSelect(plan)}
          role="radio"
          aria-checked={selectedId === plan.id}
        >
          <span className="radio-dot" aria-hidden="true" />
          <span>
            <strong>{plan.months} months</strong>
            <small>{plan.interest}</small>
          </span>
          <span className="plan-price">
            {money(plan.monthly)}
            <small>/ month</small>
          </span>
        </button>
      ))}
    </div>
  );
}
