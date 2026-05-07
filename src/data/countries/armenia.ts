import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  isTrue,
  parentsBornIn,
} from "../../engine/helpers";

export const armeniaDescent: Path = {
  id: "am-descent",
  country: "Armenia",
  countryCode: "AM",
  flag: "🇦🇲",
  pathType: "descent",
  name: "Armenian citizenship by ethnic origin",
  shortDescription:
    "Armenia grants citizenship to people of Armenian descent without strict generational limits, on the basis of documented ethnic-Armenian heritage.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "AM");
    const gp = grandparentsBornIn(p, "AM");
    const ggp = greatGrandparentsBornIn(p, "AM");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "likely",
        reasons: [`You have an Armenia-born ancestor (${closest.key}).`],
        needToVerify: [
          "Documentary proof of Armenian ethnicity (church records, baptismal certificates, family records).",
        ],
      };
    }
    if (isTrue(p.heritage.armenianGenocideDescendant)) {
      return {
        tier: "possibly",
        reasons: [
          "You marked Armenian descent (e.g. genocide-era diaspora ancestor).",
          "Armenia accepts ethnic-Armenian applicants without strict generational caps.",
        ],
        needToVerify: [
          "Documentary proof of Armenian ethnicity for the ascending ancestor.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Armenia-born ancestor or Armenian descent recorded."],
    };
  },
  requirementsSummary: [
    "Documented Armenian ethnic origin.",
    "No language test for the descent route.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Apostolic Church baptismal records or other ethnic-Armenian heritage documents",
    "Birth/marriage certificates linking generations",
    "Apostilled translations into Armenian",
  ],
  caveats: [
    "Many diaspora records sit in Lebanon, France, Turkey, Syria, and the US - archival research may be needed.",
  ],
  officialLinks: [
    {
      label: "Police of the Republic of Armenia - Citizenship",
      url: "https://www.police.am/en/",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [200, 1200],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "No generation cap, no language or civics test. State fee ~50,000 AMD (~$130). Processing ~90 working days; fully digital portal from 2026.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: true,
  },
};
