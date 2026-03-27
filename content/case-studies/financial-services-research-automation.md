---
title: "3.2× Research Output for an Asset Management Team — Without Adding Headcount"
description: "A mid-market asset manager's research team was producing one deep-dive per analyst per week. We deployed an agent layer that raised it to 3.2× — in 90 days."
date: "2026-02-28"
client: "Mid-Market Asset Management Firm"
industry: "Financial Services"
outcome: "3.2× research throughput, 8 analysts, £890k annual saving"
layout: case-study
---

## The Challenge

An eight-person investment research team at a £4B AUM asset manager was producing one substantive research brief per analyst per week. In a market where information velocity matters, this was a competitive liability.

Each brief required: company filings review, earnings transcript analysis, sector news synthesis, peer comparison, and a structured investment thesis. A skilled analyst needed 4–5 days to produce one properly.

The Head of Research had tried junior hires. Onboarding took six months before they produced usable output, and the cost per hire — fully loaded — exceeded £75k. Two hires in, the team was bigger but not meaningfully faster.

The board wanted more output. The budget didn't support a third round of hiring.

## Our Approach

We spent the first two weeks in structured discovery:

1. **Shadowed four analysts** through complete research cycles, timing each sub-task
2. **Categorised every step** as: automatable, assistable, or human-only
3. **Mapped the information sources**: which were structured APIs, which were unstructured documents, which required judgement to interpret

The breakdown was illuminating:

| Task | % of time | Category |
|------|-----------|----------|
| Filing retrieval and extraction | 18% | Automatable |
| Earnings transcript summarisation | 14% | Automatable |
| Sector news aggregation and tagging | 12% | Automatable |
| Peer comparison data pulling | 10% | Automatable |
| Quantitative analysis (standard ratios) | 11% | Automatable |
| Qualitative synthesis and thesis formation | 22% | Human-only |
| Stakeholder communication | 13% | Human-only |

**65% of analyst time was structurally automatable.** Only the synthesis and communication steps genuinely required the senior analysts' judgment.

## The Solution

We designed and deployed a five-agent research pipeline:

- **Intake agent** — receives a research target (company ticker or name), routes to appropriate pipeline based on asset class
- **Filing agent** — pulls relevant SEC/Companies House filings, earnings transcripts, and investor presentations; extracts key data points into a structured JSON schema
- **News agent** — aggregates sector and company news from the past 90 days; classifies sentiment and materiality; surfaces the top 10 items requiring analyst attention
- **Quant agent** — runs the standard ratio analysis (P/E, EV/EBITDA, debt metrics, margin trends), benchmarks against sector peers, flags outliers
- **Brief agent** — combines all upstream outputs into a structured pre-brief: a 1,200-word document with all factual, quantitative, and contextual data pre-populated

The analyst then received this pre-brief and spent 60–90 minutes on synthesis, thesis formation, and final judgement — the parts that required them.

The entire pipeline ran overnight. Analysts arrived to a completed pre-brief for every company on their coverage list.

## Results

After 90 days in production:

| Metric | Before | After |
|--------|--------|-------|
| Research briefs per analyst per week | 1.0 | 3.2 |
| Hours per brief (analyst time) | 32 hrs | 10 hrs |
| Pre-brief accuracy vs. manual check | — | 97.3% |
| Annual analyst cost per brief | £3,800 | £1,200 |
| Estimated annual saving | — | £890k |

The team of eight was now producing the equivalent output of a 25-person research department — at the same cost.

The Head of Research repurposed the freed analyst time toward higher-conviction deep dives and portfolio company engagement — work that directly informed investment decisions.

## What Made This Work

**Tight scoping from day one.** We didn't try to automate the synthesis. We automated the retrieval, structuring, and pre-processing — the 65% that was genuinely rule-intensive — and left the judgment layer intact.

**Overnight batch architecture.** Rather than interrupting analyst workflows with real-time agent output, we ran the pipeline overnight so briefs were ready at market open. This removed friction and fit naturally into the existing rhythm.

**97% accuracy gate.** We built a cross-validation step where the Brief agent flagged any data point it was uncertain about. Analysts saw a confidence score on every section. In the first month, this built the trust needed for analysts to rely on the output rather than re-checking it.

**Change management was explicit.** We positioned agents as "the analyst's research associate." Every team member understood their role was shifting toward judgment and away from retrieval — a shift they welcomed.

## What Happened Next

Six months after deployment, the firm expanded the pipeline to cover fixed income and credit research — adapting the same architecture to a different data schema. The second deployment took five weeks, not twelve.

They are now running a third pipeline for regulatory and ESG data extraction.

[Talk to us about research automation →](/lp/get-started)
