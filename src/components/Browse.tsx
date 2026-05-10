import { useMemo, useState } from "react";
import { allPaths } from "../data/countries/_registry";
import type { Path, PathType } from "../types/path";
import { isEU } from "../data/countries";


const TYPE_LABEL: Record<PathType, string> = {
  descent: "Descent",
  heritage: "Heritage",
  marriage: "Marriage",
  "ancestry-visa": "Ancestry visa",
  restoration: "Restoration",
};

const TYPE_ORDER: PathType[] = [
  "descent",
  "heritage",
  "restoration",
  "ancestry-visa",
  "marriage",
];

export function Browse() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<PathType | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPaths
      .filter((p) => typeFilter === "all" || p.pathType === typeFilter)
      .filter((p) => {
        if (!q) return true;
        return (
          p.country.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) =>
          a.country.localeCompare(b.country) ||
          TYPE_ORDER.indexOf(a.pathType) - TYPE_ORDER.indexOf(b.pathType),
      );
  }, [query, typeFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allPaths.length };
    for (const t of TYPE_ORDER) {
      c[t] = allPaths.filter((p) => p.pathType === t).length;
    }
    return c;
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden mx-auto md:max-w-5xl px-4 md:px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-10 md:py-10">
      <h1 className="font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,4vw,3rem)] mb-3">
        Browse all rules
      </h1>
      <p className="text-ink/70 mb-8 leading-relaxed break-words">
        Every citizenship path the tool evaluates, with requirements, timelines, and{" "}
        <a href="#/sources" className="text-accent hover:underline">sources</a>.{" "}
        <span className="text-ink/80">{allPaths.length}</span> paths across{" "}
        <span className="text-ink/80">{new Set(allPaths.map((p) => p.countryCode)).size}</span>{" "}
        countries.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by country or keyword…"
          className="flex-1 min-w-0 w-full sm:min-w-[16rem] border border-border bg-bg/40 px-3 h-10 text-sm placeholder:text-muted/70 focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6 max-w-full">
        <FilterChip
          active={typeFilter === "all"}
          onClick={() => setTypeFilter("all")}
          label={`All (${counts.all})`}
        />
        {TYPE_ORDER.map((t) => (
          <FilterChip
            key={t}
            active={typeFilter === t}
            onClick={() => setTypeFilter(t)}
            label={`${TYPE_LABEL[t]} (${counts[t] ?? 0})`}
          />
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((p) => (
          <PathRow
            key={p.id}
            path={p}
            open={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted italic text-sm">No paths match that filter.</p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[10px] font-medium px-2.5 sm:px-3 py-2 border transition max-w-full ${
        active
          ? "border-accent text-accent bg-accent/10"
          : "border-border text-muted hover:text-ink hover:border-ink/30"
      }`}
    >
      {label}
    </button>
  );
}

function PathRow({
  path,
  open,
  onToggle,
}: {
  path: Path;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border bg-bg/30 max-w-full overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full min-w-0 flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-bg/60 transition"
      >
        <span className="text-2xl shrink-0">{path.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium min-w-0 break-words">{path.country}</span>
            <span className="font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[10px] px-1.5 py-0.5 border border-border text-muted max-w-full break-words">
              {TYPE_LABEL[path.pathType]}
            </span>
            {isEU(path.countryCode) && (
              <span className="font-mono uppercase tracking-[0.16em] text-[10px] px-1.5 py-0.5 border border-accent/40 text-accent bg-accent/10">
                EU
              </span>
            )}
          </div>
          <p className="text-sm text-ink/80 break-words">{path.name}</p>
        </div>
        <span className="text-muted text-xs shrink-0">{open ? "▾" : "▸"}</span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden min-w-0">
        <div className="px-3 sm:px-4 pb-5 pt-1 border-t border-border space-y-4 text-sm min-w-0">
          <p className="text-ink/85 mt-3 break-words">{path.shortDescription}</p>

          <Block title="Requirements">
            <ul className="list-disc list-outside pl-5 space-y-1 text-ink/80 break-words">
              {path.requirementsSummary.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Block>

          {path.caveats.length > 0 && (
            <Block title="Caveats">
              <ul className="list-disc list-outside pl-5 space-y-1 text-ink/80 break-words">
                {path.caveats.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </Block>
          )}

          <Block title="Sources">
            {path.officialLinks.length === 0 ? (
              <p className="text-muted italic">No sources listed.</p>
            ) : (
              <ul className="space-y-1 min-w-0">
                {path.officialLinks.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline break-all"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Block>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted text-xs break-words">
            <span>
              Timeline: ~{path.estTimelineMonths[0]}–{path.estTimelineMonths[1]} months
            </span>
            <span>
              Est. cost: ${path.estCostUSD[0]}–${path.estCostUSD[1]} USD
            </span>
            <span>Last reviewed: {path.lastReviewed}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-muted text-xs uppercase tracking-wider mb-1">{title}</p>
      {children}
    </div>
  );
}
