import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const cyprusDescent: Path = {
  id: "cy-descent",
  country: "Cyprus",
  countryCode: "CY",
  flag: "🇨🇾",
  pathType: "descent",
  name: "Cypriot citizenship by Cypriot origin",
  shortDescription:
    "Cyprus registers persons of Cypriot origin via Forms M121/M123/M126; the grandchild route requires the parent to have first registered as Cypriot. A discretionary Council of Ministers route exists for pre-1960 ancestor cases.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CY");
    const gp = grandparentsBornIn(p, "CY");
    const ancestors = ancestorsBornIn(p, "CY");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Cyprus-born parent (${par[0].key}).`],
        needToVerify: [
          "Your parent was a Cypriot citizen at the time of your birth.",
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Cyprus-born grandparent (${gp[0].key}).`,
          "Citizenship passes one generation at a time: your parent must first register as Cypriot before you can register.",
        ],
        needToVerify: [
          "Your parent has registered (or will register) as a Cypriot citizen.",
          "Documentary chain of vital records.",
        ],
      };
    }
    if (ancestors.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Cyprus-born ancestor (${ancestors[0].key}) further back than grandparent.`,
          "The discretionary Council of Ministers route may reach pre-1960 Ottoman/British Cyprus ancestors but is rarely granted on routine evidence.",
        ],
        needToVerify: [
          "Pre-1960 British-Cyprus or Ottoman-era documentation for the ancestor.",
          "Council of Ministers discretionary outcomes are non-statutorily quantified.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Cyprus-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Cypriot-citizen parent (or grandparent if the parent first registers).",
    "Council of Ministers discretionary route for extraordinary Cypriot-origin cases (e.g. pre-1960 ancestors).",
    "No language test; dual citizenship permitted.",
  ],
  documentsOutline: [
    "Cypriot ancestor's birth and citizenship records",
    "Birth and marriage certificates linking generations",
    "Form M121, M123, or M126 as appropriate",
    "Pre-1960 British-Cyprus or Ottoman documentation if applicable",
  ],
  caveats: [
    "Grandchild route requires parent to register first - common blocker for diaspora applicants whose parents have not engaged.",
    "Council of Ministers discretionary outcomes are not publicly quantified.",
  ],
  officialLinks: [
    {
      label: "Ministry of Interior - Acquisition of Cypriot Citizenship due to Cypriot Origin",
      url: "https://www.gov.cy/moi/en/ministry/departments/civil-registry-section/registry-office-2/cypriot-citizenship-nationality/acquisition-of-cypriot-citizenship-due-to-cypriot-origin/",
    },
    {
      label: "Cypriot nationality law overview",
      url: "https://en.wikipedia.org/wiki/Cypriot_nationality_law",
    },
    {
      label: "Global Citizen Solutions - Cypriot citizenship by descent",
      url: "https://www.globalcitizensolutions.com/cypriot-citizenship-by-descent/",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [2500, 8000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Grandchild route requires parent to register first; CoM-discretionary route exists but is non-statutorily quantified and rarely granted on routine evidence. Form-mapping in popular summaries is unreliable (M127 is naturalisation, not the Cypriot-origin discretionary form).",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
