# Buddi Student Wellbeing MVP - Demo Guide

**Version:** 1.0
**Date:** December 12, 2025
**Purpose:** Stakeholder presentation guide for MOE EdTech Division

---

## 📋 Demo Overview

This demo showcases **Buddi**, an AI-powered, gamified wellbeing companion designed to integrate with MOE's Student Learning Space (SLS). The demo uses synthetic data and pre-scripted scenarios to validate the product concept with stakeholders.

**Duration:** 30-45 minutes
**Audience:** MOE EdTech Division, GovTech Product Team, School Counselors, Form Teachers
**Format:** Interactive walkthrough with role-switching

---

## 🎭 Demo Personas

### 1. Wei Ling (Student, 14, Secondary 2)
- **Current Status:** 5-day check-in streak, Level 3, 275 XP
- **Mood Pattern:** Generally okay, recent exam stress
- **Engagement:** Active user, completed 3 exercises, 1 mindfulness session
- **Achievements:** 4 unlocked (First Steps, 3-Day Warrior, Exercise Explorer, Mindful Beginner)

### 2. Ms. Priya (School Counselor)
- **Role:** School Counselor managing student wellbeing
- **Workload:** Monitoring 35 students in Class 2A
- **Current Focus:** 3 priority cases flagged by AI (1 red, 7 orange, 10 yellow)
- **Key Feature:** AI-powered priority queue with explainable risk scores

### 3. Mr. Tan (Form Teacher, Class 2A)
- **Role:** Form Teacher for Class 2A
- **Class Size:** 35 students
- **Current Class Mood:** 3.8/5.0 (improving from 3.5)
- **Participation:** 77% (27/35 students active this week)
- **Key Feature:** Privacy-protected aggregate analytics

---

## 🚀 Demo Scenario 1: Student Journey (Wei Ling)

**Duration:** 10-12 minutes
**Goal:** Showcase student-facing features and gamification mechanics

### Step-by-Step Walkthrough

#### 1. Role Selection (Landing Page)
- **Action:** Navigate to the app homepage
- **Show:** Three persona cards (Wei Ling, Ms. Priya, Mr. Tan)
- **Click:** Wei Ling card

**Talking Points:**
- "This is a demo version with no login required"
- "Three pre-populated personas represent student, counselor, and teacher perspectives"
- "In production, students would authenticate via SLS using LTI 1.3"

---

#### 2. Student Dashboard Overview
- **Show:** Wei Ling's dashboard with:
  - Current streak: 5 days 🔥
  - XP progress: 275 XP (Level 3)
  - Today's check-in status
  - Quick action buttons
  - Recent achievements

**Talking Points:**
- "Gamification encourages daily engagement without trivializing mental health"
- "XP and levels provide positive reinforcement"
- "Streaks build habit formation (psychology-backed)"
- "Dashboard designed for mobile-first student usage"

---

#### 3. Daily Mood Check-In
- **Action:** Click "Start Check-in" button
- **Show:** Animated emoji wheel with 5 mood options

**Steps:**
1. Select mood: 😐 **Okay**
2. Optionally add note: "Feeling stressed about upcoming math test"
3. Click "Submit"

**Show Animation:**
- Confetti celebration ✨
- Floating XP reward: +10 XP (base) + 5 XP (streak bonus) = **+15 XP**
- Streak updated: 6 days 🔥

**Talking Points:**
- "2-3 minute daily check-in promotes emotional awareness"
- "Optional journal entry (500 char limit)"
- "Singapore timezone-aware streak tracking (Asia/Singapore)"
- "Immediate positive feedback via XP rewards"
- "All data encrypted and privacy-protected"

---

#### 4. View Mood History
- **Action:** Navigate to mood history
- **Show:**
  - Statistics: Total check-ins, average mood, mood distribution
  - Last 7 days timeline with notes
  - Bar chart showing mood frequency

**Talking Points:**
- "Students can visualize their emotional patterns"
- "Helps identify triggers and trends"
- "Data exportable (future: share with counselor if consented)"

---

#### 5. CBT Exercise Library
- **Action:** Navigate to "Exercises" tab
- **Show:** 5 evidence-based CBT exercises

