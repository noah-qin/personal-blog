---
title: "Prior-Guided Augmentation Policy"
description: "Research on optimizing data augmentation policies using prior knowledge for computer vision tasks."
publishDate: "2024-05-20"
tags: ["AI", "Computer Vision", "Python", "PyTorch"]
type: "research"
stats: "Open Source"
link: "https://github.com/imnotnoahhh/prior-guided-aug-policy"
github: "https://github.com/imnotnoahhh/prior-guided-aug-policy"
---

# Hypothesis & Objective

### 1.1 Research Goal
In the context of **Few-Shot Learning** (specifically limited to ~100 samples per class), this research aims to utilize a systematic **Pipeline** to discover the **optimal combination of foundational data augmentation operations**. The objective is to verify that a superimposed strategy (multi-op) significantly enhances model accuracy and robustness compared to single-operation baselines.

*   **Core Hypothesis**: A rational superposition of multiple augmentation operations (Multi-Op Combination) is more effective than any single operation, provided the search space is constrained correctly.
*   **Key Problem**: Existing methods like AutoAugment or RandAugment often lead to **underfitting** in low-data regimes due to excessive augmentation intensity, or are computationally infeasible due to the vast search space.
*   **Proposed Solution**: A three-stage search pipeline initialized based on "**Human Priors**":
    1.  **Phase A**: Breadth-first screening to identify effective individual operations.
    2.  **Phase B**: Depth-first parameter tuning to find the optimal magnitude ($m$) and probability ($p$).
    3.  **Phase C**: Greedy superposition to construct the final combinatorial strategy.
*   **v5 Innovation**: Implemented **Joint Search** for magnitude and probability, moving away from the fixed $p=1.0$ constraint.
*   **No-NAS Constraint**: Strictly fixed model architecture and hyperparameters; the performance gain is derived solely from the alteration of the data input distribution.

*View the code and detailed experiments on GitHub.*
