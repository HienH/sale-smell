/**
 * @fileoverview Enhanced file upload component with transcription integration
 * 
 * This file defines an enhanced file upload component that integrates
 * with the transcription hook to provide real transcription functionality.
 * 
 * Key Features:
 * - Real AssemblyAI transcription integration
 * - Progress tracking and status updates
 * - Error handling and retry functionality
 * - Speaker labels and sentiment analysis
 * - Download transcript functionality
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

'use client';

import React, { useCallback } from 'react';

import { useTranscription } from '@/lib/hooks/useTranscription';
import type { TranscriptionResult } from '@/lib/types';

/**
 * @description Enhanced file upload component props
 */
interface EnhancedFileUploadProps {
    onTranscriptionComplete?: (result: TranscriptionResult) => void;
    onTranscriptionError?: (error: string) => void;
    onTranscriptionProgress?: (progress: number, message: string) => void;
    className?: string;
}

/**
 * @description Enhanced file upload component
 * 
 * This component provides a drag-and-drop interface for uploading
 * audio files with real transcription functionality using AssemblyAI.
 * 
 * @param {EnhancedFileUploadProps} props - Component props
 * @param {Function} [props.onTranscriptionComplete] - Callback when transcription completes
 * @param {Function} [props.onTranscriptionError] - Callback when transcription fails
 * @param {Function} [props.onTranscriptionProgress] - Callback for transcription progress
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} Enhanced file upload component
 */
