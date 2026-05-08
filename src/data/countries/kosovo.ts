import type { Path } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";

export const kosovoDescent: Path = {
  id: "xk-descent",
  country: "Kosovo",
  countryCode: "XK",
  flag: "🇽🇰",
  pathType: "descent",
  name: "Kosovan citizenship by descent (post-2024 diaspora simplifications)",
  shortDescription:
    "Kosovo's Citizenship Law (Law 04/L-215, with 2024 amendments) recognises parent-line descent and provides simplified diaspora reacquisition (single application + non-conviction certificate; 30-day processing target) for those who renounced Kosovan citizenship to obtain a Western European passport.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "XK");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Kosovo-born parent (${par[0].key}).`,
          "Standard descent runs through a Kosovan-citizen parent.",
        ],
        needToVerify: [
          "Your parent was a Kosovan citizen at the time of your birth.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Kosovo-born parent recorded.",
        "Descent is parent-line, not grandparent. Diaspora reacquisition (under the 2024 amendments) is for those who previously held Kosovan citizenship and renounced it.",
      ],
    };
  },
  requirementsSummary: [
    "Kosovan-citizen parent for descent.",
    "Diaspora reacquisition: single application + non-conviction certificate from country of residence.",
    "No language test.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Parent's Kosovan citizenship records",
    "Applicant's birth certificate",
    "For reacquisition: prior Kosovo citizenship document and current non-conviction certificate",
  ],
  caveats: [
    "Pending amendments to broaden ethnic-Albanian provisions for southern-Serbia Albanians have been politically debated.",
  ],
  officialLinks: [
    {
      label: "Globalcit - Kosovo 2024 citizenship amendments",
      url: "https://globalcit.eu/kosovo-assembly-adopts-new-law-on-citizenship/",
    },
    {
      label: "Kosovo Online - Amendments analysis",
      url: "https://www.kosovo-online.com/en/news/analysis/amendments-law-citizenship-new-attempt-self-determination-court-diaspora-ahead",
    },
    {
      label: "Law on citizenship of Kosova (statutory text)",
      url: "https://www.ecoi.net/en/file/local/1145516/1504_1220512362_law-on-citizenship-of-kosova.pdf",
    },
  ],
  estTimelineMonths: [1, 18],
  estCostUSD: [500, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "2024 amendments reportedly reduce diaspora reacquisition friction (single application, 30-day target); descent is parent-line, not grandparent. Recent draft-law passage (Apr 2026, Draft Law 10/L-023) reported.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
