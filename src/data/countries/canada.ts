import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const canadaBillC3: Path = {
  id: "ca-bill-c3",
  country: "Canada",
  countryCode: "CA",
  flag: "🇨🇦",
  pathType: "descent",
  name: "Canadian citizenship by descent (Bill C-3, in force 15 Dec 2025)",
  shortDescription:
    "Bill C-3 removes the first-generation limit on citizenship by descent. Persons born or adopted before 15 Dec 2025 with a Canadian-citizen parent are automatically recognised; post-cutoff transmission requires the Canadian parent to demonstrate 1,095 days' substantial connection to Canada.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CA");
    const gp = grandparentsBornIn(p, "CA");
    const ancestors = ancestorsBornIn(p, "CA");
    const selfBirthYear = p.self.birthYear;
    const preCutoff =
      typeof selfBirthYear === "number" ? selfBirthYear < 2025 : undefined;

    if (par.length || gp.length || ancestors.length) {
      const closest = par[0] ?? gp[0] ?? ancestors[0];
      if (preCutoff === true) {
        return {
          tier: "likely",
          reasons: [
            `You have a Canada-born ancestor (${closest.key}) and you were born before 15 December 2025.`,
            "Bill C-3 grants automatic recognition to pre-cutoff descendants where a Canadian-citizen parent existed at the time of birth/adoption.",
          ],
          needToVerify: [
            "Documentary chain of vital records back to the Canadian-citizen parent.",
            "Your Canadian-citizen ancestor was Canadian at the time of the next-generation child's birth.",
          ],
        };
      }
      return {
        tier: "possibly",
        reasons: [
          `You have a Canada-born ancestor (${closest.key}).`,
          "Pre-15-Dec-2025 cohort: automatic recognition where a Canadian-citizen parent existed at birth.",
          "Post-15-Dec-2025 cohort: requires the Canadian parent to show 1,095 days' cumulative physical presence in Canada before the child's birth/adoption.",
        ],
        needToVerify: [
          "Whether you fall into the pre- or post-15-Dec-2025 cohort.",
          "For post-cutoff cases, evidence of the Canadian parent's 1,095 days' physical presence (passport stamps, tax records, employment, study).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Canada-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Pre-15-Dec-2025 cohort: chain of Canadian-citizen ancestors; no substantial-connection requirement.",
    "Post-15-Dec-2025 cohort: 1,095 days' (3 years') cumulative physical presence in Canada by the Canadian parent before the child's birth/adoption.",
    "No language test, no civics test for descent recognition.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Canadian-citizen ancestor's citizenship and birth records",
    "Birth and marriage certificates linking generations",
    "For post-cutoff: Canadian parent's physical-presence evidence (passport stamps, tax records, employment, study)",
    "Proof-of-citizenship application (CIT 0001)",
  ],
  caveats: [
    "IRCC noted backlogs in late 2025 as the new applications scaled up.",
    "Substantial-connection test applies only to post-15-Dec-2025 transmissions.",
  ],
  officialLinks: [
    {
      label: "Government of Canada - Bill C-3 in effect (Dec 2025)",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/news/2025/12/bill-c-3-an-act-to-amend-the-citizenship-act-2025-comes-into-effect.html",
    },
    {
      label: "Government of Canada - Change to citizenship rules in 2025",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/act-changes/rules-2025.html",
    },
    {
      label: "CIC News - Bill C-3 takes effect",
      url: "https://www.cicnews.com/2025/12/breaking-bill-c-3-takes-effect-giving-many-a-clear-pathway-to-canadian-citizenship-1263495.html",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [75, 600],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Bill C-3 in force 15 Dec 2025; pre-cutoff cohort gets automatic recognition for chained Canadian-parent births; post-cutoff requires 1,095-day parent-presence proof.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
