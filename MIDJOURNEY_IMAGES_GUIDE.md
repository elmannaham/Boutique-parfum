# Guide - Générer les Images Perfum avec Midjourney

## 📸 Prompt Midjourney Principal

Utilisez ce prompt pour générer des images de parfum professionnelles :

```
Product photography, perfume bottle with red liquid inside on top of black rocks
surrounded by berries, forest background, photo taken from the front, vibrant colors,
soft lighting, high resolution, hyper realistic, highly detailed, sharp focus,
commercial photography, professional product photographer, stunning photography,
trending in art station, behance award winning photography, instagram story,
advertising photography, beautiful, aesthetic, minimalistic, modern, sleek,
shot using Canon EOS R5 camera --ar 3:4 --v 7 --stylize 750
```

## 🎨 Variations par Produit

Pour chaque parfum, adaptez légèrement le prompt pour refléter sa personnalité :

### Midnight Rose
```
[BASE PROMPT] with deep red liquid and dark moody atmosphere, roses and thorns around the bottle, luxury luxury edition, mysterious --seed 12345
```

### Golden Amber
```
[BASE PROMPT] with golden amber liquid, warm sunlight, amber crystals and spices around bottle, warm glowing effect, luxury gold edition --seed 12346
```

### Crystal Water
```
[BASE PROMPT] with clear crystalline liquid, cool blue tones, water droplets, fresh alpine flowers, minimalist composition, pure and clean aesthetic --seed 12347
```

### Velvet Orchid
```
[BASE PROMPT] with deep purple liquid, velvet orchid flowers, dark luxurious setting, black velvet draping, sensual and mysterious --seed 12348
```

### Ocean Breeze
```
[BASE PROMPT] with clear blue liquid, ocean waves, sea salt crystals, driftwood, coastal landscape background, fresh maritime aesthetic --seed 12349
```

### Honey & Spice
```
[BASE PROMPT] with golden honey-colored liquid, cinnamon sticks and spices scattered, warm tones, exotic spice trade aesthetic --seed 12350
```

### Silk Jasmine
```
[BASE PROMPT] with pale yellow liquid, delicate jasmine flowers, soft silk fabrics, gentle morning light, romantic aesthetic --seed 12351
```

### Noir Intensity
```
[BASE PROMPT] with very dark liquid almost black, leather and incense smoke, dark wooden background, intense and mysterious mood --seed 12352
```

### Rose Garden
```
[BASE PROMPT] with soft pink liquid, surrounded by multiple varieties of roses in full bloom, lush garden setting, romantic classical aesthetic --seed 12353
```

### Cedar Smoke
```
[BASE PROMPT] with amber liquid, cedarwood chips and smoke wisps, fireplace setting, warm wooden tones, cozy luxurious atmosphere --seed 12354
```

### Peach Blossom
```
[BASE PROMPT] with peachy pink liquid, cherry blossoms and peach fruit, spring garden setting, soft pastel colors, romantic springtime aesthetic --seed 12355
```

### Vetiver Night
```
[BASE PROMPT] with green tinted liquid, vetiver grass and green leaves, cool moonlit atmosphere, fresh and sophisticated aesthetic --seed 12356
```

### Vanilla Caramel
```
[BASE PROMPT] with caramel-brown liquid, caramel drips, toasted almonds, warm creamy atmosphere, gourmand luxury aesthetic --seed 12357
```

### Bergamot Lavender
```
[BASE PROMPT] with clear pale yellow liquid, lavender flowers and citrus, herbaceous aromatic setting, fresh and calm aesthetic --seed 12358
```

### White Musk
```
[BASE PROMPT] with pure white liquid, white flowers and soft folds of fabric, minimal composition, pure elegant aesthetic --seed 12359
```

### Spice Route
```
[BASE PROMPT] with rich amber liquid, exotic spices from around the world, ancient silk road caravan background, adventurous luxury aesthetic --seed 12360
```

### Moonlight Gardenia
```
[BASE PROMPT] with pale cream liquid, gardenia flowers in moonlight, night garden setting, luminous romantic atmosphere --seed 12361
```

### Coffee Leather
```
[BASE PROMPT] with dark brown liquid, coffee beans and leather texture, moody masculine setting, sophisticated dark aesthetic --seed 12362
```

### Iris Silk
```
[BASE PROMPT] with soft lavender liquid, iris flowers and flowing silk fabric, elegant refined setting, luxurious sophisticated aesthetic --seed 12363
```

### Sea Salt & Driftwood
```
[BASE PROMPT] with translucent blue liquid, weathered driftwood, sea salt crystals, coastal tide pools, raw natural luxury aesthetic --seed 12364
```

