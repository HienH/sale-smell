---
@fileoverview Collection of Cursor chat prompts for the Sale-Smell project, organized by phase and functionality to ensure context continuity across different conversations.

# 🎯 Cursor Chat Prompts for Sale-Smell

This document contains focused prompts for starting new Cursor chats while maintaining project context and continuity. Each prompt is designed to provide complete context for a specific aspect of the project.

---

## 🚀 Phase 1: Setup Prompts

### Project Foundation Setup
```
I'm building Sale-Smell, an AI-powered sales call analysis application. I need to set up the initial project foundation.

Context:
- Next.js 14 with TypeScript and App Router
- Tailwind CSS for styling
- AssemblyAI for transcription, Ollama + LLaMA 3 for analysis
- AI-first development with 500-line file limit and comprehensive documentation
- Project structure: src/app/, src/components/, src/lib/, tests/

Requirements:
- Initialize Next.js project with TypeScript
- Configure Tailwind CSS and basic styling
- Set up ESLint, Prettier, and TypeScript configuration
- Create directory structure following project rules
- Configure environment variables and basic settings

Please help me set up the complete project foundation with proper configuration files and initial structure.
```

### File Upload Component
```
I'm working on the file upload component for Sale-Smell. This is a critical component that needs to handle audio file uploads with drag-and-drop functionality.

Context:
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Supported formats: .mp3, .wav, .m4a
- File size limits and validation required
- Progress tracking and error handling needed
- AI-first development with comprehensive documentation

Requirements:
- Drag-and-drop file upload interface
- File type validation (.mp3, .wav, .m4a)
- File size validation and limits
- Progress indicator during upload
- Error handling for invalid files
- Success/error feedback to user
- Responsive design for mobile/desktop

Please help me create a robust file upload component with proper validation and user feedback.
```

### Basic UI Framework
```
I need to create the basic UI framework for Sale-Smell with core components and layout structure.

Context:
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Minimalist design with animations
- AI-first development principles
- 500-line file limit

Requirements:
- Basic layout component with header
- Responsive container system
- Button and card components
- Color scheme and typography setup
- Loading and error state components
- Consistent spacing and design system

Please help me create the foundational UI components and layout system.
```

---

## 🎯 Phase 2: MVP Prompts

### AssemblyAI Integration
```
I need to integrate AssemblyAI for audio transcription in Sale-Smell. This is a core feature for the MVP.

Context:
- Next.js 14 with API routes
- AssemblyAI API for transcription
- Features needed: speaker labels, sentiment analysis,
- Error handling and retry logic required
- Progress tracking for long transcriptions

Requirements:
- Set up AssemblyAI API client
- Create transcription service with error handling
- Implement file upload to backend with progress tracking
- Add speaker labeling and sentiment analysis
- Store transcription results for analysis
- Handle API rate limits and errors

Please help me implement the AssemblyAI integration with proper error handling and progress tracking.
```

### Ollama LLM Analysis
```
I need to integrate Ollama with LLaMA 3 for sales call analysis in Sale-Smell. This is the core AI analysis feature.

Context:
- Ollama with LLaMA 3 model
- Analysis features: summary, objections, coaching feedback
- Prompt engineering for consistent results
- Error handling and retry logic
- Performance optimization for response time

Requirements:
- Set up Ollama with LLaMA 3 model
- Create analysis service with prompt templates
- Implement core analysis features (summary, objections, coaching)
- Add error handling and retry logic
- Cache analysis results for performance
- Handle model responses and parsing

Please help me implement the Ollama integration with proper prompt engineering and error handling.
```

### Dashboard Interface
```
I need to create the main dashboard interface for Sale-Smell that displays analysis results.

Context:
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Analysis data from AssemblyAI and Ollama
- Responsive design required
- Interactive elements and animations

Requirements:
- Create dashboard layout with responsive design
- Implement transcript viewer with speaker highlighting
- Add metrics display with charts and tables
- Create insights cards for coaching feedback
- Add download buttons for PDF and transcript
- Ensure accessibility and performance

Please help me create a comprehensive dashboard interface that displays all analysis results effectively.
```

### PDF Report Generation
```
I need to implement PDF report generation for Sale-Smell using jsPDF.

Context:
- Client-side PDF generation with jsPDF
- Analysis data from AssemblyAI and Ollama
- Branded PDF templates needed
- Comprehensive report sections required

Requirements:
- Set up jsPDF for client-side PDF generation
- Create PDF template with branding
- Implement report sections (summary, metrics, insights)
- Add transcript inclusion in PDF
- Enable PDF download functionality
- Handle large reports and performance

Please help me implement PDF report generation with proper templates and formatting.
```

