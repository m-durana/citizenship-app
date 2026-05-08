import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const slovakiaDescent: Path = {
  id: "sk-descent",
  country: "Slovakia",
  countryCode: "SK",
  flag: "🇸🇰",
  pathType: "descent",
  name: "Slovak citizenship by descent (Act on Citizenship, 2021 amendment)",
  shortDescription:
    "Descendants up to the third generation of former Slovak or Czechoslovak nationals can apply for Slovak citizenship under the 2021 amendment.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "SK").concat(parentsBornIn(p, "CZ"));
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a parent born in Slovakia (or former Czechoslovakia) (${par[0].key}).`,
        ],
      };
    }
    const gp = grandparentsBornIn(p, "SK").concat(grandparentsBornIn(p, "CZ"));
    if (gp.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a grandparent born in Slovakia (or former Czechoslovakia) (${gp[0].key}).`,
        ],
        needToVerify: [
          "Your ancestor was a Slovak or Czechoslovak national (not just born in territory).",
        ],
      };
    }
    const ggp = greatGrandparentsBornIn(p, "SK").concat(
      greatGrandparentsBornIn(p, "CZ"),
    );
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a great-grandparent born in Slovakia (or former Czechoslovakia) (${ggp[0].key}).`,
          "The 2021 amendment opened third-generation eligibility.",
        ],
        needToVerify: [
          "Documentary proof your ancestor held Slovak or Czechoslovak nationality.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No ancestor born in Slovakia or former Czechoslovakia recorded."],
    };
  },
  requirementsSummary: [
    "Slovak / Czechoslovak ancestor (parent, grandparent, or great-grandparent).",
    "Dual citizenship is allowed.",
    "No language test for descent route; basic Slovak knowledge may be checked at interview.",
  ],
  documentsOutline: [
    "Ancestor's birth certificate from Slovakia / Czechoslovakia",
    "Proof of the ancestor's Slovak/Czechoslovak nationality",
    "Birth/marriage certificates linking each generation",
    "Apostilled translations into Slovak",
  ],
  caveats: [
    "Many records pre-1992 sit in Czech archives - cross-border research is common.",
  ],
  officialLinks: [
    {
      label: "Ministry of Interior - Citizenship",
      url: "https://www.minv.sk/?statne-obcianstvo",
    },
  ],
  estTimelineMonths: [12, 24],
  estCostUSD: [400, 1500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Two-step in current practice: descent applicants first secure permanent residence, then file for citizenship. A 2026 amendment to remove the residency-permit step has been reported but is not yet on official embassy pages. Processing 6-24 months by complexity.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: false,
      note: "No formal language test for descent; basic Slovak may be checked at interview. Naturalization-by-residency uses a separate language requirement.",
    },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
