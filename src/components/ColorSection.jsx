import { ColorCard } from './ColorCard';

export const ColorSection = ({ title, colors }) => {
  return (
    <div className="color-section" data-node-id="563:24736">
      <h2 className="color-section__title" data-node-id="219:16552">
        {title}
      </h2>
      <div className="color-section__column" data-node-id="219:16558">
        {colors.map((color, index) => (
          <ColorCard
            key={`${title}-${index}`}
            name={color.name}
            hex={color.hex}
            color={color.color}
          />
        ))}
      </div>
    </div>
  );
};
