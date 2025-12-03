/**
 * @fileoverview Root layout component for the Sale-Smell application
 * 
 * This file defines the root layout that wraps all pages in the application.
 * It includes global styles, metadata, and the basic HTML structure.
 * 
 * Key Features:
 * - Global metadata and SEO optimization
 * - Tailwind CSS integration
 * - Responsive design foundation
 * - Accessibility features
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import { Navigation } from '@/components/layout/Navigation';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Sale-Smell - AI-Powered Sales Call Analysis',
        template: '%s | Sale-Smell',
    },
    description: 'Upload your sales calls and get intelligent, actionable feedback with AI-powered analysis and coaching insights.',
    keywords: [
        'sales',
        'ai',
        'transcription',
        'analysis',
        'coaching',
        'call analysis',
        'sales training',
    ],
    authors: [{ name: 'Sale-Smell Team' }],
    creator: 'Sale-Smell Team',
    publisher: 'Sale-Smell',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Sale-Smell - AI-Powered Sales Call Analysis',
        description: 'Upload your sales calls and get intelligent, actionable feedback with AI-powered analysis and coaching insights.',
        url: '/',
        siteName: 'Sale-Smell',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Sale-Smell - AI-Powered Sales Call Analysis',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sale-Smell - AI-Powered Sales Call Analysis',
        description: 'Upload your sales calls and get intelligent, actionable feedback with AI-powered analysis and coaching insights.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

/**
 * @description Root layout component that wraps all pages
 * 
 * This component provides the basic HTML structure, global styles,
 * and metadata for all pages in the application.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * 
 * @returns {React.JSX.Element} Root layout with children
 */
const RootLayout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    return (
        <html lang="en" className="h-full">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0ea5e9" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={`${inter.className} h-full antialiased`}>
                <div id="root" className="h-full">
                    <Navigation />
                    {children}
                </div>
            </body>
        </html>
    );
};

export default RootLayout; 