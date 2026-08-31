/**
 * Exemples d'intégration du Bento Grid avec des images de parfum
 * Générez les images avec Midjourney en utilisant ce prompt:
 *
 * "Product photography, perfume bottle with red liquid inside on top of black rocks
 *  surrounded by berries, forest background, photo taken from the front, vibrant colors,
 *  soft lighting, high resolution, hyper realistic, highly detailed, sharp focus,
 *  commercial photography, professional product photographer, stunning photography,
 *  trending in art station, behance award winning photography, instagram story,
 *  advertising photography, beautiful, aesthetic, minimalistic, modern, sleek,
 *  shot using Canon EOS R5 camera --ar 3:4 --v 7 --stylize 750"
 */

import Image from "next/image";

// ============================================================================
// EXEMPLE 1: Utiliser Next.js Image Component (RECOMMANDÉ)
// ============================================================================

export const BentoCardWithImage = ({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <div className="relative h-80 overflow-hidden rounded-2xl">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-amber-100/80 mt-2">{description}</p>
      </div>
    </div>
  );
};

// ============================================================================
// EXEMPLE 2: Utiliser un background URL (SIMPLE)
// ============================================================================

export const BentoCardWithBackgroundUrl = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  return (
    <div
      className="relative h-80 overflow-hidden rounded-2xl bg-cover bg-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      {/* Gradient overlay pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-amber-100/80 mt-2">{description}</p>
      </div>
    </div>
  );
};

// ============================================================================
// EXEMPLE 3: Configuration pour intégrer dans BentoGridPerfume
// ============================================================================

/**
 * Remplacez la partie `bentoItems` dans bento.tsx par ceci:
 *
 * const bentoItems = [
 *   {
 *     eyebrow: "Essences",
 *     title: "Naturelles & Éthiques",
 *     description: "Sourced from the finest gardens worldwide...",
 *     graphic: (
 *       <Image
 *         src="/images/perfume-essence.jpg"  // Image générée par Midjourney
 *         alt="Perfume Essence"
 *         fill
 *         className="object-cover"
 *       />
 *     ),
 *     className: "md:col-span-2",
 *   },
 * ];
 */

// ============================================================================
// EXEMPLE 4: Variantes avec différentes images
// ============================================================================

export const bentoConfigWithImages = [
  {
    eyebrow: "Essences",
    title: "Naturelles & Éthiques",
    description:
      "Sourced from the finest gardens worldwide. Each essence tells a story of origin and craftsmanship.",
    imagePath: "/images/perfume-essence.jpg",
    imageAlt: "Natural perfume essence",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    eyebrow: "Exclusivité",
    title: "Collections Limitées",
    description:
      "Rare, numbered editions. Only 500 bottles per collection, each hand-sealed with a certificate.",
    imagePath: "/images/perfume-limited-edition.jpg",
    imageAlt: "Limited edition perfume bottle",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    eyebrow: "Craftsmanship",
    title: "Flacon Art",
    description:
      "Crystal bottles designed by renowned artisans. Each bottle is a sculpture, a masterpiece to display.",
    imagePath: "/images/perfume-flacon.jpg",
    imageAlt: "Crystal perfume bottle",
    className: "md:col-span-2 md:row-span-1",
  },
];

// ============================================================================
// INSTRUCTIONS D'INTÉGRATION
// ============================================================================

/**
 * ÉTAPE 1: Préparer les images
 *
 * 1. Générez les images avec Midjourney (utilisez le prompt fourni)
 * 2. Téléchargez les images au format JPG/WebP
 * 3. Placez-les dans: public/images/
 *    - perfume-essence.jpg
 *    - perfume-limited-edition.jpg
 *    - perfume-flacon.jpg
 *
 * ÉTAPE 2: Optimiser les images
 *
 * 1. Redimensionnez à ~1200x1500px (mobile) et ~800x800px (web)
 * 2. Compressez avec TinyPNG ou ImageOptim
 * 3. Convertissez en WebP pour meilleure compression
 *
 * ÉTAPE 3: Mettre à jour bento.tsx
 *
 * Remplacez les graphics par:
 *
 * graphic: (
 *   <Image
 *     src="/images/perfume-essence.jpg"
 *     alt="Perfume essence with natural flowers"
 *     fill
 *     className="object-cover"
 *     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 *   />
 * )
 *
 * ÉTAPE 4: Tester et vérifier
 *
 * npm run dev
 * Vérifiez que les images s'affichent correctement sur mobile, tablet, desktop
 * Vérifiez le performance avec Lighthouse
 */

// ============================================================================
// OPTIMISATION PERFORMANCE
// ============================================================================

/**
 * Pour les images Next.js:
 *
 * - Utilisez le composant Image (automatic optimization)
 * - Définissez les 'sizes' pour responsive images
 * - Utilisez priority={true} SEULEMENT pour la première image visible
 * - WebP format réduit la taille de 25-35%
 *
 * Pour les background URLs:
 *
 * - Utilisez les URLs d'un CDN (Cloudinary, Vercel Blob)
 * - Optionnel: ajouter lazy loading avec Intersection Observer
 */
