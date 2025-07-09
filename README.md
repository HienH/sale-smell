---
@fileoverview Main README for the Sale-Smell project - AI-powered sales call analysis application.

# 🎯 Sale-Smell

**AI-powered sales call analysis that transforms recorded conversations into actionable coaching insights.**

Sale-Smell is a web application that helps sales professionals improve their performance by analyzing recorded sales calls. Upload your audio files and receive intelligent feedback, sentiment analysis, and structured coaching insights powered by AI.

## ✨ Features

- **🎤 Audio Upload** - Drag-and-drop interface for MP3, WAV, and M4A files
- **📝 Smart Transcription** - AssemblyAI-powered speech-to-text with speaker labels
- **🧠 AI Analysis** - LLaMA 3 analysis for coaching insights and objection handling
- **📊 Interactive Dashboard** - Visual metrics, charts, and actionable feedback
- **📄 PDF Reports** - Downloadable coaching reports with detailed insights
- **🎨 Minimalist Design** - Clean, animated interface optimized for user experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Ollama (for local LLM analysis)
- AssemblyAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sale-smell.git
   cd sale-smell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local`:
   ```env
   # AssemblyAI
   ASSEMBLYAI_API_KEY=your_assemblyai_key
   
   # Ollama (local LLM)
   OLLAMA_BASE_URL=http://localhost:11434
   
   # Next.js
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start Ollama with LLaMA 3**
   ```bash
   ollama pull llama3
   ollama serve
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
sale-smell/
├── _docs/                    # Project documentation
│   ├── project-overview.md   # Product requirements
│   ├── user-flow.md         # User journey
│   ├── tech-stack.md        # Technology choices
│   ├── project-rules.md     # Development conventions
│   ├── ui-rules.md          # UI design principles
│   └── phases/              # Development phases
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── lib/                 # Utilities and services
│   ├── styles/              # Global styles
│   └── context/             # React context providers
├── public/                  # Static assets
└── tests/                   # Test files
```

## 🛠️ Development

### Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express (API routes)
- **AI/ML:** AssemblyAI (transcription), Ollama + LLaMA 3 (analysis)
- **Styling:** Tailwind CSS with custom animations
- **Deployment:** Vercel (frontend), Railway (backend)

### Development Conventions

#### File Organization
- **500-line limit** - Files must be under 500 lines
- **Descriptive names** - Use clear, descriptive file and function names
- **AI-first structure** - Modular, scalable, and easy to understand

#### Documentation Standards
- **@fileoverview** - Every file must have a header comment
- **JSDoc/TSDoc** - All functions must have proper documentation
- **Component docs** - React components need comprehensive documentation

#### Code Quality
- **TypeScript strict mode** - Full type safety
- **ESLint + Prettier** - Consistent code formatting
- **Component-first approach** - Reusable, modular components

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking

# Database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with test data
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/            # Unit tests for components and utilities
├── integration/     # Integration tests for API endpoints
├── e2e/            # End-to-end user workflow tests
└── fixtures/        # Test data and mock files
```

## 🚀 Deployment

### Production Deployment

1. **Frontend (Vercel)**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Backend (Railway)**
   ```bash
   railway login
   railway up
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ASSEMBLYAI_API_KEY` | AssemblyAI API key for transcription | Yes |
| `OLLAMA_BASE_URL` | Ollama server URL | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `DATABASE_URL` | Database connection string | Phase 4+ |

## 📊 Performance

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms  
- **CLS (Cumulative Layout Shift):** < 0.1

### Bundle Size
- **Initial Bundle:** < 300KB
- **Build Time:** < 30 seconds
- **Development Build:** < 10 seconds

## 🔒 Security

### Security Measures
- **Input Validation** - All user inputs are validated
- **Rate Limiting** - API endpoints are rate-limited
- **CORS Configuration** - Proper cross-origin resource sharing
- **Environment Variables** - Secure configuration management
- **Data Encryption** - Sensitive data is encrypted

### Privacy Compliance
- **GDPR Compliant** - User data protection
- **Data Retention** - Automated data cleanup
- **User Consent** - Granular consent management
- **Data Portability** - User data export capabilities

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Follow coding conventions**
   - Use descriptive commit messages
   - Follow the 500-line file limit
   - Add comprehensive documentation
4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```
5. **Submit a pull request**

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No TypeScript errors
- [ ] File size is under 500 lines
- [ ] Accessibility standards are met

## 📚 Documentation

### Project Documentation
- **[Project Overview](_docs/project-overview.md)** - Product requirements and goals
- **[User Flow](_docs/user-flow.md)** - User journey and interactions
- **[Tech Stack](_docs/tech-stack.md)** - Technology choices and rationale
- **[Project Rules](_docs/project-rules.md)** - Development conventions
- **[UI Rules](_docs/ui-rules.md)** - Design principles and guidelines

### Development Phases
- **[Phase 1: Setup](_docs/phases/phase-1-setup.md)** - Foundation and basic functionality
- **[Phase 2: MVP](_docs/phases/phase-2-mvp.md)** - Core features and value delivery
- **[Phase 3: Enhancement](_docs/phases/phase-3-enhancement.md)** - Advanced features and polish
- **[Phase 4: Scale](_docs/phases/phase-4-scale.md)** - Growth and monetization preparation

## 🐛 Troubleshooting

### Common Issues

**AssemblyAI API Errors**
- Verify your API key is correct
- Check your account has sufficient credits
- Ensure audio file format is supported

**Ollama Connection Issues**
- Verify Ollama is running: `ollama serve`
- Check LLaMA 3 is installed: `ollama list`
- Ensure correct base URL in environment variables

**Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

**Performance Issues**
- Monitor bundle size: `npm run build`
- Check Core Web Vitals in browser dev tools
- Optimize images and assets

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AssemblyAI** for speech-to-text transcription
- **Ollama** for local LLM inference
- **Next.js** for the React framework
- **Tailwind CSS** for styling
- **Vercel** and **Railway** for hosting

---

**Built with ❤️ for sales professionals who want to improve their craft through AI-powered insights.** 