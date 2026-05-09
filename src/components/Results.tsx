import { useMemo, useState } from "react";
import { evaluateProfile, groupByTier } from "../engine/evaluate";
import { LAST_UPDATED } from "../engine/lastUpdated";
import type { EvaluatedPath, Tier } from "../types/path";
import { TIER_LABEL } from "../types/path";
import type { UserProfile } from "../types/profile";
import { isEU } from "../data/countries";

type Props = {
  profile: UserProfile;
  onBack: () => void;
  onRestart: () => void;
  onSources: () => void;
};

const TIER_COLOR: Record<Tier, string> = {
  likely: "border-likely/50 bg-likely/5",
  possibly: "border-possibly/50 bg-possibly/5",
  unlikely: "border-unlikely/30 bg-unlikely/5",
};

const TIER_DOT: Record<Tier, string> = {
  likely: "bg-likely",
  possibly: "bg-possibly",
  unlikely: "bg-unlikely",
};

export function Results({ profile, onBack, onRestart, onSources }: Props) {
  const evaluated = useMemo(() => evaluateProfile(profile), [profile]);
  const grouped = useMemo(() => groupByTier(evaluated), [evaluated]);

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <button
        onClick={onBack}
        className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted hover:text-ink mb-8 transition"
      >
        ← Edit my answers
      </button>

      <h1 className="font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,4vw,3rem)] mb-3">
        Your matches
      </h1>
      <p className="text-ink/70 max-w-[40rem] mb-12 leading-relaxed">
        Based on your answers, here are paths to a second citizenship that look
        worth pursuing, and which probably aren't.
      </p>

      <TierSection
        title={TIER_LABEL.likely}
        tier="likely"
        paths={grouped.likely}
        emptyHint="No clear-cut matches yet - try filling in more ancestor details."
      />
      <TierSection
        title={TIER_LABEL.possibly}
        tier="possibly"
        paths={grouped.possibly}
        emptyHint=""
      />
      <TierSection
        title={TIER_LABEL.unlikely}
        tier="unlikely"
        paths={grouped.unlikely}
        emptyHint=""
        collapsedByDefault
      />

      <div className="mt-12 border-t border-border pt-6 text-sm text-muted leading-relaxed">
        <p className="mb-2">
          <strong className="text-ink">Disclaimer.</strong> This tool is
          informational only and is not legal advice. Citizenship law changes
          frequently and depends on individual facts. Always verify with the
          relevant consulate or a qualified immigration attorney before
          starting an application.
        </p>
        <p className="text-xs mt-3">
          Country rules last updated <strong className="text-ink/80">{LAST_UPDATED}</strong>. Every claim cites an official-government or practitioner source - see the{" "}
          <button
            onClick={onSources}
            className="text-accent hover:underline align-baseline"
          >
            sources page
          </button>
          .
        </p>
        <button
          onClick={onRestart}
          className="text-accent hover:underline mt-3"
        >
          Start over with a fresh profile
        </button>
      </div>
    </div>
  );
}

function TierSection({
  title,
  tier,
  paths,
  emptyHint,
  collapsedByDefault,
}: {
  title: string;
  tier: Tier;
  paths: EvaluatedPath[];
  emptyHint: string;
  collapsedByDefault?: boolean;
}) {
  const [open, setOpen] = useState(!collapsedByDefault);

  if (paths.length === 0 && !emptyHint) return null;

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 mb-3 group"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${TIER_DOT[tier]}`} />
        <h2 className="text-lg font-medium group-hover:text-accent">{title}</h2>
        <span className="text-muted text-sm">({paths.length})</span>
        <span className="text-muted text-xs">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <div className="space-y-3">
          {paths.length === 0 ? (
            <p className="text-muted text-sm italic">{emptyHint}</p>
          ) : (
            paths.map((p) => <PathCard key={p.id} path={p} tier={tier} />)
          )}
        </div>
      )}
    </section>
  );
}

