function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="loading-wrap" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{label}</p>
      <div className="loading-skeleton">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default LoadingSpinner;
