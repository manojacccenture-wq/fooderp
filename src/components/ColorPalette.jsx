import { ColorSection } from './ColorSection';
import { GradientDisplay } from './GradientDisplay';

const COLOR_DATA = {
  neutral: [
    { name: 'Neutral 900', hex: '#212134', color: '#212134' },
    { name: 'Neutral 800', hex: '#32324D', color: '#32324D' },
    { name: 'Neutral 700', hex: '#4A4A6A', color: '#4A4A6A' },
    { name: 'Neutral 600', hex: '#666687', color: '#666687' },
    { name: 'Neutral 500', hex: '#8E8EA9', color: '#8E8EA9' },
    { name: 'Neutral 400', hex: '#A5A5BA', color: '#A5A5BA' },
    { name: 'Neutral 300', hex: '#C0C0CF', color: '#C0C0CF' },
    { name: 'Neutral 200', hex: '#DCDCE4', color: '#DCDCE4' },
    { name: 'Neutral 150', hex: '#EAEAEF', color: '#EAEAEF' },
    { name: 'Neutral 100', hex: '#F6F6F9', color: '#F6F6F9' },
    { name: 'Neutral 0', hex: '#FFFFFF', color: '#FFFFFF' },
  ],
  primary: [
    { name: 'Primary 700', hex: '#3A2D78', color: '#3A2D78' },
    { name: 'Primary 600', hex: '#E23744', color: '#E23744' },
    { name: 'Primary 500', hex: '#8981AE', color: '#8981AE' },
    { name: 'Primary 200', hex: '#C4C0D7', color: '#C4C0D7' },
    { name: 'Primary 100', hex: '#EBEAF2', color: '#EBEAF2' },
  ],
  secondary: [
    { name: 'Secondary 800', hex: '#FAA300', color: '#FAA300' },
    { name: 'Secondary 700', hex: '#FFB01D', color: '#FFB01D' },
    { name: 'Secondary 600', hex: '#FFC861', color: '#FFC861' },
    { name: 'Secondary 500', hex: '#FFD88E', color: '#FFD88E' },
    { name: 'Secondary 400', hex: '#FFE7BB', color: '#FFE7BB' },
    { name: 'Secondary 200', hex: '#FFF7E8', color: '#FFF7E8' },
  ],
  tertiary: [
    { name: 'Tertiary 700', hex: '#FF7B2C', color: '#FF7B2C' },
    { name: 'Tertiary 600', hex: '#FF9556', color: '#FF9556' },
    { name: 'Tertiary 500', hex: '#FFB080', color: '#FFB080' },
    { name: 'Tertiary 400', hex: '#FFD7C0', color: '#FFD7C0' },
    { name: 'Tertiary 50', hex: '#FFF2EA', color: '#FFF2EA' },
  ],
  success: [
    { name: 'Success 700', hex: '#24A44B', color: '#24A44B' },
    { name: 'Success 500', hex: '#4AD775', color: '#4AD775' },
    { name: 'Success 200', hex: '#B4EFC6', color: '#B4EFC6' },
  ],
  danger: [
    { name: 'Danger 700', hex: '#CB0E0E', color: '#CB0E0E' },
    { name: 'Danger 500', hex: '#F24343', color: '#F24343' },
    { name: 'Danger 200', hex: '#FCCCCC', color: '#FCCCCC' },
  ],
};

export const ColorPalette = () => {
  return (
    <div className="color-palette" data-node-id="219:16545">
      <div className="color-palette__header">
        <h1 className="color-palette__title">Colors</h1>
      </div>

      <div className="color-palette__content">
        <ColorSection title="Neutral" colors={COLOR_DATA.neutral} />
        <ColorSection title="Primary" colors={COLOR_DATA.primary} />
        <ColorSection title="Secondary" colors={COLOR_DATA.secondary} />
        <ColorSection title="Tertiary" colors={COLOR_DATA.tertiary} />
        <ColorSection title="Success" colors={COLOR_DATA.success} />
        <ColorSection title="Danger" colors={COLOR_DATA.danger} />

        <div>
          <h2 className="color-section__title">Surface background gradient</h2>
          <div style={{ marginTop: '32px', display: 'flex', gap: '20px' }}>
            <GradientDisplay type="light" />
            <GradientDisplay type="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};