function PathCard({ path, tier }: { path: EvaluatedPath; tier: Tier }) {
  const [expanded, setExpanded] = useState(tier === "likely");
  return (
    <div className={`border p-5 ${TIER_COLOR[tier]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-2xl">{path.flag}</span>
            <h3 className="font-semibold">{path.country}</h3>
            <span className="font-mono uppercase tracking-[0.16em] text-[10px] px-1.5 py-0.5 border border-border text-muted">
              {path.pathType}
            </span>
            {isEU(path.countryCode) && (
              <span
                className="font-mono uppercase tracking-[0.16em] text-[10px] px-1.5 py-0.5 border border-accent/40 text-accent bg-accent/10"
                title="EU member state - grants freedom of movement, work, and residence across all 27 EU countries."
              >
                EU
              </span>
            )}
          </div>
          <p className="text-sm text-ink/90">{path.name}</p>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-muted text-xs hover:text-ink"
        >
          {expanded ? "Hide details" : "Details"}
        </button>
      </div>

      {(tier === "likely" || tier === "possibly") && path.match.reasons.length > 0 ? (
        <div className="mt-3 text-sm">
          <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted mb-1">
            Why this matched your answers
          </p>
          <ul className="space-y-1">
            {path.match.reasons.map((r, i) => (
              <li key={i} className="text-ink/90">
                • {r}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-3 space-y-1 text-sm">
          {path.match.reasons.map((r, i) => (
            <p key={i} className="text-ink/85">
              • {r}
            </p>
          ))}
        </div>
      )}

      {path.match.needToVerify && path.match.needToVerify.length > 0 && (
        <div className="mt-3 text-sm">
          <p className="text-possibly font-medium">Need to verify:</p>
          <ul className="list-disc list-inside text-ink/80 space-y-0.5">
            {path.match.needToVerify.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </div>
      )}

      {expanded && (
        <div className="mt-5 pt-4 border-t border-border space-y-4 text-sm">
          <p className="text-ink/85">{path.shortDescription}</p>

          <Block title="Requirements">
            <ul className="list-disc list-inside space-y-1 text-ink/80">
              {path.requirementsSummary.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Block>

          <Block title="Documents you'll typically need">
            <ul className="list-disc list-inside space-y-1 text-ink/80">
              {path.documentsOutline.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Block>

          {path.caveats.length > 0 && (
            <Block title="Caveats">
              <ul className="list-disc list-inside space-y-1 text-ink/80">
                {path.caveats.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </Block>
          )}

          {path.practical && (
            <Block title="In practice">
              <ul className="list-disc list-inside space-y-1 text-ink/80">
                <li>
                  Reported success among the eligible:{" "}
                  <span className="text-ink">
                    {path.practical.successSignal}
                  </span>
                  {path.practical.successNote ? ` (${path.practical.successNote})` : ""}.
                  {path.practical.singleSource === "government" && (
                    <Tooltip text="This success rate rests on a single official government source - typically a published statistics bulletin from the relevant ministry. Treat it as authoritative but not independently corroborated.">
                      <span
                        className="ml-1 text-emerald-500 cursor-help"
                        aria-label="Single-source claim from an official government source"
                      >
                        ⚠
                      </span>
                    </Tooltip>
                  )}
                  {path.practical.singleSource === "secondary" && (
                    <Tooltip text="This success rate rests on a single non-government source (practitioner blog, news article, or industry report). It's a useful signal but not officially corroborated.">
                      <span
                        className="ml-1 text-amber-500 cursor-help"
                        aria-label="Single-source claim - verify before relying on it"
                      >
                        ⚠
                      </span>
                    </Tooltip>
                  )}
                </li>
                <li>
                  Immigration lawyer typically needed:{" "}
                  <span className="text-ink">
                    {path.practical.lawyerTypicallyNeeded}
                  </span>
                  .
                </li>
                {path.practical.languageTest && (
                  <li>
                    Language test:{" "}
                    <span className="text-ink">
                      {path.practical.languageTest.required ? "yes" : "no"}
                    </span>
                    {path.practical.languageTest.level
                      ? ` (${path.practical.languageTest.level})`
                      : ""}
                    {path.practical.languageTest.note
                      ? `. ${path.practical.languageTest.note}`
                      : ""}
                  </li>
                )}
                {path.practical.knowledgeTest && (
                  <li>
                    Civics / knowledge test:{" "}
                    <span className="text-ink">
                      {path.practical.knowledgeTest.required ? "yes" : "no"}
                    </span>
                    {path.practical.knowledgeTest.note
                      ? `. ${path.practical.knowledgeTest.note}`
                      : ""}
                  </li>
                )}
              </ul>
            </Block>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted text-xs">
            <span>
              Timeline: ~{path.estTimelineMonths[0]}–{path.estTimelineMonths[1]}{" "}
              months
            </span>
            <span>
              Est. cost: ${path.estCostUSD[0]}–${path.estCostUSD[1]} USD
            </span>
            <span>Last reviewed: {path.lastReviewed}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {path.officialLinks.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-muted text-xs uppercase tracking-wider mb-1">{title}</p>
      {children}
    </div>
  );
}

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="relative inline-block group align-baseline">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block group-focus-within:block z-20 w-64 border border-border bg-panel px-3 py-2 text-xs text-ink/90 shadow-xl leading-snug whitespace-normal text-left normal-case tracking-normal font-sans"
      >
        {text}
      </span>
    </span>
  );
}
