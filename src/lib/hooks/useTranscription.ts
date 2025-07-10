/**
 * @fileoverview Transcription hook for Sale-Smell
 * 
 * This file contains a React hook for managing transcription state,
 * progress tracking, and error handling throughout the transcription process.
 * 
 * Key Features:
 * - Transcription state management
 * - Progress tracking and updates
 * - Error handling and retry logic
 * - Real-time status updates
 * - Result caching and validation
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import { useState, useCallback, useRef } from 'react';
import type { TranscriptionResult } from '@/lib/types';

/**
 * @description Transcription state interface
 */
interface TranscriptionState {
    isTranscribing: boolean;
    progress: number;
    status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
    message: string;
    result: TranscriptionResult | null;
    error: string | null;
    transcriptionId: string | null;
}

/**
 * @description Transcription hook return type
 */
interface UseTranscriptionReturn {
    state: TranscriptionState;
    startTranscription: (file: File) => Promise<void>;
    checkStatus: (transcriptionId: string) => Promise<void>;
    reset: () => void;
    retry: () => Promise<void>;
}

/**
 * @description Transcription hook
 * 
 * This hook manages the complete transcription workflow including
 * file upload, progress tracking, status polling, and result handling.
 * 
 * @returns {UseTranscriptionReturn} Transcription state and methods
 */
export const useTranscription = (): UseTranscriptionReturn => {
    const [state, setState] = useState<TranscriptionState>({
        isTranscribing: false,
        progress: 0,
        status: 'idle',
        message: '',
        result: null,
        error: null,
        transcriptionId: null,
    });

    const abortControllerRef = useRef<AbortController | null>(null);
    const currentFileRef = useRef<File | null>(null);

    /**
     * @description Updates transcription state
     * 
     * @param {Partial<TranscriptionState>} updates - State updates
     */
    const updateState = useCallback((updates: Partial<TranscriptionState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    /**
     * @description Starts transcription process
     * 
     * @param {File} file - Audio file to transcribe
     */
    const startTranscription = useCallback(async (file: File) => {
        try {
            // Reset state
            updateState({
                isTranscribing: true,
                progress: 0,
                status: 'uploading',
                message: 'Preparing to upload file...',
                result: null,
                error: null,
                transcriptionId: null,
            });

            currentFileRef.current = file;

            // Create abort controller for cancellation
            abortControllerRef.current = new AbortController();

            // Create form data
            const formData = new FormData();
            formData.append('file', file);

            // Upload file and start transcription
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload file');
            }

            const data = await response.json();

            if (!data.success || !data.data?.transcriptionId) {
                throw new Error(data.error || 'Failed to start transcription');
            }

            const transcriptionId = data.data.transcriptionId;

            updateState({
                transcriptionId,
                status: 'processing',
                message: 'Transcription started, processing audio...',
                progress: 20,
            });

            // Start polling for status
            await pollTranscriptionStatus(transcriptionId);

        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                updateState({
                    status: 'idle',
                    message: 'Transcription cancelled',
                    error: null,
                });
                return;
            }

            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            updateState({
                isTranscribing: false,
                status: 'error',
                message: 'Transcription failed',
                error: errorMessage,
                progress: 0,
            });
        }
    }, [updateState]);

    /**
     * @description Polls transcription status until completion
     * 
     * @param {string} transcriptionId - Transcription ID
     */
    const pollTranscriptionStatus = useCallback(async (transcriptionId: string) => {
        const maxAttempts = 60; // 5 minutes with 5-second intervals
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                // Check if cancelled
                if (abortControllerRef.current?.signal.aborted) {
                    return;
                }

                // Get status
                const response = await fetch(`/api/upload?transcriptionId=${transcriptionId}`, {
                    signal: abortControllerRef.current?.signal || null,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to check transcription status');
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.error || 'Failed to get transcription status');
                }

                const result: TranscriptionResult = data.data;

                // Update progress based on status
                let progress: number;
                let message: string;

                switch (result.status) {
                    case 'queued':
                        progress = 20;
                        message = 'Transcription queued, waiting to start...';
                        break;
                    case 'processing':
                        progress = 20 + (attempts / maxAttempts) * 60; // 20-80%
                        message = 'Transcribing audio with speaker labels and sentiment analysis...';
                        break;
                    case 'completed':
                        progress = 100;
                        message = 'Transcription completed successfully!';
                        break;
                    case 'error':
                        throw new Error(result.error || 'Transcription failed');
                    default:
                        progress = 20;
                        message = 'Processing transcription...';
                }

                updateState({
                    progress,
                    message,
                    result: result.status === 'completed' ? result : null,
                });

                // Check if completed
                if (result.status === 'completed') {
                    updateState({
                        isTranscribing: false,
                        status: 'completed',
                    });
                    return;
                }

                // Wait before next poll
                await new Promise(resolve => setTimeout(resolve, 5000));
                attempts++;

            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }

                if (attempts >= 3) { // Retry 3 times before giving up
                    throw error;
                }

                attempts++;
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        throw new Error('Transcription timeout - exceeded maximum polling attempts');
    }, [updateState]);

    /**
     * @description Checks transcription status
     * 
     * @param {string} transcriptionId - Transcription ID
     */
    const checkStatus = useCallback(async (transcriptionId: string) => {
        try {
            updateState({
                isTranscribing: true,
                status: 'processing',
                message: 'Checking transcription status...',
            });

            await pollTranscriptionStatus(transcriptionId);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            updateState({
                isTranscribing: false,
                status: 'error',
                message: 'Failed to check status',
                error: errorMessage,
            });
        }
    }, [pollTranscriptionStatus, updateState]);

    /**
     * @description Resets transcription state
     */
    const reset = useCallback(() => {
        // Cancel ongoing transcription
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        updateState({
            isTranscribing: false,
            progress: 0,
            status: 'idle',
            message: '',
            result: null,
            error: null,
            transcriptionId: null,
        });

        currentFileRef.current = null;
        abortControllerRef.current = null;
    }, [updateState]);

    /**
     * @description Retries transcription with current file
     */
    const retry = useCallback(async () => {
        if (currentFileRef.current) {
            await startTranscription(currentFileRef.current);
        }
    }, [startTranscription]);

    return {
        state,
        startTranscription,
        checkStatus,
        reset,
        retry,
    };
}; 