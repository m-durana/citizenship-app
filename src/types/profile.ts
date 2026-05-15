export type Gender = "M" | "F" | "unknown";

export type Tribool = boolean | "unknown";

export type AncestorKey =
  | "father"
  | "mother"
  | "fatherFather"
  | "fatherMother"
  | "motherFather"
  | "motherMother"
  | "fatherFatherFather"
  | "fatherFatherMother"
  | "fatherMotherFather"
  | "fatherMotherMother"
  | "motherFatherFather"
  | "motherFatherMother"
  | "motherMotherFather"
  | "motherMotherMother";

export type HistoricalState =
  | "USSR"
  | "Yugoslavia"
  | "Czechoslovakia"
  | "AustriaHungary"
  | "OttomanEmpire"
  | "MandatePalestine"
  | "BritishMandate"
  | "PrussianEmpire"
  | "GermanEmpire"
  | "Other";

export type CitizenshipMode =
  | "birth"
  | "descent"
  | "naturalization"
  | "automaticStateSuccession"
  | "restoration"
  | "loss"
  | "renunciation"
  | "revocation"
  | "unknown";

export type PersecutionBasis =
  | "jewish"
  | "political"
  | "racial"
  | "religious"
  | "romaSinti"
  | "other";

export type Ancestor = {
  birthCountry?: string;
  // Disambiguates ancestors born in defunct states (USSR, Yugoslavia,
  // Czechoslovakia, Austria-Hungary, etc.). Country-evaluator code that needs
  // a successor-state mapping (Polish/Lithuanian/Ukrainian/Israeli/etc.
  // restoration routes) consults this in preference to birthCountry alone.
  birthPlace?: {
    cityOrRegion?: string;
    historicalState?: HistoricalState;
    modernState?: string;
  };
  // Citizenships the ancestor is known to have HELD (in addition to or instead
  // of birth country). Lets us model cases where citizenship was acquired by
  // descent or naturalization independent of birthplace — e.g. a parent born
  // in Argentina who is a Swiss citizen because their own father was Swiss.
  citizenshipsHeld?: string[];
  // Ordered citizenship history for the Mitteleuropa restoration corridor.
  // Optional and progressive — only ask in the UI when the engine detects a
  // multi-state birthplace (Austria-Hungary, Czechoslovakia, USSR, etc.).
  citizenshipTimeline?: Array<{
    countryCode: string;
    mode: CitizenshipMode;
    startYear?: number;
    endYear?: number | null;
  }>;
  birthYear?: number;
  gender?: Gender;
  naturalizedElsewhere?: {
    country?: string;
    yearRelativeToChildBirth?: "before" | "after" | "unknown";
  };
  citizenshipRetained?: Tribool;
  jewish?: Tribool;
  persecutedByNazis?: Tribool;
  exiledSpanishCivilWar?: Tribool;
  // Per-ancestor persecution status, used by the German §15 StAG / Art. 116(2)
  // and Austrian §58c restoration paths. The eligibility hinges on the
  // ancestor's status DURING 1933–1945, not on the descendant's current
  // self-identification — so the per-ancestor record is the precise signal,
  // while the existing profile-level heritage.naziPersecutionDescendant flag
  // remains a coarse routing hint.
  persecutionStatus?: {
    wasPersecuted1933_1945: Tribool;
    basis?: PersecutionBasis[];
    fled?: Tribool;
    fledYear?: number;
  };
};

export type AncestorTree = Partial<Record<AncestorKey, Ancestor>>;

export type Heritage = {
  jewish?: "maternal" | "paternal" | "both" | "convert" | "none" | "unknown";
  sephardicAncestry?: Tribool;
  naziPersecutionDescendant?: Tribool;
  spanishCivilWarExileDescendant?: Tribool;
  armenianGenocideDescendant?: Tribool;
  africanDiasporaDescendant?: Tribool;
};

export type Self = {
  currentCitizenships: string[];
  birthYear?: number;
  gender?: Gender;
  languages: string[];
  willingToRelocate: boolean;
};

export type Spouse = {
  citizenships: string[];
  marriedYear?: number;
};

export type UserProfile = {
  self: Self;
  spouse?: Spouse;
  ancestors: AncestorTree;
  heritage: Heritage;
};

export const ANCESTOR_LABELS: Record<AncestorKey, string> = {
  father: "Father",
  mother: "Mother",
  fatherFather: "Paternal grandfather",
  fatherMother: "Paternal grandmother",
  motherFather: "Maternal grandfather",
  motherMother: "Maternal grandmother",
  fatherFatherFather: "Paternal great-grandfather (father's side)",
  fatherFatherMother: "Paternal great-grandmother (father's side)",
  fatherMotherFather: "Paternal great-grandfather (mother's side)",
  fatherMotherMother: "Paternal great-grandmother (mother's side)",
  motherFatherFather: "Maternal great-grandfather (father's side)",
  motherFatherMother: "Maternal great-grandmother (father's side)",
  motherMotherFather: "Maternal great-grandfather (mother's side)",
  motherMotherMother: "Maternal great-grandmother (mother's side)",
};

export const PARENT_KEYS: AncestorKey[] = ["father", "mother"];
export const GRANDPARENT_KEYS: AncestorKey[] = [
  "fatherFather",
  "fatherMother",
  "motherFather",
  "motherMother",
];
export const GREAT_GRANDPARENT_KEYS: AncestorKey[] = [
  "fatherFatherFather",
  "fatherFatherMother",
  "fatherMotherFather",
  "fatherMotherMother",
  "motherFatherFather",
  "motherFatherMother",
  "motherMotherFather",
  "motherMotherMother",
];

export const emptyProfile = (): UserProfile => ({
  self: {
    currentCitizenships: [],
    languages: [],
    willingToRelocate: false,
  },
  ancestors: {},
  heritage: {},
});
