import type {
  Ancestor,
  AncestorKey,
  HistoricalState,
  UserProfile,
} from "../types/profile";
import { ANCESTOR_LABELS } from "../types/profile";
import { COUNTRY_BY_CODE } from "../data/countries";
import { CountrySelect } from "./CountrySelect";

type Props = {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  keyName: AncestorKey;
};

// Plain-English unrolling of the ancestor key for the hover tooltip, e.g.
// "fatherFatherMother" -> "Your father's father's mother".
function lineageTooltip(key: AncestorKey): string {
  const parts: string[] = [];
  let rest = (key as string).toLowerCase();
  while (rest.length > 0) {
    if (rest.startsWith("father")) {
      parts.push("father");
      rest = rest.slice("father".length);
    } else if (rest.startsWith("mother")) {
      parts.push("mother");
      rest = rest.slice("mother".length);
    } else {
      break;
    }
  }
  return `Your ${parts.join("'s ")}`;
}

// "their child" in the naturalization question refers to the next generation
// down in the user's direct line - for a grandparent that's the user's parent,
// for a great-grandparent that's the user's grandparent, etc.
function nextInLineLabel(key: AncestorKey): string {
  switch (key) {
    case "father":
    case "mother":
      return "you";
    case "fatherFather":
    case "fatherMother":
      return "your father";
    case "motherFather":
    case "motherMother":
      return "your mother";
    case "fatherFatherFather":
    case "fatherFatherMother":
      return "your paternal grandfather";
    case "fatherMotherFather":
    case "fatherMotherMother":
      return "your paternal grandmother";
    case "motherFatherFather":
    case "motherFatherMother":
      return "your maternal grandfather";
    case "motherMotherFather":
    case "motherMotherMother":
      return "your maternal grandmother";
  }
}

export function AncestorCard({ profile, setProfile, keyName }: Props) {
  const a: Ancestor = profile.ancestors[keyName] ?? {};

  const update = (patch: Partial<Ancestor>) => {
    setProfile({
      ...profile,
      ancestors: {
        ...profile.ancestors,
        [keyName]: { ...a, ...patch },
      },
    });
  };

  return (
    <div className="border border-border bg-panel p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-1.5">
          {ANCESTOR_LABELS[keyName]}
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border text-muted text-[10px] cursor-help select-none"
            title={lineageTooltip(keyName)}
            aria-label={lineageTooltip(keyName)}
          >
            ?
          </span>
        </h3>
        {a.birthCountry && (
          <span className="text-xs text-muted">
            {COUNTRY_BY_CODE[a.birthCountry]?.flag}{" "}
            {a.birthCountry}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-muted">Country of birth</span>
          <CountrySelect
            mode="single"
            value={a.birthCountry ?? ""}
            placeholder="- Unknown -"
            onChange={(code) => update({ birthCountry: code || undefined })}
            className="mt-1"
          />
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="text-muted">
            Citizenships they held (only fill in if different from country of birth — e.g. naturalized elsewhere, or inherited a citizenship by descent)
          </span>
          <CountrySelect
            mode="multi"
            value={a.citizenshipsHeld ?? []}
            placeholder="- Same as country of birth -"
            onChange={(codes) =>
              update({ citizenshipsHeld: codes.length ? codes : undefined })
            }
            className="mt-1"
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted">Approx. birth year</span>
          <input
            type="number"
            min={1800}
            max={2030}
            value={a.birthYear ?? ""}
            onChange={(e) =>
              update({
                birthYear: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="mt-1 w-full bg-bg border border-border px-3 h-10 text-sm"
            placeholder="e.g. 1925"
          />
        </label>
      </div>

      {a.birthCountry && (
        <label className="block text-sm">
          <span className="text-muted">
            If this ancestor was born in a defunct state (USSR, Yugoslavia, Czechoslovakia, Austria-Hungary, Ottoman Empire, etc.) before today's borders existed, select it. The modern country above is still used as the primary location.
          </span>
          <select
            value={a.birthPlace?.historicalState ?? ""}
            onChange={(e) => {
              const v = e.target.value as HistoricalState | "";
              update({
                birthPlace: v
                  ? { ...a.birthPlace, historicalState: v }
                  : a.birthPlace?.cityOrRegion || a.birthPlace?.modernState
                    ? { ...a.birthPlace, historicalState: undefined }
                    : undefined,
              });
            }}
            className="mt-1 w-full bg-bg border border-border px-3 h-10 text-sm"
          >
            <option value="">- Not applicable -</option>
            <option value="USSR">USSR (Soviet Union)</option>
            <option value="Yugoslavia">Yugoslavia</option>
            <option value="Czechoslovakia">Czechoslovakia</option>
            <option value="AustriaHungary">Austria-Hungary</option>
            <option value="OttomanEmpire">Ottoman Empire</option>
            <option value="MandatePalestine">Mandate Palestine</option>
            <option value="BritishMandate">British Mandate (other)</option>
            <option value="PrussianEmpire">Prussian Empire</option>
            <option value="GermanEmpire">German Empire (pre-1918)</option>
            <option value="Other">Other defunct state</option>
          </select>
        </label>
      )}

      {a.birthCountry && a.citizenshipsHeld?.some((c) => c !== a.birthCountry) && (
        <label className="block text-sm">
          <span className="text-muted">
            Did they later take up a different country's citizenship (give up or add to their original one)? If so, was that before or after {nextInLineLabel(keyName)} {keyName === "father" || keyName === "mother" ? "were" : "was"} born?
          </span>
          <select
            value={a.naturalizedElsewhere?.yearRelativeToChildBirth ?? ""}
            onChange={(e) =>
              update({
                naturalizedElsewhere: e.target.value
                  ? {
                      ...a.naturalizedElsewhere,
                      yearRelativeToChildBirth: e.target.value as
                        | "before"
                        | "after",
                    }
                  : undefined,
              })
            }
            className="mt-1 w-full bg-bg border border-border px-3 h-10 text-sm"
          >
            <option value="">- Don't know / never naturalized elsewhere -</option>
            <option value="before">Yes - became a citizen of another country BEFORE {nextInLineLabel(keyName)} {keyName === "father" || keyName === "mother" ? "were" : "was"} born</option>
            <option value="after">Yes - but only AFTER {nextInLineLabel(keyName)} {keyName === "father" || keyName === "mother" ? "were" : "was"} born</option>
          </select>
        </label>
      )}
    </div>
  );
}
