/**
 * @fileoverview File utility functions for the Sale-Smell application
 * 
 * This file contains utility functions for file validation, handling,
 * and processing used throughout the Sale-Smell application.
 * 
 * Key Features:
 * - File type validation
 * - File size validation
 * - File format conversion
 * - File metadata extraction
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import type { FileValidationResult } from '@/lib/types';

/**
 * @description Supported audio file types
 */
export const SUPPORTED_AUDIO_TYPES = [
    'audio/mp3',
    'audio/wav',
    'audio/m4a',
    'audio/mpeg',
    'audio/mp4',
] as const;

/**
 * @description Supported audio file extensions
 */
export const SUPPORTED_AUDIO_EXTENSIONS = [
    '.mp3',
    '.wav',
    '.m4a',
    '.mpeg',
    '.mp4',
] as const;

/**
 * @description Maximum file size in bytes (100MB)
 */
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

/**
 * @description Validates if a file is a supported audio file
 * 
 * @param {File} file - File to validate
 * @returns {FileValidationResult} Validation result
 */
export const validateAudioFile = (file: File): FileValidationResult => {
    const warnings: string[] = [];

    // Check if file exists
    if (!file) {
        return {
            isValid: false,
            error: 'No file provided',
        };
    }

    // Check file type
    if (!SUPPORTED_AUDIO_TYPES.includes(file.type as any)) {
        return {
            isValid: false,
            error: `Unsupported file type: ${file.type}. Supported types: ${SUPPORTED_AUDIO_TYPES.join(', ')}`,
        };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        const maxSizeMB = Math.round(MAX_FILE_SIZE / (1024 * 1024));
        return {
            isValid: false,
            error: `File too large. Maximum size is ${maxSizeMB}MB`,
        };
    }

    // Check file name
    if (!file.name) {
        warnings.push('File has no name');
    }

    // Check if file is empty
    if (file.size === 0) {
        return {
            isValid: false,
            error: 'File is empty',
        };
    }

    return {
        isValid: true,
        ...(warnings.length > 0 && { warnings }),
    };
};

/**
 * @description Gets file extension from filename
 * 
 * @param {string} filename - Filename to extract extension from
 * @returns {string} File extension (including dot)
 */
export const getFileExtension = (filename: string): string => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return '';
    return filename.slice(lastDotIndex).toLowerCase();
};

/**
 * @description Checks if file extension is supported
 * 
 * @param {string} extension - File extension to check
 * @returns {boolean} True if extension is supported
 */
export const isSupportedExtension = (extension: string): boolean => {
    return SUPPORTED_AUDIO_EXTENSIONS.includes(extension as any);
};

/**
 * @description Formats file size in human readable format
 * 
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * @description Gets file metadata
 * 
 * @param {File} file - File to get metadata for
 * @returns {Object} File metadata
 */
export const getFileMetadata = (file: File) => {
    return {
        name: file.name,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        type: file.type,
        lastModified: file.lastModified,
        extension: getFileExtension(file.name),
    };
};

/**
 * @description Creates a unique filename
 * 
 * @param {string} originalName - Original filename
 * @param {string} [prefix] - Optional prefix
 * @returns {string} Unique filename
 */
export const createUniqueFilename = (originalName: string, prefix?: string): string => {
    const timestamp = Date.now();
    const extension = getFileExtension(originalName);
    const nameWithoutExtension = originalName.replace(extension, '');
    const uniqueName = `${nameWithoutExtension}_${timestamp}${extension}`;

    return prefix ? `${prefix}_${uniqueName}` : uniqueName;
};

/**
 * @description Converts file to base64 string
 * 
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
        };
        reader.onerror = (error) => reject(error);
    });
};

/**
 * @description Creates a blob URL from file
 * 
 * @param {File} file - File to create blob URL for
 * @returns {string} Blob URL
 */
export const createBlobUrl = (file: File): string => {
    return URL.createObjectURL(file);
};

/**
 * @description Revokes a blob URL
 * 
 * @param {string} url - Blob URL to revoke
 */
export const revokeBlobUrl = (url: string): void => {
    URL.revokeObjectURL(url);
};

/**
 * @description Downloads a file
 * 
 * @param {Blob} blob - File blob to download
 * @param {string} filename - Filename for download
 */
export const downloadFile = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}; 