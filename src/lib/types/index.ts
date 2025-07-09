/**
 * @fileoverview Main types file for the Sale-Smell application
 * 
 * This file contains common type definitions used throughout
 * the Sale-Smell application for type safety and consistency.
 * 
 * Key Features:
 * - API response types
 * - Component prop types
 * - Utility types
 * - Common interfaces
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

/**
 * @description API response wrapper type
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * @description File upload response type
 */
export interface FileUploadResponse {
    fileId: string;
    fileName: string;
    fileSize: number;
    uploadUrl?: string;
}

/**
 * @description Transcription result type
 */
export interface TranscriptionResult {
    id: string;
    status: 'queued' | 'processing' | 'completed' | 'error';
    text?: string;
    speakers?: SpeakerSegment[];
    sentiment?: SentimentAnalysis;
    entities?: EntityDetection[];
    summary?: string;
    error?: string;
}

/**
 * @description Speaker segment type
 */
export interface SpeakerSegment {
    speaker: string;
    text: string;
    start: number;
    end: number;
    confidence: number;
}

/**
 * @description Sentiment analysis type
 */
export interface SentimentAnalysis {
    overall: 'positive' | 'negative' | 'neutral';
    scores: {
        positive: number;
        negative: number;
        neutral: number;
    };
    segments: SentimentSegment[];
}

/**
 * @description Sentiment segment type
 */
export interface SentimentSegment {
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    start: number;
    end: number;
}

/**
 * @description Entity detection type
 */
export interface EntityDetection {
    text: string;
    type: string;
    confidence: number;
    start: number;
    end: number;
}

/**
 * @description Analysis result type
 */
export interface AnalysisResult {
    callSummary: string;
    finalObjection: string;
    coachingFeedback: CoachingFeedback;
    talkTimeAnalysis: TalkTimeAnalysis;
    rebuttalScript: string;
    buyingSignals: string[];
    scriptAdherence: ScriptAdherence;
    trustRapport: TrustRapport;
    riskFlags: RiskFlag[];
    alternativeObjections: string[];
    followUpEmail: string;
    repScore: RepScore;
}

/**
 * @description Coaching feedback type
 */
export interface CoachingFeedback {
    strengths: string[];
    improvements: string[];
    objectionHandling: string[];
    overallRating: number;
}

/**
 * @description Talk time analysis type
 */
export interface TalkTimeAnalysis {
    repTalkTime: number;
    customerTalkTime: number;
    repTalkPercentage: number;
    engagementScore: number;
    listeningScore: number;
}

/**
 * @description Script adherence type
 */
export interface ScriptAdherence {
    followed: boolean;
    score: number;
    feedback: string;
    missedSteps: string[];
}

/**
 * @description Trust and rapport type
 */
export interface TrustRapport {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
}

/**
 * @description Risk flag type
 */
export interface RiskFlag {
    type: 'high' | 'medium' | 'low';
    message: string;
    timestamp: number;
}

/**
 * @description Rep score type
 */
export interface RepScore {
    empathy: number;
    clarity: number;
    confidence: number;
    listening: number;
    objectionHandling: number;
    overall: number;
}

/**
 * @description Upload state type
 */
export interface UploadState {
    isUploading: boolean;
    progress: number;
    error: string | null;
    file: File | null;
}

/**
 * @description Analysis state type
 */
export interface AnalysisState {
    isAnalyzing: boolean;
    progress: number;
    error: string | null;
    result: AnalysisResult | null;
}

/**
 * @description App state type
 */
export interface AppState {
    upload: UploadState;
    analysis: AnalysisState;
    transcription: TranscriptionResult | null;
}

/**
 * @description User preferences type
 */
export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
}

/**
 * @description Error type
 */
export interface AppError {
    code: string;
    message: string;
    details?: any;
    timestamp: number;
}

/**
 * @description Loading state type
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * @description File validation result type
 */
export interface FileValidationResult {
    isValid: boolean;
    error?: string;
    warnings?: string[];
}

/**
 * @description Component props with children
 */
export interface ComponentWithChildren {
    children: React.ReactNode;
}

/**
 * @description Component props with className
 */
export interface ComponentWithClassName {
    className?: string;
}

/**
 * @description Component props with both children and className
 */
export interface ComponentWithChildrenAndClassName extends ComponentWithChildren, ComponentWithClassName { } 