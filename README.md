# FreeGO Taiwan Travel Companion

FreeGO Taiwan Travel Companion is a first-version landing page for a Taiwan travel companion brand. It presents FreeGO as more than private transportation: a warm, local, premium travel-planning experience for international visitors, families, seniors, small groups, and business guests.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react icons

## Project Structure

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    AudienceSection.tsx
    Button.tsx
    Footer.tsx
    Header.tsx
    HeroSection.tsx
    HowItWorksSection.tsx
    Logo.tsx
    PainPointSection.tsx
    PlanningCTASection.tsx
    SectionTitle.tsx
    SolutionSection.tsx
    TravelCompanionSection.tsx
```

## Brand Colors

The brand colors are defined as CSS variables in `src/app/globals.css` and extended in `tailwind.config.ts`.

```css
:root {
  --freego-teal: #0F4C4C;
  --freego-orange: #F28C38;
  --freego-ivory: #F8F3EA;
  --freego-ink: #1F2A2A;
  --freego-gray: #D8DDD8;
  --freego-white: #FFFFFF;
}
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Then open:

```txt
http://localhost:3000
```

Build for production:

```bash
pnpm build
```

## Current Scope

This first version includes the full landing page UI, responsive layout, brand styling, navigation, CTA sections, and a form preview UI. It does not include backend submission, login, payment, AI itinerary planning, or a member system.
