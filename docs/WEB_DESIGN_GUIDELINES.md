# Maison Maeta — Web Design Guidelines

## Purpose
These guidelines ensure visual and interaction consistency across all pages while preserving the brand's distinctive voice. They are not constraints—they are the shape of the vision.

---

## 1. Color System

### Primary Palette
| Role | Color | Hex | Use |
|------|-------|-----|-----|
| Primary Accent | Amber Gold | `#D97706` | CTAs, highlights, borders, hover states |
| Secondary Accent | Emerald | `#1E3A1F` | Dividers, microcopy, secondary interactions |
| Dark Background | Slate | `#0F172A` | Hero section background only |
| Light Background | Cream | `#FFFBF0` | Featured sections, cards |
| Text Primary | Gray | `#1F2937` | Body copy on light backgrounds |
| Text Secondary | Gray | `#6B7280` | Supporting text, captions |
| Text Light | Gray | `#9CA3AF` | Disabled states, hints |

### Usage Rules
- **Hero section**: Dark background (`#0F172A`) + amber accent + cream text
- **Featured sections**: Light background (`#FFFBF0`) + gray text + amber CTAs
- **Product cards**: White background, gray text, amber hover underline
- **Accents only**: Do not use amber as a background on product cards; reserve it for interactive states
- **Emerald**: Use for divider lines (1px), section labels, "new" badges

### Avoid
- Using more than 3 colors on a single card
- Applying the dark background anywhere except the hero
- Using rose/red (legacy accent) — remove from codebase

---

## 2. Typography System

### Typeface Roles
| Role | Typeface | Weights | Sizes | Use |
|------|----------|---------|-------|-----|
| **Display** | Playfair Display | 700, 800, 900 | 60–120px | Hero H1, section titles |
| **Heading** | Playfair Display | 600, 700 | 28–48px | H2, H3, product names |
| **Body** | Inter | 400, 500 | 16px | Paragraph text, descriptions |
| **Utility** | Inter | 500, 600 | 12–14px | Labels, buttons, badges |

### Type Scale
```
9xl:  72px  (Hero main only)
8xl:  64px  (Hero alt)
7xl:  56px  (Section hero)
6xl:  48px  (Section title)
5xl:  40px  (Card title)
4xl:  36px  (Subsection)
3xl:  30px  (Small heading)
2xl:  24px  (Card subheading)
xl:   20px  (Emphasis)
lg:   18px  (Body large)
base: 16px  (Body default)
sm:   14px  (Small text)
xs:   12px  (Captions, labels)
```

### Letter Spacing
- **Display (Playfair)**: 0.05–0.1em (tighter for luxury feel)
- **Headings (Playfair)**: 0.02–0.05em
- **Body (Inter)**: 0 (no tracking)
- **Utility (labels, badges)**: 0.05em (uppercase)

### Font Weight Rules
- **Hero H1**: 700–800 weight, 1.1 line-height, max 60% viewport width
- **Section H2**: 600 weight, 1.2 line-height
- **Body copy**: 400 weight, 1.6 line-height
- **Emphasis (bold in body)**: 600 weight, not 700
- **Disabled/hint text**: 400 weight, opacity 0.6

### Hierarchy
1. **Hero H1**: Largest, boldest, Playfair, amber accent on one word
2. **Section titles**: Clear step down, Playfair, gray
3. **Body**: Light weight, generous line-height for luxury feel
4. **Microcopy**: Smallest, gray-400, Inter, no Playfair

---

## 3. Spacing & Layout

### Spacing Scale
| Size | Pixels | Use |
|------|--------|-----|
| xs | 4px | Component internal (badge padding) |
| sm | 8px | Button padding, small gaps |
| md | 16px | Card padding, moderate gaps |
| lg | 24px | Section internal spacing |
| xl | 32px | Component gaps |
| 2xl | 48px | Section spacing |
| 3xl | 64px | Major section breaks |
| 4xl | 80px | Hero, featured section padding |

### Container Rules
- **Max-width**: 1280px (`container` class)
- **Horizontal padding**: 16px (mobile), 24px (tablet), 32px (desktop)
- **Section padding**: 80px vertical (mobile: 40px), padding scale horizontal
- **Gap between cards**: 24px (mobile: 16px)

