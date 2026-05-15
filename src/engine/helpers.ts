import type {
  Ancestor,
  AncestorKey,
  AncestorTree,
  Tribool,
  UserProfile,
} from "../types/profile";
import {
  GRANDPARENT_KEYS,
  GREAT_GRANDPARENT_KEYS,
  PARENT_KEYS,
} from "../types/profile";

export type AncestorWithKey = { key: AncestorKey; ancestor: Ancestor };

// An ancestor "links to" a country if they were born there OR are known to
// hold its citizenship. Most descent regimes are about citizenship transmission
// rather than birthplace per se, so we treat the two as equivalent triggers.
// Country evaluators can still inspect `birthCountry` directly when birth (not
// citizenship) is what the law actually requires.
export function ancestorLinkedTo(a: Ancestor, countryCode: string): boolean {
  if (a.birthCountry === countryCode) return true;
  if (a.citizenshipsHeld?.includes(countryCode)) return true;
  if (a.birthPlace?.modernState === countryCode) return true;
  return false;
}

// Maps a defunct/historical state to its modern successor countries. An
// ancestor who selected `historicalState: "USSR"` plausibly belongs to any of
// these regimes' restoration paths; the relevant country evaluator decides
// whether the specific person/dates qualify. This is intentionally inclusive
// (lots of false positives are fine — the evaluator surfaces a needToVerify).
const SUCCESSOR_STATES: Record<string, string[]> = {
  USSR: ["RU", "UA", "BY", "LT", "LV", "EE", "MD", "AM", "AZ", "GE", "KZ", "KG", "TJ", "TM", "UZ"],
  Yugoslavia: ["RS", "HR", "SI", "BA", "ME", "MK", "XK"],
  Czechoslovakia: ["CZ", "SK"],
  AustriaHungary: ["AT", "HU", "CZ", "SK", "PL", "UA", "HR", "SI", "RS", "BA", "RO", "IT"],
  OttomanEmpire: ["TR", "GR", "BG", "RS", "MK", "AL", "BA", "CY", "EG", "IQ", "JO", "LB", "PS", "SA", "SY", "YE"],
  MandatePalestine: ["IL", "PS", "JO"],
  BritishMandate: ["IL", "PS", "JO", "IQ"],
  PrussianEmpire: ["DE", "PL"],
  GermanEmpire: ["DE", "PL", "FR"],
  Other: [],
};

// True when the ancestor's birthplace plausibly maps to the given modern
// country code via historicalState. Used by evaluators (Poland, Lithuania,
// Israel, etc.) that need to honour ancestors marked "born in USSR/Yugoslavia/
// Austria-Hungary" without requiring the user to guess the modern country.
export function birthPlaceMapsTo(a: Ancestor, countryCode: string): boolean {
  const hs = a.birthPlace?.historicalState;
  if (!hs) return false;
  return SUCCESSOR_STATES[hs]?.includes(countryCode) ?? false;
}

// Looser variant of ancestorLinkedTo that also accepts a historicalState ->
// modern country mapping. Country evaluators for successor states should use
// this when "born in USSR/Yugoslavia/etc." should plausibly trigger their path.
export function ancestorLinkedToOrFromSuccessor(
  a: Ancestor,
  countryCode: string,
): boolean {
  if (ancestorLinkedTo(a, countryCode)) return true;
  return birthPlaceMapsTo(a, countryCode);
}

export function ancestorsBornIn(
  profile: UserProfile,
  countryCode: string,
): AncestorWithKey[] {
  const out: AncestorWithKey[] = [];
  for (const [key, ancestor] of Object.entries(profile.ancestors) as [
    AncestorKey,
    Ancestor,
  ][]) {
    if (ancestor && ancestorLinkedTo(ancestor, countryCode)) {
      out.push({ key, ancestor });
    }
  }
  return out;
}

export function getAncestor(
  tree: AncestorTree,
  key: AncestorKey,
): Ancestor | undefined {
  return tree[key];
}

export function parentsBornIn(
  profile: UserProfile,
  countryCode: string,
): AncestorWithKey[] {
  return PARENT_KEYS.map((k) => ({
    key: k,
    ancestor: profile.ancestors[k],
  }))
    .filter((x): x is AncestorWithKey => !!x.ancestor)
    .filter((x) => ancestorLinkedToOrFromSuccessor(x.ancestor, countryCode));
}

export function grandparentsBornIn(
  profile: UserProfile,
  countryCode: string,
): AncestorWithKey[] {
  return GRANDPARENT_KEYS.map((k) => ({
    key: k,
    ancestor: profile.ancestors[k],
  }))
    .filter((x): x is AncestorWithKey => !!x.ancestor)
    .filter((x) => ancestorLinkedToOrFromSuccessor(x.ancestor, countryCode));
}

export function greatGrandparentsBornIn(
  profile: UserProfile,
  countryCode: string,
): AncestorWithKey[] {
  return GREAT_GRANDPARENT_KEYS.map((k) => ({
    key: k,
    ancestor: profile.ancestors[k],
  }))
    .filter((x): x is AncestorWithKey => !!x.ancestor)
    .filter((x) => ancestorLinkedToOrFromSuccessor(x.ancestor, countryCode));
}

export function isTrue(t: Tribool | undefined): boolean {
  return t === true;
}

export function isFalse(t: Tribool | undefined): boolean {
  return t === false;
}

export function isUnknown(t: Tribool | undefined): boolean {
  return t === undefined || t === "unknown";
}

export function naturalizedBeforeChild(a: Ancestor): boolean {
  return a.naturalizedElsewhere?.yearRelativeToChildBirth === "before";
}

export function naturalizedAfterChild(a: Ancestor): boolean {
  return a.naturalizedElsewhere?.yearRelativeToChildBirth === "after";
}

export function naturalizationUnknown(a: Ancestor): boolean {
  if (!a.naturalizedElsewhere) return true;
  const r = a.naturalizedElsewhere.yearRelativeToChildBirth;
  return !r || r === "unknown";
}

// Maternal-line keys: any ancestor whose chain to the user crosses at least
// one female link. Used by evaluators that need to flag pre-cutoff maternal
// transmission (Italy pre-1948, France pre-1973, Switzerland/Belgium pre-1985,
// Portugal pre-1981, the Nordics with their varying dates).
export const MATERNAL_LINE_KEYS: AncestorKey[] = [
  "mother",
  "fatherMother",
  "motherFather",
  "motherMother",
  "fatherFatherMother",
  "fatherMotherFather",
  "fatherMotherMother",
  "motherFatherFather",
  "motherFatherMother",
  "motherMotherFather",
  "motherMotherMother",
];

export function isMaternalLineKey(key: AncestorKey): boolean {
  return MATERNAL_LINE_KEYS.includes(key);
}

// Returns ancestors linked to the given country whose lineage to the user
// involves a maternal link AND who were born before the given cutoff year.
// Country evaluators use this to detect cases that may need a special
// declaration/judicial route rather than a standard consular application.
export function maternalLineAncestorsBornBefore(
  profile: UserProfile,
  countryCode: string,
  cutoffYear: number,
): AncestorWithKey[] {
  return ancestorsBornIn(profile, countryCode).filter((x) => {
    if (!isMaternalLineKey(x.key)) return false;
    const y = x.ancestor.birthYear;
    return typeof y === "number" && y < cutoffYear;
  });
}

export function describeAncestor(key: AncestorKey, a: Ancestor): string {
  const role = key
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();
  const where = a.birthCountry ? ` born in ${a.birthCountry}` : "";
  const when = a.birthYear ? ` (${a.birthYear})` : "";
  return `${role}${where}${when}`;
}