## 📋 Processus Complet

### Étape 1: Générer les Images

1. **Ouvrez Midjourney** (Discord ou Web)
2. **Copiez le prompt** adapté pour chaque parfum
3. **Lancez la génération** avec `/imagine`
4. **Attendez** que Midjourney génère 4 variations
5. **Sélectionnez la meilleure** (généralement celle avec les meilleures proportions et couleurs)
6. **Upscalez** la meilleure version avec "Upscale (2x)"

### Étape 2: Télécharger et Optimiser

1. **Téléchargez l'image** depuis Midjourney
2. **Redimensionnez** à 800x1000px (format parfum portrait)
3. **Compressez** avec TinyPNG ou ImageOptim
   - Réduisez la taille à <200KB
   - Conservez la qualité visuelle
4. **Convertissez en WebP** (optionnel, 30% plus petit)

### Étape 3: Organiser les Fichiers

Créez cette structure :

```
public/images/perfumes/
├── midnight-rose.jpg
├── golden-amber.jpg
├── crystal-water.jpg
├── velvet-orchid.jpg
├── ocean-breeze.jpg
├── honey-spice.jpg
├── silk-jasmine.jpg
├── noir-intensity.jpg
├── rose-garden.jpg
├── cedar-smoke.jpg
├── peach-blossom.jpg
├── vetiver-night.jpg
├── vanilla-caramel.jpg
├── bergamot-lavender.jpg
├── white-musk.jpg
├── spice-route.jpg
├── moonlight-gardenia.jpg
├── coffee-leather.jpg
├── iris-silk.jpg
└── sea-salt-driftwood.jpg
```

### Étape 4: Vérifier l'Intégration

```bash
# Les images sont utilisées par:
# - lib/data/perfume-products.ts (chemins d'image)
# - components/products/PerfumeGrid.tsx (affichage)
# - app/products/[id]/page.tsx (page détail)

npm run dev
# Vérifiez: http://localhost:3000/products
```

## 🎯 Tips pour Midjourney

### Améliorer la Cohérence
- **Utilisez les mêmes seeds** pour chaque parfum (voir ci-dessus)
- **Gardez une lumière cohérente** (soft lighting)
- **Même style de composition** (front-facing product shot)
- **Même résolution d'aspect** (--ar 3:4)

### Améliorer la Qualité
- **Ajoutez `--quality 2`** pour plus de détails
- **Augmentez `--stylize 1000`** pour plus d'esthétique
- **Utilisez `--niji 5`** pour un style plus anime-like (optionnel)
- **Essayez `--style raw`** pour moins d'édition automatique

### Corrections Courantes

**Image trop claire/foncée?**
```
Ajouter: "with dramatic lighting and shadows" ou "with bright cheerful lighting"
```

**Couleur du liquide incorrecte?**
```
Ajouter: "with [specific color] liquid inside" (example: "with deep rose liquid inside")
```

**Bouteille mal formée?**
```
Ajouter: "perfect crystal perfume bottle, symmetrical, professional product shot"
```

**Arrière-plan confus?**
```
Ajouter: "minimalist clean background" ou garder le background naturel
```

## 📊 Coût Estimé

- **20 images × 4 variations** = 80 générations
- **Coût Midjourney**: ~$0.08-0.10 par image
- **Budget total**: ~$8-10 pour tous les parfums

## ✅ Checklist Finale

- [ ] 20 images générées et téléchargées
- [ ] Images redimensionnées (800x1000px)
- [ ] Images compressées (<200KB chacune)
- [ ] Dossier `public/images/perfumes/` créé
- [ ] Tous les fichiers nommés correctement
- [ ] `npm run dev` fonctionne
- [ ] Les images s'affichent sur la page produits
- [ ] Performance OK (Lighthouse > 90)

## 🚀 Déploiement

Une fois les images prêtes :

```bash
# Commit les images
git add public/images/perfumes/
git commit -m "feat: add midjourney generated perfume product images"

# Push
git push origin main

# Vercel déploiera automatiquement
```

## 📸 Exemples de Résultats Attendus

Chaque image devrait montrer :
- ✅ Bouteille de parfum claire et centée
- ✅ Liquide avec la couleur appropriée
- ✅ Éléments contextuels (fleurs, épices, etc.)
- ✅ Arrière-plan professionnel
- ✅ Lighting naturel et professionnel
- ✅ Composition équilibrée et esthétique

---

**Besoin d'aide?** Consultez la documentation Midjourney : https://docs.midjourney.com/
