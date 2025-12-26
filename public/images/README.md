# AXIVAI Visual Assets

This directory contains the visual assets for the AXIVAI platform.

## Required Images

Please add the following images to this directory:

### 1. Three Lanes Architecture Diagram
**Filename:** `axivai-three-lanes-architecture.png`
**Description:** Diagram showing the three-lane mobile charging architecture (Direct Injection, Mothership, Valet) with power sourcing strategy
**Recommended Size:** 1200x800px (3:2 aspect ratio)
**Format:** PNG or WebP
**Content:**
- Lane 1: Direct Injection (~500kWh Class 6 trucks)
- Lane 2: Mothership (~2MWh Class 8 trailers)
- Lane 3: Valet (~150kWh electric vans)
- Power sourcing: Landfill gas-to-energy, Solar+Storage, Off-peak grid

### 2. Grid Bottleneck vs Logistics-First Comparison
**Filename:** `grid-bottleneck-vs-logistics-first.png`
**Description:** Visual analogy comparing traditional grid-constrained approach vs AXIVAI's mobile charging model
**Recommended Size:** 1200x600px (2:1 aspect ratio)
**Format:** PNG or WebP
**Content:**
- Left side: Traditional "Construction-First" approach with grid constraints
- Right side: AXIVAI "Logistics-First" approach with mobile charging
- Visual metaphor showing the difference in deployment timelines

## Implementation Notes

Images are referenced in:
- `src/app/page.tsx` - Homepage integration
- Future: Social media OG:image tags in layout.tsx

## Optimization

Next.js automatically optimizes images using the `next/image` component:
- Automatic WebP/AVIF conversion
- Responsive sizing
- Lazy loading (except priority images)
- Blur placeholder generation
