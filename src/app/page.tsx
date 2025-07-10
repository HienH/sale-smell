/**
 * @fileoverview Main homepage component for the Sale-Smell application
 * 
 * This file defines the main landing page that users see when they visit
 * the application. It includes the file upload interface and basic
 * application information.
 * 
 * Key Features:
 * - File upload interface with drag-and-drop
 * - Audio file validation
 * - Responsive design
 * - Accessibility features
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import React from 'react';

import { EnhancedFileUpload } from '@/components/forms/EnhancedFileUpload';

/**
 * @description Main homepage component
 * 
 * This component renders the main landing page with the file upload
 * interface and application information.
 * 
 * @returns {React.JSX.Element} Homepage component
 */
const HomePage = (): React.JSX.Element => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
            {/* Header */}
            <header className="container-responsive py-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                        Sale-Smell
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 sm:text-2xl">
                        AI-Powered Sales Call Analysis
                    </p>
                    <p className="mt-2 text-base text-gray-500 sm:text-lg">
                        Upload your sales calls and get intelligent, actionable feedback
                    </p>
                    <div className="mt-6">
                        <a
                            href="/dashboard"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            Go to Dashboard
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-responsive py-12">
                <div className="mx-auto max-w-4xl">
                    {/* Upload Section */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                Upload Your Sales Call
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Get instant analysis and coaching insights from your recorded sales conversations
                            </p>
                        </div>

                        <EnhancedFileUpload />
                    </section>

                    {/* Features Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8 sm:text-3xl">
                            What You&apos;ll Get
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">Smart Transcription</h3>
                                </div>
                                <p className="text-gray-600">
                                    Accurate speech-to-text with speaker identification and sentiment analysis
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">AI Analysis</h3>
                                </div>
                                <p className="text-gray-600">
                                    Deep insights into objection handling, talk time, and coaching opportunities
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">Detailed Reports</h3>
                                </div>
                                <p className="text-gray-600">
                                    Download comprehensive PDF reports with actionable coaching feedback
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8 sm:text-3xl">
                            How It Works
                        </h2>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                            {/* Step 1 */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-semibold text-lg">1</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Audio</h3>
                                <p className="text-gray-600">
                                    Drag and drop your sales call recording (.mp3, .wav, .m4a)
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-semibold text-lg">2</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Processing</h3>
                                <p className="text-gray-600">
                                    Our AI transcribes and analyzes your call for insights
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-semibold text-lg">3</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Get Results</h3>
                                <p className="text-gray-600">
                                    Review your analysis and download detailed coaching reports
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="container-responsive py-8">
                    <div className="text-center">
                        <p className="text-gray-600">
                            © 2024 Sale-Smell. AI-powered sales coaching for modern teams.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage; 