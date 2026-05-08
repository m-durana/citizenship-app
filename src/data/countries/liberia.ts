import type { Path } from "../../types/path";
import { ancestorsBornIn, parentsBornIn } from "../../engine/helpers";

export const liberiaDescent: Path = {
  id: "lr-descent",
  country: "Liberia",
  countryCode: "LR",
  flag: "🇱🇷",
  pathType: "descent",
  name: "Liberian citizenship by descent (Article 27(b))",
  shortDescription:
    "Liberian citizenship requires the applicant to be a Negro or of Negro descent (Article 27(b) of the 1986 Constitution). The 2022 Dual Citizenship Amendment introduced statutory dual nationality for former Liberians but did not remove the constitutional ethnic clause.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "LR");
    const ancestors = ancestorsBornIn(p, "LR");
    if (par.length || ancestors.length) {
      const closest = par[0] ?? ancestors[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Liberia-born ancestor (${closest.key}).`,
          "Liberian descent runs through a Liberian-citizen ancestor; the 2022 amendment lets former Liberians who lost citizenship by foreign naturalisation reclaim it.",
        ],
        needToVerify: [
          "Article 27(b) restricts birthright and naturalisation citizenship to persons who are Negroes or of Negro descent. The engine surfaces this rule but does not auto-evaluate against ethnicity self-identification.",
          "Documentary chain to a Liberian-citizen ancestor.",
          "Holders of dual citizenship are barred from a list of elected/public offices.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Liberia-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Liberian-citizen ancestor in line.",
    "Constitutional Negro / Negro-descent ethnic requirement (Article 27(b)).",
    "2022 Dual Citizenship Amendment permits reacquisition for those who lost citizenship by foreign naturalisation.",
  ],
  documentsOutline: [
    "Liberian-citizen ancestor's birth and citizenship records",
    "Birth and marriage certificates linking generations",
    "Foreign-naturalisation evidence (for reacquisition cases)",
    "Applicant's identity documents",
  ],
  caveats: [
    "The constitutional Negro-descent restriction has not been repealed and is politically sensitive.",
    "Holders of dual citizenship are barred from a list of elected/public offices.",
  ],
  officialLinks: [
    {
      label: "Liberian nationality law overview",
      url: "https://en.wikipedia.org/wiki/Liberian_nationality_law",
    },
    {
      label: "Al Jazeera - Liberia's new dual citizenship law (2022)",
      url: "https://www.aljazeera.com/features/2022/7/27/all-you-need-to-know-about-liberias-new-dual-citizenship-law",
    },
    {
      label: "ConstitutionNet - 'Not Liberian enough' analysis",
      url: "https://constitutionnet.org/news/not-liberian-enough-deconstructing-citizenship-and-constitutional-reform-liberia",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [2000, 7500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "unknown",
    successNote:
      "Constitutional Negro-descent restriction governs admission; 2022 dual-citizenship law lets former Liberians reclaim but does not remove the ethnic clause.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
