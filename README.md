# Heritage → Passport

A static web tool that asks about your family heritage and tells you which countries you might realistically qualify for citizenship in. Covers descent paths in 19+ countries, Israel's Law of Return, Germany's Article 116 / §15 StAG, the Spanish Memoria Democrática route, the UK Ancestry Visa, and marriage fast-tracks.

**Informational only. Not legal advice.** Citizenship law changes frequently and is fact-specific.

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
npm run preview  # serve the production bundle locally
```

No backend, no API keys, no environment variables. The whole rules engine runs client-side. User answers stay in `localStorage`.

---

## Architecture

- **Vite + React 19 + TypeScript + Tailwind v3.** Pure SPA, deploys as static files.
- `src/types/profile.ts` - the user-input shape (self / spouse / 14-slot ancestor tree / heritage flags).
- `src/types/path.ts` - the country-path shape, including the optional `practical` block (success signal, lawyer-needed, language and civics tests).
- `src/engine/evaluate.ts` - runs every registered path against a profile and groups by tier.
- `src/data/countries/*.ts` - one file per country (or shared file for thematically grouped paths). Each file exports one or more `Path` objects.
- `src/data/countries/_registry.ts` - the canonical list of paths shown to the user.

### Adding or updating a country

1. Edit (or create) `src/data/countries/<country>.ts`.
2. Bump the `lastReviewed` ISO date inside that file. The landing-page footer surfaces the most recent date across all paths automatically.
3. Add the source URLs you used to [`SOURCES.md`](SOURCES.md) under that country's section.
4. Run `npm run build` - TypeScript catches schema errors.
5. If you also added a new path, register it in `src/data/countries/_registry.ts`.

---

## Documentation

- [`SOURCES.md`](SOURCES.md) - every URL used to author each country's rules, with an "Update protocol" at the bottom.
- [`RESEARCH.md`](RESEARCH.md) - a structured brief for a research agent to fill in the `practical` (success / lawyer / tests) data per country. Source-citation rules, per-country starter URLs, output format. Hand off to a research worker.

---

## House style

- **No em dashes** anywhere (the U+2014 character produced by autocorrect from `--` or by some LLMs). Use an ASCII hyphen `-` instead. Grepping U+2014 over `src/`, `SOURCES.md`, `RESEARCH.md`, and this file should return zero hits.
- Country rules are typed data. Edit the data file, not the engine.
- When user input is uncertain, downgrade to `'possibly'` with a `needToVerify` line rather than emit a confident `'likely'`.
- Every quantitative claim shipped in a country file should be backed by at least one cited source in `SOURCES.md`.
