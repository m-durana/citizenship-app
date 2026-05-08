import type { Path } from "../../types/path";
import { isTrue } from "../../engine/helpers";

export const austriaArticle58c: Path = {
  id: "at-article-58c",
  country: "Austria",
  countryCode: "AT",
  flag: "🇦🇹",
  pathType: "restoration",
  name: "Austrian citizenship by declaration (§58c StAG, persecution-restoration)",
  shortDescription:
    "Section 58c of the Austrian Citizenship Act lets victims of Nazi or Austrofascist persecution who fled before 15 May 1955, plus their direct descendants in unlimited generations, acquire Austrian citizenship by declaration without renouncing their existing nationality.",
  evaluate: (p) => {
    if (isTrue(p.heritage.naziPersecutionDescendant)) {
      return {
        tier: "likely",
        reasons: [
          "You marked at least one ancestor as persecuted by the Nazi or Austrofascist regime.",
          "§58c StAG (in force since 1 Sep 2020) extends Austrian citizenship to descendants of persecution victims with no generational limit, by declaration.",
          "Dual citizenship is explicitly allowed; no language or civics test.",
        ],
        needToVerify: [
          "The anchor ancestor left Austria before 15 May 1955 due to persecution (Jewish, political, ethnic, or other grounds).",
          "Documentary chain of birth/marriage records back to the persecuted Austrian.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "You did not indicate Nazi-era or Austrofascist persecution in your direct ancestry.",
        "If you discover an Austrian ancestor who fled before 15 May 1955 due to persecution, revisit this - the path has no generation cap.",
      ],
    };
  },
  requirementsSummary: [
    "Direct descent from a person persecuted by the Nazi or Austrofascist regime who left Austria before 15 May 1955.",
    "Unlimited generational reach.",
    "No language test, no civics test, no residence requirement.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Documentation of the anchor's persecution (Yad Vashem, IKG Vienna, DOEW, denaturalization gazettes)",
    "Anchor's pre-1955 Austrian residence / citizenship records",
    "Birth and marriage certificates linking each generation to the anchor",
    "Applicant's identity documents",
  ],
  caveats: [
    "Refusals concentrate on incomplete archival proof of persecution rather than substantive judgment.",
    "Genealogist or lawyer often needed for archival research in Vienna.",
  ],
  officialLinks: [
    {
      label: "BMEIA - Citizenship for Persecuted Persons and their Direct Descendants",
      url: "https://www.bmeia.gv.at/en/austrian-embassy-london/service-for-citizens/citizenship-for-persecuted-persons-and-their-direct-descendants",
    },
    {
      label: "Austrian Embassy - 2018 amendment background",
      url: "https://www.archive.austria.org/the-latest/2019/10/7/austrian-citizenship-descendants-victims-nazi-persecution",
    },
    {
      label: "Smartlaw.at - §58c practitioner overview",
      url: "https://smartlaw.at/en/austrian-citizenship-law/%C2%A758c-austrian-citizenship-persecuted-persons-jewish",
    },
  ],
  estTimelineMonths: [6, 24],
  estCostUSD: [0, 6000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Declarative path; clean persecution-anchor cases reportedly succeed at high rates, but no public BMI approval-rate dataset corroborates a precise figure.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
