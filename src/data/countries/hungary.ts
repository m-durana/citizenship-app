import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const hungaryDescent: Path = {
  id: "hu-descent",
  country: "Hungary",
  countryCode: "HU",
  flag: "🇭🇺",
  pathType: "descent",
  name: "Hungarian simplified naturalization (ethnic-Hungarian descent)",
  shortDescription:
    "Hungary offers simplified naturalization to descendants of Hungarian citizens with no strict generational limit. Targeted at ethnic Hungarians - basic Hungarian language ability is required at interview.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "HU");
    const gp = grandparentsBornIn(p, "HU");
    const ggp = greatGrandparentsBornIn(p, "HU");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Hungary-born ancestor (${closest.key}).`,
          "There is no generational limit if Hungarian citizenship can be traced.",
        ],
        needToVerify: [
          "Your ancestor was a Hungarian citizen (the program is for ethnic Hungarians, not anyone born within historical Hungarian borders).",
          "You can demonstrate basic conversational Hungarian at interview.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Hungary-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Documented Hungarian-citizen ancestor (any generation).",
    "Basic Hungarian language at interview.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Ancestor's Hungarian birth certificate, baptismal record, or citizenship document",
    "Birth/marriage certificates linking generations",
    "Proof of clean criminal record",
  ],
  caveats: [
    "Many Hungarian-language records sit in archives in Slovakia, Romania, Serbia, or Ukraine due to post-WWI border changes.",
    "Language requirement is informal but real - interviewers test basic conversation.",
  ],
  officialLinks: [
    {
      label: "Government of Hungary - citizenship",
      url: "https://www.kormany.hu/en",
    },
  ],
  estTimelineMonths: [12, 24],
  estCostUSD: [200, 1500],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "high",
    successNote:
      "Government data show ~670k oaths from ~710k filings (2015) and only ~23k refusals from 850k+ cases (2016). The consular Hungarian-language interview is the real gating factor.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: true,
      level: "Conversational Hungarian (informal interview)",
      note: "No formal written exam; consular interview tests two-way oral comprehension. Hungarian tutoring tends to matter more than legal counsel.",
    },
    knowledgeTest: {
      required: false,
      note: "Brief cultural questions during the interview, not a formal civics exam.",
    },
    singleSource: "government",
  },
};
