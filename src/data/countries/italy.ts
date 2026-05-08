import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import {
  ancestorsBornIn,
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
    singleSource: "secondary",
  },
};

// Maternal-line keys: any path that begins with "mother" includes a woman in the line.
const MATERNAL_KEYS: AncestorKey[] = [
  "mother",
  "motherFather",
  "motherMother",
  "motherFatherFather",
  "motherFatherMother",
  "motherMotherFather",
  "motherMotherMother",
  "fatherMother",
  "fatherMotherFather",
  "fatherMotherMother",
  "fatherFatherMother",
];

export const italy1948MaternalLine: Path = {
  id: "it-1948-maternal-line",
  country: "Italy",
  countryCode: "IT",
  flag: "🇮🇹",
  pathType: "descent",
  name: "Italian citizenship - 1948 maternal-line judicial route",
  shortDescription:
    "Pre-1948 Italian women could not transmit citizenship under then-prevailing law. The 1948 maternal-line judicial route - grounded in Articles 3 and 29 of the Italian Constitution - lets descendants of such women claim Italian citizenship via civil-court action in Italy. Law 74/2025 did not eliminate this judicial route.",
  evaluate: (p) => {
    const italianAncestors = ancestorsBornIn(p, "IT");
    const maternalItalian = italianAncestors.filter((a) =>
      MATERNAL_KEYS.includes(a.key),
    );
    const preBirth1948 = maternalItalian.filter(
      (a) =>
        typeof a.ancestor.birthYear === "number" &&
        a.ancestor.birthYear < 1948,
    );

    if (preBirth1948.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Italian-born woman in your maternal line born before 1948 (${preBirth1948[0].key}).`,
          "Pre-1948 Italian women could not transmit citizenship under then-prevailing law; the judicial route in Italian civil courts allows descendants to claim citizenship despite this gendered exclusion.",
          "Law 74/2025 tightened administrative claims but the maternal-line judicial route remains open with no firm generational cap.",
        ],
        needToVerify: [
          "Filed as a civil-court action in Italy (not via consulate); lawyer essentially required.",
          "Documented chain of vital records establishing the pre-1948 Italian woman in the line.",
          "Court-route timelines and costs are materially higher than administrative paths.",
        ],
      };
    }

    if (maternalItalian.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Italian-born woman in your maternal line (${maternalItalian[0].key}).`,
          "If she was born before 1948 (and the gendered transmission rule applied), the judicial route in Rome civil court may be available.",
        ],
        needToVerify: [
          "Whether the Italian-born woman in the line was born before 1948.",
          "Whether the chain establishes a gendered exclusion that the judicial route can remedy.",
        ],
      };
    }

    return {
      tier: "unlikely",
      reasons: [
        "No Italian-born woman recorded in your maternal line.",
        "The 1948 maternal-line route applies only to descendants of pre-1948 Italian women whose citizenship was non-transmissible at the time.",
      ],
    };
  },
  requirementsSummary: [
    "Documented chain establishing a pre-1948 woman in the line who lost or could not transmit Italian citizenship.",
    "Civil-court action in Italy (not consular).",
    "Lawyer essentially required.",
    "No language test, no civics test.",
  ],
  documentsOutline: [
    "Italian birth certificate of the pre-1948 woman in the line",
    "Marriage and birth certificates linking each generation",
    "Apostilled translations into Italian",
    "Italian lawyer engagement and power of attorney",
  ],
  caveats: [
    "Judicial process is expensive and requires Italian counsel.",
    "Law 74/2025 created a procedural overlay but did not eliminate this court route.",
  ],
  officialLinks: [
    {
      label: "Boccadutri - Italian citizenship via court proceedings",
      url: "https://www.boccadutri.com/obtaining-italian-citizenship-through-legal-proceedings/",
    },
    {
      label: "Italy Law Firms - Jus sanguinis 2025 reform",
      url: "https://italylawfirms.com/en/the-jus-sanguinis-2025-reform-italian-citizenship-law/",
    },
    {
      label: "Italian Citizenship Assistance - DL 36/2025 conversion",
      url: "https://italiancitizenshipassistance.com/decree-law-no-36-2025-conversion-into-law/",
    },
  ],
  estTimelineMonths: [18, 48],
  estCostUSD: [7000, 20000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Court route via Italian civil courts; clean cases largely succeed but 2025 reform created procedural overlay. Lawyer essentially required.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};

