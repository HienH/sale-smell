---
@fileoverview Defines the complete technology stack for the Sale-Smell application, including all industry standard choices, rationale, implementation considerations, best practices, limitations, and common pitfalls for MVP development.

# 🏗️ Sale-Smell Tech Stack

## Overview
This document outlines the technology stack chosen for the Sale-Smell MVP, using industry standard tools and frameworks for reliability, maintainability, and ease of development. It includes comprehensive best practices, limitations, and conventions for each technology.

---

## 🎯 Frontend Stack

### Next.js (React Framework)
- **Purpose:** Full-stack React framework with built-in API routes
- **Rationale:** Industry standard for React applications, excellent developer experience, built-in SSR/SSG capabilities
- **Benefits:** 
  - Zero-config setup
  - Built-in routing and API routes
  - Optimized performance
  - Great TypeScript support

#### Best Practices
- **File-based Routing:** Use the `pages` or `app` directory structure for automatic routing
- **API Routes:** Place backend logic in `pages/api/` or `app/api/` directories
- **Image Optimization:** Use `next/image` for automatic image optimization
- **Static Generation:** Use `getStaticProps` and `getStaticPaths` for static pages
- **Server-Side Rendering:** Use `getServerSideProps` for dynamic content
- **Environment Variables:** Use `NEXT_PUBLIC_` prefix for client-side variables

#### Limitations & Common Pitfalls
- **Bundle Size:** Large applications can have slow initial page loads
- **API Routes:** Limited to 10MB payload size by default
- **Serverless Functions:** Cold starts can cause delays
- **Memory Usage:** Large applications may hit Vercel's memory limits
- **File System:** Cannot access server file system in API routes
- **Database Connections:** Need connection pooling for production

#### Conventions
- **File Naming:** Use kebab-case for files, PascalCase for components
- **Directory Structure:** Group by feature, not by type
- **Import Order:** Third-party → internal → relative imports
- **Component Structure:** Export default for pages, named exports for components

### TypeScript
- **Purpose:** Type-safe JavaScript development
- **Rationale:** Industry standard for large-scale applications, catches errors at compile time
- **Benefits:**
  - Better developer experience
  - Reduced runtime errors
  - Improved code maintainability

#### Best Practices
- **Strict Mode:** Enable `strict: true` in `tsconfig.json`
- **Type Definitions:** Create interfaces for all data structures
- **Generic Types:** Use generics for reusable components
- **Union Types:** Use union types for flexible APIs
- **Type Guards:** Implement runtime type checking
- **Utility Types:** Leverage built-in utility types (Partial, Pick, etc.)

#### Limitations & Common Pitfalls
- **Learning Curve:** Steep learning curve for complex types
- **Build Time:** Can slow down development builds
- **Type Definitions:** Missing or outdated type definitions for libraries
- **Any Type:** Overuse of `any` defeats the purpose
- **Complex Types:** Can become unreadable with complex nested types
- **Runtime Errors:** TypeScript doesn't prevent all runtime errors

#### Conventions
- **File Extensions:** Use `.ts` for files, `.tsx` for React components
- **Type Naming:** Use PascalCase for interfaces and types
- **Import Types:** Use `import type` for type-only imports
- **Type Assertions:** Prefer type guards over type assertions

### Tailwind CSS
- **Purpose:** Utility-first CSS framework for rapid UI development
- **Rationale:** Most popular CSS framework, highly customizable, excellent documentation
- **Benefits:**
  - Rapid prototyping
  - Consistent design system
  - Small bundle size in production

#### Best Practices
- **Component Classes:** Extract common patterns into reusable components
- **Responsive Design:** Use responsive prefixes (sm:, md:, lg:, xl:)
- **Dark Mode:** Implement dark mode with `dark:` prefix
- **Custom Configuration:** Extend theme in `tailwind.config.js`
- **Purge CSS:** Enable purging in production for smaller bundles
- **JIT Mode:** Use Just-In-Time mode for faster builds

#### Limitations & Common Pitfalls
- **HTML Bloat:** Can lead to very long class strings
- **Learning Curve:** Need to memorize utility classes
- **Design Consistency:** Can lead to inconsistent designs without proper planning
- **Bundle Size:** Without purging, can include unused styles
- **Complex Animations:** Limited animation capabilities
- **Vendor Lock-in:** Heavy reliance on Tailwind's utility system

