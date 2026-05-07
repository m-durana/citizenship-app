import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const latviaDescent: Path = {
  id: "lv-descent",
  country: "Latvia",
  countryCode: "LV",
  flag: "🇱🇻",
  pathType: "restoration",
  name: "Latvian citizenship by descent (restoration of pre-1940 citizenship)",
  shortDescription:
    "Descendants of Latvian citizens as of 17 June 1940 - up to the third generation - can restore Latvian citizenship.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "LV");
    const gp = grandparentsBornIn(p, "LV");
    const ggp = greatGrandparentsBornIn(p, "LV");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [`You have a Latvia-born ancestor (${closest.key}).`],
        needToVerify: [
          "Your ancestor was a Latvian citizen on or before 17 June 1940.",
          "They left Latvia between 17 Jun 1940 and 4 May 1990 escaping occupation, and did not voluntarily return to Soviet rule.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Latvia-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Pre-1940 Latvian-citizen ancestor (parent, grandparent, or great-grandparent).",
    "Dual citizenship allowed for restoration cases (with EU/EEA/NATO/Australia/Brazil/NZ etc.).",
  ],
  documentsOutline: [
    "Ancestor's pre-1940 Latvian citizenship documents (passport, ID)",
    "Birth/marriage certificates linking each generation",
    "Latvian translations by sworn translator",
  ],
  caveats: [
    "Detailed archival research often required.",
  ],
  officialLinks: [
    {
      label: "Office of Citizenship and Migration Affairs",
      url: "https://www.pmlp.gov.lv/en",
    },
  ],
  estTimelineMonths: [9, 24],
  estCostUSD: [400, 2000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Restoration is well-defined. Latvia explicitly permits dual citizenship if alternate nationality is from EU/EFTA/NATO state, Australia, Brazil, or New Zealand.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
