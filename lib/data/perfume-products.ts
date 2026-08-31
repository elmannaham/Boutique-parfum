/**
 * Catalogue de 13 parfums de luxe - Maison Maeta
 * Chaque produit inclut:
 * - Identifiant unique
 * - Nom et description
 * - Profil olfactif (pyramide olfactive)
 * - Caractéristiques (concentration, durée, saison)
 * - Image (chemin pour images générées par Midjourney)
 * - Prix et disponibilité
 */

export type PerfumeProfile = {
  top: string[];
  heart: string[];
  base: string[];
};

export type PerfumeCharacteristics = {
  concentration: "Eau de Cologne" | "Eau de Toilette" | "Eau de Parfum" | "Parfum";
  longevity: "2-4 hours" | "4-6 hours" | "6-8 hours" | "8+ hours";
  season: "Spring" | "Summer" | "Fall" | "Winter" | "Year-round";
  sillage: "Soft" | "Moderate" | "Strong" | "Intense";
};

export type PerfumeProduct = {
  id: string;
  name: string;
  frenchName?: string;
  description: string;
  profile: PerfumeProfile;
  characteristics: PerfumeCharacteristics;
  volume: number; // ML
  price: number;
  image: string; // Path: /images/perfumes/[id].jpg
  availability: "In Stock" | "Limited Stock" | "Pre-order";
  rating: number; // 0-5
  reviews: number;
  tags: string[];
  story: string; // Court récit du parfum
  isNew: boolean;
  isLimited: boolean;
};