#### Conventions
- **Class Ordering:** Group classes logically (layout → spacing → typography → colors)
- **Component Extraction:** Extract repeated patterns into components
- **Custom Classes:** Use `@apply` sparingly for complex patterns
- **Responsive First:** Mobile-first responsive design approach

---

## 🔧 Backend Stack

### Node.js with Express
- **Purpose:** Server-side JavaScript runtime with web framework
- **Rationale:** Industry standard for Node.js applications, simple and flexible
- **Benefits:**
  - Large ecosystem of middleware
  - Easy integration with external APIs
  - Excellent for REST APIs
  - Same language as frontend (JavaScript/TypeScript)

#### Best Practices
- **Middleware Order:** Place security middleware first, then routing
- **Error Handling:** Use centralized error handling middleware
- **Async/Await:** Use async/await instead of callbacks
- **Environment Variables:** Use `dotenv` for configuration
- **Request Validation:** Validate all incoming requests
- **Rate Limiting:** Implement rate limiting for API endpoints
- **CORS Configuration:** Configure CORS properly for production

#### Limitations & Common Pitfalls
- **Single-threaded:** CPU-intensive tasks block the event loop
- **Memory Leaks:** Improper cleanup can cause memory leaks
- **Callback Hell:** Without proper async handling, can lead to nested callbacks
- **Error Handling:** Unhandled promise rejections crash the application
- **Security:** Need to implement security measures manually
- **Scaling:** Vertical scaling limitations due to single-threaded nature

#### Conventions
- **Route Organization:** Group routes by feature in separate files
- **Middleware Pattern:** Use middleware for cross-cutting concerns
- **Error Responses:** Consistent error response format
- **Status Codes:** Use appropriate HTTP status codes
- **Request Validation:** Validate input data before processing

---

## 📁 File Upload

### Multer
- **Purpose:** Middleware for handling multipart/form-data (file uploads)
- **Rationale:** Go-to solution for Express applications
- **Benefits:**
  - Robust file handling
  - Built-in validation
  - Easy integration with Express

#### Best Practices
- **File Size Limits:** Set appropriate file size limits
- **File Type Validation:** Validate file types before processing
- **Storage Configuration:** Use memory storage for small files, disk storage for large files
- **Error Handling:** Handle upload errors gracefully
- **Security:** Sanitize file names and validate file content
- **Cleanup:** Remove temporary files after processing

#### Limitations & Common Pitfalls
- **Memory Usage:** Large files can consume significant memory
- **File Size:** Default limits may be too small for audio files
- **Security:** Need to implement additional security measures
- **Storage:** Temporary files need cleanup
- **Concurrent Uploads:** Can overwhelm server with many simultaneous uploads
- **File Validation:** Limited built-in file type validation

#### Conventions
- **Upload Directory:** Use consistent upload directory structure
- **File Naming:** Generate unique file names to prevent conflicts
- **Error Messages:** Provide clear error messages for upload failures
- **Progress Tracking:** Implement upload progress for large files

---

## 🎤 Transcription Service

### AssemblyAI API
- **Purpose:** Speech-to-text transcription with advanced features
- **Rationale:** Leading API for speech recognition, comprehensive feature set
- **Features Used:**
  - Speaker labels
  - Sentiment analysis
  - Summarization
  - PII redaction

#### Best Practices
- **API Key Security:** Store API keys in environment variables
- **Error Handling:** Implement robust error handling for API failures
- **Rate Limiting:** Respect API rate limits and implement backoff strategies
- **File Format Support:** Ensure audio files are in supported formats
- **Webhook Handling:** Use webhooks for long-running transcription jobs
- **Retry Logic:** Implement exponential backoff for failed requests

#### Limitations & Common Pitfalls
- **Cost:** Can be expensive for large audio files
- **Processing Time:** Long audio files take significant time to process
- **API Limits:** Rate limits can affect high-volume usage
- **File Size:** Maximum file size limits (typically 1GB)
- **Audio Quality:** Poor audio quality affects transcription accuracy
- **Language Support:** Limited language support compared to some competitors

#### Conventions
- **Response Handling:** Standardize API response handling
- **Error Logging:** Log API errors for debugging
- **Status Checking:** Poll for transcription completion status
- **Result Caching:** Cache transcription results when appropriate

---

## 🧠 LLM Analysis

