# Typography System - Quick Reference

## 🚀 Quick Start

### Automatic Typography (Just Use HTML Tags!)

```jsx
// These automatically get correct typography from Figma
<h1>Page Title</h1>              // 26px DM Sans Medium
<h2>Section Title</h2>           // 22px DM Sans Medium
<h3>Subsection</h3>              // 22px Mulish Bold
<h4>Smaller Heading</h4>         // 18px Mulish SemiBold
<p>Body text</p>                 // 16px Mulish Medium
<small>Caption</small>            // 12px Mulish Regular
<button>Click</button>            // 16px Mulish Bold
<label>Form Label</label>         // 14px Mulish Regular
```

### Semantic Classes (For Special Text)

```jsx
<div className="text-subtitle-1">Subtitle</div>
<div className="text-caption-2">Caption</div>
<button className="text-button-sm">Small Button</button>
<span className="text-price-lg">$99.99</span>
```

### Color Override (When Needed)

```jsx
<h1 style={{ color: 'var(--color-primary-1)' }}>
  Colored Heading
</h1>

<p style={{ color: 'var(--color-success-500)' }}>
  Success Message
</p>
```

## 📋 Typography Classes Reference

### Headings
- `.text-heading-1` through `.text-heading-6`

### Subtitles
- `.text-subtitle-1` (18px SemiBold)
- `.text-subtitle-2` (16px Bold)
- `.text-subtitle-3` (14px SemiBold)

### Body & Captions
- `.text-body-1` (16px Medium)
- `.text-body-2` (14px Medium)
- `.text-caption-1` (15px Regular)
- `.text-caption-2` (14px Medium)
- `.text-caption-3` (12px Regular)

### Buttons
- `.text-button-sm` (14px SemiBold)
- `.text-button-md` (16px Bold)
- `.text-button-md-extrabold` (16px ExtraBold)

### Pricing
- `.text-price-sm` (14px Bold)
- `.text-price-md` (16px ExtraBold)
- `.text-price-lg` (24px ExtraBold)

### Form Labels
- `.text-label-default` (14px Regular)
- `.text-label-active` (12px SemiBold)
- `.text-label-external` (13px SemiBold)
- `.text-label-placeholder` (14px SemiBold)

### Card Details
- `.text-card-detail-sm` (12px SemiBold)
- `.text-card-detail-md` (14px SemiBold)

## 🎨 Font Families

- **Primary:** Mulish (Google Font)
- **Secondary:** DM Sans (Google Font)

## ⚠️ What NOT to Do

```jsx
// ❌ DON'T mix Tailwind typography utilities with semantic classes
<h1 className="text-3xl font-bold">...</h1>
<p className="text-base font-medium">...</p>
<span className="text-sm text-gray-500">...</span>

// ✅ DO use semantic system
<h1>...</h1>
<p>...</p>
<span className="text-caption-3">...</span>
```

## 🔧 CSS Variables Available

### Font Sizes
```
--font-size-h1 through --font-size-h6
--font-size-body-lg, --font-size-body-md
--font-size-caption-lg, --font-size-caption-md, --font-size-caption-sm
--font-size-button-sm, --font-size-button-md
--font-size-price-sm, --font-size-price-md, --font-size-price-lg
```

### Font Weights
```
--font-weight-regular (400)
--font-weight-medium (500)
--font-weight-semibold (600)
--font-weight-bold (700)
--font-weight-extrabold (800)
```

### Font Families
```
--font-family-primary (Mulish)
--font-family-secondary (DM Sans)
```

## 📂 Files to Know

- `src/styles/tokens/typography.css` - Primitive tokens
- `src/styles/semantic/typography.css` - Semantic mappings
- `src/styles/base/typography-base.css` - Auto styles + classes
- `src/styles/base/font.css` - Google Fonts imports
- `TYPOGRAPHY.md` - Full documentation

## Example Component

```jsx
export const Card = () => {
  return (
    <div className="card">
      <h3>Card Title</h3>
      <p>Body text describing the card content.</p>
      <span className="text-price-md">$99.99</span>
      <button>Learn More</button>
    </div>
  );
};

// No typography utilities needed!
// Styling comes automatically from the design system.
```

## 🎯 Key Principles

1. **HTML tags have semantic typography** - h1, h2, p, etc. are automatically styled
2. **Classes for special cases** - .text-subtitle-1, .text-price-lg, etc.
3. **No utility classes for typography** - Avoid text-lg, font-bold, leading-tight
4. **Color can be overridden** - Use inline styles or semantic color classes
5. **Single source of truth** - All values come from Figma design tokens

## Questions?

See full documentation in `TYPOGRAPHY.md`
