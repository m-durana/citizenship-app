import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const ethiopiaYellowCard: Path = {
  id: "et-yellow-card",
  country: "Ethiopia",
  countryCode: "ET",
  flag: "🇪🇹",
  pathType: "heritage",
  name: "Ethiopia Origin ID (Yellow Card) - Proclamation 270/2002 - NOT CITIZENSHIP",
  shortDescription:
    "The Ethiopian Origin ID Card (commonly: Yellow Card) is a DIASPORA RIGHTS CARD, NOT Ethiopian citizenship. Ethiopia bans dual citizenship under Nationality Proclamation 378/2003; the Yellow Card is the statutory substitute. Issued under Proclamation 270/2002 (Federal Negarit Gazeta, 5 February 2002) and Regulation 101/2004, with eligibility reaching up to a great-grandparent (three generations). Eritrean nationality of self or any ancestor is a HARD STATUTORY BAR.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "ET");
    const gp = grandparentsBornIn(p, "ET");
    const ggp = greatGrandparentsBornIn(p, "ET");
    const eritreaBar = ancestorsBornIn(p, "ER");

    const eritreaVerify =
      "Ethiopia Yellow Card hard bar: Eritrean nationality of yourself or any ancestor is a statutory disqualification under Proclamation 270/2002. Confirm none of your ancestors ever held Eritrean nationality before applying.";
    const greatGrandparentVerify =
      "Yellow Card eligibility reaching great-grandparents (three generations) is supported by Proclamation 270/2002 as read in Refworld, but A2 could not verify this cleanly against the official Ethiopian digital sources. Confirm great-grandparent claims with the nearest Ethiopian mission.";
    const restrictionsVerify =
      "Yellow Card holders cannot work in the military, NISS (National Intelligence and Security Service), Foreign Affairs, or hold elective office. It is a heritage status, not citizenship.";
    const dualBanVerify =
      "Ethiopia bans dual citizenship under Nationality Proclamation 378/2003. Acquiring Ethiopian citizenship requires renouncing your other nationality - the Yellow Card is the statutory substitute that preserves your foreign citizenship.";
    const feeVerify =
      "Yellow Card fees are reported in a wide range ($100–$500) and differ across consulates. Confirm the current fee with the issuing mission before applying.";

    if (eritreaBar.length > 0) {
      return {
        tier: "unlikely",
        reasons: [
          "Eritrea-link hard bar: you indicated an ancestor with Eritrean nationality.",
          "Proclamation 270/2002 excludes persons with Eritrean nationality (self or ancestor) from the Yellow Card.",
        ],
        needToVerify: [
          "Whether the Eritrean link is actually in the disqualifying scope.",
          eritreaVerify,
        ],
      };
    }
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have an Ethiopian-linked parent (${par[0].key}).`,
          "Proclamation 270/2002 grants Origin ID eligibility to the child of a former Ethiopian.",
          "The Yellow Card is a HERITAGE STATUS, not citizenship.",
        ],
        needToVerify: [
          eritreaVerify,
          dualBanVerify,
          restrictionsVerify,
          feeVerify,
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Ethiopian-linked grandparent (${gp[0].key}).`,
          "Yellow Card eligibility extends to grandchildren of former Ethiopians under the Refworld reading of Proclamation 270/2002.",
        ],
        needToVerify: [
          eritreaVerify,
          dualBanVerify,
          restrictionsVerify,
          feeVerify,
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Ethiopian-linked great-grandparent (${ggp[0].key}).`,
          "Three-generation reach (great-grandparent inclusion) is supported by Refworld text but is not cleanly verifiable on official Ethiopian digital sources.",
        ],
        needToVerify: [
          greatGrandparentVerify,
          eritreaVerify,
          dualBanVerify,
          restrictionsVerify,
          feeVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Ethiopian-linked parent, grandparent, or great-grandparent recorded.",
        "Yellow Card requires a qualifying Ethiopian ancestor within three generations.",
      ],
    };
  },
  requirementsSummary: [
    "Yellow Card is a DIASPORA RIGHTS CARD, NOT Ethiopian citizenship.",
    "A qualifying Ethiopian ancestor (self/parent/grandparent/great-grandparent) under Proclamation 270/2002.",
    "HARD BAR: Eritrean nationality of self or any ancestor.",
    "Dual citizenship banned (Nationality Proclamation 378/2003); the Yellow Card is the statutory substitute.",
    "Holders cannot work in the military, NISS, Foreign Affairs, or hold elective office.",
  ],
  documentsOutline: [
    "Qualifying ancestor's old Ethiopian passport, kebele ID, or other proof of former Ethiopian nationality",
    "Birth certificates linking each generation to the qualifying ancestor",
    "Self-declaration that no ancestor in scope has ever held Eritrean nationality",
    "Applicant's current passport and recent photographs",
    "Application form filed with the nearest Ethiopian mission or with Immigration in Addis",
  ],
  caveats: [
    "Yellow Card is NOT Ethiopian citizenship.",
    "Eritrean-nationality hard bar is statutory.",
    "Civic restrictions: no military, NISS, Foreign Affairs, or elective office.",
    "Great-grandparent eligibility is supported by Refworld but not cleanly visible on official Ethiopian digital sources.",
    "Fees vary widely by consulate; ranges of $100–$500 are reported.",
  ],
  officialLinks: [
    {
      label: "Ministry of Foreign Affairs (Ethiopia)",
      url: "https://www.mfa.gov.et/",
    },
    {
      label: "Immigration and Citizenship Service (Ethiopia)",
      url: "https://www.immigration.gov.et/",
    },
    {
      label: "Refworld - Proclamation 270/2002",
      url: "https://www.refworld.org/docid/4e5cf3022.html",
    },
  ],
  estTimelineMonths: [1, 3],
  estCostUSD: [100, 500],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct-parent Yellow Card applications with old Ethiopian documentation succeed reliably. Great-grandparent claims are documentation-dependent. The Eritrean-link hard bar and fee variability are the main practical obstacles.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
