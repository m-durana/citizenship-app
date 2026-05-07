import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const czechiaDescent: Path = {
  id: "cz-descent",
  country: "Czechia",
  countryCode: "CZ",
  flag: "🇨🇿",
  pathType: "descent",
  name: "Czech citizenship by descent (parent or grandparent)",
  shortDescription:
    "Czechia permits citizenship by descent up to the second generation - a Czech (or Czechoslovak) parent or grandparent.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CZ").concat(parentsBornIn(p, "SK"));
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a parent born in Czechia (or former Czechoslovakia) (${par[0].key}).`,
        ],
      };
    }
    const gp = grandparentsBornIn(p, "CZ").concat(grandparentsBornIn(p, "SK"));
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a grandparent born in Czechia (or former Czechoslovakia) (${gp[0].key}).`,
        ],
        needToVerify: [
          "Your grandparent held Czech or Czechoslovak citizenship and the chain to you was not broken by loss of citizenship.",
        ],
      };
    }
    const ggp = greatGrandparentsBornIn(p, "CZ").concat(
      greatGrandparentsBornIn(p, "SK"),
    );
    if (ggp.length) {
      return {
        tier: "unlikely",
        reasons: [
          "Czech descent is generally limited to two generations (parent or grandparent).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No ancestor born in Czechia or former Czechoslovakia recorded."],
    };
  },
  requirementsSummary: [
    "Czech / Czechoslovak parent or grandparent.",
    "Dual citizenship allowed since 2014.",
  ],
  documentsOutline: [
    "Ancestor's Czech / Czechoslovak birth certificate and citizenship document",
    "Birth/marriage certificates linking generations",
    "Czech translations by sworn translator",
  ],
  caveats: [
    "Loss of citizenship by an intermediate ancestor (e.g. communist-era emigration) can break the line.",
  ],
  officialLinks: [
    {
      label: "Ministry of the Interior of the Czech Republic - Citizenship",
      url: "https://www.mvcr.cz/mvcren/article/citizenship.aspx",
    },
  ],
  estTimelineMonths: [12, 24],
  estCostUSD: [300, 1200],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Declaration route is efficient: 6-12 months consular, ~2 months for domestic filings. Strict 2-generation cap. Dual citizenship since 2014.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
