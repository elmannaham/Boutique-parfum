"use client";
import classnames from "classnames";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BentoCardProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic?: ReactNode;
  className?: string;
  dark?: boolean;
  fade?: ("top" | "bottom")[];
};

export function BentoCard({
  dark = true,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = ["top"],
}: BentoCardProps) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={classnames(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-amber-900/80 to-amber-950/90",
        "dark:from-neutral-900 dark:to-neutral-950",
        "border border-amber-700/30 dark:border-neutral-800",
        "shadow-xl ring-1 ring-amber-600/20 dark:ring-white/5",
        "transform-gpu transition-all duration-300",
      )}
    >
      {/* Background Image Container */}
      <div className="relative h-80 sm:h-96 shrink-0 overflow-hidden">
        {graphic && <div className="absolute inset-0">{graphic}</div>}

        {/* Gradient Overlays */}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-transparent to-transparent" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent" />
        )}
      </div>

      {/* Content Section */}
      <div className="relative p-6 sm:p-8 z-20 flex-1 flex flex-col justify-end bg-gradient-to-t from-amber-950 to-amber-900/40">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-amber-300 uppercase">
            {eyebrow}
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
            {title}
          </h3>

          <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGridPerfume() {
  const bentoItems = [
    {
      eyebrow: "Essences",
      title: "Naturelles & Éthiques",
      description:
        "Sourced from the finest gardens worldwide. Each essence tells a story of origin and craftsmanship.",
      graphic: (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 opacity-60" />
      ),
      className: "md:col-span-2 md:row-span-1",
    },
    {
      eyebrow: "Exclusivité",
      title: "Collections Limitées",
      description:
        "Rare, numbered editions. Only 500 bottles per collection, each hand-sealed with a certificate.",
      graphic: (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-amber-500 to-amber-800 opacity-50" />
      ),
      className: "md:col-span-2 md:row-span-1",
    },
    {
      eyebrow: "Craftsmanship",
      title: "Flacon Art",
      description:
        "Crystal bottles designed by renowned artisans. Each bottle is a sculpture, a masterpiece to display.",
      graphic: (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-600 to-amber-900 opacity-50" />
      ),
      className: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full blur-3xl opacity-15"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-amber-600 uppercase mb-3 sm:mb-4">
            Why Choose Maison Maeta
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 font-serif mb-4 sm:mb-6">
            The Art of Fragrance
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Discover what makes our fragrances exceptional. From essence to
            bottle, every detail is perfection.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={item.className}
            >
              <BentoCard
                eyebrow={item.eyebrow}
                title={item.title}
                description={item.description}
                graphic={item.graphic}
                dark={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
