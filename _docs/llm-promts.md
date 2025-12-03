# 🧠 Sale-Smell – LLM Prompt Reference

This document lists all the LLM prompts to be used to analyze sales call transcripts and generate coaching feedback.

---

## 📋 Call Summary Prompt

```text
You are an expert sales coach. Summarize the following sales call to include:
- any customer interest level
- All objections
- How the rep responded
- overall coaching you would advice and actions points for the rep for a more sucessfull sale

Transcript:
"""
[TRANSCRIPT]
"""
```

---

## ❌ Final Objection Prompt

```text
From the transcript below, extract the all objection made by the customer and classify the objection as one of the following:
- Budget
- Timing
- Fit
- Authority
- Trust
- Other

include how the rep over came said objective if they did or  
come with with simple and clever rebuttals to help the rep overcome the objections if not . 


Transcript:
"""
[TRANSCRIPT]
"""
```

---

## 🎯 Coaching Feedback Prompt

```text
You're a sales coach. Figure who the sale rep is and then provide coaching feedback to the sales rep - eeturn:

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
2. Did the rep ask enough open-ended questions? give examples of useful question to ask

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

Write a confident, polite rebuttal the sales rep could use next time to get the sale done now. 
```

---

## 🧲 Buying Signals Prompt

```text
From this transcript, list any statements from the customer that indicate interest in buying, exploring further, or needing more information. 
Highlight them word-for-word. how could the customers 'why' be better addressed, 

Transcript:
"""
[TRANSCRIPT]
"""
```


## ❤️ Trust & Rapport Prompt

```text
Based on the language and tone used, did the sales rep build trust and rapport with the customer? 
Provide examples of where they could improve 

Transcript:
"""
[TRANSCRIPT]
"""
```

---



## 🔄 Alternative Objection Responses Prompt

```text
Based on the final objection 
List 2–3 better ways the rep could have handled it in real time.
```

---

- How can the rep create or leverage urgency appropriately?







