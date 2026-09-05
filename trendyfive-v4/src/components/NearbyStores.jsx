import { useEffect, useState } from 'react';
import { getNearbyStores } from '../services/productService';

const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Pune'];

export default function NearbyStores({ onShopStore }) {
  const [city, setCity] = useState('Bengaluru');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getNearbyStores(city).then((items) => mounted && setStores(items)).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [city]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      return;
    }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationStatus('granted');
      },
      () => setLocationStatus('denied'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  return (
    <section className="nearby-section" aria-labelledby="nearby-title">
      <div className="location-hero">
        <div>
          <span className="eyebrow">NEARBY STORES</span>
          <h2 id="nearby-title">Find a store around you</h2>
          <p>Allow location access to personalise your nearby-store experience, or choose a city manually.</p>
        </div>
        <button type="button" className="location-button" onClick={requestLocation} disabled={locationStatus === 'loading'}>
          <span aria-hidden="true">⌖</span>
          {locationStatus === 'loading' ? 'Locating…' : locationStatus === 'granted' ? 'Location enabled' : 'Use my location'}
        </button>
      </div>

      {locationStatus === 'granted' && coordinates && (
        <div className="location-success" role="status">
          <span>✓</span>
          <div><strong>Location access enabled</strong><small>Your browser location was received. Showing demo store availability for {city}.</small></div>
        </div>
      )}
      {locationStatus === 'denied' && <div className="location-message location-message--warning">Location access was blocked. You can still choose your city below.</div>}
      {locationStatus === 'unsupported' && <div className="location-message">Location isn't available in this browser. Choose your city below.</div>}

      <div className="city-picker" aria-label="Choose a city">
        <span>Show stores in</span>
        {cities.map((item) => (
          <button key={item} type="button" className={city === item ? 'active' : ''} onClick={() => setCity(item)}>{item}</button>
        ))}
      </div>

      <div className="nearby-heading"><div><strong>Stores near {city}</strong><span>{stores.length} stores available</span></div><span className="demo-badge">Demo locations</span></div>

      {loading ? <div className="store-loading">Loading nearby stores…</div> : (
        <div className="store-grid">
          {stores.map((store) => (
            <article className="store-card" key={`${city}-${store.name}-${store.area}`}>
              <div className="store-icon">{store.icon}</div>
              <div className="store-card__body">
                <div className="store-name-row"><h3>{store.name}</h3><span>{store.distance}</span></div>
                <p>{store.type}</p>
                <small>📍 {store.area}, {city}</small>
                <div className="store-actions">
                  <a className="store-link" href={store.mapsUrl} target="_blank" rel="noreferrer">Get directions <span>↗</span></a>
                  <button type="button" className="store-shop-link" onClick={() => onShopStore(store)}>Shop products</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
