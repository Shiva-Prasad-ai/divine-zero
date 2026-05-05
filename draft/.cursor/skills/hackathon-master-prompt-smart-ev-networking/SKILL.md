---

## name: hackathon-master-prompt-smart-ev-networking
description: Provides a full 4-person, 3-4 hour Smart EV Networking hackathon runbook with phased deliverables, acceptance criteria, anti-leakage rules, and reusable prompts. Use when the user asks to kick off, coordinate, or generate artifacts for a Smart EV Networking hackathon.
disable-model-invocation: true

# Smart EV Networking Hackathon Runbook

# HACKATHON MASTER PROMPT: SMART EV NETWORKING PLATFORM

**Topic:** Smart EV Networking (Trip planning + social/private charger sharing)  
**Team Size:** 4 persons  
**Time:** 3-4 hours  
**Stack defaults (confirm first):** React/TypeScript (frontend), Node.js/Express (backend), PostgreSQL, Mapbox/Leaflet, WebSockets (real-time).  
**Anti-leakage tool:** Assume `glaze` or `text-defender` style formatting for logs; use `[REDACTED]` for PII in all copy-paste outputs.

---

## PHASE 1 - Person 1 (Frontend)

**Scope:** UI/UX strategy + production-ready scaffold for EV driver & charger owner flows.

### Deliverables

1. **Tech stack & repo structure**
  - `src/` (components, pages, hooks, services, utils)  
  - `public/`  
  - `tailwind.config.js` (assume Tailwind CSS)  
  - Starter code: `App.tsx`, `Layout.tsx`, `MapView.tsx` (Leaflet wrapper)
2. **Wireframes / mockups** (ASCII or text-based + link to Figma if time)
  - User flows: Login -> Trip Planner -> Charger Discovery -> Booking -> Dashboard
3. **Key components list**
  - `WeatherAwareRange.tsx`, `ChargerCard.tsx`, `BookingModal.tsx`, `OwnerChargerList.tsx`
4. **Accessibility & responsive**
  - WCAG 2.1 AA (color contrast, keyboard nav), mobile-first breakpoints.

### Output format (copy-paste)

REPO_STRUCTURE.md

/frontend

/src/components/MapView.tsx (minimal working)

/src/components/ChargerCard.tsx (with props: id, price, distance, rating)

/src/pages/TripPlanner.tsx (hooks for weather & range)
STYLING: Tailwind classes, dark mode optional

text

### Acceptance criteria

- `npm start` shows a map centered on user location (mock).
- ChargerCard renders mock data.
- Code has JSDoc comments for each component.

### Sources for model outputs

- **Prompt for ChatGPT/Claude:** *"Generate a React/TypeScript component for an EV charger card with Tailwind CSS. Include props: id, pricePerKwh, distanceKm, rating, availabilityStatus. Add a responsive hover effect and a 'Book' button that logs to console."*  
- **Replicate across models:** Use same prompt in Claude, Cursor (with `@frontend` context).  
- **Anti-leak:** Before pasting outputs, run through `text-defender` to mask lat/lng mock values (replace with `[MASKED_COORD]`).  
- **Citation:** Outputs labeled `[GPT-4-turbo, 2025-04-01]`, `[Claude-3-opus, same prompt]`.

---

## PHASE 2 - Person 2 (Backend)

**Scope:** API design, DB schema, dynamic pricing mock, weather integration stubs.

### Deliverables

1. **API spec** (REST + WebSocket for real-time bidding)
  - `POST /api/trips/plan` (origin, dest, carModel, weatherAdjustment)  
  - `GET /api/chargers?lat&lng&radius&priceMax`  
  - `POST /api/bookings` (double-booking prevention)  
  - `POST /api/owner/pricing` (dynamic rule: time/demand)
2. **DB schema** (simplified MVP)
  - `users`, `chargers`, `bookings`, `pricing_rules`, `weather_cache`
3. **2 starter services**
  - `weatherService.ts` (returns range modifier from mock API)  
  - `pricingEngine.ts` (time-demand formula: basePrice * (1 + demandFactor))