### Ollama (Local Development)
- **Purpose:** Local LLM inference for call analysis
- **Model:** LLaMA 3
- **Rationale:** Easy local setup, privacy-focused, cost-effective for development
- **Benefits:**
  - No API costs during development
  - Complete privacy
  - Fast iteration

#### Best Practices
- **Model Selection:** Choose appropriate model size for your hardware
- **Prompt Engineering:** Design clear, specific prompts for consistent results
- **Error Handling:** Implement robust error handling for model failures
- **Response Validation:** Validate and sanitize model responses
- **Resource Management:** Monitor memory and CPU usage
- **Model Updates:** Keep models updated for best performance

#### Limitations & Common Pitfalls
- **Hardware Requirements:** Requires significant RAM and CPU
- **Response Time:** Can be slow for complex prompts
- **Model Quality:** Local models may be less capable than cloud alternatives
- **Memory Usage:** Large models consume significant system memory
- **Inconsistent Outputs:** Responses can vary between runs
- **Context Limits:** Limited context window for long conversations

#### Conventions
- **Prompt Templates:** Use consistent prompt templates
- **Response Parsing:** Implement structured response parsing
- **Fallback Handling:** Provide fallbacks for model failures
- **Logging:** Log prompts and responses for debugging

### Future Production Option
- **Together.ai API** (Mixtral, Mistral, or LLaMA 3 cloud)
- **Rationale:** Scalable cloud-hosted LLMs for production deployment
- **Benefits:**
  - Better performance
  - Reliability
  - Scalability

#### Best Practices
- **API Key Management:** Secure API key storage and rotation
- **Request Optimization:** Minimize token usage for cost efficiency
- **Caching:** Cache similar requests to reduce API calls
- **Error Handling:** Implement comprehensive error handling
- **Rate Limiting:** Respect API rate limits
- **Response Validation:** Validate and sanitize all responses

#### Limitations & Common Pitfalls
- **Cost:** Can be expensive for high-volume usage
- **Latency:** Network latency affects response times
- **API Limits:** Rate limits and token limits
- **Dependency:** Relies on external service availability
- **Data Privacy:** Data sent to third-party services
- **Model Availability:** Models may be deprecated or changed

---

## 📄 PDF Generation

### jsPDF
- **Purpose:** Client-side PDF generation
- **Rationale:** Widely used, works in browsers, no server dependency
- **Benefits:**
  - No additional server load
  - Works offline
  - Easy to implement

#### Best Practices
- **Font Loading:** Load fonts before generating PDFs
- **Image Handling:** Optimize images before adding to PDF
- **Page Breaks:** Handle page breaks appropriately for long content
- **Error Handling:** Implement error handling for PDF generation failures
- **Memory Management:** Clean up resources after PDF generation
- **File Size:** Optimize PDF file size for better user experience

#### Limitations & Common Pitfalls
- **Browser Compatibility:** May not work consistently across all browsers
- **Font Support:** Limited font support compared to server-side solutions
- **Complex Layouts:** Difficult to create complex layouts
- **File Size:** Can generate large files for complex documents
- **Performance:** Can be slow for large documents
- **Styling Limitations:** Limited CSS support compared to HTML

#### Conventions
- **Template System:** Use consistent PDF templates
- **Error Messages:** Provide clear error messages for generation failures
- **File Naming:** Use descriptive file names for generated PDFs
- **Progress Indicators:** Show progress for long PDF generation tasks

---

## ☁️ Hosting

### Vercel (Frontend)
- **Purpose:** Next.js hosting platform
- **Rationale:** Seamless integration with Next.js, excellent performance
- **Benefits:**
  - Zero-config deployment
  - Global edge network
  - Automatic CI/CD

#### Best Practices
- **Environment Variables:** Configure all environment variables in Vercel dashboard
- **Build Optimization:** Optimize build times and bundle sizes
- **Domain Configuration:** Set up custom domains properly
- **Preview Deployments:** Use preview deployments for testing
- **Analytics:** Enable Vercel Analytics for performance monitoring
- **Edge Functions:** Use edge functions for global performance

#### Limitations & Common Pitfalls
- **Serverless Limits:** Function timeout limits (10 seconds for hobby plan)
- **Cold Starts:** Serverless functions can have cold start delays
- **Build Time:** Large applications may hit build time limits
- **Memory Limits:** Limited memory for serverless functions
- **File System:** No persistent file system access
- **Database Connections:** Need connection pooling for databases

