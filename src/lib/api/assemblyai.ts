/**
 * @fileoverview AssemblyAI API client for audio transcription
 *
 * This file contains the AssemblyAI API integration for audio transcription
 * with speaker labels, sentiment analysis, summarization, and PII redaction.
 *
 * Key Features:
 * - Audio file upload and transcription
 * - Speaker labeling and sentiment analysis
 * - Summarization and PII redaction
 * - Comprehensive error handling and retry logic
 * - Progress tracking for long transcriptions
 *
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import { AssemblyAI } from 'assemblyai';

import type { TranscriptionResult } from '@/lib/types';

/**
 * @description AssemblyAI configuration interface
 */
interface AssemblyAIConfig {
  apiKey: string;
  apiUrl?: string;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

/**
 * @description Transcription request options
 */
interface TranscriptionOptions {
  speakerLabels?: boolean;
  sentimentAnalysis?: boolean;
  summarization?: boolean;
  piiRedaction?: boolean;
  languageCode?: string;
}

/**
 * @description AssemblyAI service class
 */
export class AssemblyAIService {
  private client: AssemblyAI;
  private maxRetries: number;
  private retryDelay: number;

  constructor(config: AssemblyAIConfig) {
    this.maxRetries = config.maxRetries || 3;
    this.retryDelay = config.retryDelay || 1000;

    this.client = new AssemblyAI({
      apiKey: config.apiKey,
      ...(config.apiUrl && { apiUrl: config.apiUrl }),
    });
  }

  /**
   * @description Uploads audio file and starts transcription
   *
   * @param {File} file - Audio file to transcribe
   * @param {TranscriptionOptions} options - Transcription options
   * @returns {Promise<string>} Transcription ID
   */
  async uploadAndTranscribe(
    file: File,
    options: TranscriptionOptions = {}
  ): Promise<string> {
    try {
      // Validate file
      this.validateAudioFile(file);

      // Convert file to buffer
      const buffer = await this.fileToBuffer(file);

      // Upload file to AssemblyAI
      let audioUrl: string;
      try {
        audioUrl = await this.client.files.upload(buffer);
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        throw uploadError;
      }

      // Create transcription request with basic features, configurable via options
      const transcriptionRequest = {
        audio_url: audioUrl,
        speaker_labels: options.speakerLabels ?? true,
        sentiment_analysis: options.sentimentAnalysis ?? true,
        summarization: options.summarization ?? true,
        redact_pii: options.piiRedaction ?? true,
        redact_pii_policies: [
          'person_name',
          'email_address',
          'phone_number',
          'credit_card_number',
          'date',
          'location',
          'us_social_security_number',
          'account_number',
          'date_of_birth', // see if it works
        ] as any, // Cast as any to satisfy SDK type
        auto_highlights: true,
        language_code: options.languageCode ?? 'en',
      };
      // Submit transcription with retry logic
      const transcription = await this.retryOperation(
        () => this.client.transcripts.create(transcriptionRequest),
        'Failed to submit transcription request'
      );

      return transcription.id;
    } catch (error) {
      throw this.handleError(
        error,
        'Failed to upload and transcribe audio file'
      );
    }
  }

  /**
   * @description Gets transcription status and results
   *
   * @param {string} transcriptionId - Transcription ID
   * @returns {Promise<TranscriptionResult>} Transcription result
   */
  async getTranscriptionStatus(
    transcriptionId: string
  ): Promise<TranscriptionResult> {
    try {
      const transcription = await this.retryOperation(
        () => this.client.transcripts.get(transcriptionId),
        'Failed to get transcription status'
      );

      return this.mapTranscriptionToResult(transcription);
    } catch (error) {
      throw this.handleError(error, 'Failed to get transcription status');
    }
  }

