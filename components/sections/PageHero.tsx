"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  children?: ReactNode;
  variant?: "default" | "minimal" | "full";
}

export function PageHero({
  title,
  subtitle,
  description,
  badge,
  children,
  variant = "default",
}: PageHeroProps) {
  if (variant === "minimal") {
    return (
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {badge && (
              <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">
                {badge}
              </p>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>
    );
  }

  if (variant === "full") {
    return (
      <section className="relative min-h-[70vh] py-20 bg-gradient-to-br from-amber-50 via-white to-gray-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {badge && (
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
                  {badge}
                </p>
              )}
              <h1 className="font-serif text-5xl sm:text-6xl font-bold text-gray-950 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-2xl text-amber-700 font-semibold">{subtitle}</p>
              )}
              {description && (
                <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                  {description}
                </p>
              )}
              {children && <div className="pt-6">{children}</div>}
            </motion.div>

            {/* Visual placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-96 sm:h-full min-h-96 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-200 to-amber-100 overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-amber-900 opacity-40">
                  <p className="text-sm font-semibold">Visual content</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4">
              {badge}
            </p>
          )}
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-gray-950 mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-2xl text-amber-700 font-semibold mb-6 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
              {description}
            </p>
          )}
          {children && <div>{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