#### Conventions
- **Deployment Strategy:** Use Git-based deployments
- **Branch Protection:** Protect main branch with required reviews
- **Environment Management:** Use different environments for dev/staging/prod

### Railway (Backend)
- **Purpose:** Node.js backend hosting
- **Rationale:** Easy deployment, good free tier, integrates well with databases
- **Benefits:**
  - Simple deployment
  - Good developer experience
  - Cost-effective

#### Best Practices
- **Environment Variables:** Configure all environment variables in Railway dashboard
- **Health Checks:** Implement health check endpoints
- **Logging:** Use structured logging for better debugging
- **Resource Monitoring:** Monitor CPU and memory usage
- **Database Connections:** Use connection pooling for databases
- **SSL Configuration:** Ensure proper SSL configuration

#### Limitations & Common Pitfalls
- **Resource Limits:** Free tier has limited resources
- **Cold Starts:** Applications can have cold start delays
- **File System:** Ephemeral file system (files are lost on restart)
- **Port Configuration:** Must use `PORT` environment variable
- **Memory Limits:** Limited memory for free tier
- **Concurrent Requests:** Limited concurrent request handling

#### Conventions
- **Deployment Strategy:** Use Git-based deployments
- **Health Checks:** Implement `/health` endpoint
- **Error Handling:** Proper error handling and logging

---

## 🎛️ State Management

### React Context + useReducer
- **Purpose:** Frontend state management
- **Rationale:** Native React solution, sufficient for MVP complexity
- **Benefits:**
  - No additional dependencies
  - Simple to implement
  - Good performance for small to medium apps

#### Best Practices
- **Context Structure:** Create separate contexts for different domains
- **Reducer Pattern:** Use reducers for complex state logic
- **Provider Composition:** Compose providers logically
- **Performance:** Use `useMemo` and `useCallback` for expensive operations
- **Error Boundaries:** Implement error boundaries for state-related errors
- **TypeScript:** Use proper typing for context and state

#### Limitations & Common Pitfalls
- **Prop Drilling:** Can lead to prop drilling in deep component trees
- **Performance:** Context updates can cause unnecessary re-renders
- **Complexity:** Can become complex with large state trees
- **Testing:** More difficult to test than external state management
- **Debugging:** Harder to debug than Redux DevTools
- **Bundle Size:** No additional bundle size, but can lead to complex code

#### Conventions
- **Context Naming:** Use descriptive names for contexts
- **Provider Structure:** Keep providers close to where they're used
- **State Updates:** Use immutable state updates
- **Error Handling:** Handle errors in context providers

---

## 📦 Package Management

### npm
- **Purpose:** Node.js package manager
- **Rationale:** Industry standard, comes with Node.js
- **Benefits:**
  - Widely supported
  - Excellent documentation
  - Large ecosystem

#### Best Practices
- **Lock Files:** Commit `package-lock.json` for reproducible builds
- **Scripts:** Use npm scripts for common tasks
- **Dependencies:** Keep dependencies up to date
- **Security:** Run `npm audit` regularly
- **Version Management:** Use semantic versioning
- **Workspaces:** Use workspaces for monorepo management

#### Limitations & Common Pitfalls
- **Installation Speed:** Can be slower than alternatives like yarn
- **Security:** Need to audit dependencies regularly
- **Version Conflicts:** Can have dependency version conflicts
- **Registry Issues:** Sometimes npm registry can be slow
- **Lock File Conflicts:** Merge conflicts in lock files
- **Global Packages:** Global packages can cause conflicts

#### Conventions
- **Package.json:** Keep package.json organized and documented
- **Scripts:** Use descriptive script names
- **Dependencies:** Separate devDependencies from dependencies
- **Version Pinning:** Pin critical dependency versions

---

## 🔧 Development Tools

### ESLint + Prettier
- **Purpose:** Code linting and formatting
- **Rationale:** Industry standard for code quality
- **Benefits:**
  - Consistent code style
  - Catch errors early
  - Better code quality

#### Best Practices
- **Configuration:** Use appropriate ESLint rules for your project
- **Prettier Integration:** Configure Prettier to work with ESLint
- **Git Hooks:** Use pre-commit hooks to enforce linting
- **IDE Integration:** Configure IDE to show linting errors
- **Custom Rules:** Create custom rules for project-specific needs
- **Performance:** Use `.eslintignore` for large files