4. **Environment variables**
  - `WEATHER_API_KEY` (mock key for hackathon), `JWT_SECRET`, `DATABASE_URL`

### Output format

API_CONTRACT.md

Endpoints + request/response JSON schemas

Example curl: curl -X POST /api/trips/plan -d '{"origin":"lat,lon","dest":"lat,lon"}' -H "Authorization: Bearer ..."
DATA_MODEL_DIAGRAM (text)
Users: id, role(driver|owner), name
Chargers: id, ownerId, lat, lng, pricePerKwh, isDynamic, basePrice
Bookings: id, chargerId, startTime, endTime, status

text

### Acceptance criteria

- Backend runs with in-memory DB (e.g., SQLite or Postgres mock).  
- `GET /api/chargers` returns GeoJSON stub.  
- Auth: JWT middleware scaffold (hardcoded test token).

### Sources for model outputs

- **Prompt for ChatGPT/Claude:** *"Write a Node.js/Express route for /api/trips/plan that accepts origin/dest/carModel. Use a mock weather service that returns 'rangeReductionPercent' based on forecast. Return suggested charging stops as GeoJSON. Include JWT auth stub."*  
- **Replicate:** Same prompt in Cursor (`@backend` ).  
- **Anti-leak:** Strip any real API keys from logs using `grep -v "WEATHER_API_KEY=sk-"`.  
- **Citation:** `[GPT-4, 2025-04-01]`, `[Claude-3, weather mock]`.

---

## PHASE 3 - Person 3 (Integration & GitHub)

**Scope:** Unify frontend + backend into MVP, CI, branching, end-to-end demo.

### Deliverables

1. **GitHub structure**
  - `main` (stable), `develop` (integration), `feature/`*  
  - `.github/workflows/ci.yml` (runs `npm run build` + `npm test` in both frontend/backend)
2. **Integrated README**
  - Steps: clone, `docker-compose up` (or separate terminals), env vars, demo credentials.
3. **Integration scripts**
  - `scripts/e2e-trip-flow.sh` (curl frontend -> backend -> booking)
4. **End-to-end flow**
  - Frontend map click -> fetch chargers -> select -> book -> show confirmation.

### Output format

REPO_ROADMAP.md

Branch strategy: feature/weather-range, feature/dynamic-pricing, feature/booking
CI.yml contents (lint + test + build)
DEMO_SCRIPT.md

Start backend: cd backend && npm run dev

Start frontend: cd frontend && npm start

Open browser, click "Plan Trip", see mock chargers, book one.

text

### Acceptance criteria

- `git clone` + `npm install` in both folders -> app works.  
- CI passes (lint no errors, tests at least 1 passing).  
- End-to-end: frontend can book a charger and backend prevents double booking (stub logic).

### Sources for model outputs

- **Prompt for ChatGPT/Claude:** *"Generate a GitHub Actions CI yaml for a monorepo with React frontend and Express backend. Run eslint, prettier, and a single integration test that POSTs to /api/bookings and expects 201."*  
- **Replicate:** Paste same prompt into Claude, Cursor. Use `git diff` to merge any differences.  
- **Anti-leak:** Remove personal access tokens from CI yaml.  
- **Citation:** `[Cursor + GPT-4, generated CI]`.

---

## PHASE 4 - Person 4 (Bug detection & optimization using AI)

**Scope:** Use LLMs to find defects, generate test cases, fix performance/security.

### Deliverables

1. **Bug triage process**
  - Prompt: *"Review this code block for race conditions, missing error handling, and security flaws (no real API keys)."* (apply to `bookingService.ts`, `pricingEngine.ts`)
2. **Test cases (5-10)**
  - Example: `Booking conflict: two users try same charger same 30-min slot -> second gets 409 Conflict`.  
  - `Weather adjustment: range reduces by 15% in rain -> trip planner adds 1 extra stop`.
3. **Performance & security highlights**
  - Add Redis for rate limiting (stub).  
  - Sanitize user inputs in charger address field.

### Output format

BUG_REPORT.md

CRITICAL: No transaction lock in booking (double booking possible) -> fix: add row-level lock example.

HIGH: Weather API call blocks route calculation -> suggest async caching.