  /**
   * @description Polls transcription status until completion
   *
   * @param {string} transcriptionId - Transcription ID
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<TranscriptionResult>} Completed transcription result
   */
  async pollTranscriptionStatus(
    transcriptionId: string,
    onProgress?: (status: string, progress?: number) => void
  ): Promise<TranscriptionResult> {
    const maxAttempts = 60; // 5 minutes with 5-second intervals
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const result = await this.getTranscriptionStatus(transcriptionId);

        onProgress?.(result.status, this.calculateProgress(result));

        if (result.status === 'completed') {
          return result;
        }

        if (result.status === 'error') {
          throw new Error(result.error || 'Transcription failed');
        }

        // Wait before next poll
        await this.delay(5000);
        attempts++;
      } catch (error) {
        if (attempts >= this.maxRetries) {
          throw this.handleError(error, 'Failed to poll transcription status');
        }
        attempts++;
        await this.delay(this.retryDelay);
      }
    }

    throw new Error(
      'Transcription timeout - exceeded maximum polling attempts'
    );
  }

  /**
   * @description Validates audio file
   *
   * @param {File} file - File to validate
   */
  private validateAudioFile(file: File): void {
    if (!file) {
      throw new Error('No file provided');
    }

    const supportedTypes = [
      'audio/mp3',
      'audio/wav',
      'audio/m4a',
      'audio/mpeg',
    ];
    if (!supportedTypes.includes(file.type)) {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size is 100MB`);
    }

    if (file.size === 0) {
      throw new Error('File is empty');
    }
  }

  /**
   * @description Converts file to buffer
   *
   * @param {File} file - File to convert
   * @returns {Promise<Buffer>} File buffer
   */
  private async fileToBuffer(file: File): Promise<Buffer> {
    try {
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      // Convert ArrayBuffer to Buffer
      const buffer = Buffer.from(arrayBuffer);
      return buffer;
    } catch (error) {
      throw new Error(`Failed to convert file to buffer ${error}`);
    }
  }

  /**
   * @description Maps AssemblyAI transcription to our result type
   *
   * @param {any} transcription - AssemblyAI transcription response
   * @returns {TranscriptionResult} Mapped transcription result
   */
  private mapTranscriptionToResult(transcription: any): TranscriptionResult {
    const result: TranscriptionResult = {
      id: transcription.id,
      status: transcription.status,
      text: transcription.text,
      error: transcription.error,
    };

    // Map speaker segments - AssemblyAI returns speaker_labels as utterances array
    if (transcription.utterances && Array.isArray(transcription.utterances)) {
      result.speakers = transcription.utterances.map((utterance: any) => ({
        speaker: utterance.speaker,
        text: utterance.text,
        start: utterance.start,
        end: utterance.end,
        confidence: utterance.confidence,
      }));
    } else if (
      transcription.speaker_labels &&
      Array.isArray(transcription.speaker_labels)
    ) {
      result.speakers = transcription.speaker_labels.map((segment: any) => ({
        speaker: segment.speaker,
        text: segment.text,
        start: segment.start,
        end: segment.end,
        confidence: segment.confidence,
      }));
    } else if (
      transcription.speaker_labels &&
      transcription.speaker_labels.segments
    ) {
      result.speakers = transcription.speaker_labels.segments.map(
        (segment: any) => ({
          speaker: segment.speaker,
          text: segment.text,
          start: segment.start,
          end: segment.end,
          confidence: segment.confidence,
        })
      );
    } else {
      result.speakers = [];
    }

    // Map sentiment analysis - AssemblyAI returns sentiment in sentiment_analysis_results
    if (
      transcription.sentiment_analysis_results &&
      Array.isArray(transcription.sentiment_analysis_results)
    ) {
      result.sentiment = {
        overall: 'NEUTRAL', // We'll calculate this from segments
        scores: {
          positive: 0,
          negative: 0,
          neutral: 0,
        },
        segments: transcription.sentiment_analysis_results.map(
          (segment: any) => ({
            text: segment.text,
            sentiment: segment.sentiment,
            confidence: segment.confidence,
            start: segment.start,
            end: segment.end,
          })
        ),
      };

      // Calculate overall sentiment and scores
      const sentimentCounts = result.sentiment.segments.reduce(
        (acc: any, segment: any) => {
          if (segment.sentiment && typeof segment.sentiment === 'string') {
            acc[segment.sentiment.toLowerCase()] =
              (acc[segment.sentiment.toLowerCase()] || 0) + 1;
          }
          return acc;
        },
        {}
      );

      result.sentiment.scores = {
        positive: sentimentCounts.positive || 0,
        negative: sentimentCounts.negative || 0,
        neutral: sentimentCounts.neutral || 0,
      };

      // Determine overall sentiment
      const total =
        result.sentiment.scores.positive +
        result.sentiment.scores.negative +
        result.sentiment.scores.neutral;
      if (total > 0) {
        if (
          result.sentiment.scores.positive > result.sentiment.scores.negative
        ) {
          result.sentiment.overall = 'POSITIVE';
        } else if (
          result.sentiment.scores.negative > result.sentiment.scores.positive
        ) {
          result.sentiment.overall = 'NEGATIVE';
        } else {
          result.sentiment.overall = 'NEUTRAL';
        }
      }
    } else {
      result.sentiment = null;
    }

    // Map summary
    if (transcription.summary) {
      result.summary = transcription.summary;
    }

    // Map PII redactions - AssemblyAI returns redactions in pii_redaction_results
    if (
      transcription.pii_redaction_results &&
      Array.isArray(transcription.pii_redaction_results)
    ) {
      result.piiRedactions = transcription.pii_redaction_results.map(
        (redaction: any) => ({
          text: redaction.text,
          type: redaction.type,
          confidence: redaction.confidence,
          start: redaction.start,
          end: redaction.end,
        })
      );
    } else {
      result.piiRedactions = [];
    }

    // Map auto highlights
    if (
      transcription.auto_highlights_result &&
      Array.isArray(transcription.auto_highlights_result.results)
    ) {
      result.autoHighlights = transcription.auto_highlights_result.results.map(
        (highlight: any) => ({
          text: highlight.text,
          count: highlight.count,
          rank: highlight.rank,
          timestamps: highlight.timestamps || [],
        })
      );
    } else {
      result.autoHighlights = [];
    }

    return result;
  }

  /**
   * @description Calculates progress percentage
   *
   * @param {TranscriptionResult} result - Transcription result
   * @returns {number} Progress percentage
   */
  private calculateProgress(result: TranscriptionResult): number {
    if (result.status === 'completed') return 100;
    if (result.status === 'error') return 0;
    if (result.status === 'queued') return 10;
    if (result.status === 'processing') return 50;
    return 0;
  }

  /**
   * @description Retries an operation with exponential backoff
   *
   * @param {Function} operation - Operation to retry
   * @param {string} errorMessage - Error message
   * @returns {Promise<T>} Operation result
   */
  private async retryOperation<T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt === this.maxRetries) {
          break;
        }

        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await this.delay(delay);
      }
    }

    throw new Error(
      `${errorMessage}: ${lastError?.message || 'Unknown error'}`
    );
  }

  /**
   * @description Handles and formats errors
   *
   * @param {any} error - Error to handle
   * @param {string} context - Error context
   * @returns {Error} Formatted error
   */
  private handleError(error: any, context: string): Error {
    let message = context;

    if (error?.response?.status) {
      switch (error.response.status) {
        case 401:
          message =
            'Invalid API key. Please check your AssemblyAI credentials.';
          break;
        case 403:
          message = 'Access denied. Please check your API permissions.';
          break;
        case 429:
          message = 'Rate limit exceeded. Please try again later.';
          break;
        case 400:
          message = 'Invalid request. Please check your audio file format.';
          break;
        case 500:
          message = 'AssemblyAI service error. Please try again later.';
          break;
        default:
          message = `${context}: ${error.message || 'Unknown error'}`;
      }
    } else if (error?.message) {
      message = `${context}: ${error.message}`;
    }

    return new Error(message);
  }

  /**
   * @description Delays execution for specified milliseconds
   *
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>} Promise that resolves after delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * @description Creates AssemblyAI service instance
 *
 * @returns {AssemblyAIService} AssemblyAI service instance
 */
export const createAssemblyAIService = (): AssemblyAIService => {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  const apiUrl = process.env.ASSEMBLYAI_API_URL;

  if (!apiKey) {
    throw new Error('ASSEMBLYAI_API_KEY environment variable is required');
  }

  return new AssemblyAIService({
    apiKey,
    ...(apiUrl && { apiUrl }),
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 30000,
  });
};
