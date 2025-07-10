/**
 * @fileoverview Transcription service for Sale-Smell
 * 
 * This file contains the transcription service that orchestrates the complete
 * transcription workflow from file upload to completion with progress tracking.
 * 
 * Key Features:
 * - Complete transcription workflow orchestration
 * - Progress tracking and status updates
 * - Error handling and retry logic
 * - Polling for transcription completion
 * - Result processing and validation
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import { createAssemblyAIService } from '@/lib/api/assemblyai';
import type { TranscriptionResult } from '@/lib/types';

/**
 * @description Transcription progress callback type
 */
export type TranscriptionProgressCallback = (
    status: string,
    progress: number,
    message?: string
) => void;

/**
 * @description Transcription service class
 */
export class TranscriptionService {
    private assemblyAIService: ReturnType<typeof createAssemblyAIService>;

    constructor() {
        this.assemblyAIService = createAssemblyAIService();
    }

    /**
     * @description Starts transcription process for uploaded file
     * 
     * @param {File} file - Audio file to transcribe
     * @param {TranscriptionProgressCallback} onProgress - Progress callback
     * @returns {Promise<TranscriptionResult>} Completed transcription result
     */
    async startTranscription(
        file: File,
        onProgress?: TranscriptionProgressCallback
    ): Promise<TranscriptionResult> {
        try {
            // Step 1: Upload file and start transcription
            onProgress?.('uploading', 10, 'Uploading file to AssemblyAI...');

            const transcriptionId = await this.assemblyAIService.uploadAndTranscribe(file, {
                speakerLabels: true,
                sentimentAnalysis: true,
                summarization: true,
                piiRedaction: true,
                languageCode: 'en',
            });

            onProgress?.('processing', 20, 'Transcription started, processing audio...');

            // Step 2: Poll for completion
            const result = await this.assemblyAIService.pollTranscriptionStatus(
                transcriptionId,
                (status, progress) => {
                    const adjustedProgress = 20 + ((progress || 0) * 0.8); // Scale 0-100 to 20-100
                    let message = 'Processing transcription...';

                    switch (status) {
                        case 'queued':
                            message = 'Transcription queued, waiting to start...';
                            break;
                        case 'processing':
                            message = 'Transcribing audio with speaker labels and sentiment analysis...';
                            break;
                        case 'completed':
                            message = 'Transcription completed successfully!';
                            break;
                        case 'error':
                            message = 'Transcription failed';
                            break;
                    }

                    onProgress?.(status, adjustedProgress, message);
                }
            );

            // Step 3: Validate and return result
            if (result.status === 'error') {
                throw new Error(result.error || 'Transcription failed');
            }

            if (!result.text) {
                throw new Error('Transcription completed but no text was generated');
            }

            onProgress?.('completed', 100, 'Transcription completed successfully!');
            return result;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown transcription error';
            onProgress?.('error', 0, errorMessage);
            throw error;
        }
    }

    /**
     * @description Gets transcription status by ID
     * 
     * @param {string} transcriptionId - Transcription ID
     * @returns {Promise<TranscriptionResult>} Transcription result
     */
    async getTranscriptionStatus(transcriptionId: string): Promise<TranscriptionResult> {
        try {
            return await this.assemblyAIService.getTranscriptionStatus(transcriptionId);
        } catch (error) {
            throw new Error(`Failed to get transcription status: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * @description Polls transcription status until completion
     * 
     * @param {string} transcriptionId - Transcription ID
     * @param {TranscriptionProgressCallback} onProgress - Progress callback
     * @returns {Promise<TranscriptionResult>} Completed transcription result
     */
    async pollTranscriptionStatus(
        transcriptionId: string,
        onProgress?: TranscriptionProgressCallback
    ): Promise<TranscriptionResult> {
        try {
            return await this.assemblyAIService.pollTranscriptionStatus(transcriptionId, onProgress ?
                (status: string, progress?: number) => onProgress(status, progress || 0) : undefined);
        } catch (error) {
            throw new Error(`Failed to poll transcription status: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * @description Validates transcription result
     * 
     * @param {TranscriptionResult} result - Transcription result to validate
     * @returns {boolean} True if result is valid
     */
    validateTranscriptionResult(result: TranscriptionResult): boolean {
        if (!result.id) {
            return false;
        }

        if (result.status === 'error') {
            return false;
        }

        if (result.status === 'completed' && !result.text) {
            return false;
        }

        return true;
    }

    /**
     * @description Formats transcription result for display
     * 
     * @param {TranscriptionResult} result - Transcription result to format
     * @returns {Object} Formatted result
     */
    formatTranscriptionResult(result: TranscriptionResult) {
        if (!this.validateTranscriptionResult(result)) {
            throw new Error('Invalid transcription result');
        }

        return {
            id: result.id,
            status: result.status,
            text: result.text || '',
            speakers: result.speakers || [],
            sentiment: result.sentiment,
            summary: result.summary,
            wordCount: result.text ? result.text.split(/\s+/).length : 0,
            duration: this.calculateDuration(result),
            speakerStats: this.calculateSpeakerStats(result),
        };
    }

    /**
     * @description Calculates audio duration from transcription
     * 
     * @param {TranscriptionResult} result - Transcription result
     * @returns {number} Duration in seconds
     */
    private calculateDuration(result: TranscriptionResult): number {
        if (!result.speakers || result.speakers.length === 0) {
            return 0;
        }

        const lastSegment = result.speakers[result.speakers.length - 1];
        return lastSegment?.end ? lastSegment.end / 1000 : 0; // Convert milliseconds to seconds
    }

    /**
     * @description Calculates speaker statistics
     * 
     * @param {TranscriptionResult} result - Transcription result
     * @returns {Object} Speaker statistics
     */
    private calculateSpeakerStats(result: TranscriptionResult) {
        if (!result.speakers) {
            return {};
        }

        const stats: Record<string, { segments: number; words: number; duration: number }> = {};

        result.speakers.forEach(segment => {
            if (!stats[segment.speaker]) {
                stats[segment.speaker] = { segments: 0, words: 0, duration: 0 };
            }

            const speakerStats = stats[segment.speaker];
            if (speakerStats) {
                speakerStats.segments++;
                speakerStats.words += segment.text.split(/\s+/).length;
                speakerStats.duration += (segment.end - segment.start) / 1000;
            }
        });

        return stats;
    }
}

/**
 * @description Creates transcription service instance
 * 
 * @returns {TranscriptionService} Transcription service instance
 */
export const createTranscriptionService = (): TranscriptionService => {
    return new TranscriptionService();
}; 