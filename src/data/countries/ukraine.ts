import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const ukraineArticle8: Path = {
  id: "ua-article-8",
  country: "Ukraine",
  countryCode: "UA",
  flag: "🇺🇦",
  pathType: "descent",
  name: "Ukrainian citizenship by territorial origin (Article 8)",
  shortDescription:
    "Article 8 of Ukraine's Citizenship Law offers simplified acquisition for persons whose parents, grandparents, great-grandparents, siblings, children or grandchildren were born or permanently resident on the territory of present-day Ukraine before 24 August 1991.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "UA");
    const gp = grandparentsBornIn(p, "UA");
    const ggp = greatGrandparentsBornIn(p, "UA");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Ukraine-born ancestor (${closest.key}).`,
          "Article 8 reaches up to great-grandparents and through siblings / children / grandchildren.",
        ],
        needToVerify: [
          "Original birth or permanent-residence record of the ancestor showing pre-24 Aug 1991 ties to present-day Ukrainian territory.",
          "From 16 January 2026: Ukrainian language exam plus Constitution and history exam are required.",
          "Russian-citizen applicants are suspended under martial law.",
          "Historic dual-citizenship restriction is being relaxed under the 2024 multiple-citizenship law but application is contested.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Ukraine-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Ancestor (up to great-grandparent) or sibling/child/grandchild born or permanently resident on present-day Ukrainian territory before 24 Aug 1991.",
    "Ukrainian language exam, Constitution exam, and history exam (effective 16 Jan 2026).",
    "Documentary chain of vital records.",
    "Suspended for Russian Federation citizens under martial law.",
  ],
  documentsOutline: [
    "Original birth or permanent-residence record of the qualifying ancestor",
    "Birth and marriage certificates linking generations",
    "Apostilled translations into Ukrainian",
    "Language and civics-exam results (post-Jan 2026)",
  ],
  caveats: [
    "Wartime conditions disrupt consular processing.",
    "Dual-citizenship rule is evolving; many applicants may still be expected to renounce.",
  ],
  officialLinks: [
    {
      label: "State Migration Service of Ukraine - Article 8",
      url: "https://dmsu.gov.ua/en-home/services/acquisition-of-ukrainian-citizenship/acquiring-ukrainian-citizenship-by-geographic-place-of-origin.html",
    },
    {
      label: "Pravdop - 2026 changes practitioner update",
      url: "https://pravdop.com/en/publications/novosti-kompaniy/kak-poluchit-grazhdanstvo-ukraini-po-territorialnomu-proishozhdeniyu-chto-izmenilos-v-2026-godu-01-2026-137/",
    },
    {
      label: "Ukrainian nationality law overview",
      url: "https://en.wikipedia.org/wiki/Ukrainian_nationality_law",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [1000, 4000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Reportedly suspended for RU-citizen applicants under martial law (not verified to primary-source standard); Jan-2026 language/civics exam regime is contested - the official DMSU territorial-origin service page does not list a language exam for this route. Archival burden for pre-1991 records remains heavy.",
    lawyerTypicallyNeeded: "yes",
    languageTest: {
      required: true,
      level: "Ukrainian (state-language exam, effective 16 January 2026)",
      note: "Contested: the official DMSU territorial-origin page lists no exam for this route, while practitioner summaries report a Jan-2026 regime. Pass mark not publicly specified.",
    },
    knowledgeTest: {
      required: true,
      note: "Constitution and history exam reported under 2026 amendments; not reflected on the official DMSU territorial-origin checklist.",
    },
    singleSource: "secondary",
  },
};
