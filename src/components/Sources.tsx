import { useMemo } from "react";
import { allPaths } from "../data/countries/_registry";
import type { Path, PathType } from "../types/path";

const TYPE_LABEL: Record<PathType, string> = {
  descent: "Descent",
  heritage: "Heritage",
  marriage: "Marriage",
  "ancestry-visa": "Ancestry visa",
  restoration: "Restoration",
};

type CountryGroup = {
  countryCode: string;
  country: string;
  flag: string;
  paths: Path[];
};

export function Sources() {
  const groups = useMemo<CountryGroup[]>(() => {
    const byCode = new Map<string, CountryGroup>();
    for (const p of allPaths) {
      let g = byCode.get(p.countryCode);
      if (!g) {
        g = {
          countryCode: p.countryCode,
          country: p.country,
          flag: p.flag,
          paths: [],
        };
        byCode.set(p.countryCode, g);
      }
      g.paths.push(p);
    }
    return [...byCode.values()].sort((a, b) =>
      a.country.localeCompare(b.country),
    );
  }, []);

  const totalLinks = useMemo(
    () =>
      new Set(
        allPaths.flatMap((p) => p.officialLinks.map((l) => l.url)),
      ).size,
    [],
  );

  return (
    <div className="w-full max-w-full overflow-x-hidden mx-auto md:max-w-5xl px-4 md:px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-10 md:py-10">
      <h1 className="font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,4vw,3rem)] mb-3">
        Sources
      </h1>
      <p className="text-ink/70 mb-4 leading-relaxed break-words">
        Every claim in this tool cites an official-government or practitioner
        source. Listed below are the {totalLinks} sources backing{" "}
        {allPaths.length} citizenship paths across {groups.length} countries.
      </p>
      <p className="text-muted text-sm mb-10 leading-relaxed break-words">
        Citizenship law changes frequently and varies by individual
        circumstance. Nothing here is legal advice - always verify with the
        relevant consulate or a qualified immigration lawyer before acting.
      </p>

      <div className="space-y-8">
        {groups.map((g) => (
          <CountryBlock key={g.countryCode} group={g} />
        ))}
      </div>
    </div>
  );
}

function CountryBlock({ group }: { group: CountryGroup }) {
  return (
    <section className="max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-4 flex items-center gap-3">
        <span>{group.flag}</span>
        <span className="min-w-0 break-words">{group.country}</span>
      </h2>

      <div className="space-y-5">
        {group.paths.map((p) => (
          <div key={p.id} className="min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap mb-2 min-w-0">
              <h3 className="font-medium text-ink/90 min-w-0 break-words">{p.name}</h3>
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] text-muted border border-border px-1.5 py-0.5 max-w-full break-words">
                {TYPE_LABEL[p.pathType]}
              </span>
              <span className="text-muted text-xs sm:ml-auto break-words">
                Last reviewed: {p.lastReviewed}
              </span>
            </div>
            {p.officialLinks.length === 0 ? (
              <p className="text-muted italic text-sm">No sources listed.</p>
            ) : (
              <ul className="list-disc list-outside pl-5 space-y-1 text-sm min-w-0 break-words">
                {p.officialLinks.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline break-all"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
