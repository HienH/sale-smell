'use client';

/**
 * @fileoverview File upload component for the Sale-Smell application
 * 
 * This file defines a drag-and-drop file upload component that accepts
 * audio files and provides validation and user feedback.
 * 
 * Key Features:
 * - Drag-and-drop file upload
 * - Audio file validation (.mp3, .wav, .m4a)
 * - Progress indication
 * - Error handling
 * - Accessibility features
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import React, { useState, useCallback } from 'react';

/**
 * @description File upload state interface
 */
interface FileUploadState {
    isDragOver: boolean;
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;
    selectedFile: File | null;
}

/**
 * @description File upload component props
 */
interface FileUploadProps {
    onFileSelect?: (file: File) => void;
    onUploadProgress?: (progress: number) => void;
    onUploadComplete?: (result: any) => void;
    onUploadError?: (error: string) => void;
    maxFileSize?: number; // in bytes
    allowedTypes?: string[];
    className?: string;
}

/**
 * @description File upload component
 * 
 * This component provides a drag-and-drop interface for uploading
 * audio files with validation and progress indication.
 * 
 * @param {FileUploadProps} props - Component props
 * @param {Function} [props.onFileSelect] - Callback when file is selected
 * @param {Function} [props.onUploadProgress] - Callback for upload progress
 * @param {Function} [props.onUploadComplete] - Callback when upload completes
 * @param {Function} [props.onUploadError] - Callback when upload fails
 * @param {number} [props.maxFileSize] - Maximum file size in bytes
 * @param {string[]} [props.allowedTypes] - Allowed file types
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} File upload component
 */
const FileUpload = ({
    onFileSelect,
    onUploadProgress,
    onUploadComplete,
    onUploadError,
    maxFileSize = 100 * 1024 * 1024, // 100MB default
    allowedTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/mpeg'],
    className = '',
}: FileUploadProps): React.JSX.Element => {
    const [state, setState] = useState<FileUploadState>({
        isDragOver: false,
        isUploading: false,
        uploadProgress: 0,
        error: null,
        selectedFile: null,
    });

    /**
     * @description Validates the selected file
     * 
     * @param {File} file - File to validate
     * @returns {string | null} Error message or null if valid
     */
    const validateFile = useCallback((file: File): string | null => {
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
    }, [allowedTypes, maxFileSize]);

    /**
     * @description Handles file selection
     * 
     * @param {File} file - Selected file
     */
    const handleFileSelect = useCallback((file: File) => {
        const error = validateFile(file);

        if (error) {
            setState(prev => ({ ...prev, error, selectedFile: null }));
            onUploadError?.(error);
            return;
        }

        setState(prev => ({
            ...prev,
            error: null,
            selectedFile: file,
            isUploading: true,
            uploadProgress: 0
        }));

        onFileSelect?.(file);

        // Simulate upload progress (replace with actual upload logic)
        const interval = setInterval(() => {
            setState(prev => {
                const newProgress = prev.uploadProgress + 10;
                onUploadProgress?.(newProgress);

                if (newProgress >= 100) {
                    clearInterval(interval);
                    onUploadComplete?.({ success: true, file });
                    return { ...prev, isUploading: false, uploadProgress: 100 };
                }

                return { ...prev, uploadProgress: newProgress };
            });
        }, 200);
    }, [validateFile, onFileSelect, onUploadProgress, onUploadComplete, onUploadError]);

    /**
     * @description Handles drag over event
     * 
     * @param {React.DragEvent} event - Drag event
     */
    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setState(prev => ({ ...prev, isDragOver: true }));
    }, []);

    /**
     * @description Handles drag leave event
     * 
     * @param {React.DragEvent} event - Drag event
     */
    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setState(prev => ({ ...prev, isDragOver: false }));
    }, []);

    /**
     * @description Handles drop event
     * 
     * @param {React.DragEvent} event - Drop event
     */
    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setState(prev => ({ ...prev, isDragOver: false }));

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
        document.getElementById('file-input')?.click();
    }, []);

    /**
     * @description Handles key press on upload area
     * 
     * @param {React.KeyboardEvent} event - Keyboard event
     */
    const handleUploadAreaKeyPress = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleUploadAreaClick();
        }
    }, [handleUploadAreaClick]);

    return (
        <div className={`w-full ${className}`}>
            {/* File Upload Area */}
            <div
                className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${state.isDragOver
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                    }
          ${state.isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadAreaClick}
                onKeyPress={handleUploadAreaKeyPress}
                tabIndex={0}
                role="button"
                aria-label="Upload audio file"
            >
                {/* Upload Icon */}
                <div className="mb-4">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                </div>

                {/* Upload Text */}
                <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {state.isUploading ? 'Uploading...' : 'Upload your sales call'}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Drag and drop your audio file here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Supported formats: MP3, WAV, M4A (max 100MB)
                    </p>
                </div>

                {/* Progress Bar */}
                {state.isUploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${state.uploadProgress}%` }}
                        />
                    </div>
                )}

                {/* Progress Text */}
                {state.isUploading && (
                    <p className="text-sm text-gray-600">
                        {state.uploadProgress}% complete
                    </p>
                )}

                {/* Selected File Info */}
                {state.selectedFile && !state.isUploading && (
                    <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-md">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-success-800">
                                {state.selectedFile.name} ({(state.selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {state.error && (
                    <div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-md">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-error-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-error-800">{state.error}</span>
                        </div>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    id="file-input"
                    type="file"
                    accept={allowedTypes.join(',')}
                    onChange={handleFileInputChange}
                    className="hidden"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};

export { FileUpload };
export type { FileUploadProps }; 