**Available Exercises:**
1. 🔄 Thought Flipper (Cognitive Reframing) - 5 min, +20 XP
2. 🏺 Gratitude Jar (Gratitude Practice) - 3 min, +20 XP
3. 📦 Worry Box (Worry Management) - 5 min, +20 XP
4. ⚡ Energy Boost (Behavioral Activation) - 4 min, +20 XP
5. 💌 Self-Compassion Letter (Self-Compassion) - 6 min, +20 XP

**Talking Points:**
- "Evidence-based cognitive-behavioral techniques"
- "Adapted for secondary school students in Singapore context"
- "Each exercise takes 5-6 minutes (fits into school breaks)"
- "Completion badges and XP rewards"

---

#### 6. Complete "Thought Flipper" Exercise
- **Action:** Click on "Thought Flipper" card
- **Show:** Step-by-step interface (5 steps)

**Walkthrough:**
1. **Step 1:** Identify negative thought
   - Input: "I'm going to fail my math test"
2. **Step 2:** Challenge the thought
   - Select: "Is this thought 100% true?"
3. **Step 3:** Find evidence
   - Input: "I've studied for 2 hours, I passed the last quiz"
4. **Step 4:** Reframe
   - Input: "I've prepared as best I can. I'll do my best."
5. **Step 5:** Reflection
   - Prompt: "How do you feel after reframing?"

**Show Completion:**
- Badge unlock animation 🏅
- XP reward: +20 XP
- Completion message: "Great work! You've completed Thought Flipper"

**Talking Points:**
- "Interactive, not passive reading"
- "Teaches practical coping skills"
- "Progress saved, can revisit anytime"
- "Bilingual support (EN/ZH) - demonstrate language switch"

---

#### 7. Mindfulness Session Library
- **Action:** Navigate to "Mindfulness" tab
- **Show:** 6 guided sessions

**Available Sessions:**
1. 🌅 Calm Breathing (5 min) - +50 XP
2. 🧘 Body Scan (12 min) - +50 XP
3. 📚 Exam Stress Relief (12 min) - +50 XP
4. 😴 Sleep Better (15 min) - +50 XP
5. 💖 Loving-Kindness (10 min) - +50 XP
6. ⚡ Focus & Energy (8 min) - +50 XP

**Talking Points:**
- "Guided mindfulness for stress management"
- "Auto-advancing narration (no audio in demo)"
- "Smart timing based on reading speed"
- "Higher XP rewards (50 XP) for longer time commitment"

---

#### 8. Language Switching Demo
- **Action:** Click language switcher (EN → 中文)
- **Show:** Entire interface switches to Chinese Simplified
- **Navigate:** Mood check-in in Chinese
- **Switch back:** 中文 → EN

**Talking Points:**
- "Full bilingual support (EN/ZH) from day one"
- "Architecture ready for Malay and Tamil (post-MVP)"
- "All strings externalized to i18n files"
- "Cultural adaptation, not just translation"

---

#### 9. Achievement Gallery
- **Action:** View achievements section
- **Show:**
  - Unlocked: First Steps, 3-Day Warrior, Exercise Explorer, Mindful Beginner
  - Locked: 7-Day Warrior, Streak Master, Gratitude Champion (greyed out)

**Talking Points:**
- "22 achievements designed for long-term engagement"
- "Unlocked based on behavior (not just time)"
- "Visible progress motivates continued use"
- "No real-world value (compliance requirement)"

---

## 🧭 Demo Scenario 2: Counselor Dashboard (Ms. Priya)

**Duration:** 12-15 minutes
**Goal:** Showcase AI-powered early intervention system for counselors

### Step-by-Step Walkthrough

#### 1. Role Switch
- **Action:** Click "Switch Role" → Select Ms. Priya
- **Show:** Counselor dashboard loads

**Talking Points:**
- "Counselor interface designed for efficiency and clarity"
- "AI assists, doesn't replace human judgment"
- "All AI flags include explainable factors"

---

#### 2. Dashboard Overview
- **Show:** 4-card analytics grid:
  - **Total Students:** 35 (Class 2A)
  - **Flagged Students:** 18 (1 red, 7 orange, 10 yellow)
  - **Average Engagement:** 5.3 days streak
  - **Active This Week:** 27/35 (77%)

