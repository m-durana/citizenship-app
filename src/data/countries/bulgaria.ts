import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const bulgariaDescent: Path = {
  id: "bg-descent",
  country: "Bulgaria",
  countryCode: "BG",
  flag: "🇧🇬",
  pathType: "descent",
  name: "Bulgarian citizenship by origin",
  shortDescription:
    "People who can prove Bulgarian origin (a Bulgarian-citizen parent, grandparent, or earlier ascendant) may acquire Bulgarian citizenship under Article 15 of the Citizenship Act.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "BG");
    const gp = grandparentsBornIn(p, "BG");
    const ggp = greatGrandparentsBornIn(p, "BG");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a parent born in Bulgaria (${par[0].key}).`],
      };
    }
    if (gp.length || ggp.length) {
      const closest = gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [`You have a Bulgaria-born ancestor (${closest.key}).`],
        needToVerify: [
          "You can document Bulgarian origin (e.g. ancestor's Bulgarian citizenship or ethnic-Bulgarian status).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Bulgaria-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "At least one Bulgarian-origin ancestor.",
    "No language test for the origin route, but a certificate of Bulgarian origin is required.",
    "Dual citizenship allowed for citizens by origin.",
  ],
  documentsOutline: [
    "Certificate of Bulgarian origin from the State Agency for Bulgarians Abroad",
    "Ancestor's birth/citizenship records",
    "Birth/marriage certificates linking generations",
  ],
  caveats: [
    "Process commonly takes 1.5–3 years end to end.",
  ],
  officialLinks: [
    {
      label: "Ministry of Justice - Bulgarian citizenship",
      url: "https://www.justice.government.bg/en",
    },
  ],
  estTimelineMonths: [18, 36],
  estCostUSD: [500, 2000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Origin route remains exempt from Bulgarian language testing as of 2026. February 2024 fluency proposal was not implemented; origin is now proven directly at filing.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
