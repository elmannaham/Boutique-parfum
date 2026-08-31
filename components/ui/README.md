# UI Components

Components de base réutilisables pour Maison Maeta.

## Bento Grid Perfume

Composant de grille Bento pour mettre en avant les caractéristiques et les valeurs de la marque.

### Utilisation

```tsx
import BentoGridPerfume from "@/components/ui/bento";

export default function Page() {
  return <BentoGridPerfume />;
}
```

### Composants Exportés

#### `BentoGridPerfume` (Default Export)
Grille Bento complète avec contenu adapté aux parfums.

**Caractéristiques:**
- 3 cartes présentant les essences, collections limitées et l'art des flacons
- Design responsive (mobile, tablet, desktop)
- Animations au scroll
- Palette de couleurs ambre/or cohérente avec le site

#### `BentoCard`
Composant de carte individuelle réutilisable.

**Props:**
```tsx
type BentoCardProps = {
  eyebrow: ReactNode;           // Label au-dessus (ex: "Essences")
  title: ReactNode;              // Titre principal
  description: ReactNode;        // Description
  graphic?: ReactNode;           // Élément visuel (background, image)
  className?: string;            // Classes Tailwind personnalisées
  dark?: boolean;                // Mode sombre (default: true)
  fade?: ("top" | "bottom")[];   // Gradients de fade
};
```

**Exemple:**
```tsx
<BentoCard
  eyebrow="Essences"
  title="Naturelles & Éthiques"
  description="Sourced from the finest gardens worldwide."
  graphic={<div className="absolute inset-0 bg-amber-600" />}
/>
```

### Design

- **Couleurs**: Palette ambre/or (cohérente avec Maison Maeta)
- **Typographie**: Playfair Display pour les titres, Inter pour le texte
- **Animations**: Framer Motion (fade-in au scroll, hover effects)
- **Responsivité**: Mobile-first (grid-cols-1 → md:grid-cols-6)

### Intégration dans la Page d'Accueil

Le composant est automatiquement intégré dans `app/page.tsx` :

```tsx
import BentoDemo from '@/components/ui/bento-demo'

export default async function HomePage() {
  return (
    <>
      <HeaderPremium />
      <HeroPremium />
      <section>Featured Fragrances</section>
      <BentoDemo />  {/* ← Bento Grid ici */}
      <section>About Maison Maeta</section>
    </>
  );
}
```

### Personnalisation

#### Modifier le contenu

Éditez `components/ui/bento.tsx`:

```tsx
const bentoItems = [
  {
    eyebrow: "Votre catégorie",
    title: "Votre titre",
    description: "Votre description",
    graphic: <YourGraphic />,
    className: "md:col-span-2",
  },
  // ...
];
```

#### Ajouter des images réelles

Remplacez les `graphic` avec des images:

```tsx
import Image from 'next/image'

graphic: (
  <Image
    src="/images/product.jpg"
    alt="Product"
    fill
    className="object-cover"
  />
)
```

#### Ajuster le layout

Modifiez la grille:
- `md:grid-cols-6` → nombre de colonnes
- `gap-4 sm:gap-6` → espacement entre les cartes

#### Personnaliser les couleurs

Utilisez les classes Tailwind (palette: amber-*, rose-*):

```tsx
// De la classe BentoCard
className={classnames(
  "bg-gradient-to-br from-amber-900/80 to-amber-950/90",
  "border border-amber-700/30",
  // ...
)}
```

### Performance

- ✅ Animations optimisées avec Framer Motion
- ✅ Lazy loading avec `whileInView`
- ✅ Pas d'images externes (utilise des gradients)
- ✅ TypeScript strict mode
- ✅ CSS classes (Tailwind) sans inline styles

### Accessibilité

- ✅ Texte lisible sur tous les gradients
- ✅ Hiérarchie claire (eyebrow → title → description)
- ✅ Pas de couleurs seules (texte + contraste)
- ✅ Responsive et tactile-friendly

## Fichiers

```
components/ui/
├── bento.tsx           # Composant principal et BentoCard
├── bento-demo.tsx      # Demo pour faciliter l'utilisation
└── README.md           # Ce fichier
```
