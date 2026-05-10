# Passport

A static web tool that asks about your family heritage and tells you which countries you might realistically qualify for citizenship in.

**Informational only. Not legal advice.**

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
```

No backend, no API keys. Everything runs client-side; answers stay in `localStorage`.

## Adding or updating a country

1. Edit (or create) `src/data/countries/<country>.ts`. Each file exports one or more `Path` objects.
2. Bump `lastReviewed` to today's date.
3. Add the source URLs you used to `SOURCES.md`.
4. If it's a new path, register it in `src/data/countries/_registry.ts`.
5. Run `npm run build` to type-check.

The shape of a `Path` lives in `src/types/path.ts`. The engine (`src/engine/evaluate.ts`) just runs every registered path against the user profile and groups by tier.
