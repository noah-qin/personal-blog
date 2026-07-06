---
title: "Rethinking Data Augmentation for Small-Sample Learning: A Stability-Aware Search"
description: "A stability-aware search pipeline for optimizing data augmentation in small-sample learning, submitted to EUSIPCO 2026."
publishDate: "2026-02-03"
tags: ["AI", "Computer Vision", "Small-Sample Learning", "Publication"]
type: "research"
stats: "Not Accepted"
github: "https://github.com/noah-qin/Rethinking-Augmentation"
---

# Submission Outcome

> **Update (May 2026):** This paper was not accepted by **EUSIPCO 2026**. The result was disappointing, but the submission exposed areas where the methodology and experimental validation can be strengthened. I plan to carry those lessons into future research.

*   **Paper ID**: 1089
*   **Track 1**: VIP - Visual Information Processing (Signal processing for computer vision)
*   **Track 2**: SiG-DML - Signal and Data Analytics for Machine Learning (Neural network learning)

## Abstract
In the context of **Few-Shot Learning** (specifically limited to ~100 samples per class), this research aims to utilize a systematic **Pipeline** to discover the **optimal combination of foundational data augmentation operations**. The objective is to verify that a superimposed strategy (multi-op) significantly enhances model accuracy and robustness compared to single-operation baselines.

### Key Innovations

*   **Stability-Aware Search**: A novel three-stage pipeline initialized based on "Human Priors" restricts the search space to avoid overfitting.
*   **Multi-Op Superposition**: Verifying that rational combinations of operations outperform single operations.
*   **Joint Search**: Moving away from fixed probability constraints to jointly optimize magnitude ($m$) and probability ($p$).

### Key Dates (EUSIPCO 2026)

*   **Submission Date**: Feb 03, 2026 (Submitted)
*   **Decision**: May 12, 2026 (Not accepted)
*   **Camera Ready / Registration**: Not applicable

### Methodology

1.  **Phase A**: Breadth-first screening to identify effective individual operations.
2.  **Phase B**: Depth-first parameter tuning to find the optimal magnitude and probability.
3.  **Phase C**: Greedy superposition to construct the final combinatorial strategy.

*View the code and detailed experiments on GitHub.*
