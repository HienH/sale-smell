---
@fileoverview Defines Phase 2: MVP - A minimal viable product with core features that deliver the primary value of sales call analysis.

# 🎯 Phase 2: MVP

## Overview
Phase 2 delivers the core functionality that makes Sale-Smell valuable to users. This MVP includes audio transcription, LLM analysis, and a basic dashboard that provides actionable insights from sales calls.

**Duration:** 3-4 weeks  
**Goal:** Functional application that can analyze sales calls and provide insights

---

## 🎯 Phase Objectives

### Primary Goals
- Implement audio transcription via AssemblyAI
- Integrate LLM analysis using Ollama
- Create dashboard to display analysis results
- Enable PDF report generation
- Provide transcript download functionality

### Success Criteria
- [ ] Users can upload audio files and receive transcription
- [ ] LLM analysis provides meaningful insights
- [ ] Dashboard displays results in a clear, actionable format
- [ ] PDF reports can be generated and downloaded
- [ ] Application handles errors gracefully

---

## 📋 Core Features

### 1. Audio Transcription Integration
**Purpose:** Convert uploaded audio files to text with speaker labels and sentiment analysis

**Steps:**
1. Set up AssemblyAI API integration
2. Create transcription service with error handling
3. Implement file upload to backend with progress tracking
4. Add speaker labeling and sentiment analysis
5. Store transcription results for analysis

**Deliverables:**
- Working AssemblyAI integration
- Transcription service with error handling
- File upload with progress tracking
- Speaker-labeled transcriptions
- Sentiment analysis data

### 2. LLM Analysis Engine
**Purpose:** Analyze transcripts using LLaMA 3 via Ollama to extract insights

**Steps:**
1. Set up Ollama with LLaMA 3 model
2. Create analysis service with prompt templates
3. Implement core analysis features (summary, objections, coaching)
4. Add error handling and retry logic
5. Cache analysis results for performance

**Deliverables:**
- Ollama integration with LLaMA 3
- Analysis service with prompt templates
- Core analysis features (summary, objections, coaching)
- Error handling and retry logic
- Performance optimization

### 3. Dashboard Interface
**Purpose:** Display analysis results in a clear, actionable format

**Steps:**
1. Create dashboard layout with responsive design
2. Implement transcript viewer with speaker highlighting
3. Add metrics display with charts and tables
4. Create insights cards for coaching feedback
5. Add download buttons for PDF and transcript

**Deliverables:**
- Responsive dashboard layout
- Interactive transcript viewer
- Metrics display with visualizations
- Insights cards for coaching
- Download functionality

### 4. PDF Report Generation
**Purpose:** Generate comprehensive PDF reports with analysis results

**Steps:**
1. Set up jsPDF for client-side PDF generation
2. Create PDF template with branding
3. Implement report sections (summary, metrics, insights)
4. Add transcript inclusion in PDF
5. Enable PDF download functionality

**Deliverables:**
- PDF generation service
- Branded PDF templates
- Comprehensive report sections
- Transcript inclusion
- Download functionality

### 5. Error Handling & User Feedback
**Purpose:** Provide clear feedback and handle errors gracefully

**Steps:**
1. Implement comprehensive error handling
2. Create user-friendly error messages
3. Add loading states and progress indicators
4. Implement retry mechanisms for failed operations
5. Add success confirmations and next steps

**Deliverables:**
- Comprehensive error handling
- User-friendly error messages
- Loading states and progress indicators
- Retry mechanisms
- Success confirmations

---

## 🏗️ Technical Implementation

### Backend API Structure
```
src/app/api/
├── upload/
│   └── route.ts          # File upload endpoint
├── analyze/
│   └── route.ts          # LLM analysis endpoint
├── download/
│   ├── pdf/
│   │   └── route.ts      # PDF download endpoint
│   └── transcript/
│       └── route.ts      # Transcript download endpoint
└── health/
    └── route.ts          # Health check endpoint
```

### Service Layer
```
src/lib/services/
├── assemblyai.ts         # AssemblyAI API client
├── ollama.ts            # Ollama LLM client
├── analysis.ts          # Analysis orchestration
└── pdf.ts              # PDF generation service
```

### Component Structure
```
src/components/
├── dashboard/
│   ├── TranscriptViewer.tsx
│   ├── MetricsDisplay.tsx
│   ├── InsightsPanel.tsx
│   ├── DownloadButtons.tsx
│   └── index.ts
├── forms/
│   ├── FileUpload.tsx
│   └── index.ts
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    ├── Progress.tsx
    └── index.ts
```

### State Management
```
src/lib/stores/
├── upload-store.ts       # Upload state management
├── analysis-store.ts     # Analysis state management
└── index.ts
```

---

## 🎨 UI/UX Requirements

### Dashboard Layout
- **Header:** Application branding and navigation
- **Main Content:** Analysis results in organized sections
- **Sidebar:** Quick navigation and actions
- **Footer:** Additional links and information

### Component Design
- **Transcript Viewer:** Scrollable, searchable, with speaker highlighting
- **Metrics Cards:** Clear presentation of key metrics
- **Insights Panel:** Actionable coaching feedback
- **Download Section:** Prominent download buttons

### Responsive Design
- **Mobile:** Stacked layout with touch-friendly controls
- **Tablet:** Side-by-side layout with optimized spacing
- **Desktop:** Multi-column layout with detailed information

### Animation & Feedback
- **Loading States:** Smooth progress indicators
- **Success States:** Clear confirmation messages
- **Error States:** Helpful error messages with recovery options
- **Transitions:** Smooth page and component transitions

---

