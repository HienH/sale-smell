# 🧠 Sale-Smell – LLM Prompt Reference

This document lists all the LLM prompts to be used to analyze sales call transcripts and generate coaching feedback.

---

## 📋 Call Summary Prompt

```text
You are an expert sales coach. Summarize the following sales call in 3–5 bullet points. Include:
- What the call was about
- Customer interest level
- Any objections
- How the rep responded

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## ❌ Final Objection Prompt

```text
From the transcript below, extract the final objection made by the customer before the call ended. Return it word-for-word. Then classify the objection as one of the following:
- Budget
- Timing
- Fit
- Authority
- Other

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## 🎯 Coaching Feedback Prompt

```text
You're a sales coach. Provide coaching feedback to the sales rep (Speaker A) based on the transcript. Return:

1. ✅ Three things they did well  
2. ⚠️ Three things they could improve  
3. 💡 One suggestion for handling the final objection better

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## 🗣️ Talk-Time & Engagement Prompt

```text
Analyze the transcript below. Answer:
1. How much did the sales rep speak compared to the customer?
2. Did the rep ask enough open-ended questions?
3. Was the rep actively listening or dominating the call?

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## 🔁 Rebuttal Generator Prompt

```text
A customer ended the sales call with this objection:
"""
[OBJECTION]
"""

Write a confident, polite rebuttal the sales rep could use next time. Make it sound natural and persuasive.
```

---

## 🧲 Buying Signals Prompt

```text
From this transcript, list any statements from the customer that indicate interest in buying, exploring further, or needing more information. Highlight them word-for-word.

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## 📋 Script Adherence Prompt

```text
Was the sales rep following a typical sales structure (intro, discovery, pitch, objections, close)? List which stages were clearly present or missing.

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## ❤️ Trust & Rapport Prompt

```text
Based on the language and tone used, did the sales rep build trust and rapport with the customer? Provide examples and rate from 1–5.

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## ⚠️ Deal Risk Flags Prompt

```text
Does this conversation suggest the deal is at risk of being lost? What are the warning signs?

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## 🔄 Alternative Objection Responses Prompt

```text
Based on this objection:
"""
[OBJECTION]
"""

List 2–3 better ways the rep could have handled it in real time.
```

---


## 📊 Rep Scoring Prompt

```text
Score the sales rep’s performance in these areas from 1 to 5:
- Listening
- Empathy
- Clarity
- Objection Handling

Justify each score in 1–2 sentences.

Transcript:
"""
[TRANSCRIPT]
"""
```
