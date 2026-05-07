import type { Path } from "../../types/path";
import { grandparentsBornIn } from "../../engine/helpers";

const COMMONWEALTH = new Set([
  "GB", "AU", "NZ", "CA", "IN", "ZA", "JM", "KE", "NG", "BD", "PK", "SG", "MY",
  "GH", "TT", "BB", "LK", "FJ", "MT", "CY",
]);

export const ukAncestryVisa: Path = {
  id: "gb-ancestry-visa",
  country: "United Kingdom",
  countryCode: "GB",
  flag: "🇬🇧",
  pathType: "ancestry-visa",
  name: "UK Ancestry Visa (5-year stepping stone to citizenship)",
  shortDescription:
    "Commonwealth citizens with a UK-born grandparent can apply for the UK Ancestry Visa - a 5-year work visa leading to Indefinite Leave to Remain and, after 1 more year, British citizenship.",
  evaluate: (p) => {
    const ukGp = grandparentsBornIn(p, "GB");
    const isCommonwealth = p.self.currentCitizenships.some((c) =>
      COMMONWEALTH.has(c),
    );

    if (ukGp.length && isCommonwealth) {
      return {
        tier: "likely",
        reasons: [
          `You have a UK-born grandparent (${ukGp[0].key}).`,
          "Your current citizenship is a Commonwealth country, so you qualify for the Ancestry Visa route.",
        ],
        needToVerify: [
          "You can demonstrate intent to work in the UK during the 5-year visa.",
          "You can support yourself without recourse to public funds.",
        ],
      };
    }

    if (ukGp.length && !isCommonwealth) {
      return {
        tier: "unlikely",
        reasons: [
          "You have a UK-born grandparent, but the UK Ancestry Visa is restricted to Commonwealth citizens.",
          "Without Commonwealth citizenship, this stepping-stone path is not available.",
        ],
      };
    }

    return {
      tier: "unlikely",
      reasons: [
        "No UK-born grandparent recorded; the Ancestry Visa requires one.",
      ],
    };
  },
  requirementsSummary: [
    "Commonwealth citizenship (or British Overseas Citizen status).",
    "At least one grandparent born in the UK, Channel Islands, or Isle of Man.",
    "Intent and ability to work during the 5-year visa.",
    "After 5 years: Indefinite Leave to Remain. After 6 years total: British citizenship.",
  ],
  documentsOutline: [
    "Grandparent's UK birth certificate",
    "Birth/marriage certificates linking each generation to the applicant",
    "Applicant's current passport (Commonwealth country)",
    "Evidence of funds and intent to work (job offer, savings, business plan)",
  ],
  caveats: [
    "Not direct citizenship - it's a 5+1 year residency path.",
    "Restricted to Commonwealth citizens; non-Commonwealth applicants with UK grandparents have no equivalent route.",
  ],
  officialLinks: [
    {
      label: "UK Government - Ancestry Visa",
      url: "https://www.gov.uk/ancestry-visa",
    },
  ],
  estTimelineMonths: [60, 84],
  estCostUSD: [1500, 5000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Reported ~88% Home Office grant rate for the year ending Dec 2025 (57,498 of 64,506). Substantial upfront cost: £1,035/year Immigration Health Surcharge.",
    lawyerTypicallyNeeded: "optional",
    languageTest: {
      required: true,
      level: "B1 English",
      note: "Required at the ILR and citizenship stages (years 5 and 6), not at initial visa entry.",
    },
    knowledgeTest: {
      required: true,
      note: "Life in the UK Test required at the ILR / naturalization stages.",
    },
    singleSource: true,
  },
};