#### Limitations & Common Pitfalls
- **Configuration Complexity:** Can be complex to configure properly
- **Performance:** Can slow down development with large codebases
- **Rule Conflicts:** ESLint and Prettier rules can conflict
- **False Positives:** Some rules may generate false positives
- **Learning Curve:** Team needs to learn and follow rules
- **Maintenance:** Rules need to be maintained and updated

#### Conventions
- **Rule Selection:** Choose rules that match team preferences
- **Error Handling:** Fix linting errors before committing
- **Documentation:** Document custom rules and configurations

### TypeScript Compiler
- **Purpose:** Type checking and compilation
- **Rationale:** Built-in with TypeScript
- **Benefits:**
  - Type safety
  - Better IDE support
  - Compile-time error detection

#### Best Practices
- **Strict Mode:** Enable strict mode for better type safety
- **Configuration:** Use appropriate `tsconfig.json` settings
- **Incremental Compilation:** Use incremental compilation for faster builds
- **Type Definitions:** Install type definitions for libraries
- **Error Handling:** Fix TypeScript errors before deployment
- **Performance:** Use project references for large codebases

#### Limitations & Common Pitfalls
- **Build Time:** Can slow down development builds
- **Complex Configuration:** `tsconfig.json` can be complex
- **Type Definitions:** Missing or outdated type definitions
- **Learning Curve:** Team needs to understand TypeScript
- **Migration:** Converting from JavaScript can be challenging
- **Tooling:** Some tools may not support TypeScript

#### Conventions
- **Configuration:** Use consistent TypeScript configuration
- **Type Naming:** Use descriptive type names
- **Error Handling:** Address TypeScript errors promptly

---

## 🧪 Testing (Future Consideration)

### Jest + React Testing Library
- **Purpose:** Unit and integration testing
- **Rationale:** Industry standard for React applications
- **Benefits:**
  - Comprehensive testing
  - Good documentation
  - Easy setup

#### Best Practices
- **Test Structure:** Use AAA pattern (Arrange, Act, Assert)
- **Component Testing:** Test user behavior, not implementation details
- **Mocking:** Mock external dependencies appropriately
- **Coverage:** Aim for meaningful coverage, not just percentage
- **Test Data:** Use factories or fixtures for test data
- **Async Testing:** Handle async operations properly in tests

#### Limitations & Common Pitfalls
- **Setup Complexity:** Can be complex to set up with custom configurations
- **Performance:** Tests can be slow with large codebases
- **Mocking:** Over-mocking can make tests brittle
- **Maintenance:** Tests need to be maintained as code changes
- **Learning Curve:** Team needs to learn testing best practices
- **False Confidence:** High coverage doesn't guarantee quality

#### Conventions
- **Test Naming:** Use descriptive test names
- **File Organization:** Keep test files close to source files
- **Test Data:** Use consistent test data patterns

---

## 📊 Monitoring (Future Consideration)

### Vercel Analytics (Frontend)
- **Purpose:** Performance and usage monitoring
- **Rationale:** Native integration with Vercel
- **Benefits:**
  - Zero setup
  - Real-time insights
  - Performance optimization

#### Best Practices
- **Privacy Compliance:** Ensure GDPR/CCPA compliance
- **Performance Monitoring:** Monitor Core Web Vitals
- **Error Tracking:** Track JavaScript errors
- **User Behavior:** Analyze user interaction patterns
- **Custom Events:** Track custom events for business metrics
- **Data Retention:** Configure appropriate data retention policies

#### Limitations & Common Pitfalls
- **Data Privacy:** Need to handle user consent properly
- **Limited Customization:** Limited compared to full analytics platforms
- **Data Accuracy:** May not capture all user interactions
- **Cost:** Can be expensive for high-traffic sites
- **Integration:** Limited integration with other tools
- **Real-time Limits:** Real-time data may have delays

#### Conventions
- **Event Tracking:** Use consistent event naming
- **Data Structure:** Structure custom events consistently
- **Privacy:** Respect user privacy preferences

### Railway Logs (Backend)
- **Purpose:** Backend monitoring and logging
- **Rationale:** Native integration with Railway
- **Benefits:**
  - Easy access to logs
  - Error tracking
  - Performance monitoring

