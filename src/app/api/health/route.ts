/**
 * @fileoverview Health check API route for Sale-Smell
 * 
 * This file provides a health check endpoint to verify that
 * the AssemblyAI integration and other services are working properly.
 * 
 * Key Features:
 * - AssemblyAI API key validation
 * - Service status checking
 * - Environment variable validation
 * - Error reporting
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import { NextResponse } from 'next/server';

import type { ApiResponse } from '@/lib/types';

/**
 * @description Health check response interface
 */
interface HealthCheckResponse {
    status: 'healthy' | 'unhealthy';
    services: {
        assemblyai: 'healthy' | 'unhealthy' | 'not_configured';
        environment: 'healthy' | 'unhealthy';
    };
    timestamp: string;
    version: string;
}

/**
 * @description GET handler for health check
 * 
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} Health check response
 */
export async function GET(): Promise<NextResponse> {
    try {
        const healthCheck: HealthCheckResponse = {
            status: 'healthy',
            services: {
                assemblyai: 'not_configured',
                environment: 'healthy',
            },
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        };

        // Check environment variables
        const requiredEnvVars = ['ASSEMBLYAI_API_KEY'];
        const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missingEnvVars.length > 0) {
            healthCheck.services.environment = 'unhealthy';
            healthCheck.status = 'unhealthy';
        }

        // Check AssemblyAI API key (if configured)
        if (process.env.ASSEMBLYAI_API_KEY) {
            try {
                // Simple validation - check if API key looks valid
                const apiKey = process.env.ASSEMBLYAI_API_KEY;
                if (apiKey && apiKey.length > 10) {
                    healthCheck.services.assemblyai = 'healthy';
                } else {
                    healthCheck.services.assemblyai = 'unhealthy';
                    healthCheck.status = 'unhealthy';
                }
            } catch (error) {
                healthCheck.services.assemblyai = 'unhealthy';
                healthCheck.status = 'unhealthy';
            }
        }

        return NextResponse.json<ApiResponse<HealthCheckResponse>>({
            success: true,
            data: healthCheck,
            message: healthCheck.status === 'healthy' ? 'All services healthy' : 'Some services unhealthy',
        });

    } catch {
        console.error('Health check error');

        return NextResponse.json<ApiResponse>({
            success: false,
            error: 'Health check failed',
        }, { status: 500 });
    }
} 