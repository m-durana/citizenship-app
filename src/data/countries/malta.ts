import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const maltaGrandparent: Path = {
  id: "mt-grandparent",
  country: "Malta",
  countryCode: "MT",
  flag: "🇲🇹",
  pathType: "descent",
  name: "Maltese citizenship by registration (Citizenship Act, Cap. 188)",
  shortDescription:
    "The 2007 amendment to the Maltese Citizenship Act lets persons born outside Malta register as citizens if they descend in direct line from an ascendant born in Malta whose parent was also born in Malta. A hard cliff applies on 1 August 2028 for parent-must-still-be-alive cases.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "MT");
    const gp = grandparentsBornIn(p, "MT");
    const ggp = greatGrandparentsBornIn(p, "MT");
    const anyMt = ancestorsBornIn(p, "MT");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Malta-born parent (${par[0].key}).`],
      };
    }
    if (gp.length || ggp.length || anyMt.length) {
      const closest = gp[0] ?? ggp[0] ?? anyMt[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Malta-born ancestor (${closest.key}).`,
          "Registration requires the chain to remain intact: the Malta-born ascendant's own parent must also have been born in Malta.",
        ],
        needToVerify: [
          "If your parent was alive on 1 Aug 2007 and dies after 1 Aug 2028 without applying, the link breaks - flag urgency.",
          "Documentary chain back to a Malta-born ascendant whose parent was also born in Malta.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Malta-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Direct-line descent from a Malta-born ascendant whose parent was also born in Malta.",
    "Hard cliff on 1 August 2028 for parent-must-still-be-alive cases.",
    "No language test, no civics test.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Malta-born ascendant's birth certificate (and that ascendant's own parent's Malta birth certificate)",
    "Birth and marriage certificates linking each generation",
    "Apostilled translations where required",
    "Applicant's identity documents",
  ],
  caveats: [
    "1 August 2028 cliff: if the qualifying parent was alive on 1 Aug 2007 and dies after 1 Aug 2028 without applying, the right is lost.",
    "Malta has allowed dual citizenship since the 2000 amendments.",
  ],
  officialLinks: [
    {
      label: "Maltese nationality law overview",
      url: "https://en.wikipedia.org/wiki/Maltese_nationality_law",
    },
    {
      label: "Chetcuti Cauchi Advocates - Maltese citizenship by descent",
      url: "https://www.ccmalta.com/publications/acquisition-of-maltese-citizenship-in-2025",
    },
    {
      label: "Andersen Malta - 2028 cliff explainer",
      url: "https://www.mt.andersen.com/insights/malta-citizenship-by-descent",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [1500, 5000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Documented straightforward path for clean Malta-born ancestor lines; 1 Aug 2028 cliff for parent-still-alive cases is the operative deadline.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
