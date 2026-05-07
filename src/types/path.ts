import type { UserProfile } from "./profile";

export type Tier = "likely" | "possibly" | "unlikely";

export type PathType =
  | "descent"
  | "heritage"
  | "marriage"
  | "ancestry-visa"
  | "restoration";

export type PathMatch = {
  tier: Tier;
  reasons: string[];
  needToVerify?: string[];
};

export type SourceLink = {
  label: string;
  url: string;
};

export type SuccessSignal = "high" | "moderate" | "low" | "unknown";
export type Likelihood = "yes" | "recommended" | "optional" | "no" | "unknown";

export type PracticalNotes = {
  successSignal: SuccessSignal;            // anecdotal/reported success rate among the eligible
  successNote?: string;                    // one-liner explaining the signal
  lawyerTypicallyNeeded: Likelihood;       // do reports indicate a lawyer is needed in practice
  languageTest?: {
    required: boolean;
    level?: string;                        // e.g. "A2", "B1", "informal interview"
    note?: string;
  };
  knowledgeTest?: {
    required: boolean;
    note?: string;                         // history / civics / culture exam, if any
  };
  singleSource?: boolean;                  // true when a quantitative claim in successNote rests on a single source - UI surfaces a warning
};

export type Path = {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  pathType: PathType;
  name: string;
  shortDescription: string;
  evaluate: (profile: UserProfile) => PathMatch;
  requirementsSummary: string[];
  documentsOutline: string[];
  caveats: string[];
  officialLinks: SourceLink[];
  estTimelineMonths: [number, number];
  estCostUSD: [number, number];
  lastReviewed: string;
  practical?: PracticalNotes;              // optional for incremental rollout
};

export type EvaluatedPath = Path & {
  match: PathMatch;
};

export const TIER_ORDER: Record<Tier, number> = {
  likely: 0,
  possibly: 1,
  unlikely: 2,
};

export const TIER_LABEL: Record<Tier, string> = {
  likely: "Likely eligible",
  possibly: "Possibly eligible - verify details",
  unlikely: "Probably not eligible",
};
