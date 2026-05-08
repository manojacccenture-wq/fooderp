export const TypographyDemo = () => {
  return (
    <div style={{ padding: '40px 50px' }}>
      {/* ============================================
          HEADINGS - Automatic Typography
          ============================================ */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Headings (Automatic Typography from Tags)</h2>

        <h1>H1 - Heading 1 (DM Sans, Medium 26px)</h1>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          Uses DM Sans Medium, 26px, letter-spacing -0.5
        </p>

        <h2>H2 - Heading 2 (DM Sans, Medium 22px)</h2>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          Uses DM Sans Medium, 22px, letter-spacing -0.5
        </p>

        <h3>H3 - Heading 3 (Mulish, Bold 22px)</h3>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          Uses Mulish Bold, 22px
        </p>

        <h4>H4 - Heading 4 (Mulish, SemiBold 18px)</h4>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          Uses Mulish SemiBold, 18px
        </p>

        <h5>H5 - Heading 5 (Mulish, SemiBold 16px)</h5>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          Uses Mulish SemiBold, 16px
        </p>

        <h6>H6 - Heading 6 (Mulish, SemiBold 16px)</h6>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          Uses Mulish SemiBold, 16px
        </p>
      </section>

      {/* ============================================
          BODY TEXT - Automatic Typography
          ============================================ */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Body Text (Automatic Typography from Tags)</h2>

        <p>
          This is body text using the &lt;p&gt; tag. It automatically applies
          Body 1 typography: Mulish Medium, 16px, line-height 28px. No utility
          classes needed!
        </p>

        <p style={{ fontSize: '14px', marginTop: '16px' }}>
          <small>
            This is caption text using the &lt;small&gt; tag. It automatically
            applies Caption 3 typography: Mulish Regular, 12px.
          </small>
        </p>
      </section>

      {/* ============================================
          SEMANTIC TYPOGRAPHY CLASSES
          ============================================ */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Semantic Typography Classes</h2>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>
          Subtitles
        </h3>
        <div className="text-subtitle-1">Subtitle 1 - Mulish SemiBold 18px</div>
        <div className="text-subtitle-2" style={{ marginTop: '12px' }}>
          Subtitle 2 - Mulish Bold 16px
        </div>
        <div className="text-subtitle-3" style={{ marginTop: '12px' }}>
          Subtitle 3 - Mulish SemiBold 14px
        </div>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>Captions</h3>
        <div className="text-caption-1">Caption 1 - Regular 15px</div>
        <div className="text-caption-2" style={{ marginTop: '8px' }}>
          Caption 2 - Medium 14px
        </div>
        <div className="text-caption-3" style={{ marginTop: '8px' }}>
          Caption 3 - Regular 12px
        </div>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>Buttons</h3>
        <button className="text-button-sm">Button Small</button>
        <button className="text-button-md" style={{ marginLeft: '12px' }}>
          Button Medium
        </button>
        <button
          className="text-button-md-extrabold"
          style={{ marginLeft: '12px' }}
        >
          Button ExtraBold
        </button>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>Pricing</h3>
        <div className="text-price-sm">$14.99</div>
        <div className="text-price-md" style={{ marginTop: '8px' }}>
          $16.99
        </div>
        <div className="text-price-lg" style={{ marginTop: '8px' }}>
          $24.99
        </div>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>
          Form Labels
        </h3>
        <label className="text-label-default">Default Label</label>
        <label className="text-label-active" style={{ marginTop: '12px' }}>
          Active Label
        </label>
        <label className="text-label-placeholder" style={{ marginTop: '12px' }}>
          Placeholder Label
        </label>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>
          Card Details
        </h3>
        <div className="text-card-detail-sm">Card Detail Small (12px)</div>
        <div className="text-card-detail-md" style={{ marginTop: '8px' }}>
          Card Detail Medium (14px)
        </div>
      </section>

      {/* ============================================
          COLOR OVERRIDE EXAMPLE
          ============================================ */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Color Overrides (When Needed)</h2>

        <h3 style={{ color: 'var(--color-secondary-0)' }}>
          H3 with Secondary Color
        </h3>
        <p style={{ marginTop: '8px', color: 'var(--color-tertiary-1)' }}>
          Paragraph with Tertiary Orange Color
        </p>
        <div
          className="text-caption-1"
          style={{ color: 'var(--color-success-500)' }}
        >
          Caption with Success Color
        </div>
      </section>

      {/* ============================================
          CODE EXAMPLES
          ============================================ */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Implementation Examples</h2>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>
          Simple Usage (No Utilities!)
        </h3>

        <pre
          style={{
            background: 'var(--color-neutral-100)',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          {`
// Heading - Automatic Typography
<h1>Page Title</h1>

// Body text - Automatic Typography
<p>This is body text with predefined styling.</p>

// Semantic class for special text
<div className="text-subtitle-1">
  Important Section Title
</div>

// With color override
<p style={{ color: 'var(--color-primary-1)' }}>
  Colored body text
</p>
          `}
        </pre>

        <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>
          No Tailwind Typography Utilities Needed!
        </h3>

        <pre
          style={{
            background: 'var(--color-danger-200)',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          {`
// ❌ DON'T USE THESE:
<h1 className="text-2xl font-bold leading-tight">...</h1>
<p className="text-base font-medium">...</p>

// ✅ DO THIS INSTEAD:
<h1>...</h1>
<p>...</p>
          `}
        </pre>
      </section>
    </div>
  );
};
