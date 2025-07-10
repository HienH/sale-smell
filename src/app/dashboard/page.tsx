/**
 * @fileoverview Dashboard page for Sale-Smell
 * 
 * This file defines the main dashboard page that displays transcription results,
 * analysis insights, and provides download functionality for reports.
 * 
 * Key Features:
 * - Enhanced file upload with real transcription
 * - Transcription results display
 * - Analysis insights and metrics
 * - Download functionality for reports
 * - Responsive design and accessibility
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

'use client';

import React, { useState } from 'react';
import { EnhancedFileUpload } from '@/components/forms/EnhancedFileUpload';
import type { TranscriptionResult } from '@/lib/types';

/**
 * @description Dashboard state interface
 */
interface DashboardState {
    transcription: TranscriptionResult | null;
    isAnalyzing: boolean;
    analysisComplete: boolean;
    error: string | null;
    speakerNames: {
        A: string;
        B: string;
    };
    isSpeakerNamesOpen: boolean;
}

/**
 * @description Dashboard page component
 * 
 * This component provides a comprehensive dashboard for uploading audio files,
 * viewing transcription results, and accessing analysis insights.
 * 
 * @returns {React.JSX.Element} Dashboard page component
 */
const DashboardPage = (): React.JSX.Element => {
    const [state, setState] = useState<DashboardState>({
        transcription: null,
        isAnalyzing: false,
        analysisComplete: false,
        error: null,
        speakerNames: {
            A: 'Speaker A',
            B: 'Speaker B',
        },
        isSpeakerNamesOpen: false,
    });

    /**
     * @description Handles transcription completion
     * 
     * @param {TranscriptionResult} result - Completed transcription result
     */
    const handleTranscriptionComplete = (result: TranscriptionResult) => {
        setState(prev => ({
            ...prev,
            transcription: result,
            error: null,
            isAnalyzing: false, // Stop the loading immediately
            analysisComplete: true, // Mark as complete
        }));
    };

    /**
     * @description Handles transcription error
     * 
     * @param {string} error - Error message
     */
    const handleTranscriptionError = (error: string) => {
        setState(prev => ({
            ...prev,
            error,
            isAnalyzing: false, // Stop loading on error
        }));
    };

    /**
     * @description Handles transcription progress
     * 
     * @param {number} progress - Progress percentage
     * @param {string} message - Progress message
     */
    const handleTranscriptionProgress = (progress: number, message: string) => {
        // Show analyzing state during transcription, but only update if state actually needs to change
        if (progress > 0 && progress < 100) {
            setState(prev => {
                // Only update if not already analyzing
                if (!prev.isAnalyzing) {
                    return {
                        ...prev,
                        isAnalyzing: true,
                        error: null,
                    };
                }
                return prev; // Return same state if already analyzing
            });
        }
    };

    /**
     * @description Downloads transcript as text file
     */
    const handleDownloadTranscript = () => {
        if (!state.transcription?.text) return;

        const blob = new Blob([state.transcription.text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transcript.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    /**
     * @description Downloads analysis report as JSON
     */
    const handleDownloadReport = () => {
        if (!state.transcription) return;

        const report = {
            transcription: state.transcription,
            analysis: {
                timestamp: new Date().toISOString(),
                wordCount: state.transcription.text?.split(/\s+/).length || 0,
                speakerCount: state.transcription.speakers?.length || 0,
                sentiment: state.transcription.sentiment,
                summary: state.transcription.summary,
                piiRedactions: state.transcription.piiRedactions,
            },
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'analysis-report.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    /**
     * @description Resets the dashboard state
     */
    const handleReset = () => {
        setState({
            transcription: null,
            isAnalyzing: false,
            analysisComplete: false,
            error: null,
            speakerNames: {
                A: 'Speaker A',
                B: 'Speaker B',
            },
            isSpeakerNamesOpen: false,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
            {/* Header */}
            <header className="container-responsive py-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                        Sale-Smell Dashboard
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 sm:text-2xl">
                        AI-Powered Sales Call Analysis
                    </p>
                    <p className="mt-2 text-base text-gray-500 sm:text-lg">
                        Upload, analyze, and get insights from your sales calls
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-responsive py-12">
                <div className="mx-auto max-w-6xl">
                    {/* Upload Section */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                Upload Your Sales Call
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Get instant analysis and coaching insights from your recorded sales conversations
                            </p>
                        </div>

                        <EnhancedFileUpload
                            onTranscriptionComplete={handleTranscriptionComplete}
                            onTranscriptionError={handleTranscriptionError}
                            onTranscriptionProgress={handleTranscriptionProgress}
                        />
                    </section>

                    {/* Error Display */}
                    {state.error && (
                        <section className="mb-8">
                            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-error-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-error-800">{state.error}</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Analysis Progress */}
                    {state.isAnalyzing && (
                        <section className="mb-8">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                                    <span className="text-blue-800 font-medium">Analyzing your sales call...</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Results Section */}
                    {state.transcription && (
                        <section className="mb-12">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        Analysis Results
                                    </h2>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={handleDownloadTranscript}
                                            className="btn btn-secondary"
                                            disabled={!state.transcription.text}
                                        >
                                            Download Transcript
                                        </button>
                                        <button
                                            onClick={handleDownloadReport}
                                            className="btn btn-primary"
                                            disabled={!state.analysisComplete}
                                        >
                                            Download Report
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="btn btn-outline"
                                        >
                                            New Analysis
                                        </button>
                                    </div>
                                </div>

                                {state.transcription.speakers && state.transcription.speakers.length > 0 && (
                                    <div className="mb-8">
                                        <div className="bg-white border border-gray-200 rounded-lg">
                                            <button
                                                onClick={() => setState(prev => ({
                                                    ...prev,
                                                    isSpeakerNamesOpen: !prev.isSpeakerNamesOpen
                                                }))}
                                                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        Customize Speaker's Names
                                                    </h3>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${state.isSpeakerNamesOpen ? 'rotate-180' : ''
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>

                                            {state.isSpeakerNamesOpen && (
                                                <div className="p-4 pb-4 border-t  border-gray-200">
                                                    <div className="pt-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label htmlFor="speakerA" className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Speaker A Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="speakerA"
                                                                    value={state.speakerNames.A}
                                                                    onChange={(e) => setState(prev => ({
                                                                        ...prev,
                                                                        speakerNames: {
                                                                            ...prev.speakerNames,
                                                                            A: e.target.value
                                                                        }
                                                                    }))}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    placeholder="e.g., Sales Rep, John, etc."
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="speakerB" className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Speaker B Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="speakerB"
                                                                    value={state.speakerNames.B}
                                                                    onChange={(e) => setState(prev => ({
                                                                        ...prev,
                                                                        speakerNames: {
                                                                            ...prev.speakerNames,
                                                                            B: e.target.value
                                                                        }
                                                                    }))}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    placeholder="e.g., Customer, Prospect, etc."
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* Conversation Transcript */}
                                {state.transcription.speakers && state.transcription.speakers.length > 0 ? (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Conversation Transcript</h3>
                                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                            <div className="space-y-4">
                                                {state.transcription.speakers.map((segment, index) => {
                                                    // Find corresponding sentiment segment by timing
                                                    const sentimentSegment = state.transcription?.sentiment?.segments?.find(
                                                        s => {
                                                            // Match by timing with some tolerance
                                                            const timeOverlap = Math.abs(s.start - segment.start) < 1000 &&
                                                                Math.abs(s.end - segment.end) < 1000;
                                                            // Or match by text content
                                                            const textMatch = s.text.toLowerCase().includes(segment.text.toLowerCase()) ||
                                                                segment.text.toLowerCase().includes(s.text.toLowerCase());
                                                            return timeOverlap || textMatch;
                                                        }
                                                    );

                                                    return (
                                                        <div key={index} className="space-y-2">
                                                            <div className="flex items-start space-x-3">
                                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${segment.speaker === 'A' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {segment.speaker === 'A' ? (state.speakerNames.A || 'Speaker A') : (state.speakerNames.B || 'Speaker B')}
                                                                </span>
                                                                {sentimentSegment && (
                                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sentimentSegment.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' :
                                                                        sentimentSegment.sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                                        }`}>
                                                                        {sentimentSegment.sentiment}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="ml-0">
                                                                <p className="text-gray-700">{segment.text}</p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {Math.round(segment.start / 1000)}s - {Math.round(segment.end / 1000)}s
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Fallback to plain text if no speaker segments */
                                    state.transcription.text && (
                                        <div className="mb-8">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Transcription</h3>
                                            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                                <p className="text-gray-700 whitespace-pre-wrap">
                                                    {state.transcription.text}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}



                                {/* Sentiment Analysis */}
                                {state.transcription.sentiment && state.transcription.sentiment.segments && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h3>
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <div className="text-2xl font-bold text-green-600">
                                                        {state.transcription.sentiment.segments.filter(s => s.sentiment === 'POSITIVE').length}
                                                    </div>
                                                    <div className="text-sm text-green-600">Positive</div>
                                                </div>
                                                <div className="bg-red-50 rounded-lg p-4">
                                                    <div className="text-2xl font-bold text-red-600">
                                                        {state.transcription.sentiment.segments.filter(s => s.sentiment === 'NEGATIVE').length}
                                                    </div>
                                                    <div className="text-sm text-red-600">Negative</div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="text-2xl font-bold text-gray-600">
                                                        {state.transcription.sentiment.segments.filter(s => s.sentiment === 'NEUTRAL').length}
                                                    </div>
                                                    <div className="text-sm text-gray-600">Neutral</div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <h4 className="text-md font-medium text-gray-900 mb-2">Sentiment Breakdown</h4>
                                                <div className="max-h-48 overflow-y-auto space-y-2">
                                                    {state.transcription.sentiment.segments.slice(0, 10).map((segment, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-white rounded p-2">
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`px-2 py-1 rounded text-xs font-medium ${segment.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' :
                                                                    segment.sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                    {segment.sentiment}
                                                                </span>
                                                                <span className="text-sm text-gray-600">
                                                                    {Math.round(segment.start / 1000)}s
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-gray-700 max-w-xs truncate">
                                                                {segment.text}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Summary */}
                                {state.transcription.summary && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Call Summary</h3>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <p className="text-gray-700">{state.transcription.summary}</p>
                                        </div>
                                    </div>
                                )}

                                {/* PII Redaction */}
                                {state.transcription.piiRedactions && state.transcription.piiRedactions.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Protection</h3>
                                        <div className="bg-orange-50 rounded-lg p-4">
                                            <div className="flex items-center mb-3">
                                                <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                <span className="text-orange-800 font-medium">
                                                    Personal Information Detected and Redacted
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {state.transcription.piiRedactions.map((redaction, index) => (
                                                    <div key={index} className="bg-white rounded-lg p-3 border border-orange-200">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${redaction.type === 'PERSON_NAME' ? 'bg-blue-100 text-blue-800' :
                                                                redaction.type === 'EMAIL_ADDRESS' ? 'bg-green-100 text-green-800' :
                                                                    redaction.type === 'PHONE_NUMBER' ? 'bg-purple-100 text-purple-800' :
                                                                        redaction.type === 'CREDIT_CARD_NUMBER' ? 'bg-red-100 text-red-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {redaction.type.replace('_', ' ')}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {Math.round(redaction.start / 1000)}s
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded">
                                                            {redaction.text}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-sm text-orange-700 mt-3">
                                                🔒 Your privacy is protected. Personal information has been automatically detected and redacted from the transcript.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Key Highlights */}
                                {state.transcription.autoHighlights && state.transcription.autoHighlights.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Highlights</h3>
                                        <div className="bg-yellow-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {state.transcription.autoHighlights.map((highlight, index) => (
                                                    <div key={index} className="bg-white rounded-lg p-3 border border-yellow-200">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                Rank #{highlight.rank}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {highlight.count}x
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-700 font-semibold mb-1">
                                                            {highlight.text}
                                                        </div>
                                                        {highlight.timestamps && highlight.timestamps.length > 0 && (
                                                            <div className="text-xs text-gray-500">
                                                                {highlight.timestamps.map((ts, i) => (
                                                                    <span key={i} className="inline-block mr-2">
                                                                        {Math.round(ts.start / 1000)}s - {Math.round(ts.end / 1000)}s
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-sm text-yellow-700 mt-3">
                                                ⭐ These are the most important moments and phrases detected in your call.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Analysis Complete */}
                                {state.analysisComplete && (
                                    <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-success-800 font-medium">
                                                Analysis complete! Download your report for detailed insights.
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Features Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8 sm:text-3xl">
                            What You&apos;ll Get
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">Smart Transcription</h3>
                                </div>
                                <p className="text-gray-600">
                                    Accurate speech-to-text with speaker identification and sentiment analysis
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">AI Analysis</h3>
                                </div>
                                <p className="text-gray-600">
                                    Deep insights into objection handling, talk time, and coaching opportunities
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="card p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">Detailed Reports</h3>
                                </div>
                                <p className="text-gray-600">
                                    Download comprehensive PDF reports with actionable coaching feedback
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="container-responsive py-8">
                    <div className="text-center">
                        <p className="text-gray-600">
                            © 2024 Sale-Smell. AI-powered sales coaching for modern teams.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage; 