---

## 🚀 Phase 3: Enhancement Prompts

### Advanced LLM Analysis
```
I need to enhance the LLM analysis in Sale-Smell with more sophisticated prompts and deeper insights.

Context:
- Existing Ollama + LLaMA 3 integration
- Current analysis: summary, objections, coaching
- Need advanced features for deeper insights
- Performance optimization required

Requirements:
- Implement advanced prompt engineering for better insights
- Add sentiment timeline analysis throughout the call
- Create objection rebuttal suggestions
- Add buying signals detection and scoring
- Implement script adherence analysis
- Optimize for response time and quality

Please help me enhance the LLM analysis with more sophisticated prompts and features.
```

### Advanced Visualizations
```
I need to create sophisticated charts and visualizations for Sale-Smell using Chart.js or D3.js.

Context:
- Next.js 14 with TypeScript
- Analysis data from AssemblyAI and Ollama
- Interactive charts needed
- Responsive design required

Requirements:
- Implement interactive charts using Chart.js or D3.js
- Create sentiment timeline visualization
- Add talk time distribution charts
- Build engagement metrics dashboard
- Create comparative analysis features
- Ensure accessibility and performance

Please help me create advanced data visualizations that enhance user understanding of the analysis results.
```

### Performance Optimization
```
I need to optimize the performance of Sale-Smell for production deployment.

Context:
- Next.js 14 application
- AssemblyAI and Ollama integrations
- Large file handling required
- Production deployment on Vercel and Railway

Requirements:
- Implement code splitting and lazy loading
- Optimize bundle size and loading times
- Add caching strategies for analysis results
- Implement progressive loading for large files
- Add performance monitoring and analytics
- Optimize for Core Web Vitals

Please help me optimize the application performance for production deployment.
```

---

## 🚀 Phase 4: Scale Prompts

### User Management System
```
I need to implement a user management system for Sale-Smell with authentication and user accounts.

Context:
- Next.js 14 with App Router
- NextAuth.js for authentication
- User accounts and call history needed
- Database integration required

Requirements:
- Set up NextAuth.js for authentication
- Create user registration and login flows
- Implement user profile management
- Add call history and saved analyses
- Create user preferences and settings
- Ensure security and privacy compliance

Please help me implement a complete user management system with authentication and user data.
```

### Database Integration
```
I need to integrate a database for Sale-Smell to store user data and call history.

Context:
- Next.js 14 application
- User management system needed
- Call history and analysis storage required
- PostgreSQL or similar database

Requirements:
- Set up database client and connection
- Create user data operations
- Implement call history storage
- Add analytics data operations
- Set up data models and migrations
- Ensure data security and privacy

Please help me implement database integration for user data and call history storage.
```

### Advanced Analytics
```
I need to create advanced analytics features for Sale-Smell with comprehensive reporting.

Context:
- Next.js 14 with TypeScript
- User data and call history available
- Analytics dashboard needed
- Trend analysis and comparisons required

Requirements:
- Create comprehensive analytics dashboard
- Implement trend analysis and comparisons
- Add performance benchmarking features
- Create custom report generation
- Add data export capabilities
- Ensure data privacy and security

Please help me implement advanced analytics features with comprehensive reporting capabilities.
```

---

## 🛠️ Technical Implementation Prompts

### API Route Development
```
I need to create API routes for Sale-Smell using Next.js App Router.

Context:
- Next.js 14 with App Router
- API routes in src/app/api/
- File upload, analysis, and download endpoints needed
- Error handling and validation required

Requirements:
- Create file upload endpoint with Multer
- Implement analysis endpoint for LLM processing
- Add download endpoints for PDF and transcript
- Implement proper error handling
- Add request validation and rate limiting
- Ensure security and performance

Please help me create robust API routes with proper error handling and validation.
```

### State Management
```
I need to implement state management for Sale-Smell using React Context and custom hooks.

Context:
- Next.js 14 with TypeScript
- File upload, transcription, and analysis workflows
- Complex state management required
- AI-first development principles

Requirements:
- Create React Context for global state
- Implement custom hooks for specific functionality
- Handle file upload state and progress
- Manage transcription and analysis states
- Add error state management
- Ensure performance and reusability

Please help me implement effective state management using React Context and custom hooks.
```

### Testing Implementation
```
I need to implement comprehensive testing for Sale-Smell.

Context:
- Next.js 14 with TypeScript
- Jest and React Testing Library
- Unit, integration, and E2E tests needed
- AI-first development with 500-line limit

Requirements:
- Set up Jest and React Testing Library
- Create unit tests for components and utilities
- Implement integration tests for API routes
- Add E2E tests for user workflows
- Set up test data and fixtures
- Ensure good test coverage

Please help me implement comprehensive testing for the application.
```

