/**
 * @fileoverview Next.js configuration for the Sale-Smell application
 * 
 * This file configures Next.js with settings optimized for the Sale-Smell
 * AI-powered sales call analysis application. It includes settings for
 * performance, security, and development experience.
 * 
 * Key Features:
 * - Optimized for TypeScript and App Router
 * - Configured for file uploads and API routes
 * - Security headers for production
 * - Performance optimizations
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for better performance
    experimental: {
        // Optimize bundle size
        optimizePackageImports: ['@/components/ui'],
    },

    // Configure images and static assets
    images: {
        domains: [],
        formats: ['image/webp', 'image/avif'],
    },

    // Configure headers for security and performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Configure webpack for better performance
    webpack: (config, { isServer }) => {
        // Optimize bundle size
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }

        return config;
    },

    // Configure TypeScript
    typescript: {
        // Enable TypeScript checking during build
        ignoreBuildErrors: false,
    },

    // Configure ESLint
    eslint: {
        // Enable ESLint checking during build
        ignoreDuringBuilds: false,
    },
};

module.exports = nextConfig; 