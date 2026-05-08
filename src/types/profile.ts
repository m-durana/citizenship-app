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

export type Ancestor = {
  birthCountry?: string;
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
