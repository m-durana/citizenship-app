import type { Ancestor, AncestorKey, UserProfile } from "../types/profile";
import { ANCESTOR_LABELS } from "../types/profile";
import { COUNTRY_BY_CODE } from "../data/countries";
import { CountrySelect } from "./CountrySelect";

type Props = {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  keyName: AncestorKey;
};

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
        <h3 className="font-medium">{ANCESTOR_LABELS[keyName]}</h3>
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
            Did they naturalize in another country before {nextInLineLabel(keyName)} {keyName === "father" || keyName === "mother" ? "were" : "was"} born?
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
            <option value="">- Don't know / not applicable -</option>
            <option value="before">Yes, before {nextInLineLabel(keyName)} {keyName === "father" || keyName === "mother" ? "were" : "was"} born</option>
            <option value="after">Yes, but only after {nextInLineLabel(keyName)} {keyName === "father" || keyName === "mother" ? "were" : "was"} born</option>
          </select>
        </label>
      )}
    </div>
  );
}
