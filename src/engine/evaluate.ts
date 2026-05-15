import type { UserProfile } from "../types/profile";
import type { EvaluatedPath, Path } from "../types/path";
import { TIER_ORDER } from "../types/path";
import { allPaths } from "../data/countries/_registry";

// Approximate "is this applicant a minor?" check from self.birthYear.
// Applied engine-wide as a needToVerify note on every path the engine returns;
// avoids touching every country evaluator.
function isMinorApplicant(profile: UserProfile): boolean {
  const y = profile.self.birthYear;
  if (typeof y !== "number") return false;
  const now = new Date().getFullYear();
  return now - y < 18;
}

export function evaluateProfile(profile: UserProfile): EvaluatedPath[] {
  const minor = isMinorApplicant(profile);
  const minorNote =
    "As a minor applicant, the application must be filed by a parent or legal guardian. Some countries grant citizenship automatically when the parent's status is recognized — confirm the specific procedure with the relevant consulate.";

  const evaluated = allPaths.map<EvaluatedPath>((p: Path) => {
    const match = p.evaluate(profile);
    if (minor && match.tier !== "unlikely") {
      const existing = match.needToVerify ?? [];
      return {
        ...p,
        match: { ...match, needToVerify: [...existing, minorNote] },
      };
    }
    return { ...p, match };
  });

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