**Talking Points:**
- "At-a-glance class wellbeing health"
- "Focus on flagged students who need attention"
- "Engagement metrics show platform adoption"

---

#### 3. Urgent Attention Alert
- **Show:** Red banner if red-flagged students exist
- **Content:**
  - 🚨 "Urgent Attention Needed"
  - "1 student has been flagged as high-risk (RED) and requires immediate follow-up"
  - Priority: Immediate | Target: Within 24 hours

**Talking Points:**
- "Clear visual hierarchy for urgency"
- "Red flags trigger immediate counselor notification"
- "MOE's pastoral care protocols respected"

---

#### 4. Priority Queue
- **Show:** Risk-sorted list of students (highest → lowest)
- **Filters:** All, Red (1), Orange (7), Yellow (10), Green (17)

**Talking Points:**
- "AI automatically prioritizes based on risk score"
- "Color-coding for quick assessment"
- "Filter by risk level for focused work"

---

#### 5. Click on Red-Flagged Student: Aisha Rahman
- **Action:** Click on "Aisha Rahman" card (Risk: 87%)
- **Show:** Full-screen student detail modal

**Modal Contents:**

**Header Stats:**
- Risk Level: 🚨 Red (87%)
- Engagement: 7 days streak
- Progress: Level 2, 120 XP
- Check-ins: 7 total

**AI-Generated Case Summary:**
- **Summary:** "Aisha has shown a concerning pattern over the past week with consistently low mood scores and language indicating hopelessness. Her notes mention feeling overwhelmed, unable to sleep, and expressing thoughts like 'don't see the point' and 'feel like giving up.' She has maintained check-in consistency (7-day streak) but missed recent exercise activities, suggesting declining engagement."

- **Key Concerns (5 items):**
  1. Expressions of hopelessness and giving up
  2. Sleep disturbance mentioned multiple times
  3. Social isolation ("nobody understands")
  4. Academic stress (exam anxiety)
  5. Declining engagement with coping exercises

- **Conversation Starters (4 suggestions):**
  1. "I noticed you've been checking in every day this week—that takes courage. How are you really doing?"
  2. "You mentioned feeling overwhelmed. Can we talk about what's weighing on you right now?"
  3. "I saw you're worried about exams. What support would help you feel more prepared?"
  4. "It sounds like sleep has been difficult. Let's explore what might help you rest better."

**Talking Points:**
- "AI provides context, not diagnosis"
- "Natural language summaries save counselor time"
- "Conversation starters are evidence-informed"
- "Counselor reviews and applies professional judgment"

---

#### 6. Explainable AI Flags
- **Show:** "Why This Student Was Flagged" section
- **4 Factor Cards:**
  1. 🚨 Declining mood trend (7 days)
  2. 📊 Concerning keywords detected
  3. 📉 Engagement drop (missed 2 exercises)
  4. 💬 Mentioned hopelessness

**Talking Points:**
- "Full transparency on AI decision-making"
- "Each factor traceable to specific data"
- "Builds trust in AI system"
- "Meets ethical AI standards (Singapore Model AI Governance Framework)"

---

#### 7. Mood Timeline
- **Show:** Chronological list of Aisha's 7 check-ins
- **Highlight:** Downward mood trend (struggling → struggling → low → struggling...)
- **Show Notes:**
  - "Everything feels overwhelming"
  - "Cannot sleep, worried about exams"
  - "Don't see the point anymore"
  - "Nobody understands"

**Talking Points:**
- "Full context for counselor assessment"
- "Pattern recognition aids clinical judgment"
- "Privacy-protected (only counselor sees individual data)"
- "Student can delete entries if desired"

---

#### 8. Action Buttons (Placeholder Demo)
- **Show:** 3 action buttons:
  - 📝 Add Case Note
  - 📅 Schedule Follow-up
  - 📧 Contact Parents

**Talking Points:**
- "Intervention tracking built into workflow"
- "Case notes logged for continuity"
- "Integration with school systems (future: REACH, Student Care Services)"
- "Audit trail for professional accountability"

---

#### 9. Navigate to Orange-Flagged Student
- **Action:** Close modal, filter by "Orange", click "Marcus Lim"
- **Show:** Different risk profile (Risk: 65%)