#### Best Practices
- **Structured Logging:** Use structured logging for better parsing
- **Log Levels:** Use appropriate log levels (debug, info, warn, error)
- **Error Tracking:** Track and alert on errors
- **Performance Monitoring:** Monitor response times and throughput
- **Log Rotation:** Configure log rotation to manage storage
- **Security:** Avoid logging sensitive information

#### Limitations & Common Pitfalls
- **Limited Retention:** Logs may be retained for limited time
- **Search Limitations:** Limited search and filtering capabilities
- **No Custom Dashboards:** Limited dashboard customization
- **Cost:** Can be expensive for high-volume logging
- **Integration:** Limited integration with external tools
- **Data Export:** Limited data export capabilities

#### Conventions
- **Log Format:** Use consistent log format
- **Error Handling:** Log errors with context
- **Performance:** Monitor and log performance metrics

---

## 🔐 Security Considerations

### Environment Variables
- **Purpose:** Secure configuration management
- **Implementation:** Use `.env` files for local development
- **Best Practices:**
  - Never commit API keys
  - Use different keys for dev/prod
  - Rotate keys regularly

#### Best Practices
- **File Security:** Never commit `.env` files to version control
- **Key Rotation:** Regularly rotate API keys and secrets
- **Access Control:** Limit access to production environment variables
- **Validation:** Validate environment variables on application startup
- **Documentation:** Document required environment variables
- **Backup:** Securely backup environment variable configurations

#### Limitations & Common Pitfalls
- **Accidental Exposure:** Easy to accidentally commit secrets
- **Key Management:** Difficult to manage keys across environments
- **Validation:** No built-in validation for required variables
- **Security:** Plain text storage in `.env` files
- **Distribution:** Manual distribution of environment variables
- **Version Control:** Risk of exposing secrets in version control

#### Conventions
- **File Naming:** Use `.env.example` for documentation
- **Variable Naming:** Use UPPER_CASE for environment variables
- **Validation:** Validate all required variables on startup

### CORS Configuration
- **Purpose:** Control cross-origin requests
- **Implementation:** Configure in Express backend
- **Best Practices:**
  - Restrict to specific domains
  - Use credentials when needed

#### Best Practices
- **Origin Restriction:** Only allow necessary origins
- **Credentials:** Configure credentials handling properly
- **Methods:** Only allow necessary HTTP methods
- **Headers:** Only allow necessary headers
- **Security Headers:** Implement additional security headers
- **Error Handling:** Handle CORS errors gracefully

#### Limitations & Common Pitfalls
- **Configuration Complexity:** Can be complex to configure correctly
- **Security Risks:** Misconfiguration can create security vulnerabilities
- **Browser Compatibility:** Different browsers handle CORS differently
- **Debugging:** CORS errors can be difficult to debug
- **Preflight Requests:** Can add latency to requests
- **Wildcard Usage:** Using wildcards can be insecure

#### Conventions
- **Configuration:** Use environment-specific CORS configuration
- **Error Handling:** Provide clear CORS error messages
- **Documentation:** Document CORS configuration for team

---

## 🚀 Deployment Strategy

### Development
- **Frontend:** Local development server (Next.js)
- **Backend:** Local Express server
- **LLM:** Local Ollama instance

### Production
- **Frontend:** Vercel deployment
- **Backend:** Railway deployment
- **LLM:** Cloud-based solution (Together.ai or similar)

---

## 📈 Scalability Considerations

### Current MVP
- **State:** In-memory storage (no database)
- **LLM:** Local Ollama instance
- **File Storage:** Temporary (session-based)

### Future Scaling
- **Database:** PostgreSQL or MongoDB
- **File Storage:** AWS S3 or similar
- **LLM:** Cloud-based inference
- **Caching:** Redis for session management

---

## ✅ Success Criteria

- [ ] Frontend loads in < 3 seconds
- [ ] File upload works with all supported formats
- [ ] Transcription completes within 60 seconds
- [ ] LLM analysis completes within 180 seconds
- [ ] PDF generation works in all browsers
- [ ] Application handles concurrent users
- [ ] Error handling provides clear user feedback

---

## 🔄 Migration Path

### Phase 1: MVP (Current)
- Local Ollama for LLM
- In-memory state management
- Basic error handling

### Phase 2: Production Ready
- Cloud LLM (Together.ai)
- Database integration
- Advanced error handling
- Monitoring and analytics

### Phase 3: Scale
- Microservices architecture
- Advanced caching
- Load balancing
- Advanced security features 