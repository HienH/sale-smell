/**
 * @fileoverview Loading component for the dashboard page
 * 
 * This file defines a loading component that displays while the dashboard
 * page is loading, providing a smooth user experience.
 * 
 * Key Features:
 * - Skeleton loading animation
 * - Responsive design
 * - Consistent with dashboard layout
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import React from 'react';

/**
 * @description Loading component for dashboard
 * 
 * This component displays a skeleton loading animation while
 * the dashboard page is loading.
 * 
 * @returns {React.JSX.Element} Loading component
 */
const DashboardLoading = (): React.JSX.Element => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
            {/* Header Skeleton */}
            <header className="container-responsive py-8">
                <div className="text-center">
                    <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </header>

            {/* Main Content Skeleton */}
            <main className="container-responsive py-12">
                <div className="mx-auto max-w-6xl">
                    {/* Upload Section Skeleton */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <div className="h-8 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Upload Area Skeleton */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                            <div className="h-2 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </section>

                    {/* Features Section Skeleton */}
                    <section className="mb-12">
                        <div className="h-8 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                        <div className="h-5 bg-gray-200 rounded-lg ml-3 flex-1 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer Skeleton */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="container-responsive py-8">
                    <div className="text-center">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardLoading; 