### White Space Philosophy
- More white space = more luxury
- Cards should feel like they're floating, not packed
- Section breaks: 80px minimum between sections
- Hero to next section: 120px (breathing room)

---

## 4. Components

### Buttons (CTAs)
**Primary Button**
- Background: `#D97706` (amber-600)
- Text: White, bold, 16px Inter
- Padding: 16px vertical, 32px horizontal
- Border-radius: 8px
- Hover: `#B45309` (darker amber), no shadow
- Active: `#92400E` (even darker)
- Animation: 150ms ease-out

**Secondary Button**
- Background: Transparent
- Border: 2px `#D97706`
- Text: `#D97706`, 16px Inter bold
- Hover: Background `#F3E8FF` (hint of accent)
- Animation: 150ms ease-out

**Disabled Button**
- Opacity: 0.5
- Cursor: not-allowed
- No hover state

### Badges
**New / Featured**
- Background: `#1E3A1F` (emerald)
- Text: White, 12px uppercase Inter 600
- Padding: 4px 8px
- Border-radius: 4px
- Placement: Top-left of product cards

**Scent Note Badge**
- Background: `#FFFBF0`
- Border: 1px `#D97706`
- Text: `#D97706`, 12px Inter
- Padding: 4px 8px
- Border-radius: 4px
- Usage: Below product name (top/middle/base notes)

### Product Cards
```
┌─────────────────────────┐
│  Image (4:5 aspect)     │
│                         │
│  [NEW]                  │  (emerald badge)
├─────────────────────────┤
│ Product Name_           │  (underline grows on hover)
│                         │
│ $120.00   $150.00       │  (strikethrough if on sale)
│                         │
│ ★★★★☆ (15 reviews)    │
│                         │
│ [Top] [Middle] [Base]   │  (note badges)
└─────────────────────────┘
```

**Card States:**
- **Default**: No shadow, gray border (1px, `#E5E7EB`)
- **Hover**: Underline grows under name (2px amber, 150ms), image dims to 0.85 opacity, shadow appears (0 4px 12px rgba(0,0,0,0.1))
- **Focus**: Visible keyboard outline (2px amber)

### Dividers
- **Color**: `#1E3A1F` (emerald)
- **Weight**: 1px
- **Margin**: 40px vertical (around sections)
- **Width**: Full width (include gutters)

---

## 5. Animations & Interactions

### Page Load
Sequence (staggered, 0.2s between items, 0.3s initial delay):
1. Hero badge fades in + slides up (300ms)
2. Hero H1 fades in + slides up (300ms, 0.2s delay)
3. Hero subheading fades in + slides up (300ms, 0.4s delay)
4. CTA buttons fade in + slide up (300ms, 0.6s delay)

Then stop. No continuous animations after load.

**Code**: Use Framer Motion `containerVariants` (staggerChildren: 0.2, delayChildren: 0.3) + `itemVariants` (opacity, y: 30).

### Hover Interactions
**Buttons**:
- Background color shift: 150ms ease-out
- No scale transform (maintains grid alignment)

**Product cards**:
- Underline growth: 2px amber line under product name, 150ms ease-out
- Image dim: opacity 0.85, 150ms
- Scent story reveal: fade in 200ms (staggered after underline)
- Shadow add: 150ms ease-out

**Links**:
- Amber underline appears (thin, 1px), 150ms
- No color change on hover (text stays gray)

### Scroll Interactions
**Product cards fade in** as they reach viewport:
- Start: opacity 0, y: 20
- End: opacity 1, y: 0
- Trigger: When card enters 80% of viewport
- Duration: 400ms ease-out
- No stagger between cards (each triggers independently)

### Reduced Motion
Respect `prefers-reduced-motion`:
- Page load sequence becomes instant (all opacity: 1, no y shift)
- Hover underline still grows (not motion, just state change)
- Scroll reveals become instant (opacity 1, no animation)
- Floating blobs removed entirely

---

## 6. Responsive Design

### Breakpoints
| Size | Width | Use |
|------|-------|-----|
| Mobile | < 640px | Touch-optimized, single column |
| Tablet | 640–1024px | Two-column grids |
| Desktop | ≥ 1024px | Three-column grids, full layout |

