---
@fileoverview Defines the project structure, file organization, naming conventions, and development rules for the Sale-Smell application, optimized for AI-first development and maintainability.

# 🏗️ Sale-Smell Project Rules

## Overview
This document outlines the project structure, file organization, naming conventions, and development rules for the Sale-Smell application. The codebase is designed to be AI-first, meaning it's modular, scalable, and easy for both humans and AI tools to understand and maintain.

---

## 🎯 AI-First Development Principles

### Modularity
- **Single Responsibility:** Each file has one clear purpose
- **Loose Coupling:** Components are independent and reusable
- **High Cohesion:** Related functionality is grouped together
- **Clear Interfaces:** Well-defined boundaries between modules

### Scalability
- **Horizontal Scaling:** Easy to add new features without breaking existing code
- **Vertical Scaling:** Components can handle increased complexity
- **Performance:** Efficient algorithms and data structures
- **Maintainability:** Easy to modify and extend

### Readability
- **Self-Documenting Code:** Clear variable and function names
- **Consistent Patterns:** Predictable code structure
- **Minimal Complexity:** Simple, straightforward implementations
- **Comprehensive Documentation:** Every function and file is documented

---

## 📁 Directory Structure

### Root Level
```
sale-smell/
├── _docs/                    # Project documentation
├── src/                      # Source code
├── public/                   # Static assets
├── tests/                    # Test files
├── scripts/                  # Build and utility scripts
├── .github/                  # GitHub workflows
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # Project overview
└── LICENSE                  # Project license
```

### Source Code Structure (`src/`)
```
src/
├── app/                     # Next.js App Router (pages and layouts)
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Homepage
│   ├── dashboard/          # Dashboard pages
│   │   ├── page.tsx       # Dashboard main page
│   │   └── loading.tsx    # Dashboard loading component
│   └── api/               # API routes
│       ├── upload/        # File upload endpoint
│       ├── analyze/       # LLM analysis endpoint
│       └── download/      # Download endpoints
├── components/             # Reusable UI components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── index.ts      # Component exports
│   ├── forms/            # Form-specific components
│   │   ├── FileUpload.tsx
│   │   └── index.ts
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── TranscriptViewer.tsx
│   │   ├── MetricsDisplay.tsx
│   │   ├── Charts.tsx
│   │   └── index.ts
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── index.ts
├── lib/                  # Utility libraries and configurations
│   ├── api/             # API client functions
│   │   ├── assemblyai.ts
│   │   ├── ollama.ts
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   ├── file.ts
│   │   ├── validation.ts
│   │   ├── animation.ts
│   │   └── index.ts
│   ├── hooks/           # Custom React hooks
│   │   ├── useFileUpload.ts
│   │   ├── useTranscription.ts
│   │   ├── useAnalysis.ts
│   │   └── index.ts
│   ├── types/           # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── components.ts
│   │   └── index.ts
│   ├── constants/       # Application constants
│   │   ├── api.ts
│   │   ├── ui.ts
│   │   └── index.ts
│   └── config/          # Configuration files
│       ├── database.ts
│       ├── api.ts
│       └── index.ts
├── styles/              # Global styles and themes
│   ├── globals.css      # Global CSS
│   ├── components.css   # Component-specific styles
│   └── animations.css   # Animation definitions
└── context/             # React context providers
    ├── AppContext.tsx
    ├── UploadContext.tsx
    └── index.ts
```

### Test Structure (`tests/`)
```
tests/
├── unit/                # Unit tests
│   ├── components/     # Component tests
│   ├── utils/          # Utility function tests
│   └── hooks/          # Custom hook tests
├── integration/         # Integration tests
│   ├── api/           # API endpoint tests
│   └── workflows/     # User workflow tests
├── e2e/               # End-to-end tests
│   ├── upload/        # File upload tests
│   ├── analysis/      # Analysis workflow tests
│   └── dashboard/     # Dashboard tests
└── fixtures/          # Test data and fixtures
    ├── audio/         # Test audio files
    ├── transcripts/   # Test transcript data
    └── responses/     # Mock API responses
```

---

## 📝 File Naming Conventions