**Key Differences:**
- Gradual mood decline (10 days vs 7 days)
- Academic pressure focus (parental expectations)
- Less severe language (stressed vs hopeless)
- Inconsistent engagement (3-day streak vs 7-day)

**Talking Points:**
- "Different risk levels require different response urgency"
- "Orange = elevated concern, not immediate crisis"
- "Counselor can prioritize workload effectively"
- "Preventative intervention before escalation"

---

#### 10. AI Risk Scoring Methodology (Info Banner)
- **Show:** Bottom info panel
- **Content:**
  - "Risk scores calculated using multi-signal analysis:"
  - Mood trend (30%), Keywords (25%), Engagement (20%), Timing (15%), Exercise completion (10%)
  - "System designed to assist counselor judgment, not replace it"

**Talking Points:**
- "Transparent methodology builds trust"
- "Weighted factors based on research evidence"
- "Counselor has final decision authority"
- "System learns from outcomes (future enhancement)"

---

## 📊 Demo Scenario 3: Teacher Dashboard (Mr. Tan)

**Duration:** 8-10 minutes
**Goal:** Showcase privacy-protected class insights for teachers

### Step-by-Step Walkthrough

#### 1. Role Switch
- **Action:** Click "Switch Role" → Select Mr. Tan
- **Show:** Teacher dashboard loads

**Talking Points:**
- "Teacher view is aggregate-only, privacy-first"
- "No individual student data visible"
- "Designed for class-level support, not surveillance"

---

#### 2. Privacy Notice Banner
- **Show:** 🔒 "Privacy Protected" banner at top
- **Content:**
  - "Individual student data is not visible on this dashboard"
  - "All metrics shown are aggregated and anonymized"
  - "For individual concerns, contact Ms. Priya (School Counselor)"
- **Click:** "How does privacy protection work?" link

**Show Privacy Modal:**
- ✅ What You CAN See (5 items)
- 🚫 What You CANNOT See (5 items)
- Why this matters (explanation)
- Contact counselor for individual help

**Talking Points:**
- "Student wellbeing data is highly sensitive"
- "Privacy-by-design approach"
- "Teachers get actionable class insights"
- "Students feel safe sharing feelings"
- "Complies with PDPA best practices"

---

#### 3. Class Wellbeing Pulse (3-Card Grid)

**Card 1: Average Mood This Week**
- **Show:** 🙂 3.8/5.0
- **Trend:** 📈 ↑ 0.3 from last week
- **Color:** Green gradient

**Card 2: Participation Rate**
- **Show:** 77% (27/35 students)
- **Visual:** Purple progress bar
- **Context:** Good engagement level

**Card 3: vs School Average**
- **Show:** ↑ 0.1 above school
- **Comparison:** Class 2A: 3.8, School: 3.7
- **Status:** "Above school average ✓"

**Talking Points:**
- "Teachers see class health at a glance"
- "Trend indicators show improvement/decline"
- "Comparison to school average provides context"
- "All data ≥5 students aggregated (privacy threshold)"

---

#### 4. Alerts & Insights

**Alert 1 (Positive):**
- ✅ "Class mood improving"
- "Class 2A average mood has increased by 0.3 points this week"
- 💡 Suggestion: "Great time to reinforce positive practices!"

**Alert 2 (Info):**
- ℹ️ "Friendship mentions increased"
- "5 students mentioned friendship concerns this week (up from 3 last week)"
- 💡 Suggestion: "Consider group activities or ice-breaker exercises to strengthen bonds"

**Talking Points:**
- "Actionable insights, not just data"
- "Positive reinforcement alerts encourage teachers"
- "Contextualized suggestions save teacher time"
- "Alerts only trigger when statistically significant"

---

#### 5. 8-Week Mood Trend Chart
- **Show:** Dual-axis line chart
  - Green line: Average mood (1-5 scale)
  - Purple dashed line: Participation percentage
- **Highlight:**
  - Week 4-5: Exam period dip (3.4 → 3.3)
  - Week 6-8: Recovery trend (3.6 → 3.5 → 3.8)

**Talking Points:**
- "Historical trends reveal patterns"
- "Exam stress impact visible (weeks 4-5)"
- "Post-exam recovery documented"
- "Teacher can time interventions (e.g., stress management before exams)"
- "Participation spike during stress = students seeking support"

