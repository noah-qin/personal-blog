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

# Overview

This project explores a novel approach to Data Augmentation (DA) in deep learning. Instead of random augmentation, we propose a **Prior-Guided Policy** that selects augmentation strategies based on the inherent characteristics of the dataset.

## Motivation

Standard augmentation techniques (like RandAugment) often apply transformations that might not be suitable for specific image domains. Our method leverages prior knowledge to guide the selection process, improving model convergence and final accuracy.

## Results

Initial experiments show that our policy achieves:
- **Faster Convergence**: Reducing training epochs required.
- **Improved Robustness**: Better performance on out-of-distribution (OOD) data.

*View the code and detailed experiments on GitHub.*
