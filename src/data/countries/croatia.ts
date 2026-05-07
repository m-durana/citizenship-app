import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const croatiaDescent: Path = {
  id: "hr-descent",
  country: "Croatia",
  countryCode: "HR",
  flag: "🇭🇷",
  pathType: "descent",
  name: "Croatian citizenship by descent / origin",
  shortDescription:
    "Citizens of Croatian origin (descendants up to great-grandparents) can acquire Croatian citizenship under the Citizenship Act.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "HR");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a parent born in Croatia (${par[0].key}).`],
      };
    }
    const gp = grandparentsBornIn(p, "HR");
    const ggp = greatGrandparentsBornIn(p, "HR");
    if (gp.length || ggp.length) {
      const closest = gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have an ancestor of Croatian origin born in Croatia (${closest.key}).`,
        ],
        needToVerify: [
          "Your ancestor did not leave Croatia before 8 October 1991 and migrate to another former-Yugoslav state - that disqualifies the line.",
          "Your ancestor's Croatian ethnic origin can be documented.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No ancestor born in Croatia recorded."],
    };
  },
  requirementsSummary: [
    "Croatian-origin parent, grandparent, or great-grandparent.",
    "Knowledge of Croatian language and culture required.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Ancestor's Croatian birth certificate / domovnica (citizenship certificate)",
    "Proof of Croatian ethnicity (church records, family registers)",
    "Birth/marriage certificates linking generations",
  ],
  caveats: [
    "Pre-1991 emigration to another former-Yugoslav state is a hard exclusion.",
    "Language requirement is interview-style - informal but real.",
  ],
  officialLinks: [
    {
      label: "Ministry of the Interior - Croatian Citizenship",
      url: "https://mup.gov.hr/citizenship-186/186",
    },
  ],
  estTimelineMonths: [12, 30],
  estCostUSD: [300, 1500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Post-2020 Article 16 amendments removed the Croatian language and culture test for descent applicants. Pre-1991 Yugoslav-state migration remains a hard exclusion.",
    lawyerTypicallyNeeded: "optional",
    languageTest: {
      required: false,
      note: "Descent applicants are exempt from the language/culture test post-2020. Naturalization-by-residency still requires B1.",
    },
    knowledgeTest: { required: false },
  },
};