### General Rules
- **Descriptive Names:** Files should be self-explanatory
- **Consistent Casing:** Use kebab-case for files and directories
- **No Abbreviations:** Avoid abbreviations unless universally understood
- **Group by Feature:** Related files should be grouped together

### Specific Conventions

#### React Components
- **PascalCase:** Component files use PascalCase
- **Suffix:** Always include `.tsx` for TypeScript React components
- **Examples:**
  - `FileUpload.tsx`
  - `TranscriptViewer.tsx`
  - `MetricsDisplay.tsx`

#### Utility Files
- **camelCase:** Utility files use camelCase
- **Suffix:** Use `.ts` for TypeScript utilities
- **Examples:**
  - `fileUtils.ts`
  - `validationHelpers.ts`
  - `animationUtils.ts`

#### API Routes
- **kebab-case:** API route files use kebab-case
- **HTTP Method:** Include HTTP method in filename when relevant
- **Examples:**
  - `upload.ts`
  - `analyze.ts`
  - `download-pdf.ts`

#### Configuration Files
- **Descriptive:** Use descriptive names for config files
- **Suffix:** Use appropriate suffixes (`.config.js`, `.env`)
- **Examples:**
  - `tailwind.config.js`
  - `next.config.js`
  - `.env.local`

---

## 📄 File Content Standards

### File Header Documentation
Every file must begin with a comprehensive header comment:

```typescript
/**
 * @fileoverview Brief description of the file's purpose and contents
 * 
 * This file contains [specific functionality] for the Sale-Smell application.
 * It handles [specific responsibilities] and integrates with [dependencies].
 * 
 * Key Features:
 * - [Feature 1]
 * - [Feature 2]
 * - [Feature 3]
 * 
 * Dependencies:
 * - [External dependency 1]
 * - [External dependency 2]
 * 
 * Usage:
 * [Brief example of how to use this file]
 * 
 * @author [Author Name]
 * @version [Version Number]
 * @since [Date]
 */
```

### Function Documentation
Every function must have comprehensive JSDoc/TSDoc documentation:

```typescript
/**
 * @description Brief description of what the function does
 * 
 * Detailed explanation of the function's purpose, behavior, and usage.
 * Include information about parameters, return values, and side effects.
 * 
 * @param {string} paramName - Description of the parameter
 * @param {number} [optionalParam] - Description of optional parameter
 * @returns {Promise<ResultType>} Description of return value
 * @throws {ErrorType} Description of when this error is thrown
 * 
 * @example
 * ```typescript
 * const result = await functionName('example', 42);
 * console.log(result); // Expected output
 * ```
 * 
 * @since [Version] - When this function was added
 * @updated [Version] - When this function was last updated
 */
```

### Component Documentation
React components must include comprehensive documentation:

```typescript
/**
 * @description Brief description of the component
 * 
 * Detailed explanation of the component's purpose, props, and behavior.
 * Include information about accessibility, performance considerations,
 * and integration with other components.
 * 
 * @param {ComponentProps} props - Component properties
 * @param {string} props.title - The title to display
 * @param {boolean} [props.isLoading] - Whether the component is in loading state
 * @param {Function} props.onClick - Callback function for click events
 * 
 * @example
 * ```tsx
 * <ComponentName 
 *   title="Example Title"
 *   isLoading={false}
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 * 
 * @accessibility
 * - Supports keyboard navigation
 * - Includes ARIA labels
 * - Respects reduced motion preferences
 * 
 * @performance
 * - Memoized for performance
 * - Uses efficient rendering patterns
 * 
 * @since [Version] - When this component was added
 */
```

---

## 🧩 Code Organization Rules

### Line Limit Enforcement
- **Maximum 500 lines:** No file should exceed 500 lines
- **Refactoring trigger:** Files approaching 400 lines should be refactored
- **Modular approach:** Break large files into smaller, focused modules

### Import Organization
```typescript
// 1. External libraries (alphabetical)
import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// 2. Internal modules (alphabetical)
import { Button } from '@/components/ui/Button';
import { useFileUpload } from '@/lib/hooks/useFileUpload';
import { validateFile } from '@/lib/utils/validation';

