export default function VariantSelector({ variants, selectedId, onSelect }) {
  return (
    <div className="option-group" role="radiogroup" aria-label="Choose a variant">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className={`variant ${selectedId === variant.id ? 'is-selected' : ''}`}
          onClick={() => onSelect(variant)}
          role="radio"
          aria-checked={selectedId === variant.id}
        >
          <span>{variant.label}</span>
          <small>{variant.storage}</small>
        </button>
      ))}
    </div>
  );
}