MEDIUM: JWT expires too long -> reduce to 1 hour.
TEST_CASES.md

Input: trip with 200km range, 50km detour, rain forecast -> expected: 2 charging stops.

Input: owner sets dynamic pricing to 1.5x at 6pm -> booking at 6pm shows surge.
PRIORITIZED_FIXES

Add database transaction in booking endpoint (5 mins).

Cache weather responses for 10 mins (10 mins).

text

### Acceptance criteria

- All critical bugs fixed & committed.  
- At least 5 automated tests run in CI (unit + integration).  
- Response time for `/api/chargers` under 200ms (with mock cache).

### Sources for model outputs

- **Prompt for bug detection (ChatGPT/Claude):** *"Act as a security and performance auditor. Find 3 bugs in this Express booking handler: [paste code]. Suggest fixes and write a unit test that catches the double-booking bug."*  
- **Replicate:** Feed same code to `cursor.ai` with `@debug` command.  
- **Anti-leak:** Redact any internal IPs or staging URLs.  
- **Citation:** `[Claude-3-opus, bug detection, 2025-04-01]`.

---

## EVALUATION RUBRIC (check every 1-2 hours)


| Time | Milestone          | Success Signal                                                                |
| ---- | ------------------ | ----------------------------------------------------------------------------- |
| 0:30 | Phase 1 done       | Frontend shows map + mock chargers.                                           |
| 1:15 | Phase 2 done       | `GET /chargers` returns GeoJSON; `POST /trips/plan` returns range adjustment. |
| 2:15 | Phase 3 done       | End-to-end: plan trip -> book charger -> confirmation in UI.                  |
| 3:00 | Phase 4 done       | No critical bugs; CI passes; 5 tests added; performance <200ms.               |
| 3:30 | Final presentation | Live demo (1 min), repo link, architecture diagram (Miro/ASCII).              |


---

## SHARED GLOSSARY OF PROMPTS (reuse across models)

- **Generate React component:** *"Create a [ComponentName] with props: [list]. Use Tailwind CSS, handle loading/error states, and export types."*  
- **Generate Express route:** *"Write a [METHOD] /api/[resource] route that does [action]. Include validation, async error wrapper, and mock data."*  
- **Generate test case:** *"Write a Jest test for [function] that expects [input] to return [output]. Mock external calls."*  
- **Anti-leak instruction prefix:** *"Before outputting, mask any coordinates, emails, or tokens with '[REDACTED]'."*

---

## PROJECT CONCEPT (Embedded into phases)

**Product:** Smart EV Networking Platform  
**Core flows:**  

- Driver: Weather-aware trip planner -> discover private chargers with dynamic pricing -> book -> real-time route updates.  
- Owner: List charger -> set availability & demand-based pricing -> manage bookings.  
**8 key features (to implement as stubs):**

1. Weather-aware range prediction (mock OpenWeatherMap)
2. Dynamic pricing (time+demand multiplier)
3. Geo-located charger discovery (Leaflet + mock GeoJSON)
4. Double-booking prevention (DB unique constraint on time slot)
5. Real-time routing update (WebSocket push when weather changes)
6. Battery SOC monitoring (mock: user inputs SOC %)
7. Owner verification stub (simple email check)
8. Booking notifications (console log or mock toast)

**Non-functional stubs:** Rate limiting (express-rate-limit), payment placeholder (StubPay), scalability (Redis wishlist).  
**MVP Plan (Phase 1 within hackathon):** Core routing + charger discovery + basic booking + double-booking prevention.  

**Assumptions:** No real payments, no live weather API (mock JSON), all users pre-verified for demo.

---

## FINAL INSTRUCTIONS FOR TEAM

- Copy this entire prompt into your shared doc.  
- Each person works in parallel, but Phase 3 merges at T+2h.  
- Use the **same prompts** across ChatGPT, Claude, and Cursor; diff outputs manually.  
- Log every model output with source `[Model, date, purpose]`.  
- Anti-leak: run all copy-paste code through a simple regex that hides lat/lng, emails, tokens.  
- At T+3h: merge to `main`, run `npm run demo`, present.

**Start.**