---

## 🎨 UI/UX Development Prompts

### Animation Implementation
```
I need to implement advanced animations for Sale-Smell using Framer Motion.

Context:
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Minimalist design with smooth animations
- Performance optimization required

Requirements:
- Set up Framer Motion for animations
- Implement page transitions
- Add component animations and micro-interactions
- Create loading states and progress indicators
- Ensure reduced motion support
- Optimize for performance

Please help me implement advanced animations that enhance the user experience.
```

### Responsive Design
```
I need to implement comprehensive responsive design for Sale-Smell.

Context:
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Mobile-first design approach
- Accessibility requirements

Requirements:
- Implement mobile-first responsive design
- Create touch-friendly interactions
- Optimize for tablet and desktop
- Ensure accessibility compliance
- Add keyboard navigation support
- Test across different devices

Please help me implement comprehensive responsive design with accessibility features.
```

### Dark Mode Implementation
```
I need to implement dark mode for Sale-Smell.

Context:
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- CSS custom properties for theming
- User preference detection

Requirements:
- Set up CSS custom properties for theming
- Create dark mode color palette
- Implement theme switching functionality
- Add smooth transitions between themes
- Respect user's system preference
- Ensure all components support dark mode

Please help me implement dark mode with smooth theme switching.
```

---

## 🔧 Configuration and Setup Prompts

### Environment Configuration
```
I need to set up environment configuration for Sale-Smell.

Context:
- Next.js 14 application
- AssemblyAI and Ollama integrations
- Development, staging, and production environments
- Security best practices

Requirements:
- Set up environment variable management
- Configure different environments
- Add security validation
- Create environment templates
- Implement proper error handling
- Ensure secure configuration

Please help me set up comprehensive environment configuration for all environments.
```

### Deployment Configuration
```
I need to configure deployment for Sale-Smell on Vercel and Railway.

Context:
- Next.js 14 frontend on Vercel
- Backend API on Railway
- Environment variables and secrets
- Performance optimization

Requirements:
- Configure Vercel deployment
- Set up Railway backend deployment
- Configure environment variables
- Implement performance optimizations
- Add monitoring and analytics
- Ensure security and compliance

Please help me configure production deployment with proper monitoring and optimization.
```

### Security Implementation
```
I need to implement comprehensive security measures for Sale-Smell.

Context:
- Next.js 14 application
- User data and file uploads
- API integrations
- Production deployment

Requirements:
- Implement input validation and sanitization
- Add rate limiting and protection
- Configure CORS properly
- Add security headers
- Implement data encryption
- Ensure GDPR compliance

Please help me implement comprehensive security measures for the application.
```

---

## 📊 Data and Analytics Prompts

### Data Flow Implementation
```
I need to implement the data flow for Sale-Smell from upload to analysis.

Context:
- File upload to AssemblyAI
- Transcription processing
- LLM analysis with Ollama
- Dashboard display
- PDF generation

Requirements:
- Implement file upload data flow
- Create transcription processing pipeline
- Set up LLM analysis workflow
- Add result processing and storage
- Implement dashboard data flow
- Ensure error handling throughout

Please help me implement the complete data flow from file upload to analysis results.
```

### Error Handling System
```
I need to implement comprehensive error handling for Sale-Smell.

Context:
- Next.js 14 application
- Multiple API integrations
- User-facing error messages
- Error tracking and monitoring

Requirements:
- Implement error boundaries for React components
- Add API error handling and retry logic
- Create user-friendly error messages
- Set up error tracking and monitoring
- Add error recovery mechanisms
- Ensure graceful degradation

Please help me implement comprehensive error handling throughout the application.
```

### Performance Monitoring
```
I need to implement performance monitoring for Sale-Smell.

Context:
- Next.js 14 application
- Core Web Vitals tracking
- User experience monitoring
- Performance optimization

Requirements:
- Set up Core Web Vitals monitoring
- Implement performance analytics
- Add user experience tracking
- Create performance dashboards
- Set up alerting for issues
- Optimize based on metrics

Please help me implement comprehensive performance monitoring and optimization.
```

---

## 🧪 Testing and Quality Assurance Prompts

### Unit Testing Setup
```
I need to set up comprehensive unit testing for Sale-Smell.

Context:
- Next.js 14 with TypeScript
- Jest and React Testing Library
- Component and utility testing
- AI-first development principles

Requirements:
- Configure Jest and React Testing Library
- Create component test utilities
- Implement utility function tests
- Add custom hook testing
- Set up test data and mocks
- Ensure good test coverage

Please help me set up comprehensive unit testing for the application.
```

