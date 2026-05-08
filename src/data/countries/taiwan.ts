import type { Path } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";

export const taiwanNWOHR: Path = {
  id: "tw-nwohr",
  country: "Taiwan",
  countryCode: "TW",
  flag: "🇹🇼",
  pathType: "descent",
  name: "Taiwan ROC nationality (NWOHR + onward to household registration)",
  shortDescription:
    "Children born to at least one Taiwanese parent are ROC nationals by birth. Diaspora applicants typically obtain National Without Household Registration (NWOHR) status first, then a separate household-registration step is required for full citizenship rights (vote, work, abode).",
  evaluate: (p) => {
    const par = parentsBornIn(p, "TW");
    if (par.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Taiwan-born parent (${par[0].key}).`,
          "Step 1: confirm ROC nationality (NWOHR status: ROC passport without household registration).",
          "Step 2: full household registration typically requires periods of legal residence in Taiwan (commonly 1 year continuous, or 270 days/year for two consecutive years).",
        ],
        needToVerify: [
          "If you were born on or before 9 February 1980 to an ROC-national mother and foreign father, you may be excluded by the historical patrilineal rule.",
          "Willingness to spend the residence period in Taiwan for full household registration.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Taiwan-born parent recorded."],
    };
  },
  requirementsSummary: [
    "At least one Taiwanese (ROC-national) parent.",
    "Step 1: NWOHR status (ROC passport without abode rights).",
    "Step 2: Taiwan-area household registration after qualifying physical residence.",
    "Pre-9-Feb-1980 maternal-line cohort excluded by historical patrilineal rule.",
    "Dual citizenship permitted in practice for ROC by birth.",
  ],
  documentsOutline: [
    "Taiwan-born parent's household registration records and ROC passport",
    "Applicant's birth certificate",
    "Apostilled translations into Chinese where required",
    "Residence evidence for the household-registration step",
  ],
  caveats: [
    "NWOHR status alone does not grant the right to vote, work without permit, or abode in Taiwan.",
    "Two-step pathway: useful but the second step requires physical presence in Taiwan.",
  ],
  officialLinks: [
    {
      label: "Taiwanese nationality law overview",
      url: "https://en.wikipedia.org/wiki/Taiwanese_nationality_law",
    },
    {
      label: "National without household registration overview",
      url: "https://en.wikipedia.org/wiki/National_without_household_registration",
    },
    {
      label: "Talent Taiwan - NWOHR to full citizenship",
      url: "https://talent.nat.gov.tw/en/life/how-to-go-from-nwohr-to-full-taiwan-citizenship-passport-household-registration-process",
    },
  ],
  estTimelineMonths: [3, 36],
  estCostUSD: [500, 3000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "NWOHR status documentary; passport without abode rights. Full household-registration path requires physical presence in Taiwan (typically 1 yr continuous, or 335 days x 2 / 183 days x 5 alternatives also reported).",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: false,
      note: "NWOHR status itself does not require language test; full household registration may.",
    },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