### Rules
- **Mobile first**: Design for 320px, scale up
- **Touch targets**: Minimum 48px height/width
- **Padding**: 16px mobile, 24px tablet, 32px desktop
- **Font sizes**: Scale down 10–15% on mobile (xs: 10px, sm: 12px, base: 14px)
- **Hero H1**: 44px mobile, 64px tablet, 96px desktop
- **Product grid**: 1 column mobile, 2 tablet, 3 desktop

### Hamburger Menu
- Visible only < 768px
- Amber accent on active state
- Smooth slide-out animation (200ms)

---

## 7. Accessibility

### Color Contrast
- Text on background: ≥ 4.5:1 (WCAG AA)
- Test: All text on amber `#D97706` must be white (not cream)
- Test: All body text on cream must be gray (not light gray)

### Keyboard Navigation
- All interactive elements focusable (buttons, links, inputs)
- Focus outline: 2px amber, 4px offset
- Tab order: logical, left-to-right, top-to-bottom
- Skip link: "Skip to main content" link at top of page

### Images
- All product images have descriptive alt text (e.g., "Essence Nocturne eau de parfum bottle, 100ml")
- Decorative images (hero background, dividers) have empty alt=""

### Motion
- `prefers-reduced-motion` media query respected (see Animations section)
- No auto-playing video or animation on page load (user controls motion)

---

## 8. File Organization

```
components/
├── common/
│   ├── HeaderPremium.tsx (navigation, search, cart)
│   ├── FooterPremium.tsx
│   └── Badge.tsx
├── products/
│   ├── ProductCard.tsx (scent notes, hover reveal)
│   ├── ProductCardPremium.tsx (featured card)
│   └── ProductGrid.tsx
└── home/
    ├── HeroPremium.tsx (page load sequence)
    └── FeaturedSection.tsx

styles/
├── globals.css (Tailwind directives)
├── variables.css (if needed for custom properties)
└── animations.css (if needed for keyframes)

tailwind.config.ts (color tokens, typography, spacing)
```

---

## 9. Quality Checklist

Before merging any component:
- [ ] Passes color contrast tests (WCAG AA)
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Respects `prefers-reduced-motion`
- [ ] Mobile responsive (test at 320px, 640px, 1024px)
- [ ] Animations complete in < 500ms (except page load, which stagger)
- [ ] No hardcoded colors outside Tailwind tokens
- [ ] Typo scale and weights follow guidelines
- [ ] Spacing uses defined scale (4, 8, 16, 24, 32, 48, 64, 80)
- [ ] Hover states defined for all interactive elements
- [ ] Focus states visible (2px amber outline)
- [ ] Alt text on all product images
- [ ] No layout shifts on hover/focus (use outline, not border)

---

## 10. Color Token Reference (Tailwind)

```typescript
// tailwind.config.ts
colors: {
  // Primary
  amber: { 500: '#F59E0B', 600: '#D97706', 700: '#B45309', 800: '#92400E' },
  
  // Neutral
  slate: { 950: '#0F172A' },
  gray: { 50: '#F9FAFB', 900: '#111827', ... },
  
  // Secondary
  emerald: { 50: '#F0FDF4', 950: '#1E3A1F' },
  
  // Text
  cream: '#FFFBF0',
  white: '#FFFFFF',
}
```

**Usage in components**:
```jsx
// DO ✓
<button className="bg-amber-600 hover:bg-amber-700 text-white">
<div className="border-b border-emerald-950">

// DON'T ✗
<button className="bg-amber-400">  // Wrong shade
<div className="border-b border-gray-300">  // Wrong color
```

---

## 11. Animation Reference (Framer Motion)

### Page Load Stagger
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};
```

### Hover Underline Growth
```typescript
<motion.div className="border-b-2 border-amber-600 w-0 group-hover:w-full" />
```

### Scroll Fade
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.8 }}
  transition={{ duration: 0.4 }}
>
```

---

## Next Steps

1. **Audit current codebase** against these guidelines
2. **Refine color palette** in tailwind.config.ts (remove unused ambers)
3. **Update ProductCard component** with scent notes + hover reveal
4. **Remove ambient animations** (floating blobs) from HeroPremium
5. **Test** at 320px, 640px, 1024px, and 1440px
6. **Accessibility check** with WAVE or Axe DevTools
