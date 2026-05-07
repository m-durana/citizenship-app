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

export function ancestorsBornIn(
  profile: UserProfile,
  countryCode: string,
): AncestorWithKey[] {
  const out: AncestorWithKey[] = [];
  for (const [key, ancestor] of Object.entries(profile.ancestors) as [
    AncestorKey,
    Ancestor,
  ][]) {
    if (ancestor && ancestor.birthCountry === countryCode) {
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
    .filter((x) => x.ancestor.birthCountry === countryCode);
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
    .filter((x) => x.ancestor.birthCountry === countryCode);
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
    .filter((x) => x.ancestor.birthCountry === countryCode);
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

export function describeAncestor(key: AncestorKey, a: Ancestor): string {
  const role = key
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();
  const where = a.birthCountry ? ` born in ${a.birthCountry}` : "";
  const when = a.birthYear ? ` (${a.birthYear})` : "";
  return `${role}${where}${when}`;
}