### Integration Testing
```
I need to implement integration testing for Sale-Smell.

Context:
- Next.js 14 API routes
- AssemblyAI and Ollama integrations
- File upload and processing workflows
- End-to-end user journeys

Requirements:
- Set up integration test framework
- Test API route functionality
- Implement file upload testing
- Add analysis workflow testing
- Create mock services for external APIs
- Ensure comprehensive coverage

Please help me implement integration testing for all API routes and workflows.
```

### E2E Testing
```
I need to implement end-to-end testing for Sale-Smell.

Context:
- Next.js 14 application
- Complete user workflows
- File upload to analysis
- Dashboard interactions

Requirements:
- Set up E2E testing framework
- Create user workflow tests
- Test file upload and processing
- Add dashboard interaction tests
- Implement visual regression testing
- Ensure cross-browser compatibility

Please help me implement comprehensive E2E testing for all user workflows.
```

---

## 📝 Documentation Prompts

### Component Documentation
```
I need to create comprehensive documentation for Sale-Smell components.

Context:
- Next.js 14 with TypeScript
- React components with props
- AI-first development principles
- Comprehensive documentation required

Requirements:
- Create component documentation templates
- Add prop documentation with types
- Include usage examples
- Document accessibility features
- Add performance considerations
- Ensure clear and concise documentation

Please help me create comprehensive component documentation following AI-first principles.
```

### API Documentation
```
I need to create API documentation for Sale-Smell.

Context:
- Next.js 14 API routes
- File upload, analysis, and download endpoints
- Request/response schemas
- Error handling documentation

Requirements:
- Document all API endpoints
- Include request/response examples
- Add error code documentation
- Create authentication documentation
- Include rate limiting information
- Ensure comprehensive coverage

Please help me create comprehensive API documentation for all endpoints.
```

### User Documentation
```
I need to create user documentation for Sale-Smell.

Context:
- AI-powered sales call analysis
- File upload and processing
- Dashboard and results interpretation
- PDF report generation

Requirements:
- Create user guide with step-by-step instructions
- Add feature overview and explanations
- Include troubleshooting section
- Document best practices
- Add video tutorials if needed
- Ensure accessibility and clarity

Please help me create comprehensive user documentation for the application.
```

---

## 🚀 Deployment and DevOps Prompts

### CI/CD Pipeline
```
I need to set up a CI/CD pipeline for Sale-Smell.

Context:
- Next.js 14 application
- GitHub repository
- Vercel and Railway deployment
- Automated testing and deployment

Requirements:
- Set up GitHub Actions workflow
- Configure automated testing
- Implement automated deployment
- Add code quality checks
- Set up environment management
- Ensure security and compliance

Please help me set up a comprehensive CI/CD pipeline for automated testing and deployment.
```

### Monitoring and Alerting
```
I need to implement monitoring and alerting for Sale-Smell.

Context:
- Production deployment on Vercel and Railway
- User experience monitoring
- Performance and error tracking
- Proactive issue detection

Requirements:
- Set up application monitoring
- Implement error tracking and alerting
- Add performance monitoring
- Create uptime monitoring
- Set up user analytics
- Configure proactive alerting

Please help me implement comprehensive monitoring and alerting for production deployment.
```

### Security Audit
```
I need to conduct a security audit for Sale-Smell.

Context:
- Next.js 14 application
- User data and file uploads
- API integrations
- Production deployment

Requirements:
- Conduct security vulnerability assessment
- Review authentication and authorization
- Audit data protection measures
- Check API security
- Verify compliance requirements
- Implement security recommendations

Please help me conduct a comprehensive security audit and implement necessary improvements.
```

---

## 📋 Usage Instructions

### How to Use These Prompts

1. **Copy the relevant prompt** for your current task
2. **Paste into a new Cursor chat**
3. **Add any specific context** about your current progress
4. **Mention any existing code** you've already implemented
5. **Specify any constraints** or requirements specific to your situation

### Best Practices

- **Start with the most relevant prompt** for your current phase
- **Add specific context** about your current implementation
- **Mention any existing code** or decisions you've made
- **Be specific about requirements** and constraints
- **Follow up with additional prompts** as needed

### Context Continuity

- **Reference previous work** when starting new chats
- **Mention specific files** you've already created
- **Include current progress** and any issues you're facing
- **Specify the exact phase** you're working on

---

This collection of prompts ensures you can start new Cursor chats with complete context while maintaining project continuity and following the established development principles. 