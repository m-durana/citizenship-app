import type { Path } from "../../types/path";
import { ancestorsBornIn, parentsBornIn } from "../../engine/helpers";

export const luxembourgArticle89Closed: Path = {
  id: "lu-article-89-closed",
  country: "Luxembourg",
  countryCode: "LU",
  flag: "🇱🇺",
  pathType: "restoration",
  name: "Luxembourg Article 89 reclamation (CLOSED 31 Dec 2025)",
  shortDescription:
    "Article 89 of the Law of 8 March 2017 allowed unlimited descendants of an ancestor Luxembourgish on 1 January 1900 to reclaim citizenship. The two-step window CLOSED on 31 December 2025; only pre-2025 step-2 declarations remain in pipeline.",
  evaluate: (p) => {
    const ancestors = ancestorsBornIn(p, "LU");
    if (ancestors.length) {
      return {
        tier: "unlikely",
        reasons: [
          "Article 89 reclamation CLOSED on 31 December 2025.",
          "Only declarations filed before the deadline (with Step 1 certificates obtained by 31 Dec 2018) remain in pipeline.",
          "Standard Luxembourg descent (parent-only) may still apply - see the general descent path.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Article 89 reclamation CLOSED 31 December 2025.",
        "No Luxembourg-born ancestor recorded.",
      ],
    };
  },
  requirementsSummary: [
    "CLOSED to new applicants since 31 December 2025.",
    "Pre-deadline pipeline: Step-1 certificate (by 31 Dec 2018) plus Step-2 declaration (by 31 Dec 2025) before a civil registrar.",
  ],
  documentsOutline: [],
  caveats: [
    "No new applications accepted.",
    "Pending pipeline of step-2 declarations may continue to be processed administratively.",
  ],
  officialLinks: [
    {
      label: "Guichet.lu - Reclaiming Luxembourgish nationality",
      url: "https://guichet.public.lu/en/citoyens/citoyennete/nationalite-luxembourgeoise/acquisition-recouvrement/recouvrement.html",
    },
    {
      label: "LuxCitizenship - Article 89 closing retrospective",
      url: "https://www.luxcitizenship.com/the-article-89-window-has-closed-heres-what-the-early-numbers-tell-us/",
    },
    {
      label: "Luxembourg nationality law overview",
      url: "https://en.wikipedia.org/wiki/Luxembourg_nationality_law",
    },
  ],
  estTimelineMonths: [0, 0],
  estCostUSD: [0, 0],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "CLOSED 31 Dec 2025; only pre-2025 step-2 declarations remain in pipeline. New claimants ineligible.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};

export const luxembourgDescent: Path = {
  id: "lu-descent",
  country: "Luxembourg",
  countryCode: "LU",
  flag: "🇱🇺",
  pathType: "descent",
  name: "Luxembourg general descent (parent-only)",
  shortDescription:
    "Standard Luxembourg descent under the Law of 8 March 2017 is parent-only: there is no statutory grandparent route since the close of Article 89 on 31 December 2025.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "LU");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Luxembourg-born parent (${par[0].key}).`],
        needToVerify: [
          "Your parent was a Luxembourg citizen at the time of your birth.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Luxembourg general descent is parent-only.",
        "Article 89 reclamation (which reached unlimited generations from a 1900 ancestor) closed on 31 December 2025.",
      ],
    };
  },
  requirementsSummary: [
    "Luxembourg-citizen parent at the time of birth.",
    "No language test, no civics test.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Parent's Luxembourg citizenship and birth records",
    "Applicant's birth certificate",
    "Apostilled translations where required",
  ],
  caveats: [
    "No statutory grandparent route in the post-Article-89 landscape.",
  ],
  officialLinks: [
    {
      label: "Guichet.lu - Luxembourg nationality",
      url: "https://guichet.public.lu/en/citoyens/citoyennete/nationalite-luxembourgeoise/acquisition-recouvrement/recouvrement.html",
    },
    {
      label: "Luxembourg nationality law overview",
      url: "https://en.wikipedia.org/wiki/Luxembourg_nationality_law",
    },
  ],
  estTimelineMonths: [3, 12],
  estCostUSD: [200, 1500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Standard parent-only descent recognized declaratively at Luxembourg consulates given documentary chain.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
