import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with sample perfumes...");

  // Clear existing data
  await prisma.product.deleteMany();

  // Sample perfume products
  const perfumes = [
    {
      name: "Essence Nocturne",
      slug: "essence-nocturne",
      description: "Un parfum envoûtant pour les nuits étoilées",
      longDescription:
        "Essence Nocturne est une composition mystérieuse combinant des notes florales délicates avec une base boisée profonde. Parfait pour les soirées élégantes et les moments intimes.",
      priceInCents: 15999, // €159.99
      originalPriceInCents: 17999,
      fragranceFamily: "Oriental",
      volume: 100,
      concentration: "eau_de_parfum",
      topNotes: "Bergamote, Citron",
      middleNotes: "Rose, Jasmin, Muguet",
      baseNotes: "Oud, Cèdre, Musc",
      imageUrl: "/images/products/essence-nocturne.webp",
      stock: 25,
      isLimitedEdition: true,
      averageRating: 4.8,
      totalReviews: 48,
      status: "available",
      seoTitle: "Essence Nocturne | Parfum Oriental Luxe",
      seoDescription:
        "Découvrez Essence Nocturne, un parfum oriental mystérieux pour les nuits enchantées.",
    },
    {
      name: "Lumière d'Aube",
      slug: "lumiere-daube",
      description: "Fraîcheur pétillante pour débuter la journée",
      longDescription:
        "Lumière d'Aube capture l'essence de l'aube avec des notes fruitées lumineuses et une touche florale aérienne. Un parfum dynamisé qui inspire confiance et beauté.",
      priceInCents: 12999, // €129.99
      fragranceFamily: "Fresh",
      volume: 75,
      concentration: "eau_de_toilette",
      topNotes: "Grapefruit, Pêche, Mandarine",
      middleNotes: "Pivoine, Gardénia, Freesia",
      baseNotes: "Musk, Ambrette, Bois de Santal",
      imageUrl: "/images/products/lumiere-daube.webp",
      stock: 50,
      isLimitedEdition: false,
      averageRating: 4.5,
      totalReviews: 32,
      status: "available",
    },
    {
      name: "Velours Ambré",
      slug: "velours-ambre",
      description: "Douceur enveloppante et sensuelle",
      priceInCents: 18999, // €189.99
      fragranceFamily: "Amber",
      volume: 100,
      concentration: "eau_de_parfum",
      topNotes: "Vanille, Miel",
      middleNotes: "Ambre gris, Caramel",
      baseNotes: "Bois de Cèdre, Cuir, Musc blanc",
      imageUrl: "/images/products/velours-ambre.webp",
      stock: 15,
      isLimitedEdition: true,
      limitedEditionCount: 500,
      averageRating: 4.9,
      totalReviews: 26,
      status: "available",
    },
    {
      name: "Forêt Ancienne",
      slug: "foret-ancienne",
      description: "Boisé intense et mystérieux",
      priceInCents: 14999, // €149.99
      originalPriceInCents: 16999,
      fragranceFamily: "Woody",
      volume: 100,
      concentration: "eau_de_parfum",
      topNotes: "Galbanum, Romarin",
      middleNotes: "Iris, Vétiver",
      baseNotes: "Oud, Cèdre Himalayan, Tabac",
      imageUrl: "/images/products/foret-ancienne.webp",
      stock: 30,
      isLimitedEdition: false,
      averageRating: 4.6,
      totalReviews: 19,
      status: "available",
    },
    {
      name: "Jardin en Fleur",
      slug: "jardin-en-fleur",
      description: "Explosion florale délicate",
      priceInCents: 11999, // €119.99
      fragranceFamily: "Floral",
      volume: 75,
      concentration: "eau_de_toilette",
      topNotes: "Bergamote, Petitgrain",
      middleNotes: "Rose Centifolia, Pivoine, Œillet",
      baseNotes: "Cèdre, Mousse de Chêne, Ambrette",
      imageUrl: "/images/products/jardin-en-fleur.webp",
      stock: 60,
      isLimitedEdition: false,
      averageRating: 4.3,
      totalReviews: 41,
      status: "available",
    },
    {
      name: "Épices du Levant",
      slug: "epices-du-levant",
      description: "Chaleur exotique et mystérieuse",
      priceInCents: 13999, // €139.99
      fragranceFamily: "Aromatic",
      volume: 100,
      concentration: "eau_de_parfum",
      topNotes: "Poivre noir, Gingembre, Cardamome",
      middleNotes: "Cumin, Noix de muscade, Clou de Girofle",
      baseNotes: "Santal, Cèdre, Ambre gris",
      imageUrl: "/images/products/epices-du-levant.webp",
      stock: 20,
      isLimitedEdition: false,
      averageRating: 4.7,
      totalReviews: 15,
      status: "available",
    },
  ];

  for (const perfume of perfumes) {
    const product = await prisma.product.create({
      data: perfume,
    });
    console.log(`✅ Created: ${product.name}`);
  }

  console.log("✨ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