---

#### 6. Top Concerns (Anonymous Aggregate)
- **Show:** Ranked list with trend indicators

1. **School workload** - 12 mentions (➡️ stable)
2. **Exam stress** - 8 mentions (📉 down, post-exam)
3. **Sleep & rest** - 7 mentions (➡️ stable)
4. **Friendship issues** - 5 mentions (📈 up, new trend)

**Footer Note:** "* Only concerns mentioned by 5+ students are shown to protect privacy"

**Talking Points:**
- "Aggregate themes, no individual attribution"
- "5-student minimum threshold (privacy protection)"
- "Trend indicators show emerging vs. resolving issues"
- "Teacher can address class-wide concerns (e.g., workload discussion)"
- "Friendship issue emerging → consider team-building activity"

---

#### 7. Action Buttons
- **Show:** 3-button grid
  - 📚 View Resources (teacher wellbeing guides)
  - 📧 Contact Counselor (prepopulated message)
  - 📊 Download Report (export PDF)

**Talking Points:**
- "One-click access to support resources"
- "Direct counselor communication for class concerns"
- "Reports for parent-teacher meetings (future feature)"

---

#### 8. Privacy Threshold Demo
- **Show:** Top Concerns list again
- **Point out:** Friendship issues = exactly 5 mentions (minimum threshold)
- **Explain:** If only 4 students mentioned → hidden to protect anonymity

**Talking Points:**
- "Technical privacy safeguards"
- "System refuses to show data if <5 students"
- "Prevents identification through inference"
- "K-anonymity principle applied"

---

## 🎤 Key Talking Points Summary

### Student Perspective (Wei Ling)
- ✅ **Gamification encourages engagement** without trivializing mental health
- ✅ **Evidence-based CBT exercises** teach real coping skills
- ✅ **Daily mood tracking** promotes emotional awareness
- ✅ **Bilingual by design** (EN/ZH), ready for Malay/Tamil
- ✅ **Mobile-first** design for secondary school students

### Counselor Perspective (Ms. Priya)
- ✅ **AI-powered early intervention** flags at-risk students before crisis
- ✅ **Explainable AI** builds trust and professional confidence
- ✅ **Time-saving summaries** allow counselors to focus on human connection
- ✅ **Privacy-protected** individual data (not visible to teachers/parents)
- ✅ **Conversation starters** based on evidence-informed practices

### Teacher Perspective (Mr. Tan)
- ✅ **Aggregate insights** for class-level support
- ✅ **Privacy-by-design** prevents surveillance concerns
- ✅ **Historical trends** inform proactive interventions
- ✅ **Actionable alerts** with contextualized suggestions
- ✅ **Clear counselor referral** pathway for individual concerns

---

## ❓ Anticipated Questions & Answers

### Q1: "How does this differ from other mental health apps?"
**A:** Buddi is designed for MOE's ecosystem:
- Integrates with SLS (LTI 1.3 authentication)
- Singapore-specific context (exam stress, tuition, kiasu culture)
- Bilingual (EN/ZH) from day one
- School-based (counselor + teacher dashboards)
- Gamification for secondary school engagement (not clinical therapy)
- AI risk detection for early intervention (preventative, not diagnostic)

