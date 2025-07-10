/**
 * @fileoverview File upload API route for Sale-Smell
 * 
 * This file handles audio file uploads and initiates AssemblyAI transcription.
 * It includes comprehensive error handling, file validation, and progress tracking.
 * 
 * Key Features:
 * - File upload with Multer
 * - Audio file validation
 * - AssemblyAI transcription initiation
 * - Progress tracking and status updates
 * - Comprehensive error handling
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAssemblyAIService } from '@/lib/api/assemblyai';
import { validateAudioFile } from '@/lib/utils/file';
import type { ApiResponse, TranscriptionResult } from '@/lib/types';

/**
 * @description POST handler for file upload and transcription
 * 
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} Response with transcription ID
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Check if request has form data
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'No file provided',
            }, { status: 400 });
        }

        // Validate file
        const validation = validateAudioFile(file);
        if (!validation.isValid) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: validation.error || 'File validation failed',
            }, { status: 400 });
        }

        // Create AssemblyAI service
        const assemblyAIService = createAssemblyAIService();

        // Upload and start transcription
        const transcriptionId = await assemblyAIService.uploadAndTranscribe(file, {
            speakerLabels: true,
            sentimentAnalysis: true,
            summarization: true,
            piiRedaction: true,
            languageCode: 'en',
        });

        // Return transcription ID for polling
        return NextResponse.json<ApiResponse<{ transcriptionId: string }>>({
            success: true,
            data: {
                transcriptionId,
            },
            message: 'File uploaded and transcription started successfully',
        });

    } catch (error) {
        console.error('Upload error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json<ApiResponse>({
            success: false,
            error: errorMessage,
        }, { status: 500 });
    }
}

/**
 * @description GET handler for transcription status
 * 
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} Response with transcription status
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const transcriptionId = searchParams.get('transcriptionId');

        if (!transcriptionId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Transcription ID is required',
            }, { status: 400 });
        }

        // Create AssemblyAI service
        const assemblyAIService = createAssemblyAIService();

        // Get transcription status
        const transcription = await assemblyAIService.getTranscriptionStatus(transcriptionId);

        return NextResponse.json<ApiResponse<TranscriptionResult>>({
            success: true,
            data: transcription,
        });

    } catch (error) {
        console.error('Status check error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json<ApiResponse>({
            success: false,
            error: errorMessage,
        }, { status: 500 });
    }
} 