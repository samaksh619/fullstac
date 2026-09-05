const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  let payload = null;
  try { payload = await response.json(); } catch { /* empty response */ }
  if (!response.ok) throw new Error(payload?.message || `Request failed (${response.status})`);
  return payload;
}

export const getProducts = () => request('/products');
export const getProductById = (id) => request(`/products/${encodeURIComponent(id)}`);
export const getEMIPlans = (productId) => request(`/products/${encodeURIComponent(productId)}/emi-plans`);
export const getBrands = () => request('/brands');

export async function getNearbyStores(city = 'Bengaluru') {
  const stores = await request(`/stores?city=${encodeURIComponent(city)}`);
  return stores.map((store) => ({
    ...store,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.name}, ${store.area}, ${store.city}, India`)}`,
  }));
}

export const createOrder = (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) });
export const getApiHealth = () => request('/health');