// 3. Types and interfaces
import type { FileUploadProps } from '@/lib/types/components';
```

### Export Organization
```typescript
// 1. Named exports (alphabetical)
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';

// 2. Default exports (at the end)
export { default as FileUpload } from './FileUpload';
```

### Type Definitions
- **Separate types file:** Create dedicated type files for complex types
- **Inline for simple types:** Use inline types for simple, local types
- **Consistent naming:** Use descriptive, consistent type names
- **Documentation:** Document complex types with examples

---

## 🔧 Development Workflow

### Code Review Checklist
- [ ] File follows naming conventions
- [ ] File has comprehensive header documentation
- [ ] All functions have JSDoc/TSDoc comments
- [ ] File is under 500 lines
- [ ] Imports are properly organized
- [ ] Types are well-defined and documented
- [ ] Code follows project patterns
- [ ] Tests are included for new functionality

### Refactoring Guidelines
- **When to refactor:** Files approaching 400 lines
- **How to refactor:** Extract related functionality into separate files
- **Maintain interfaces:** Keep existing public APIs unchanged
- **Update documentation:** Ensure all documentation is current
- **Run tests:** Verify all tests pass after refactoring

### Performance Considerations
- **Lazy loading:** Use dynamic imports for large components
- **Memoization:** Use React.memo and useMemo appropriately
- **Bundle splitting:** Organize code for optimal bundle splitting
- **Tree shaking:** Ensure unused code can be eliminated

---

## 🧪 Testing Standards

### Test File Organization
- **Co-location:** Test files should be close to source files
- **Naming:** Use `.test.ts` or `.spec.ts` suffix
- **Structure:** Follow AAA pattern (Arrange, Act, Assert)
- **Documentation:** Document test purpose and scenarios

### Test Documentation
```typescript
/**
 * @fileoverview Tests for the FileUpload component
 * 
 * This test suite covers:
 * - File validation
 * - Upload progress
 * - Error handling
 * - Success states
 * 
 * @group components
 * @group file-upload
 */
```

### Coverage Requirements
- **Minimum 80%:** Overall code coverage
- **Critical paths:** 100% coverage for business logic
- **Edge cases:** Test error conditions and edge cases
- **Integration:** Test component interactions

---

## 📚 Documentation Standards

### README Files
Every directory should have a README.md file explaining:
- Purpose of the directory
- Key files and their roles
- How to use the code in this directory
- Dependencies and requirements

### API Documentation
- **OpenAPI/Swagger:** Document all API endpoints
- **Examples:** Include request/response examples
- **Error codes:** Document all possible error responses
- **Authentication:** Document authentication requirements

### Component Documentation
- **Storybook:** Use Storybook for component documentation
- **Props table:** Document all props with types and descriptions
- **Examples:** Include usage examples
- **Accessibility:** Document accessibility features

---

## 🔄 Maintenance Rules

### Regular Reviews
- **Monthly:** Review file sizes and organization
- **Quarterly:** Audit documentation completeness
- **Annually:** Review and update project structure
- **Continuous:** Monitor code quality metrics

### Update Procedures
- **Version control:** Use semantic versioning
- **Changelog:** Maintain detailed changelog
- **Migration guides:** Provide guides for breaking changes
- **Deprecation:** Mark deprecated features clearly

### Quality Metrics
- **File size:** Monitor file sizes and refactor when needed
- **Documentation:** Track documentation coverage
- **Test coverage:** Maintain high test coverage
- **Performance:** Monitor bundle size and performance metrics

---

## ✅ Implementation Checklist

### Project Setup
- [ ] Initialize project with correct structure
- [ ] Set up TypeScript configuration
- [ ] Configure ESLint and Prettier
- [ ] Set up testing framework
- [ ] Configure build tools
- [ ] Set up documentation tools

### Development Standards
- [ ] Follow file naming conventions
- [ ] Implement comprehensive documentation
- [ ] Maintain file size limits
- [ ] Organize imports properly
- [ ] Write comprehensive tests
- [ ] Follow accessibility guidelines

### Quality Assurance
- [ ] Regular code reviews
- [ ] Automated testing
- [ ] Performance monitoring
- [ ] Documentation audits
- [ ] Accessibility testing
- [ ] Cross-browser testing 