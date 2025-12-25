---
title: "NightGuard: Sleep & Habits"
description: "An iOS application designed to help users build better sleep habits through tracking and analytics."
publishDate: "2024-01-15"
tags: ["iOS", "SwiftUI", "HealthKit", "Productivity"]
type: "app"
stats: "Verify on AppStore"
link: "https://apps.apple.com/us/app/nightguard-sleep-habits/id6754812386"
---

# NightGuard: Sleep & Habits

> **2025 Updates**: Verified 50+ downloads. Focus on Sleep Hygiene.ctive users.

**NightGuard** is a native iOS application engineered to help users reconstruct their sleep hygiene through data-driven habit formation. Unlike passive trackers, it actively intervenes in the pre-sleep routine using a "Guard" mechanism.

## 🛠 Technical Stack

*   **Language**: Swift 5.9
*   **UI Framework**: SwiftUI (100% coverage)
*   **Data Persistence**: Core Data + CloudKit (Sync)
*   **Hardware Integration**: HealthKit (Read/Write Sleep Analysis), Haptics
*   **Architecture**: MVVM-C (Model-View-ViewModel-Coordinator)

## 💡 Key Features & Engineering Challenges

### 1. HealthKit Integration & Privacy
The app communicates directly with the Apple Health data store.
*   **Challenge**: Handling granular sleep stages (REM, Deep, Core) and presenting them effectively.
*   **Solution**: Implemented a custom query pipeline that aggregates `HKCategorySample` data into visualized "Sleep Sessions".
*   **Privacy**: Zero-knowledge architecture. All health computations happen on-device (Edge Computing principle).

### 2. The "Guard" Mode (Focus State)
An immersive mode that prevents phone usage before bed.
*   **Implementation**: Utilizes `DeviceActivity` framework (Screen Time API) to discourage app usage during the "Wind Down" window.
*   **UI/UX**: Extensive use of **SwiftUI Animations** and **MatchedGeometryEffect** to create a fluid, calming transition into sleep mode.

### 3. Data Visualization
*   Custom charts built with **Swift Charts** to correlate "Habit Completion Rate" with "Sleep Quality Score".
*   Provides actionable insights (e.g., "You sleep 20 minutes longer when you read before bed").



## 🚀 Impact
*   **50+ Downloads** on the App Store.
*   **5.0 Star Rating** on the App Store.
*   Selected as a showcase project for the school's CS fair.
