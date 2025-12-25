# AXIVAI Planning Prompt Package

This folder contains the **authoritative AI prompt operating system** for building AXIVAI.COM.

AXIVAI is a public-sector, decision-grade resilience infrastructure platform for electrifying U.S. school transportation.

---

## HOW TO USE

1. Place this entire folder into your project as `/Planning`
2. Ensure `AXIVAI_Whitepaper_VNext.docx.md` exists in the same directory
3. Paste `AXIVAI_Master_Prompt.md` into:
   - Claude Project → Instructions
4. Execute prompts sequentially
5. Save outputs back into `/Planning`

**If a session crashes or context is lost:**
→ Run `Session_Recovery.md` immediately

---

## CORE PRINCIPLES

- White paper = single source of truth
- Planning only (no production code unless instructed)
- Artifact-first workflow
- Public-sector trust, auditability, and explainability

---

## PROMPT FLOW (HIGH LEVEL)

1. Requirements → Architecture → Research → TCO
2. Compliance → Chatbot → UX → Copy
3. Roadmap → Test Plan
4. Daily: `Next_Task.md`
5. End of session: `Checkpoint.md`

---

## SUPPORTED MODELS

- Claude (primary planning & reasoning)
- GPT (UX synthesis & orchestration)
- Gemini (research structuring & data analysis)

This system is designed to be **crash-proof, restart-safe, and team-scalable**.
