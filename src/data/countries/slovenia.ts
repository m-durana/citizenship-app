import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const sloveniaDescent: Path = {
  id: "si-descent",
  country: "Slovenia",
  countryCode: "SI",
  flag: "🇸🇮",
  pathType: "descent",
  name: "Slovenian citizenship for Slovenes abroad (Articles 12 and 13)",
  shortDescription:
    "Slovenia offers naturalisation for expatriates and their descendants up to the fourth generation under Article 12, and a streamlined Article 13/III route for second-generation descendants who can show at least five years of active membership in a recognised Slovenian expatriate society.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "SI");
    const gp = grandparentsBornIn(p, "SI");
    const ggp = greatGrandparentsBornIn(p, "SI");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Slovenia-born ancestor (${closest.key}).`,
          "Article 12 reaches up to the fourth generation; Article 13/III provides a streamlined route for second-generation descendants active in expatriate societies.",
        ],
        needToVerify: [
          "Genuine-connection assessment: Slovenian-language ability, ties to expatriate organisations, return visits.",
          "Age cap: declaration-based routes for those born abroad to one Slovenian parent must be filed by age 36.",
          "Article 12/I requires one year's continuous residence in Slovenia; Article 13/III can substitute five years' active expatriate-society membership.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Slovenia-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Slovenian expatriate or descendant up to the fourth generation (Article 12).",
    "Genuine-connection test: language, cultural ties, expatriate-society membership.",
    "Age 36 cap on declaration-based routes for those born abroad to one Slovenian parent.",
    "Dual citizenship permitted via descent / restoration provisions.",
  ],
  documentsOutline: [
    "Ancestor's Slovenian birth/citizenship records",
    "Birth and marriage certificates linking generations",
    "Evidence of expatriate-society membership (for Article 13/III)",
    "Slovenian-language certification or interview record",
  ],
  caveats: [
    "Discretionary genuine-connection test is non-trivial; Slovenian-language ability weighs heavily.",
    "Declaration-route applicants over age 36 are time-barred.",
  ],
  officialLinks: [
    {
      label: "Citizenship Act of the Republic of Slovenia (Refworld)",
      url: "https://www.refworld.org/legal/legislation/natlegbod/1999/en/14753",
    },
    {
      label: "Bernik Dimitrijevic - Slovenian citizenship by descent (2025)",
      url: "https://www.odb.si/en/2025/01/20/immigration-lawyer-slovenian-citizenship-by-descent-or-extraordinary-circumstance/",
    },
    {
      label: "CitizenX - Slovenia citizenship by descent",
      url: "https://citizenx.com/insights/slovenia-citizenship-by-descent",
    },
  ],
  estTimelineMonths: [12, 24],
  estCostUSD: [2000, 7000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Genuine-connection test plus age 36 cap on declaration routes filters out most distant-descent applicants; clean Article 13/III cases easier.",
    lawyerTypicallyNeeded: "yes",
    languageTest: {
      required: true,
      level:
        "informal Slovenian-ability assessment for Article 12 grandchild; B2 for ordinary naturalization",
      note: "Five-year active membership in expatriate society can substitute under Article 13/III.",
    },
    knowledgeTest: { required: false },
  },
};
