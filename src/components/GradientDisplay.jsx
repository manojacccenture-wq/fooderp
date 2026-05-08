export const GradientDisplay = ({ type = 'light' }) => {
  const displayClass =
    type === 'dark'
      ? 'gradient-display__box--dark'
      : 'gradient-display__box--light';
  const label = type === 'dark' ? 'Dark mode' : 'Light mode';

  return (
    <div className="gradient-display">
      <p className="gradient-display__label">Gradient</p>
      <div className={`gradient-display__box ${displayClass}`}>
        <span className="gradient-display__text">{label}</span>
      </div>
    </div>
  );
};
