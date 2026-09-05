import { useEffect, useState } from 'react';
import { getBrands } from '../services/productService';
import { LoadingState, ErrorState } from './StateViews';

export default function TopBrands({ onBrandSelect }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getBrands().then((items) => mounted && setBrands(items)).catch((err) => mounted && setError(err.message || 'Could not load brands.')).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <section className="brands-section" aria-labelledby="brands-title">
      <div className="section-title-row">
        <div><span className="eyebrow">TOP BRANDS</span><h2 id="brands-title">Shop from brands you trust</h2><p>Explore popular electronics and choose a product you can take home on a flexible EMI.</p></div>
        <span className="catalog-count">{brands.length} popular brands</span>
      </div>
      {loading ? <LoadingState label="Loading popular brands…" /> : error ? <ErrorState message={error} /> : <div className="brand-grid">
        {brands.map((brand) => <button key={brand.name} type="button" className="brand-card" onClick={() => onBrandSelect(brand.name)}>
          <span className="brand-logo">{brand.badge}</span><span className="brand-card__copy"><strong>{brand.name}</strong><small>{brand.tagline}</small><em>{brand.productCount} product{brand.productCount > 1 ? 's' : ''}</em></span><span className="brand-arrow" aria-hidden="true">→</span>
        </button>)}
      </div>}
      <div className="brand-benefits"><div><span>✓</span><strong>Flexible EMIs</strong><small>Choose a tenure that suits you</small></div><div><span>✓</span><strong>Curated products</strong><small>Popular picks in one place</small></div><div><span>✓</span><strong>Simple checkout</strong><small>Your selection is saved by the API</small></div></div>
    </section>
  );
}
