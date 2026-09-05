import VariantSelector from './VariantSelector';
import EMIPlanSelector from './EMIPlanSelector';
import { EmptyState, LoadingState, ErrorState } from './StateViews';

const money = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value);

export default function ProductDetails({ product, plans, isLoadingPlans, plansError, selectedVariant, selectedPlan, onVariant, onPlan, onBack, onRetryPlans, onProceed, orderLoading, orderError }) {
  return (
    <section className="detail-page" aria-labelledby="product-title">
      <button className="back-button" type="button" onClick={onBack}>← Back to Marketplace</button>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-copy">
          <span className="eyebrow">{product.brand}</span>
          <h1 id="product-title">{product.name}</h1>
          <div className="price">{money(product.price)}</div>
          <p>{product.description}</p>

          <div className="detail-section">
            <h2>Choose a variant</h2>
            <VariantSelector variants={product.variants} selectedId={selectedVariant?.id} onSelect={onVariant} />
          </div>

          <div className="detail-section">
            <div className="section-heading">
              <h2>Choose your EMI</h2>
              <span>Flexible repayments</span>
            </div>
            {isLoadingPlans ? (
              <LoadingState label="Finding EMI plans..." />
            ) : plansError ? (
              <ErrorState message={plansError} onRetry={onRetryPlans} />
            ) : plans.length ? (
              <EMIPlanSelector plans={plans} selectedId={selectedPlan?.id} onSelect={onPlan} />
            ) : (
              <EmptyState label="No EMI plans are available for this product." />
            )}
          </div>

          {orderError && <div className="form-error" role="alert">{orderError}</div>}
          <button
            className="proceed-button"
            type="button"
            disabled={!selectedVariant || !selectedPlan || orderLoading}
            onClick={onProceed}
          >
            {orderLoading ? 'Saving selection…' : selectedPlan ? `Proceed with ${money(selectedPlan.monthly)}/month` : 'Choose variant and EMI to proceed'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <section className="specs" aria-labelledby="details-title">
        <h2 id="details-title">Product details</h2>
        <ul>
          {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
        </ul>
      </section>
    </section>
  );
}
