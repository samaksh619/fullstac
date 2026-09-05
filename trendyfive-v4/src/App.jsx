import { useCallback, useEffect, useMemo, useState } from 'react';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import TopBrands from './components/TopBrands';
import NearbyStores from './components/NearbyStores';
import { EmptyState, ErrorState, LoadingState } from './components/StateViews';
import { createOrder, getEMIPlans, getProductById, getProducts } from './services/productService';

const tabs = ['Top Brands', 'Nearby Stores', 'Trendy Five Marketplace'];
const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Tablets'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Trendy Five Marketplace');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansError, setPlansError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [storeContext, setStoreContext] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setProducts(await getProducts()); }
    catch (err) { setError(err.message || 'Could not load products.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const loadPlans = useCallback(async (productId) => {
    setPlansLoading(true); setPlansError('');
    try { setPlans(await getEMIPlans(productId)); }
    catch (err) { setPlansError(err.message || 'Could not load EMI plans.'); }
    finally { setPlansLoading(false); }
  }, []);

  const openProduct = async (id) => {
    setError(''); setSelectedVariant(null); setSelectedPlan(null); setPlans([]);
    try {
      const product = await getProductById(id);
      setSelectedProduct(product);
      await loadPlans(id);
    } catch (err) { setError(err.message || 'Could not open this product.'); }
  };

  const returnToList = () => {
    setSelectedProduct(null); setSelectedVariant(null); setSelectedPlan(null); setPlans([]); setPlansError(''); setOrderError('');
  };

  const proceed = async () => {
    if (!selectedProduct || !selectedVariant || !selectedPlan || orderLoading) return;
    setOrderLoading(true);
    setOrderError('');
    try {
      const result = await createOrder({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        variant: selectedVariant.label,
        storage: selectedVariant.storage,
        months: selectedPlan.months,
        monthlyAmount: selectedPlan.monthly,
        interest: selectedPlan.interest,
      });
      setConfirmation({ product: selectedProduct, variant: selectedVariant, plan: selectedPlan, orderId: result.orderId });
    } catch (err) {
      setOrderError(err.message || 'Could not save your EMI selection. Make sure the backend is running.');
    } finally { setOrderLoading(false); }
  };

  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesBrand = brandFilter === 'All' || product.brand === brandFilter;
    const text = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
    return matchesCategory && matchesBrand && text.includes(query.toLowerCase().trim());
  }), [products, category, brandFilter, query]);

  const selectBrand = (brand) => {
    setBrandFilter(brand); setCategory('All'); setQuery(''); setStoreContext(''); setActiveTab('Trendy Five Marketplace');
  };

  const shopFromStore = (store) => {
    setBrandFilter(store.featuredBrand || 'All');
    setCategory('All');
    setQuery('');
    setStoreContext(`${store.name} · ${store.area}`);
    setActiveTab('Trendy Five Marketplace');
  };

  return (
    <main>
      <header className="topbar">
        <div className="brand-mark" aria-label="Trendy Five"><span>5</span>Trendy</div>
        <div className="topbar-actions"><span className="security-pill">🔒 Secure shopping</span><div className="support">Need help? <b>Contact support</b></div></div>
      </header>

      <div className="page-shell">
        <header className="page-intro">
          <span className="eyebrow">TRENDY FIVE SHOP</span>
          <h1>Shop smarter with Trendy Five.</h1>
          <p>Discover popular products, trusted brands and flexible EMI plans — all in one place.</p>
        </header>

        <nav className="shop-tabs" aria-label="Shop categories">
          {tabs.map((tab) => (
            <button key={tab} type="button" className={activeTab === tab ? 'active' : ''} aria-current={activeTab === tab ? 'page' : undefined} onClick={() => { setActiveTab(tab); returnToList(); }}>
              {tab}
              {tab === 'Trendy Five Marketplace' && <span className="tab-dot" aria-hidden="true" />}
            </button>
          ))}
        </nav>

        {activeTab === 'Top Brands' ? <TopBrands onBrandSelect={selectBrand} /> : activeTab === 'Nearby Stores' ? <NearbyStores onShopStore={shopFromStore} /> : selectedProduct ? (
          <ProductDetails product={selectedProduct} plans={plans} isLoadingPlans={plansLoading} plansError={plansError} selectedVariant={selectedVariant} selectedPlan={selectedPlan} onVariant={setSelectedVariant} onPlan={setSelectedPlan} onBack={returnToList} onRetryPlans={() => loadPlans(selectedProduct.id)} onProceed={proceed} orderLoading={orderLoading} orderError={orderError} />
        ) : (
          <section className="marketplace" aria-labelledby="marketplace-title">
            <div className="marketplace-banner">
              <div><span className="banner-icon">⚡</span><div><strong>Easy EMI shopping</strong><span>Compare products and choose a monthly plan that fits your budget.</span></div></div>
              <span className="banner-badge">No-cost EMI available</span>
            </div>

            <div className="marketplace__heading">
              <div><span className="eyebrow">TRENDY FIVE MARKETPLACE</span><h2 id="marketplace-title">Find your next favourite</h2></div>
              <p>{filteredProducts.length} products · Tap any product to compare variants and EMI plans.</p>
              {storeContext && <div className="store-context">Shopping picks from <strong>{storeContext}</strong> <button type="button" onClick={() => setStoreContext('')}>Clear</button></div>}
            </div>

            <div className="marketplace-toolbar">
              <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, brands..." aria-label="Search products" /></label>
              <div className="filter-meta"><span>{favorites.length} saved</span>{brandFilter !== 'All' && <button type="button" onClick={() => setBrandFilter('All')}>Clear {brandFilter} ×</button>}</div>
            </div>

            <div className="category-row" aria-label="Product categories">
              {categories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>

            {loading ? <LoadingState label="Loading Trendy Five products..." /> : error ? <ErrorState message={error} onRetry={loadProducts} /> : filteredProducts.length ? (
              <div className="product-grid">
                {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={openProduct} isFavorite={favorites.includes(product.id)} onFavorite={toggleFavorite} />)}
              </div>
            ) : <EmptyState title="No products found" label="Try another search, brand or category." />}

            <div className="trust-row"><span>✓ Secure checkout</span><span>✓ Flexible EMI options</span><span>✓ Trusted brands</span><span>✓ Easy product discovery</span></div>
          </section>
        )}
      </div>

      {confirmation && <div className="modal-backdrop" role="presentation"><section className="confirmation" role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><span className="success-icon" aria-hidden="true">✓</span><h2 id="confirmation-title">Your EMI plan is selected</h2><p>{confirmation.product.name} · {confirmation.variant.label} · {confirmation.variant.storage}</p><small className="order-reference">Order #{confirmation.orderId}</small><div className="confirmation__plan"><strong>{confirmation.plan.months} monthly payments of {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(confirmation.plan.monthly)}</strong><span>{confirmation.plan.interest}</span></div><button className="proceed-button" type="button" onClick={() => { setConfirmation(null); returnToList(); }}>Done <span>✓</span></button></section></div>}
    </main>
  );
}
