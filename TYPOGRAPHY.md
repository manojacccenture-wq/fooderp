# Typography System Documentation

This document describes the complete semantic typography system implemented from the Figma design.

## 🎯 Core Principle

**No inline typography utilities in components.** All typography is automatically applied through semantic design tokens and reusable classes.

## Architecture

### Layer Structure

```
CSS Layers (in order):
1. tokens/typography.css      → Primitive design tokens
2. semantic/typography.css    → Semantic typography mappings
3. base/typography-base.css   → Automatic tag styling + utility classes
```

## Design Token System

### Primitive Tokens (tokens/typography.css)

Defines raw values from Figma:

```css
--font-family-primary: 'Mulish'
--font-family-secondary: 'DM Sans'

--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
--font-weight-extrabold: 800

--font-size-h1: 26px
--font-size-h2: 22px
--line-height-heading-1: 36px
--letter-spacing-heading-1: -0.5px
```

### Semantic Tokens (semantic/typography.css)

Maps primitive tokens to semantic meanings:

```css
--text-heading-1-family: var(--font-family-secondary)
--text-heading-1-size: var(--font-size-h1)
--text-heading-1-weight: var(--font-weight-medium)
--text-heading-1-line-height: var(--line-height-heading-1)
--text-heading-1-letter-spacing: var(--letter-spacing-heading-1)
```

## Usage Patterns

### 1. Automatic Typography (Preferred)

Native HTML tags automatically get the correct typography:

```jsx
// Heading 1 (DM Sans Medium 26px)
<h1>Page Title</h1>

// Heading 2 (DM Sans Medium 22px)
<h2>Section Title</h2>

// Heading 3-6 (Mulish)
<h3>Subsection</h3>
<h4>Smaller Heading</h4>

// Body Text (Mulish Medium 16px)
<p>This is body text with automatic typography.</p>

// Small Caption (Mulish Regular 12px)
<small>Caption text</small>

// Button (Mulish Bold 16px)
<button>Click me</button>

// Form Label (Mulish Regular 14px)
<label>Form Label</label>
```

### 2. Semantic Typography Classes

Use reusable classes for non-standard text styles:

```jsx
// Subtitles
<div className="text-subtitle-1">Subtitle 1</div>
<div className="text-subtitle-2">Subtitle 2</div>
<div className="text-subtitle-3">Subtitle 3</div>

// Captions
<div className="text-caption-1">Caption 1</div>
<div className="text-caption-2">Caption 2</div>
<div className="text-caption-3">Caption 3</div>

// Buttons
<button className="text-button-sm">Small Button</button>
<button className="text-button-md">Medium Button</button>
<button className="text-button-md-extrabold">Extra Bold</button>

// Price Tags
<span className="text-price-sm">$14.99</span>
<span className="text-price-md">$24.99</span>
<span className="text-price-lg">$99.99</span>

// Form Labels
<label className="text-label-default">Default Label</label>
<label className="text-label-active">Active Label</label>
<label className="text-label-external">External Label</label>
<label className="text-label-placeholder">Placeholder</label>

// Card Details
<span className="text-card-detail-sm">Card detail small</span>
<span className="text-card-detail-md">Card detail medium</span>
```

### 3. Color Overrides (When Needed)

Override color while preserving typography:

```jsx
// With color override
<h1 style={{ color: 'var(--color-primary-1)' }}>
  Colored Heading
</h1>

// Using semantic color
<p style={{ color: 'var(--color-text-secondary)' }}>
  Secondary text
</p>

// With tertiary brand color
<div className="text-subtitle-1" style={{ color: 'var(--color-tertiary-1)' }}>
  Orange Subtitle
</div>
```

## Typography Specifications

### Headings (DM Sans)

| Tag | Style | Size | Weight | Line Height | Letter Spacing |
| --- | ----- | ---- | ------ | ----------- | -------------- |
| h1  | Heading 1 | 26px | Medium (500) | 36px | -0.5px |
| h2  | Heading 2 | 22px | Medium (500) | 30px | -0.5px |

### Headings (Mulish)

| Tag | Style | Size | Weight | Line Height | Letter Spacing |
| --- | ----- | ---- | ------ | ----------- | -------------- |
| h3  | Heading 3 | 22px | Bold (700) | 30px | 0px |
| h4  | Heading 4 | 18px | SemiBold (600) | 22px | 0px |
| h5  | Heading 5 | 16px | SemiBold (600) | 22px | 0px |
| h6  | Heading 6 | 16px | SemiBold (600) | 22px | 0px |

### Body Text (Mulish)

