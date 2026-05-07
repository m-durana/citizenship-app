import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const italyDescent: Path = {
  id: "it-descent",
  country: "Italy",
  countryCode: "IT",
  flag: "🇮🇹",
  pathType: "descent",
  name: "Italian citizenship jure sanguinis (post-Law 74/2025)",
  shortDescription:
    "Italy's 2025 citizenship reform (Law 74/2025) limits jure sanguinis to two generations: applicants must have an Italian-born parent or grandparent. The Constitutional Court upheld these limits in March 2026.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "IT");
    const gp = grandparentsBornIn(p, "IT");
    const ggp = greatGrandparentsBornIn(p, "IT");

    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have an Italian-born parent (${par[0].key}).`],
      };
    }
    if (gp.length) {
      return {
        tier: "likely",
        reasons: [
          `You have an Italian-born grandparent (${gp[0].key}).`,
          "Two-generation eligibility is preserved under Law 74/2025.",
        ],
        needToVerify: [
          "Your grandparent did not naturalize elsewhere before your parent was born (would break the chain).",
          "If your claim runs through a maternal line and the relevant ancestor was born before 1 Jan 1948, the case must be filed in court rather than at a consulate.",
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "unlikely",
        reasons: [
          `You have an Italian-born great-grandparent (${ggp[0].key}), but Law 74/2025 (effective 24 May 2025) cut jure sanguinis to two generations.`,
          "Italy's Constitutional Court upheld this limit on 12 Mar 2026.",
          "Exception: applications filed (or appointments confirmed) before 23:59 Rome time on 27 Mar 2025 are evaluated under the prior unlimited-generation rules.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Italian-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Italian-born parent OR grandparent (post-Law 74/2025).",
    "Unbroken citizenship chain - no naturalization elsewhere before the next-generation child was born.",
    "No language test for jure sanguinis at consulates.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Italian birth certificate of the qualifying ancestor (estratto dell'atto di nascita)",
    "Naturalization records (or proof of non-naturalization) of the Italian ancestor",
    "Birth, marriage, and death certificates linking each generation",
    "Apostilled translations into Italian by an authorized translator",
    "Applicant's current passport and residency proof",
  ],
  caveats: [
    "Backlogs are long - court paths frequently 24–48 months; consular paths similar.",
    "Pre-1948 maternal line: must be filed in court (not consulate).",
    "Naturalization of the Italian ancestor before the next generation's birth breaks the line.",
  ],
  officialLinks: [
    {
      label: "Ministero degli Affari Esteri - Cittadinanza",
      url: "https://www.esteri.it/en/servizi-consolari-e-visti/italiani-all-estero/cittadinanza/",
    },
    {
      label: "Law 74/2025 - Gazzetta Ufficiale",
      url: "https://www.gazzettaufficiale.it/",
    },
  ],
  estTimelineMonths: [18, 48],
  estCostUSD: [600, 5000],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "moderate",
    successNote:
      "Practitioners report ~80% approval when documentation meets Ministry technical specs. Law 74/2025 caps eligibility at parent or grandparent. Consular backlogs run 2-10 years at major US posts.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: true,
  },
};
