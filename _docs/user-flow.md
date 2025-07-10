---
@fileoverview Defines the end-to-end user journey for the Sale-Smell application, including all major segments, user actions, system responses, UI/UX feedback, and error/edge cases. This document will guide project architecture and UI design.

# 🧭 Sale-Smell User Flow

## 1. Audio Upload

### User Action
- User lands on the homepage.
- User sees a prominent drag-and-drop area and a file selector for uploading audio files (.mp3, .wav, .m4a).

### UI/UX Notes
- Show clear instructions and supported file types.
- Display a visually appealing upload area (e.g., card with icon, hover effect).
- Show a progress bar or spinner during upload.

### System Response
- On file drop/select, validate file type and size.
- Begin upload to backend (`POST /upload`).

### Edge Cases & Feedback
- **Invalid file type/size:** Show error message and prevent upload.
- **Upload failure:** Show error message with retry option.
- **Success:** Transition to transcription step with a loading indicator.

---

## 2. Transcription (AssemblyAI)

### User Action
- User waits while the system transcribes the audio.

### UI/UX Notes
- Show a loading spinner and status message (e.g., "Transcribing audio...").
- Optionally display estimated wait time.
- **After successful transcription:**
  - Show a "Download Transcript" button, allowing the user to download the raw transcript (e.g., as .txt or .json).
  - Provide feedback on download success or failure.

### System Response
- Backend sends audio to AssemblyAI for transcription, sentiment, and PII analysis.
- On completion, receive transcript and analysis data.
- Make transcript available for download.

### Edge Cases & Feedback
- **Transcription failure:** Show error message and option to retry or upload a new file.
- **Transcript download failure:** Show error message and retry option.
- **Success:** Transition to analysis step.

---

## 3. LLM-Powered Analysis (LLaMA 3 via Ollama)

### User Action
- User waits while the transcript is analyzed for insights.

### UI/UX Notes
- Show a loading spinner and status message (e.g., "Analyzing call for insights...").
- Use a progress indicator if multiple analysis steps are visible.

### System Response
- Backend sends transcript to LLaMA 3 for:
  - Call summary
  - Objection extraction/classification
  - Coaching feedback
  - Talk-time/engagement
  - Rebuttal script
  - Buying signals
  - Script adherence
  - Trust/rapport
  - Deal risk flags
  - Alternative objection responses
  - Rep scoring
- Collect all analysis results.

### Edge Cases & Feedback
- **Analysis failure:** Show error message and option to retry or re-upload.
- **Partial analysis:** Show available results, indicate which analyses failed, and offer retry.
- **Success:** Transition to dashboard display.

---

## 4. Dashboard Display

### User Action
- User views the results dashboard.

### UI/UX Notes
- Visually appealing, organized layout with clear sections:
  - **Transcript Viewer:**
    - Show transcript with speaker labels and highlights (e.g., color-coded speakers, sentiment highlights).
    - Allow scrolling and searching within transcript.
    - **Download Transcript Button:**
      - Prominently display a button to download the raw transcript (from AssemblyAI) in addition to the PDF download.
      - Provide feedback on download success or failure.
  - **Summary & Insights:**
    - Display call summary, coaching feedback, and final objection/rebuttal in cards or panels.
  - **Metrics Table:**
    - Show talk-time ratio, sentiment breakdown, question count, filler word count, objections, and scores in a table.
  - **Graphs/Charts:**
    - Pie chart or bar graph for talk-time ratio (Rep vs. Customer).
    - Sentiment breakdown per speaker as a bar or stacked chart.
    - Line or bar chart for engagement/tone over time (if available).
  - **Deal Risk & Buying Signals:**
    - Highlight risk flags and buying signals in visually distinct boxes.
  - **Download PDF Button:**
    - Prominent button to download the full report.
- Use color, icons, and whitespace for clarity and appeal.
- Show tooltips or info icons for metrics explanations.

### System Response
- Render all analysis and metrics.
- Enable PDF and transcript download via respective endpoints.

### Edge Cases & Feedback
- **Missing data:** Show placeholders or messages if some analysis is unavailable.
- **PDF or transcript generation failure:** Show error and retry option.

---

## 5. PDF Report Generation

### User Action
- User clicks "Download PDF" to get a full coaching report.

### UI/UX Notes
- Show loading spinner while generating PDF.
- On success, trigger download and show confirmation.
- On failure, show error and retry option.

### System Response
- Backend generates PDF with summary, metrics, objection, feedback, and transcript.
- Returns PDF for download.

### Edge Cases & Feedback
- **PDF generation failure:** Show error and allow retry.

---

## 6. End of Journey / Next Steps

### User Action
- User can upload another file, review results, or exit.

### UI/UX Notes
- Show a clear call-to-action to "Analyze another call".
- Optionally, provide a feedback link or help resources.

---

# 🔄 User Flow Diagram (Textual)

1. **Upload Audio** → 2. **Transcription** (option to download transcript) → 3. **LLM Analysis** → 4. **Dashboard Display** (option to download transcript & PDF) → 5. **PDF Download** → 6. **Restart/Exit**

- At each step, handle errors with clear feedback and retry options.
- Dashboard is the central hub for results and actions.

---

# 📊 Dashboard Visual Suggestions
- **Transcript:** Scrollable, color-coded, with highlights. Include a "Download Transcript" button.
- **Summary/Feedback:** Cards or panels with icons.
- **Metrics:** Table for numbers, pie/bar charts for ratios and sentiment.
- **Risk/Signals:** Badges or colored boxes.
- **Download:** Large, accessible buttons for both PDF and transcript.

---

# ✅ Success Criteria (from PRD)
- Upload → analyze → output within ~240s
- Feedback is relevant and clear
- Transcript is readable, labeled, and accurate
- PDF and transcript download work on all browsers 