"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroPremium() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-amber-950 to-gray-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(at 20% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)",
            "radial-gradient(at 80% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)",
            "radial-gradient(at 20% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-amber-700 rounded-full blur-3xl opacity-15"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-amber-900/40 border border-amber-700/60 px-6 py-2 backdrop-blur"
            variants={itemVariants}
          >
            <Sparkles size={16} className="text-amber-300" />
            <span className="text-sm font-semibold text-amber-200">
              Luxury Perfume Boutique
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="mb-6 font-playfair text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-tight"
            variants={itemVariants}
          >
            Maison <span className="text-amber-400">Maeta</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mb-12 text-xl md:text-2xl text-amber-100 font-light max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover handcrafted luxury fragrances that transcend the ordinary.
            Each scent is a masterpiece of elegance, artistry, and
            sophistication.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-2">
                Explore Collection
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-amber-400 text-amber-300 rounded-xl font-semibold hover:bg-amber-900/30 transition-colors"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 text-center"
            variants={itemVariants}
          >
            {[
              { label: "25+ Years", value: "of Excellence" },
              { label: "100+", value: "Fragrances" },
              { label: "50K+", value: "Happy Clients" },
            ].map((stat, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }}>
                <p className="text-3xl font-bold text-amber-400">
                  {stat.label}
                </p>
                <p className="text-sm text-amber-200/60 mt-2">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-amber-300/60 text-xs tracking-widest">SCROLL</p>
            <div className="w-6 h-10 border-2 border-amber-400/40 rounded-full flex items-center justify-center">
              <motion.div
                className="w-1 h-2 bg-amber-400 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
