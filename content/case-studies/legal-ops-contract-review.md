---
title: "3× Contract Review Throughput for a 200-Person Legal Operations Team"
description: "A FTSE 250 company's in-house legal team was drowning in contract review. We deployed an AI agent layer that tripled throughput without adding headcount."
date: "2026-01-20"
client: "FTSE 250 Financial Services Firm"
industry: "Legal Operations"
outcome: "3× throughput, £1.4M annual saving"
layout: case-study
---

## The Challenge

The in-house legal team at this FTSE 250 financial services firm processed over 3,000 contracts per month — NDAs, vendor agreements, and SaaS subscriptions. With a team of 15 legal operations specialists, turnaround time averaged 4.2 business days. Business units were frustrated. Legal was overwhelmed.

Adding headcount wasn't viable. The CPO needed a different answer.

## Our Approach

We spent the first two weeks mapping the contract review workflow in detail:

1. **Intake** — contract arrives via email or portal
2. **Classification** — determine contract type and risk tier
3. **Review** — check against a 47-point playbook
4. **Redline** — generate tracked-changes markup for non-standard clauses
5. **Escalation** — route to senior counsel if risk tier is high
6. **Approval** — capture signature and file

Steps 1–4 were high-volume and rule-intensive. Steps 5–6 required human judgment. This was the agent opportunity.

## The Solution

We deployed a multi-agent pipeline:

- **Classifier agent** — categorises contract type and risk tier in under 10 seconds
- **Review agent** — runs the 47-point playbook check, flags deviations
- **Redline agent** — generates Word-compatible tracked-changes markup
- **Routing agent** — assigns to human queue if escalation is needed, or to automated approval if clean

The entire pipeline was integrated with the firm's existing contract management system via API.

## Results

After 90 days in production:

| Metric | Before | After |
|--------|--------|-------|
| Contracts processed per month | 3,000 | 9,100 |
| Average turnaround time | 4.2 days | 1.1 days |
| Human review required | 100% | 31% |
| Annual cost saving | — | £1.4M |

The legal operations team went from processing contracts to supervising agents — a role shift that improved job satisfaction and freed senior counsel for genuinely complex work.

## What Made This Work

- **Tight scope**: we didn't try to automate everything, only the high-volume steps
- **Human-in-the-loop by design**: escalation to human counsel was built into the workflow from day one
- **Baseline measurement**: we had clean pre-deployment metrics, so the ROI story was unambiguous at the 90-day review

[Talk to us about your legal ops workflow →](/lp/get-started)
