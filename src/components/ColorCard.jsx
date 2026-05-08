export const ColorCard = ({ name, hex, color }) => {
  return (
    <div className="color-card" data-node-id="219:16559">
      <div
        className="color-card__swatch"
        style={{ backgroundColor: color || hex }}
        data-node-id="219:16560"
      />
      <div className="color-card__info" data-node-id="219:16561">
        <p className="color-card__name" data-node-id="219:16562">
          {name}
        </p>
        <p className="color-card__hex" data-node-id="219:16563">
          {hex}
        </p>
      </div>
    </div>
  );
};