## 🔧 API Integration

### AssemblyAI Integration
- **File Upload:** Secure file upload to AssemblyAI
- **Transcription:** Real-time transcription with speaker labels
- **Sentiment Analysis:** Emotion detection per speaker
- **Entity Detection:** Key terms and phrases identification
- **Error Handling:** Comprehensive error handling and retry logic

### Ollama Integration
- **Model Setup:** LLaMA 3 model configuration
- **Prompt Templates:** Structured prompts for consistent analysis
- **Analysis Features:** Summary, objections, coaching, metrics
- **Performance:** Optimized for response time and quality
- **Caching:** Result caching for improved performance

### Analysis Features
- **Call Summary:** Bullet-point summary of the conversation
- **Objection Detection:** Identify and classify customer objections
- **Coaching Feedback:** Actionable feedback for sales reps
- **Talk Time Analysis:** Speaker time distribution
- **Engagement Metrics:** Question count, filler words, etc.

---

## 📊 Data Flow

### Upload Process
1. **File Upload:** User uploads audio file
2. **Validation:** File type and size validation
3. **AssemblyAI:** File sent to AssemblyAI for transcription
4. **Progress Tracking:** Real-time progress updates
5. **Result Storage:** Transcription stored for analysis

### Analysis Process
1. **Transcript Processing:** Prepare transcript for LLM analysis
2. **LLM Analysis:** Send to Ollama for insights
3. **Result Processing:** Parse and structure analysis results
4. **Dashboard Update:** Display results in dashboard
5. **Report Generation:** Prepare data for PDF generation

### Download Process
1. **User Request:** User clicks download button
2. **Data Preparation:** Gather all analysis data
3. **PDF Generation:** Create PDF with jsPDF
4. **File Download:** Trigger browser download
5. **Success Confirmation:** Confirm successful download

---

## 🧪 Testing Strategy

### Unit Testing
- **Component Tests:** Test all React components
- **Service Tests:** Test API integration services
- **Utility Tests:** Test helper functions
- **Type Tests:** Ensure TypeScript type safety

### Integration Testing
- **API Endpoint Tests:** Test all API routes
- **File Upload Tests:** Test upload functionality
- **Analysis Tests:** Test LLM analysis pipeline
- **Download Tests:** Test PDF generation and download

### End-to-End Testing
- **Complete Workflow:** Test full user journey
- **Error Scenarios:** Test error handling
- **Performance Tests:** Test with large files
- **Cross-browser Tests:** Test across different browsers

---

## 📊 Success Metrics

### Functional Metrics
- **Upload Success Rate:** > 95% successful uploads
- **Transcription Accuracy:** > 90% accuracy for clear audio
- **Analysis Quality:** Meaningful insights in > 80% of cases
- **Download Success:** > 98% successful downloads

### Performance Metrics
- **Upload Time:** < 60 seconds for 10MB files
- **Analysis Time:** < 180 seconds for 30-minute calls
- **Page Load Time:** < 3 seconds for dashboard
- **PDF Generation:** < 10 seconds for report generation

### User Experience Metrics
- **Error Rate:** < 5% user-facing errors
- **User Satisfaction:** > 4/5 rating for core features
- **Task Completion:** > 90% users complete full workflow
- **Return Usage:** > 70% users return for second analysis

---

## 🚨 Risk Mitigation

### Technical Risks
- **API Rate Limits:** Implement rate limiting and retry logic
- **Large File Handling:** Optimize for large audio files
- **LLM Performance:** Cache results and optimize prompts
- **Browser Compatibility:** Test across major browsers

### User Experience Risks
- **Long Processing Times:** Clear progress indicators
- **Complex Interface:** Simplify dashboard layout
- **Error Confusion:** Clear, actionable error messages
- **Data Loss:** Robust error recovery mechanisms

---

## 📅 Timeline

### Week 1: Backend Foundation
- **Days 1-2:** AssemblyAI integration
- **Days 3-4:** Ollama setup and basic analysis
- **Day 5:** API route implementation

### Week 2: Frontend Dashboard
- **Days 1-2:** Dashboard layout and components
- **Days 3-4:** Transcript viewer and metrics display
- **Day 5:** Download functionality

### Week 3: Analysis & Polish
- **Days 1-2:** Advanced analysis features
- **Days 3-4:** PDF generation and download
- **Day 5:** Error handling and user feedback

### Week 4: Testing & Optimization
- **Days 1-2:** Comprehensive testing
- **Days 3-4:** Performance optimization
- **Day 5:** Documentation and deployment preparation

---

## 🔄 Handoff to Phase 3

### Prerequisites for Phase 3
- [ ] All MVP features are complete and tested
- [ ] Performance meets target metrics
- [ ] Error handling is robust
- [ ] User experience is polished
- [ ] Documentation is comprehensive

### Phase 3 Preparation
- **Advanced Features:** Plan for enhanced analysis capabilities
- **User Management:** Plan for user accounts and history
- **Advanced UI:** Plan for enhanced visualizations
- **Deployment:** Plan for production deployment

---

## 📝 Documentation Requirements

### User Documentation
- **User Guide:** How to use the application
- **Feature Overview:** Description of all features
- **Troubleshooting:** Common issues and solutions
- **Best Practices:** Tips for best results

### Technical Documentation
- **API Documentation:** All endpoint documentation
- **Component Library:** Usage examples for all components
- **Architecture Guide:** System design and data flow
- **Deployment Guide:** Production deployment instructions

---

This MVP phase delivers the core value proposition of Sale-Smell: the ability to upload sales call recordings and receive meaningful, actionable insights through AI-powered analysis. 