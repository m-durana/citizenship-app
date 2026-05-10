import { useState } from "react";
import type { UserProfile } from "../types/profile";
import {
  GRANDPARENT_KEYS,
  GREAT_GRANDPARENT_KEYS,
  PARENT_KEYS,
} from "../types/profile";
import { AncestorCard } from "./AncestorCard";
import { CountrySelect } from "./CountrySelect";

type Props = {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  onSubmit: () => void;
};

const STEPS = [
  "About you",
  "Parents",
  "Grandparents",
  "Great-grandparents",
  "Heritage",
  "Spouse",
] as const;

export function Wizard({ profile, setProfile, onSubmit }: Props) {
  const [step, setStep] = useState(0);
  const last = STEPS.length - 1;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <div className="flex gap-1 mb-8">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-accent" : "bg-border"
            }`}
            title={label}
          />
        ))}
      </div>

      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-muted mb-3">
        Step {step + 1} of {STEPS.length}
      </p>
      <h2 className="font-extrabold leading-[1.1] tracking-[-0.025em] text-[clamp(1.75rem,3vw,2.25rem)] mb-3">
        {STEPS[step]}
      </h2>
      <p className="text-ink/70 mb-8 leading-relaxed">
        Leave anything unknown blank - the wizard is conservative, so a missing field is treated as "unknown" rather than "no", and you'll still see any path that could plausibly apply if that gap resolves in your favor. You can come back and refine your answers at any time.
      </p>

      <div className="space-y-4">
        {step === 0 && <AboutYouStep profile={profile} setProfile={setProfile} />}
        {step === 1 && (
          <AncestorGrid
            profile={profile}
            setProfile={setProfile}
            keys={[...PARENT_KEYS]}
          />
        )}
        {step === 2 && (
          <AncestorGrid
            profile={profile}
            setProfile={setProfile}
            keys={[...GRANDPARENT_KEYS]}
          />
        )}
        {step === 3 && (
          <AncestorGrid
            profile={profile}
            setProfile={setProfile}
            keys={[...GREAT_GRANDPARENT_KEYS]}
          />
        )}
        {step === 4 && (
          <HeritageStep profile={profile} setProfile={setProfile} />
        )}
        {step === 5 && <SpouseStep profile={profile} setProfile={setProfile} />}
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
        <button
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-border text-ink px-5 py-3 transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
        >
          ← Previous
        </button>
        {step < last ? (
          <button
            onClick={() => setStep((s) => Math.min(last, s + 1))}
            className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-accent bg-accent text-white px-6 py-3 transition hover:bg-transparent hover:text-accent"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-likely bg-likely text-bg px-6 py-3 transition hover:bg-transparent hover:text-likely"
          >
            See my matches →
          </button>
        )}
      </div>
    </div>
  );
}

function AboutYouStep({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}) {
  const self = profile.self;
  return (
    <>
      <label className="block">
        <span className="text-muted text-sm">
          Your current citizenship(s) - add all that apply
        </span>
        <CountrySelect
          mode="multi"
          value={self.currentCitizenships}
          onChange={(codes) =>
            setProfile({
              ...profile,
              self: { ...self, currentCitizenships: codes },
            })
          }
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-muted text-sm">Your birth year</span>
        <input
          type="number"
          min={1900}
          max={2030}
          value={self.birthYear ?? ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              self: {
                ...self,
                birthYear: e.target.value ? Number(e.target.value) : undefined,
              },
            })
          }
          className="mt-1 w-full bg-panel border border-border px-3 h-10"
          placeholder="e.g. 1995"
        />
      </label>

      <label className="flex items-start gap-3 mt-2">
        <input
          type="checkbox"
          checked={self.willingToRelocate}
          onChange={(e) =>
            setProfile({
              ...profile,
              self: { ...self, willingToRelocate: e.target.checked },
            })
          }
          className="mt-1"
        />
        <span className="text-sm">
          I'm willing to relocate to the country (some routes, e.g. Israel's
          Law of Return, traditionally expect this).
        </span>
      </label>
    </>
  );
}

function AncestorGrid({
  profile,
  setProfile,
  keys,
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  keys: import("../types/profile").AncestorKey[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {keys.map((k) => (
        <AncestorCard
          key={k}
          profile={profile}
          setProfile={setProfile}
          keyName={k}
        />
      ))}
    </div>
  );
}

function HeritageStep({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}) {
  const h = profile.heritage;
  const setH = (patch: Partial<typeof h>) =>
    setProfile({ ...profile, heritage: { ...h, ...patch } });

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-muted text-sm">
          Are you Jewish (relevant for Israel's Law of Return)?
        </span>
        <select
          value={h.jewish ?? ""}
          onChange={(e) =>
            setH({ jewish: (e.target.value || undefined) as typeof h.jewish })
          }
          className="mt-1 w-full bg-panel border border-border px-3 h-10"
        >
          <option value="">- Prefer not to say -</option>
          <option value="none">No</option>
          <option value="maternal">Yes - maternal line</option>
          <option value="paternal">Yes - paternal line</option>
          <option value="both">Yes - both lines</option>
          <option value="convert">Yes - by conversion</option>
        </select>
      </label>

      <Toggle
        label="At least one ancestor was deprived of German citizenship by the Nazi regime (1933–1945) on political/racial/religious grounds."
        checked={h.naziPersecutionDescendant === true}
        onChange={(v) => setH({ naziPersecutionDescendant: v })}
      />
      <Toggle
        label="At least one ancestor was a Spanish citizen exiled during the Spanish Civil War / Franco era."
        checked={h.spanishCivilWarExileDescendant === true}
        onChange={(v) => setH({ spanishCivilWarExileDescendant: v })}
      />
      <Toggle
        label="I have Sephardic Jewish ancestry."
        checked={h.sephardicAncestry === true}
        onChange={(v) => setH({ sephardicAncestry: v })}
      />
      <Toggle
        label="I am of Armenian descent."
        checked={h.armenianGenocideDescendant === true}
        onChange={(v) => setH({ armenianGenocideDescendant: v })}
      />
      <Toggle
        label="I'm a member of the African diaspora and could document maternal/paternal lineage to West Africa via DNA (relevant for Sierra Leone's heritage route)."
        checked={h.africanDiasporaDescendant === true}
        onChange={(v) => setH({ africanDiasporaDescendant: v })}
      />
    </div>
  );
}

function SpouseStep({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}) {
  const s = profile.spouse;
  return (
    <>
      <label className="block">
        <span className="text-muted text-sm">
          Are you married to a citizen of another country? (optional - many
          countries have marriage fast-tracks)
        </span>
        <CountrySelect
          mode="multi"
          value={s?.citizenships ?? []}
          placeholder="- Not married to a foreign citizen -"
          onChange={(codes) =>
            setProfile({
              ...profile,
              spouse:
                codes.length > 0
                  ? { citizenships: codes, marriedYear: s?.marriedYear }
                  : undefined,
            })
          }
          className="mt-1"
        />
      </label>

      {s && (
        <label className="block">
          <span className="text-muted text-sm">Year of marriage</span>
          <input
            type="number"
            min={1950}
            max={2030}
            value={s.marriedYear ?? ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                spouse: {
                  ...s,
                  marriedYear: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                },
              })
            }
            className="mt-1 w-full bg-panel border border-border px-3 h-10"
          />
        </label>
      )}
    </>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}