| Tag | Style | Size | Weight | Line Height | Letter Spacing |
| --- | ----- | ---- | ------ | ----------- | -------------- |
| p   | Body 1 | 16px | Medium (500) | 28px | 0px |
| small | Caption 3 | 12px | Regular (400) | 22px | 0px |

### Button Text (Mulish)

| Class | Style | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| .text-button-sm | Small | 14px | SemiBold (600) | 22px |
| .text-button-md | Medium | 16px | Bold (700) | 22px |
| .text-button-md-extrabold | Medium ExtraBold | 16px | ExtraBold (800) | 22px |

### Subtitles (Mulish)

| Class | Style | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| .text-subtitle-1 | Subtitle 1 | 18px | SemiBold (600) | 28px |
| .text-subtitle-2 | Subtitle 2 | 16px | Bold (700) | 26px |
| .text-subtitle-3 | Subtitle 3 | 14px | SemiBold (600) | 22px |

### Captions (Mulish)

| Class | Style | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| .text-caption-1 | Caption 1 | 15px | Regular (400) | 24px |
| .text-caption-2 | Caption 2 | 14px | Medium (500) | 20px |
| .text-caption-3 | Caption 3 | 12px | Regular (400) | 22px |

### Price (Mulish)

| Class | Style | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| .text-price-sm | Small | 14px | Bold (700) | 20px |
| .text-price-md | Medium | 16px | ExtraBold (800) | 20px |
| .text-price-lg | Large | 24px | ExtraBold (800) | 20px |

### Form Labels (Mulish)

| Class | Style | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| .text-label-default | Default | 14px | Regular (400) | 22px |
| .text-label-active | Active | 12px | SemiBold (600) | 14px |
| .text-label-external | External | 13px | SemiBold (600) | 18px |
| .text-label-placeholder | Placeholder | 14px | SemiBold (600) | 18px |

### Card Details (Mulish)

| Class | Style | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| .text-card-detail-sm | Small | 12px | SemiBold (600) | 16px |
| .text-card-detail-md | Medium | 14px | SemiBold (600) | 20px |

## File Structure

```
src/styles/
├── tokens/
│   └── typography.css          # Primitive font tokens
│
├── semantic/
│   └── typography.css          # Semantic token mappings
│
├── base/
│   ├── font.css                # Google Fonts imports
│   ├── typography-base.css     # Automatic tag styling + classes
│   └── index.css               # Base layer imports
│
├── globals.css                 # Global import hub
└── index.css                   # Main entry point
```

## Key Design Decisions

1. **No Tailwind Typography Utilities**
   - Typography comes from design tokens, not Tailwind classes
   - Avoids utility class bloat in components
   - Maintains consistency across the application

2. **Semantic First**
   - Tags automatically receive correct typography
   - Reduces need for custom markup or classes
   - Easy to maintain consistent visual hierarchy

3. **CSS Layers for Priority**
   - `tokens` layer: Primitive values
   - `semantic` layer: Meaningful mappings
   - `base` layer: Applied to elements
   - Ensures proper cascade and override capabilities

4. **Single Source of Truth**
   - All typography values come from Figma
   - Cached in design tokens
   - Easy to update globally

## Best Practices

✅ **DO:**
```jsx
<h1>Page Title</h1>
<p>Body text here</p>
<div className="text-subtitle-1">Special text</div>
<h2 style={{ color: 'var(--color-primary-1)' }}>Colored heading</h2>
```

❌ **DON'T:**
```jsx
<h1 className="text-2xl font-bold leading-tight">Page Title</h1>
<p className="text-base font-medium">Body text here</p>
<div className="text-lg font-semibold">Special text</div>
<h2 className="text-xl font-bold text-primary">Colored heading</h2>
```

## Responsive Typography (Future)

When needed, use CSS `clamp()` for fluid typography:

```css
h1 {
  font-size: clamp(20px, 5vw, 26px);
}
```

Or use media queries:

```css
@media (max-width: 768px) {
  h1 {
    font-size: 20px;
    line-height: 28px;
  }
}
```

## Customization

To modify typography globally, update the semantic tokens in `semantic/typography.css`:

```css
--text-heading-1-size: 28px;  /* Change all h1 sizes */
--text-heading-1-weight: var(--font-weight-bold);  /* Change weight */
```

To modify primitive tokens, update `tokens/typography.css`:

```css
--font-family-primary: 'New Font', sans-serif;  /* Change default font */
--font-weight-bold: 800;  /* Change weight value */
```

## Related Files

- Color system: `src/styles/semantic/colors.css`
- Spacing system: `src/styles/tokens/spacing.css`
- Border radius: `src/styles/tokens/radius.css`
- Shadows: `src/styles/tokens/shadows.css`
