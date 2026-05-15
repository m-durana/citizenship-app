import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Maternal-line parent keys: used for the 2019 maternal-amendment flag.
const MATERNAL_PARENT_KEYS: AncestorKey[] = ["mother"];

export const iranDescent: Path = {
  id: "ir-descent",
  country: "Iran",
  countryCode: "IR",
  flag: "🇮🇷",
  pathType: "descent",
  // sourceRefreshPending: 2026-05-15 — A2 explicitly flagged that Iran requires a Persian-primary source refresh before shipping.
  name: "Iranian citizenship by descent (Civil Code Arts. 976–991)",
  shortDescription:
    "Article 976(2) of the Iranian Civil Code confers Iranian nationality automatically and indefinitely on the child of an Iranian father. The 2019 maternal amendment (ratified 2020) allows children of an Iranian mother and a foreign father to APPLY for Iranian nationality, subject to security clearance. Dual citizenship is not recognized in practice: inside Iran, dual nationals are treated as Iranian only. Iran has no consulate in the United States; the Iranian Interests Section of the Pakistan Embassy in Washington handles consular matters.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "IR");
    const paternalLine = par.some((x) => !MATERNAL_PARENT_KEYS.includes(x.key));
    const maternalOnly = par.length > 0 &&
      par.every((x) => MATERNAL_PARENT_KEYS.includes(x.key));

    const conscriptionVerify =
      "Iran military conscription: all male Iranian citizens are subject to ~18 months of conscription from age 18. You cannot obtain an Iranian passport without a service card (kart-e payan-e khedmat) or formal exemption. Conscription liability discovered at the airport on Iranian-passport entry is a documented risk. A diaspora paid exemption (kharid-e khedmat) is reportedly available around age 50+; thresholds shift politically and should be confirmed.";
    const dualVerify =
      "Iran does not recognize dual citizenship in practice. Inside Iran, dual nationals are treated as Iranian only - foreign passports, foreign consular protection, and foreign legal status are disregarded.";
    const renunciationVerify =
      "Renunciation under Civil Code Art. 988 requires Council of Ministers approval and is rarely granted in practice.";
    const consulateVerify =
      "There is no Iranian consulate in the United States. Consular matters for US-based applicants are handled by the Iranian Interests Section of the Pakistan Embassy in Washington, DC.";
    const securityClearanceVerify =
      "2019 maternal-amendment applications require security clearance from Iranian authorities. Outcomes are unpredictable and timelines are not statutorily fixed.";

    if (paternalLine) {
      return {
        tier: "likely",
        reasons: [
          `You have an Iranian-linked father (${par.find((x) => !MATERNAL_PARENT_KEYS.includes(x.key))?.key}).`,
          "Civil Code Art. 976(2) confers Iranian nationality automatically on the child of an Iranian father, indefinitely, without an application requirement.",
        ],
        needToVerify: [
          "Father's shenasnameh (national ID booklet) or other proof of Iranian nationality at your birth.",
          conscriptionVerify,
          dualVerify,
          renunciationVerify,
          consulateVerify,
        ],
      };
    }
    if (maternalOnly) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Iranian-linked mother (${par[0].key}).`,
          "The 2019 maternal amendment (ratified 2020) permits children of an Iranian mother and a foreign father to APPLY for Iranian nationality. Acquisition is not automatic and is subject to security clearance.",
          "Adult children born pre-reform can apply on reaching 18.",
        ],
        needToVerify: [
          securityClearanceVerify,
          conscriptionVerify,
          dualVerify,
          renunciationVerify,
          consulateVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Civil Code Art. 976(2) requires an Iranian father (paternal-line, indefinite) or, under the 2019 amendment, an Iranian mother (application-based).",
        "Grandparent-only links do not confer Iranian nationality by descent.",
      ],
    };
  },
  requirementsSummary: [
    "Iranian father at the time of your birth (Civil Code Art. 976(2), automatic and indefinite).",
    "OR Iranian mother (2019 amendment, ratified 2020): apply with security clearance.",
    "Dual citizenship not recognized in practice (Iran treats Iranian-only inside Iran).",
    "Male citizens subject to ~18 months conscription from age 18; no passport without service card or exemption.",
    "Renunciation under Art. 988 requires Council of Ministers approval.",
  ],
  documentsOutline: [
    "Iranian father's shenasnameh and current national ID (kart-e melli)",
    "OR Iranian mother's shenasnameh and current national ID (for 2019-amendment applications)",
    "Applicant's foreign birth certificate and current passport",
    "Parents' marriage certificate",
    "Translations into Persian by a licensed Iranian translator",
    "For applicants in the US: filings via the Iranian Interests Section of the Pakistan Embassy in Washington",
  ],
  caveats: [
    "Conscription liability for adult males is the dominant practical risk; service-card or exemption is required before any Iranian passport can be issued.",
    "2019 maternal-amendment cases require security clearance and have unpredictable outcomes.",
    "Dual citizenship is not recognized inside Iran; foreign consular protection is disregarded.",
    "No Iranian consulate in the United States; consular matters routed through Pakistan Embassy's Iranian Interests Section.",
    "Renunciation under Art. 988 requires Council of Ministers approval and is rarely granted.",
    "OFAC and sanctions compliance is the applicant's responsibility.",
  ],
  officialLinks: [
    {
      label: "Iranian Parliament Research Center - Civil Code",
      url: "https://rc.majlis.ir/",
    },
    {
      label: "Office of the President of Iran",
      url: "https://www.president.ir/en",
    },
    {
      label: "Embassy of Iran - Consular Affairs (general)",
      url: "https://en.mfa.gov.ir/",
    },
  ],
  estTimelineMonths: [6, 36],
  estCostUSD: [100, 1000],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Paternal-line cases with a clean shenasnameh succeed reliably as a matter of statute. 2019 maternal-amendment applications are security-clearance-dependent and unpredictable. Conscription liability and sanctions compliance are the dominant practical risks. A2 explicitly flagged a Persian-primary source refresh as required before shipping.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
