# Real Estate Service Website — AURA

## Overview

A professional, trustworthy real estate service website ("AURA") targeting families and individuals looking to buy, sell, or rent properties. Features verified listings, transparent processes, experienced consultants, data-driven advice, and efficient transactions.

## Architecture

**Monorepo** (pnpm workspaces):
- `artifacts/real-estate/` — React + Vite frontend (served at `/`)
- `artifacts/api-server/` — Express 5 backend API (served at `/api`)
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/api-client-react/` — Generated React Query hooks
- `lib/api-zod/` — Generated Zod validation schemas
- `lib/db/` — Drizzle ORM + PostgreSQL schema

## Key Features

- **Homepage**: Hero with property search, featured listings, stats, how-it-works, agent profiles, testimonials
- **Property Listings**: Filter by buy/rent, price range, bedrooms, location, property type
- **Property Detail**: Image gallery, full details, features, book viewing form
- **WhatsApp Quick Consultation**: Floating button on all pages
- **Book a Viewing**: Modal form → `POST /api/inquiries/viewing`
- **Free Property Valuation**: Modal form → `POST /api/inquiries/valuation`
- **Trust Elements**: Verified badges, agent credentials, 5-star ratings, transparent process section

## Database Tables

- `properties` — property listings with all details
- `agents` — real estate consultants
- `testimonials` — client testimonials
- `viewing_requests` — submitted viewing bookings
- `valuation_requests` — submitted valuation requests

## API Routes

- `GET /api/properties` — list properties (with filters: type, price, bedrooms, location, featured)
- `GET /api/properties/:id` — property detail
- `GET /api/agents` — list agents
- `GET /api/testimonials` — list testimonials
- `POST /api/inquiries/viewing` — book a viewing
- `POST /api/inquiries/valuation` — request free valuation

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS v4, shadcn/ui, Framer Motion, React Hook Form, Wouter routing
- **Backend**: Node.js, Express 5, TypeScript, tsx
- **Database**: PostgreSQL via Drizzle ORM
- **Codegen**: Orval (OpenAPI → React Query hooks + Zod schemas)

## Design

Warm, professional, trustworthy aesthetic — rich earth tones, deep navy, gold/amber accents, elegant serif headline fonts, mobile-first responsive design.
