const formatPrice = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value);

export default function ProductCard({ product, onSelect, isFavorite, onFavorite }) {
  const startingEmi = Math.min(...product.emiPlans.map((plan) => plan.monthly));

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} type="button" aria-label={isFavorite ? `Remove ${product.name} from saved products` : `Save ${product.name}`} onClick={(event) => { event.stopPropagation(); onFavorite(product.id); }}>♡</button>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <button className="product-card__open" type="button" onClick={() => onSelect(product.id)} aria-label={`View ${product.name}`}>
      <div className="product-card__body">
        <span className="eyebrow">{product.brand}</span>
        <h3>{product.name}</h3>
        <strong>{formatPrice(product.price)}</strong>
        <span className="emi-hint">EMI from {formatPrice(startingEmi)}/mo</span>
        <span className="card-link">View details <span aria-hidden="true">→</span></span>
      </div>
      </button>
    </article>
  );
}
