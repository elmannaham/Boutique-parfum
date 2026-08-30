# Maison Maeta — Frontend Design Direction

## Audit Summary

**Current State:** The design demonstrates strong fundamentals but leans toward luxury defaults that appear across many high-end boutique sites.

### Strengths ✅
- **Coherent color system**: Amber palette is intentional and applied consistently
- **Clear type hierarchy**: Playfair Display (serif) + Inter (sans) creates professional luxury feel
- **Generous spacing**: Breathing room throughout reinforces premium positioning
- **Smooth animations**: Framer Motion transitions feel refined (fade/slide patterns)
- **Responsive structure**: Layout scales gracefully across breakpoints

### Risks ⚠️

The design currently lives in the **"luxury default" category**:
- **Black/very-dark background + warm gold accent** is a legitimate choice, but it's also the default move for luxury e-commerce
- **Animated radial gradients (blobs)** with blur effects are common in 2024 (Figma templates, AI generators)
- **Staggered container animations** (fade in, slide up) are industry standard
- **Playfair Display + minimalist layout** is elegant but not distinctive to Maison Maeta specifically

**The risk:** A visitor could confuse this with a jewelry site, a whiskey brand, or a high-end skincare line. Nothing here says "perfume" in particular.

---

## Design Improvements

### 1. **Signature Element: Scent Visualization**
**The Problem:** Perfume is invisible. The hero shows text and gradients, but nothing evokes scent.

**The Solution:** Introduce an abstract **scent topography**—a visual encoding of fragrance notes as an animated, minimal landscape. Each product could have its own subtle variation.

**Why:** This is specific to perfume, memorable, and justifies the animation budget (not just decoration, but information).

### 2. **Typography: Restraint + Character**
**Current:** Playfair + Inter is safe. Both are beautiful, but both are defaults.

**Recommendation:** Keep Playfair (it works), but:
- Use it **only** for hero and section titles (restraint)
- Introduce **letter-spacing and weight shifts** to give Playfair personality (not just size changes)
- Consider a **display-weight serif** (like Playfair's heavier weights) for product names instead of generic labels

**Why:** Playfair at 9xl is attention-grabbing; Playfair at 2xl with deliberate tracking and weight becomes a signature.

### 3. **Color Hierarchy: Go Deeper**
**Current:** Ambers (50–900 range) + grays + rose accent.

**Recommendation:**
- **Reduce the palette**: Lean on 3–4 specific ambers, not all 9 shades
- **Add a secondary accent**: One unexpected color (deep forest green, dusty plum, or charcoal with gold lines) for microcopy, dividers, or hover states
- **Use negative space**: Let white/light backgrounds dominate; reserve dark backgrounds for the hero only

**Why:** Discipline in color is what separates luxury from busyness. Specificity (3 chosen ambers) beats range.

### 4. **Animation Philosophy: Purposeful, Not Ambient**
**Current:** Continuous floating blobs, staggered fades, radial gradient loops. Lots of motion.

**Recommendation:**
- **Remove ambient animations** (floating blobs, background loops) — they work but they're expected
- **Introduce page-load choreography**: A single coordinated reveal sequence on first visit (hero headline, then subheading, then CTA) — one memorable moment
- **Hover interactions**: Subtle, fast (150–200ms) responses on interactive elements
- **Scroll reveals**: Product cards fade in as they reach the viewport

**Why:** "Less is more" is cliché, but it's true for animation — one orchestrated moment lands harder than continuous ambient motion. The latter feels generated.

### 5. **Product Cards: Give Them Life**
**Current:** Grid of cards with product image, name, price.

**Recommendation:**
- **Add fragrance note badges** (top, middle, base notes as small tags or icons)
- **On hover: reveal the scent story** (a 1-sentence poetic description of what the perfume *evokes*)
- **Subtle underline on product name**: A thin, amber line that grows on hover

**Why:** This embeds fragrance-specific information into the card structure and gives each product narrative, not just listing.

---

## Visual Tokens (Refined)

### Color Palette (Reduced)
```
Primary Accent:    #D97706 (amber-600)     // Main CTA, highlights
Dark Background:   #0F172A (slate-950)     // Hero only
Light Background:  #FFFBF0 (amber-50)      // Featured sections
Text Primary:      #1F2937 (gray-900)      // On light
Text Secondary:    #F3E8FF (purple-50)     // On dark, if used
Accent Secondary:  #1E3A1F (emerald-950)   // Dividers, microcopy

Gold Subaccent:    #F59E0B (amber-500)     // Hover, secondary buttons
```

### Typography
- **Display (Hero, H1)**: Playfair Display, 700–900 weight, 60–120px, 1.1 line-height, 0.05–0.1em letter-spacing
- **Heading (H2, H3)**: Playfair Display, 600–700 weight, 28–40px
- **Body**: Inter, 400–500 weight, 16px line-height 1.6
- **Utility (Labels, buttons)**: Inter, 500–600 weight, 12–14px, uppercase with 0.05em letter-spacing

### Spacing
- **Section padding**: 80px (mobile: 40px)
- **Component gap**: Multiples of 8px (8, 16, 24, 32, 48)
- **Typography margin**: 16–24px between blocks

---

## Signature Moment

**The Scent Reveal on Product Hover:**
When a user hovers a product card:
1. Product image dims slightly (opacity 0.85)
2. A thin amber line (2px) grows beneath the product name (150ms)
3. The scent story (top / middle / base notes) fades in below the price (200ms delay)
4. On touch devices, tap to reveal; second tap/away to hide

This one element says "this is a perfume site," gives each product narrative, and justifies subtle interaction design.

---

## What Not to Change

- The amber palette ✅ — it's working, just needs discipline
- Playfair Display ✅ — keep it, just use it with more intention
- Responsive breakpoints ✅ — working well
- The general layout structure ✅ — spacious, clean, right for luxury

---

## Implementation Order

1. **Refine color palette** — delete unused ambers, commit to 3–4
2. **Audit animations** — remove ambient blobs/loops, keep page-load sequence
3. **Add scent note labels** to product cards
4. **Implement hover reveal** (scent story + underline growth)
5. **Typography refinement** — increase letter-spacing, refine weights
6. **Test** — does it still feel like Maison Maeta, or does it feel more like Maison-Generic?

---

## Success Criteria

✓ A visitor knows this is a perfume site (not jewelry, skincare, spirits)
✓ No part of the design feels like a template
✓ Animation serves the content (scent story reveal), not decoration alone
✓ Color palette is cohesive and constrained (≤5 colors on any given screen)
✓ Product cards are memorable and specific to perfume
