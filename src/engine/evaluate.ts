import type { UserProfile } from "../types/profile";
import type { EvaluatedPath, Path } from "../types/path";
import { TIER_ORDER } from "../types/path";
import { allPaths } from "../data/countries/_registry";

export function evaluateProfile(profile: UserProfile): EvaluatedPath[] {
  const evaluated = allPaths.map<EvaluatedPath>((p: Path) => ({
    ...p,
    match: p.evaluate(profile),
  }));

  evaluated.sort((a, b) => {
    const t = TIER_ORDER[a.match.tier] - TIER_ORDER[b.match.tier];
    if (t !== 0) return t;
    return a.country.localeCompare(b.country);
  });

  return evaluated;
}

export function groupByTier(paths: EvaluatedPath[]) {
  return {
    likely: paths.filter((p) => p.match.tier === "likely"),
    possibly: paths.filter((p) => p.match.tier === "possibly"),
    unlikely: paths.filter((p) => p.match.tier === "unlikely"),
  };
}
