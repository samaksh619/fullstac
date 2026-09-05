export function LoadingState({ label = 'Loading marketplace...' }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <strong>Something went wrong</strong>
      <span>{message}</span>
      <button className="text-button" type="button" onClick={onRetry}>Try again</button>
    </div>
  );
}

export function EmptyState({ title = 'Nothing to show yet', label }) {
  return (
    <div className="state">
      <strong>{title}</strong>
      <span>{label}</span>
    </div>
  );
}
