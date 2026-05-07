import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const lithuaniaDescent: Path = {
  id: "lt-descent",
  country: "Lithuania",
  countryCode: "LT",
  flag: "🇱🇹",
  pathType: "restoration",
  name: "Lithuanian citizenship by descent (restoration of pre-1940 citizenship)",
  shortDescription:
    "Descendants up to the third generation of people who held Lithuanian citizenship before 15 June 1940 - or who were forced to leave before 11 March 1990 - can apply to have citizenship recognized.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "LT");
    const gp = grandparentsBornIn(p, "LT");
    const ggp = greatGrandparentsBornIn(p, "LT");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [`You have an ancestor born in Lithuania (${closest.key}).`],
        needToVerify: [
          "Did your ancestor hold Lithuanian citizenship before 15 June 1940 (or were they forced to leave before 11 March 1990)?",
          "Were they not naturalized in another country (or moved to other Soviet territory) in a way that broke the chain?",
          "Lithuania does not allow dual citizenship by default - restoration usually does, but ordinary naturalization requires renouncing.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No ancestor born in Lithuania recorded."],
    };
  },
  requirementsSummary: [
    "Ancestor (up to great-grandparent) was a Lithuanian citizen before 15 Jun 1940, OR forced to leave before 11 Mar 1990.",
    "Documentary proof of the ancestor's pre-1940 citizenship.",
    "Dual citizenship allowed for restoration cases (not for ordinary naturalization).",
  ],
  documentsOutline: [
    "Ancestor's pre-1940 Lithuanian citizenship document or archival proof",
    "Birth/marriage certificates linking each generation to the applicant",
    "Apostilled translations of all foreign-issued documents",
  ],
  caveats: [
    "Archival research is often required - many records were lost in WWII.",
    "Migration to other Soviet republics post-1940 can disqualify the line.",
  ],
  officialLinks: [
    {
      label: "Migration Department of Lithuania",
      url: "https://www.migracija.lt/en",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [500, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Restoration is workable for documented pre-1940 lineage; the May 2024 dual-citizenship referendum failed on turnout, so renouncing other nationality is still the rule for many.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