### Q2: "What if students game the system for XP?"
**A:** Multiple safeguards:
- XP rewards consistent daily engagement (can't "grind")
- Streak system requires genuine daily check-ins
- Achievements tied to behavior, not just points
- No real-world value (no prizes, no grades)
- Counselors review flagged students (anomalous patterns detected)
- Student wellbeing is the goal, XP is the engagement mechanism

### Q3: "How accurate is the AI risk scoring?"
**A:** Current demo uses mock AI (pre-scripted):
- Real AI integration would use Claude API (Anthropic)
- Pilot phase would validate accuracy (target: >80% true positive rate)
- Counselor always has final decision authority
- System learns from counselor feedback (future: ML fine-tuning)
- Explainability ensures counselor understands each flag
- False positives acceptable (better safe than sorry)

### Q4: "What about student privacy? Can parents access data?"
**A:** Privacy-first design:
- Individual data only visible to student + counselor
- Teachers see aggregate only (≥5 student threshold)
- Parents do NOT have access in MVP (by design)
- Students can delete journal entries anytime
- All data encrypted in transit + at rest
- PDPA compliance (even though schools exempt)
- Parental consent required for students <13 (future feature)

### Q5: "How does this integrate with existing systems (SLS, REACH, etc.)?"
**A:** Integration roadmap:
- **MVP Demo:** Standalone web app (no integration)
- **Pilot (Phase 2):** LTI 1.3 integration with SLS for authentication
- **Production:**
  - Deep linking from SLS App Library
  - Data export to REACH (with consent)
  - API integration with Student Care Services
  - Single sign-on (MIMS student identity)

### Q6: "What happens if a student shows crisis indicators?"
**A:** Escalation protocol:
- Red flags trigger immediate counselor notification (email + dashboard)
- Counselor reviews within 24 hours (SLA)
- Counselor applies professional judgment (system assists, doesn't replace)
- Counselor can escalate to REACH, parents, admin as needed
- Crisis keywords (self-harm, suicide) → instant alert (future: real-time moderation)
- System logs all interventions for accountability

### Q7: "How much does this cost per student?"
**A:** Estimated costs (production):
- **Infrastructure (GCC 2.0):** ~$0.50/student/year (AWS hosting)
- **AI API calls (Claude):** ~$0.30/student/year (sentiment analysis)
- **Development + Maintenance:** One-time $150K, ongoing $30K/year
- **Total:** ~$1-2/student/year for 10,000 students
- **Compare to:** International mental health apps ($5-15/student/year)

### Q8: "Can this be used for academic assessment or discipline?"
**A:** Absolutely NOT (by design):
- Data purpose-limited to wellbeing only
- No integration with academic grades
- No disciplinary action based on wellbeing data
- Teacher dashboard explicitly excludes individual data
- Privacy notice states: "Never for academic assessment or discipline"
- Violating this would destroy student trust

### Q9: "What if students don't adopt it? How do you drive usage?"
**A:** Multi-pronged engagement strategy:
- **Gamification:** XP, streaks, achievements (intrinsic motivation)
- **School integration:** Embedded in SLS (reduced friction)
- **Form teacher support:** Weekly class discussions (normalize usage)
- **Peer effect:** "23 classmates checked in today!" (social proof)
- **Opt-in by default:** All students have access, no stigma
- **Teacher encouragement:** Not mandatory, but encouraged
- **Pilot metrics:** Target 60% weekly active users (realistic, achievable)

### Q10: "When can we pilot this in schools?"
**A:** Proposed timeline:
- **December 2025:** Stakeholder demo (this presentation)
- **January 2026:** Product refinement based on feedback
- **February 2026:** Ethics review + privacy audit
- **March 2026:** Pilot school selection (5 schools, 2,500 students)
- **April-June 2026:** Pilot semester (data collection)
- **July 2026:** Pilot evaluation + go/no-go decision
- **August 2026 (if approved):** National rollout to 30 schools
- **2027:** Full rollout across MOE secondary schools

---

## 🧪 Demo Tips & Troubleshooting

### Before the Demo
- ✅ Test on presentation laptop (Chrome browser recommended)
- ✅ Clear browser cache to ensure fresh data load
- ✅ Test internet connectivity (or use local build)
- ✅ Have backup: screenshots in PowerPoint if live demo fails
- ✅ Practice role-switching flow (muscle memory)
- ✅ Time each scenario (stay within limits)

### During the Demo
- ✅ Speak slowly and clearly
- ✅ Pause after each key feature for questions
- ✅ Use laser pointer or screen annotation for clarity
- ✅ If demo breaks: fall back to screenshots, don't panic
- ✅ Acknowledge limitations honestly (it's a demo/MVP)

### Common Issues
- **Issue:** Language switch doesn't work
  - **Fix:** Refresh page, browser cache issue
- **Issue:** Chart doesn't render
  - **Fix:** Resize window slightly (triggers re-render)
- **Issue:** Animations lag
  - **Fix:** Close other apps, Chrome uses GPU acceleration
- **Issue:** Data doesn't match script
  - **Fix:** This is a live demo, data may vary slightly from guide

---

## 📸 Screenshot Markers (For Backup Slides)

### Key Screenshots to Capture:
1. Role selector landing page (3 persona cards)
2. Student dashboard (Wei Ling overview)
3. Mood check-in interface (emoji wheel)
4. Mood history (statistics + timeline)
5. Exercise library (5 CBT exercises)
6. Thought Flipper exercise (mid-completion)
7. Mindfulness library (6 sessions)
8. Achievement gallery (unlocked + locked)
9. Counselor dashboard (analytics overview)
10. Priority queue (risk-sorted list)
11. Student detail view (Aisha Rahman, red flag)
12. AI case summary + concerns
13. Explainable AI flags (4 factors)
14. Mood timeline (chronological)
15. Teacher dashboard (Class 2A pulse)
16. Privacy notice banner + modal
17. 8-week trend chart (dual-axis)
18. Top concerns (anonymous aggregate)
19. Alerts & insights (positive + info)
20. Language switcher (EN ↔ ZH)

---

## ✅ Demo Checklist

### Pre-Demo (1 day before)
- [ ] Test demo on presentation laptop
- [ ] Verify all 3 personas load correctly
- [ ] Test role switching (smooth transitions)
- [ ] Verify bilingual functionality (EN/ZH)
- [ ] Test on target browser (Chrome recommended)
- [ ] Prepare backup screenshots (PowerPoint)
- [ ] Print this guide for reference
- [ ] Time full demo (should be 30-40 minutes)

### Setup (30 minutes before)
- [ ] Connect laptop to projector/screen
- [ ] Test audio (if needed for mindfulness demo)
- [ ] Open demo URL in browser
- [ ] Close unnecessary tabs/apps
- [ ] Disable notifications
- [ ] Have water nearby
- [ ] Test clicker/pointer (if using)

### Post-Demo
- [ ] Collect stakeholder feedback
- [ ] Note questions for FAQ update
- [ ] Document feature requests
- [ ] Send follow-up email with demo link
- [ ] Update DEV_PLAN based on feedback

---

## 📧 Follow-Up Materials

### Email Template (Send to Stakeholders)
```
Subject: Buddi Student Wellbeing MVP Demo - Follow-up

Dear [Stakeholder Name],

Thank you for attending the Buddi demo presentation today. As discussed, Buddi is an AI-powered, gamified wellbeing companion designed to integrate with MOE's Student Learning Space.

**Demo Link:** [Insert deployed URL]
**Login:** No authentication required (demo mode)
**Personas:** Wei Ling (Student), Ms. Priya (Counselor), Mr. Tan (Teacher)

**Key Features:**
✅ Daily mood tracking with gamification
✅ Evidence-based CBT exercises (5 exercises)
✅ Guided mindfulness sessions (6 sessions)
✅ AI-powered early intervention (counselor priority queue)
✅ Privacy-protected teacher analytics
✅ Bilingual support (EN/ZH)

**Next Steps:**
1. Review demo at your convenience
2. Share feedback via [feedback form link]
3. Propose pilot school partnerships
4. Discuss ethics review + privacy audit

**Documentation:**
- Product Requirements Document (PRD)
- Demo Guide (this document)
- Technical Architecture Overview
- Privacy Impact Assessment (draft)

Please feel free to reach out with any questions or to schedule a follow-up discussion.

Best regards,
[Your Name]
[Your Title]
```

---

## 🎉 Conclusion

This demo guide provides a comprehensive walkthrough of Buddi's MVP features across three stakeholder perspectives:
1. **Student (Wei Ling):** Engagement, gamification, self-care tools
2. **Counselor (Ms. Priya):** AI-powered early intervention, explainable risk scoring
3. **Teacher (Mr. Tan):** Privacy-protected class insights, aggregate analytics

**Key Success Metrics for Demo:**
- Stakeholder understanding >90%
- Perceived value >4.0/5.0
- Technical feasibility >80%
- Pilot interest >70%

**Remember:** This is a demo/proof-of-concept. Be transparent about:
- Synthetic data (not real students)
- Mock AI (pre-scripted, not live API)
- No authentication (production would use LTI 1.3)
- Simplified backend (production would use PostgreSQL + Redis)

Good luck with your presentation! 🚀