export const PERFUME_PRODUCTS: PerfumeProduct[] = [
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    frenchName: "Rose de Minuit",
    description:
      "An intoxicating blend of dark rose, oud, and amber that captures the essence of luxury nightlife.",
    profile: {
      top: ["Red Apple", "Grapefruit", "Black Pepper"],
      heart: ["Damascene Rose", "Iris", "Peony"],
      base: ["Oud", "Amber", "Musk", "Sandalwood"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Fall",
      sillage: "Intense",
    },
    volume: 100,
    price: 245,
    image: "/images/perfumes/midnight-rose.jpg",
    availability: "In Stock",
    rating: 4.9,
    reviews: 287,
    tags: ["Floral", "Oriental", "Luxury", "Evening"],
    story:
      "Inspired by the contrast between rose gardens at midnight and the vibrant nightlife of Paris.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "golden-amber",
    name: "Golden Amber",
    frenchName: "Ambre Doré",
    description: "Warm amber enhanced with citrus and spices, perfect for both day and evening.",
    profile: {
      top: ["Bergamot", "Lemon", "Ginger"],
      heart: ["Vanilla", "Cinnamon", "Nutmeg"],
      base: ["Amber", "Cedarwood", "Tonka Bean"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Year-round",
      sillage: "Moderate",
    },
    volume: 75,
    price: 189,
    image: "/images/perfumes/golden-amber.jpg",
    availability: "In Stock",
    rating: 4.8,
    reviews: 342,
    tags: ["Warm", "Amber", "Citrus", "Versatile"],
    story:
      "A timeless composition that evokes the warmth of sunset and the comfort of luxury.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "crystal-water",
    name: "Crystal Water",
    frenchName: "Eau Cristalline",
    description:
      "Fresh aquatic notes with white florals, evoking the purity of mountain springs.",
    profile: {
      top: ["Neroli", "Galbanum", "Lemon"],
      heart: ["Lily of the Valley", "White Peony", "Aquatic Notes"],
      base: ["Musks", "Light Cedar", "Mineral Notes"],
    },
    characteristics: {
      concentration: "Eau de Toilette",
      longevity: "4-6 hours",
      season: "Spring",
      sillage: "Soft",
    },
    volume: 100,
    price: 145,
    image: "/images/perfumes/crystal-water.jpg",
    availability: "In Stock",
    rating: 4.7,
    reviews: 198,
    tags: ["Fresh", "Aquatic", "Floral", "Day Wear"],
    story:
      "Capturing the essence of pristine alpine waters and the first bloom of spring.",
    isNew: true,
    isLimited: false,
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    frenchName: "Brise Océane",
    description:
      "Crisp sea salt combined with fresh citrus and driftwood, evoking coastal bliss.",
    profile: {
      top: ["Sea Salt", "Grapefruit", "Lavender"],
      heart: ["Seaweed Accord", "Geranium", "Cyclamen"],
      base: ["Driftwood", "Ambroxan", "Light Musk"],
    },
    characteristics: {
      concentration: "Eau de Toilette",
      longevity: "6-8 hours",
      season: "Summer",
      sillage: "Moderate",
    },
    volume: 100,
    price: 165,
    image: "/images/perfumes/ocean-breeze.jpg",
    availability: "In Stock",
    rating: 4.6,
    reviews: 223,
    tags: ["Fresh", "Citrus", "Marine", "Unisex"],
    story:
      "Inspired by lazy summer days spent by the Mediterranean coast.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "honey-spice",
    name: "Honey & Spice",
    frenchName: "Miel et Épices",
    description:
      "Golden honey balanced with warming spices and woody undertones.",
    profile: {
      top: ["Clove", "Black Pepper", "Star Anise"],
      heart: ["Honey", "Cinnamon", "Cardamom"],
      base: ["Sandalwood", "Amber", "Tonka"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Fall",
      sillage: "Strong",
    },
    volume: 100,
    price: 225,
    image: "/images/perfumes/honey-spice.jpg",
    availability: "In Stock",
    rating: 4.8,
    reviews: 267,
    tags: ["Gourmand", "Spicy", "Warm", "Luxury"],
    story:
      "A celebration of nature's sweetest treasures mixed with exotic spices.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "noir-intensity",
    name: "Noir Intensity",
    frenchName: "Noir Intensité",
    description:
      "Deep, mysterious blend of smoke, leather, and exotic woods.",
    profile: {
      top: ["Coriander", "Cardamom", "Tobacco"],
      heart: ["Leather", "Agarwood", "Iris"],
      base: ["Oud", "Vetiver", "Incense", "Leather"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Winter",
      sillage: "Intense",
    },
    volume: 100,
    price: 295,
    image: "/images/perfumes/noir-intensity.jpg",
    availability: "Limited Stock",
    rating: 4.9,
    reviews: 134,
    tags: ["Oriental", "Woody", "Dark", "Masculine"],
    story:
      "For the sophisticated man who appreciates depth and complexity.",
    isNew: false,
    isLimited: true,
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    frenchName: "Jardin de Roses",
    description:
      "A classic composition of multi-layered roses with green notes.",
    profile: {
      top: ["Galbanum", "Pink Pepper", "Bergamot"],
      heart: [
        "Rosa Centifolia",
        "Rosa Damascena",
        "Geranium",
        "Violet Leaf",
      ],
      base: ["Sandalwood", "Cedar", "Musk"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Spring",
      sillage: "Moderate",
    },
    volume: 100,
    price: 215,
    image: "/images/perfumes/rose-garden.jpg",
    availability: "In Stock",
    rating: 4.8,
    reviews: 301,
    tags: ["Floral", "Rose", "Classic", "Feminine"],
    story:
      "A timeless tribute to the beauty and elegance of a blooming rose garden.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "cedar-smoke",
    name: "Cedar Smoke",
    frenchName: "Fumée de Cèdre",
    description:
      "Woody and smoky with hints of incense and subtle florals.",
    profile: {
      top: ["Saffron", "Pepper", "Ginger"],
      heart: ["Incense", "Iris", "Sage"],
      base: ["Cedar", "Vetiver", "Patchouli", "Smoke"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Fall",
      sillage: "Strong",
    },
    volume: 100,
    price: 235,
    image: "/images/perfumes/cedar-smoke.jpg",
    availability: "In Stock",
    rating: 4.7,
    reviews: 178,
    tags: ["Woody", "Smoky", "Unisex", "Sophisticated"],
    story:
      "Inspired by the aroma of cedarwood smoke rising from a winter fireplace.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "peach-blossom",
    name: "Peach Blossom",
    frenchName: "Fleur de Pêche",
    description:
      "Juicy peach combined with delicate cherry blossom and soft florals.",
    profile: {
      top: ["Peach", "Yuzu", "Bergamot"],
      heart: ["Cherry Blossom", "Plum", "Peony"],
      base: ["Almond", "Vanilla", "Musk"],
    },
    characteristics: {
      concentration: "Eau de Toilette",
      longevity: "4-6 hours",
      season: "Spring",
      sillage: "Soft",
    },
    volume: 100,
    price: 155,
    image: "/images/perfumes/peach-blossom.jpg",
    availability: "In Stock",
    rating: 4.6,
    reviews: 214,
    tags: ["Fruity", "Floral", "Fresh", "Feminine"],
    story:
      "The sweet essence of spring blooms and ripe peaches.",
    isNew: true,
    isLimited: false,
  },
  {
    id: "bergamot-lavender",
    name: "Bergamot Lavender",
    frenchName: "Bergamote Lavande",
    description:
      "Crisp bergamot with soothing lavender and herbal green notes.",
    profile: {
      top: ["Bergamot", "Lemon", "Petitgrain"],
      heart: ["Lavender", "Rosemary", "Sage"],
      base: ["Cedarwood", "Vetiver", "Musk"],
    },
    characteristics: {
      concentration: "Eau de Toilette",
      longevity: "6-8 hours",
      season: "Spring",
      sillage: "Moderate",
    },
    volume: 100,
    price: 145,
    image: "/images/perfumes/bergamot-lavender.jpg",
    availability: "In Stock",
    rating: 4.6,
    reviews: 289,
    tags: ["Fresh", "Herbal", "Citrus", "Unisex"],
    story:
      "Calm and clarity in every spray.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "moonlight-gardenia",
    name: "Moonlight Gardenia",
    frenchName: "Gardénia au Clair de Lune",
    description:
      "Night-blooming gardenia with soft musks and lunar florals.",
    profile: {
      top: ["Neroli", "Yuzu", "Galbanum"],
      heart: ["Gardenia", "Tuberose", "Heliotrope"],
      base: ["Musk", "Vanilla", "Sandalwood"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Summer",
      sillage: "Moderate",
    },
    volume: 75,
    price: 205,
    image: "/images/perfumes/moonlight-gardenia.jpg",
    availability: "In Stock",
    rating: 4.8,
    reviews: 143,
    tags: ["Floral", "Night-blooming", "Feminine", "Romantic"],
    story:
      "The intoxicating fragrance of gardenias under moonlight.",
    isNew: true,
    isLimited: false,
  },
  {
    id: "coffee-leather",
    name: "Coffee Leather",
    frenchName: "Cuir Café",
    description:
      "Roasted coffee blended with smooth leather and woody undertones.",
    profile: {
      top: ["Coffee", "Cardamom", "Pepper"],
      heart: ["Leather", "Tobacco", "Iris"],
      base: ["Vetiver", "Cedar", "Sandalwood", "Musk"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Fall",
      sillage: "Strong",
    },
    volume: 100,
    price: 255,
    image: "/images/perfumes/coffee-leather.jpg",
    availability: "In Stock",
    rating: 4.8,
    reviews: 187,
    tags: ["Aromatic", "Leather", "Dark", "Masculine"],
    story:
      "For those who appreciate the finer things in life.",
    isNew: false,
    isLimited: false,
  },
  {
    id: "iris-silk",
    name: "Iris Silk",
    frenchName: "Iris Soie",
    description:
      "Creamy iris root butter with soft florals and woody base.",
    profile: {
      top: ["Mandarin", "Green Notes", "Bergamot"],
      heart: ["Iris", "Violet Leaf", "Orris"],
      base: ["Sandalwood", "Cedarwood", "Musk", "Amber"],
    },
    characteristics: {
      concentration: "Eau de Parfum",
      longevity: "8+ hours",
      season: "Spring",
      sillage: "Soft",
    },
    volume: 100,
    price: 235,
    image: "/images/perfumes/iris-silk.jpg",
    availability: "In Stock",
    rating: 4.7,
    reviews: 164,
    tags: ["Floral", "Iris", "Elegant", "Feminine"],
    story:
      "The refined elegance of iris petals on silk.",
    isNew: false,
    isLimited: false,
  },
];
