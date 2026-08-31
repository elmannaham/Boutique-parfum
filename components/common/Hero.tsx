"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_href?: string;
  background_image: string;
  priority?: boolean;
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  cta_text = "Découvrir",
  cta_href = "/products",
  background_image,
  priority = true,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden md:min-h-[700px]"
      role="region"
      aria-label="Hero section - Maison Maeta"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background_image}
          alt="Arrière-plan héroïque"
          fill
          className="object-cover object-center"
          priority={priority}
          quality={90}
          sizes="100vw"
        />
        {/* Overlay pour garantir le contraste et la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Accent line */}
        <motion.div
          className="mb-6 h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          variants={itemVariants}
          aria-hidden="true"
        />

        {/* Main Title */}
        <motion.h1
          className="font-light text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight text-white drop-shadow-lg"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-4 text-lg md:text-xl text-neutral-100 max-w-2xl font-light leading-relaxed drop-shadow-md"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-10">
          <Link
            href={cta_href}
            className="inline-flex items-center gap-2 rounded-sm bg-amber-600 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {cta_text}
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Accessibility: Skip to main content */}
      <Link
        href="#main-content"
        className="absolute left-4 top-4 rounded bg-amber-600 px-4 py-2 text-white opacity-0 focus:opacity-100 z-50"
      >
        Aller au contenu principal
      </Link>
    </section>
  );
};

export default Hero;
