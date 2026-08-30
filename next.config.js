/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // REACT & STRICTMODE
  // ============================================================================
  reactStrictMode: true,


  // ============================================================================
  // IMAGE OPTIMIZATION
  // ============================================================================
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable static imports optimization for maximum control
    disableStaticImages: false,
  },

  // ============================================================================
  // PERFORMANCE & BUNDLE OPTIMIZATION
  // ============================================================================
  compress: true,
  productionBrowserSourceMaps: false, // Save bundle size in prod

  // ============================================================================
  // HEADERS & REDIRECTS
  // ============================================================================
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(js|css|webp|png|jpg|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ============================================================================
  // REDIRECTS (e.g., old URLs)
  // ============================================================================
  async redirects() {
    return [
      // Example: Old product path
      {
        source: '/old-products/:slug',
        destination: '/products/:slug',
        permanent: true, // 301
      },
    ];
  },

  // ============================================================================
  // REWRITES (internal routing)
  // ============================================================================
  async rewrites() {
    return {
      beforeFiles: [
        // Example: Rewrite API calls to external service
        {
          source: '/api/products/:id',
          destination: 'https://api.maison-maeta.com/v1/products/:id',
        },
      ],
    };
  },

  // ============================================================================
  // WEBPACK CONFIGURATION
  // ============================================================================
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        default: false,
        vendors: false,
      };
    }

    return config;
  },

  // ============================================================================
  // TURBOPACK CONFIGURATION (Next.js 16+)
  // ============================================================================
  turbopack: {},

  // 52MB cache
  cacheMaxMemorySize: 52 * 1024 * 1024,

  // ============================================================================
  // EXPERIMENTAL FEATURES (use with caution)
  // ============================================================================
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // ============================================================================
  // ENV VARIABLES (accessible in browser via process.env.NEXT_PUBLIC_*)
  // ============================================================================
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // ============================================================================
  // SECURITY: Disable X-Powered-By header
  // ============================================================================
  poweredByHeader: false,

  // ============================================================================
  // TRACING & LOGGING
  // ============================================================================
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

module.exports = nextConfig;
