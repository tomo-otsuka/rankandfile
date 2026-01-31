# Rank and File - Design Guidelines

This document serves as a source of truth for the design language of the Rank and File project. All contributions, whether human or AI-generated, must adhere to these principles.

## Core Aesthetic
> **Modern, Premium, Glassmorphic, Delightful, Fun, Entertaining.**

### 1. Glassmorphic & Premium
- **Materials**: Use translucent backgrounds with `backdrop-filter: blur()`.
- **Depth**: Layering is key. Use subtle borders (white with low opacity) to define edges on glass surfaces.
- **Shadows**: Soft, diffused shadows to lift elements off the background.
- **Colors**: Deep, rich background colors (e.g., dark noise, deep gradients) that make the glass effect pop. Avoid flat, solid primary colors for backgrounds.

### 2. Delightful & Alive
- **Motion**: Interfaces should not be static. Use subtle entrance animations, hover states, and smooth transitions.
- **Feedback**: Every interaction should have immediate visual feedback.
- **Micro-interactions**: Small details (like a heart icon pulsing on click) make the app feel crafted.

### 3. Thoughtful Layout
- **Whitespace**: Be generous with padding and margins. Clutter kills "premium".
- **Typography**: Use high-quality sans-serif fonts (e.g., Inter, system-ui). Clear hierarchy with font weights and sizes.
- **Accessibility**: Ensure sufficient contrast, even within the glassmorphic aesthetic.

## Product Principles
> **Democratizing Analysis**: RankAndFile is for everyone, not just "experts".
- **Tone**: Empowering, professional, accurate.
- **Language**: Avoid "Social Credit", "Ball", or "Receipts" (too slangy). Use "Accuracy", "Validation", "Track Record", "Result-Oriented".

## Implementation Notes
- **CSS**: Use CSS variables for colors and spacing to ensure consistency.
- **Tailwind**: If used, leverage `backdrop-blur`, `bg-opacity`, and ring utilities for glass effects.
- **Icons**: Use clean, modern stroke-based icons (e.g., Lucide React, Heroicons).