const EnhancedFileUpload = ({
    onTranscriptionComplete,
    onTranscriptionError,
    onTranscriptionProgress,
    className = '',
}: EnhancedFileUploadProps): React.JSX.Element => {
    const { state, startTranscription, reset, retry } = useTranscription();

    /**
     * @description Validates the selected file
     * 
     * @param {File} file - File to validate
     * @returns {string | null} Error message or null if valid
     */
    const validateFile = useCallback((file: File): string | null => {
        const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/mpeg'];
        const maxFileSize = 100 * 1024 * 1024; // 100MB

        // Check file type
        if (!allowedTypes.includes(file.type)) {
            return `File type not supported. Please upload ${allowedTypes.join(', ')} files.`;
        }

        // Check file size
        if (file.size > maxFileSize) {
            const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
            return `File too large. Maximum size is ${maxSizeMB}MB.`;
        }

        return null;
    }, []);

    /**
     * @description Handles file selection and starts transcription
     * 
     * @param {File} file - Selected file
     */
    const handleFileSelect = useCallback(async (file: File) => {
        const error = validateFile(file);

        if (error) {
            onTranscriptionError?.(error);
            return;
        }

        try {
            await startTranscription(file);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            onTranscriptionError?.(errorMessage);
        }
    }, [validateFile, startTranscription, onTranscriptionError]);

    /**
     * @description Handles drag over event
     * 
     * @param {React.DragEvent} event - Drag event
     */
    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
    }, []);

    /**
     * @description Handles drag leave event
     * 
     * @param {React.DragEvent} event - Drag event
     */
    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
    }, []);

    /**
     * @description Handles drop event
     * 
     * @param {React.DragEvent} event - Drop event
     */
    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();

        const files = Array.from(event.dataTransfer.files);
        if (files.length > 0) {
            const file = files[0];
            if (file) {
                handleFileSelect(file);
            }
        }
    }, [handleFileSelect]);

    /**
     * @description Handles file input change
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event - Change event
     */
    const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file) {
                handleFileSelect(file);
            }
        }
    }, [handleFileSelect]);

    /**
     * @description Handles click on upload area
     */
    const handleUploadAreaClick = useCallback(() => {
        if (!state.isTranscribing) {
            document.getElementById('enhanced-file-input')?.click();
        }
    }, [state.isTranscribing]);

    /**
     * @description Handles key press on upload area
     * 
     * @param {React.KeyboardEvent} event - Keyboard event
     */
    const handleUploadAreaKeyPress = useCallback((event: React.KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && !state.isTranscribing) {
            event.preventDefault();
            handleUploadAreaClick();
        }
    }, [handleUploadAreaClick, state.isTranscribing]);

    /**
     * @description Handles retry button click
     */
    const handleRetry = useCallback(async () => {
        await retry();
    }, [retry]);

    /**
     * @description Handles reset button click
     */
    const handleReset = useCallback(() => {
        reset();
    }, [reset]);

    // Call progress callback when state changes
    React.useEffect(() => {
        if (state.isTranscribing) {
            onTranscriptionProgress?.(state.progress, state.message);
        }
    }, [state.isTranscribing, state.progress, state.message, onTranscriptionProgress]);

    // Call completion callback when transcription completes
    React.useEffect(() => {
        if (state.status === 'completed' && state.result) {
            onTranscriptionComplete?.(state.result);
        }
    }, [state.status, state.result, onTranscriptionComplete]);

    // Call error callback when transcription fails
    React.useEffect(() => {
        if (state.status === 'error' && state.error) {
            onTranscriptionError?.(state.error);
        }
    }, [state.status, state.error, onTranscriptionError]);

    return (
        <div className={`w-full ${className}`}>
            {/* File Upload Area */}
            <div
                className={`
                    relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                    transition-colors duration-200 ease-in-out
                    ${state.status === 'idle' ? 'border-gray-300 hover:border-primary-400 hover:bg-gray-50' : ''}
                    ${state.status === 'uploading' ? 'border-primary-500 bg-primary-50' : ''}
                    ${state.status === 'processing' ? 'border-blue-500 bg-blue-50' : ''}
                    ${state.status === 'completed' ? 'border-success-500 bg-success-50' : ''}
                    ${state.status === 'error' ? 'border-error-500 bg-error-50' : ''}
                    ${state.isTranscribing ? 'pointer-events-none opacity-75' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadAreaClick}
                onKeyPress={handleUploadAreaKeyPress}
                tabIndex={0}
                role="button"
                aria-label="Upload audio file for transcription"
            >
                {/* Upload Icon */}
                <div className="mb-4">
                    {state.status === 'completed' ? (
                        <svg className="mx-auto h-12 w-12 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : state.status === 'error' ? (
                        <svg className="mx-auto h-12 w-12 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    )}
                </div>

                {/* Upload Text */}
                <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {state.status === 'completed' ? 'Transcription Complete!' :
                            state.status === 'error' ? 'Transcription Failed' :
                                state.isTranscribing ? 'Transcribing Audio...' :
                                    'Upload your sales call'}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {state.message || 'Drag and drop your audio file here, or click to browse'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Supported formats: MP3, WAV, M4A (max 100MB)
                    </p>
                </div>

                {/* Progress Bar */}
                {state.isTranscribing && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${state.progress}%` }}
                        />
                    </div>
                )}

                {/* Progress Text */}
                {state.isTranscribing && (
                    <p className="text-sm text-gray-600">
                        {state.progress}% complete
                    </p>
                )}

                {/* Success Message */}
                {state.status === 'completed' && state.result && (
                    <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-success-800">
                                    Transcription completed successfully!
                                </span>
                            </div>
                            <button
                                onClick={handleReset}
                                className="text-xs text-success-600 hover:text-success-800 underline"
                            >
                                Upload Another
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {state.status === 'error' && state.error && (
                    <div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-error-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-error-800">{state.error}</span>
                            </div>
                            <button
                                onClick={handleRetry}
                                className="text-xs text-error-600 hover:text-error-800 underline"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    id="enhanced-file-input"
                    type="file"
                    accept="audio/mp3,audio/wav,audio/m4a,audio/mpeg"
                    onChange={handleFileInputChange}
                    className="hidden"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};

export { EnhancedFileUpload };
export type { EnhancedFileUploadProps }; 