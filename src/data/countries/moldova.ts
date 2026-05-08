import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const moldovaTerritorialOrigin: Path = {
  id: "md-territorial-origin",
  country: "Moldova",
  countryCode: "MD",
  flag: "🇲🇩",
  pathType: "restoration",
  name: "Moldovan citizenship by territorial origin (Bessarabia / pre-1940)",
  shortDescription:
    "Law 1024/2000 recognises descendants up to roughly the third degree of persons born or resident in Bessarabia, northern Bukovina, the Hertsa region, or the Moldovan SSR before 28 June 1940.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "MD");
    const gp = grandparentsBornIn(p, "MD");
    const ggp = greatGrandparentsBornIn(p, "MD");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Moldova-born ancestor (${closest.key}).`,
          "Recognition / recovery is available for descendants of pre-1940 Bessarabia residents and Moldovan SSR citizens.",
        ],
        needToVerify: [
          "Documented ancestor born or resident in qualifying territory before 28 June 1940 (Bessarabia, Bukovina, Hertsa).",
          "Basic Romanian-language ability and a knowledge test on the Moldovan Constitution.",
          "Many Bessarabia-line applicants also qualify for Romanian citizenship (often the practitioner-preferred route for EU access).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Moldova-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Documented ancestor born or resident in pre-1940 Bessarabia / Bukovina / Hertsa, or in the Moldovan SSR.",
    "Basic Romanian language test plus knowledge of the Moldovan Constitution.",
    "Chain of vital records via Moldovan and Romanian state archives.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Pre-1940 birth or residence record of the qualifying ancestor",
    "Birth and marriage certificates linking each generation",
    "Apostilled translations into Romanian",
    "Romanian-language certification or interview record",
  ],
  caveats: [
    "Many practitioners route applicants to Romanian citizenship for EU access instead.",
    "Pass mark for the language and constitution exam is not publicly specified.",
  ],
  officialLinks: [
    {
      label: "moldovacitizenship.md - Citizenship by descent",
      url: "https://moldovacitizenship.md/en/moldovan-citizenship-by-descent/",
    },
    {
      label: "CitizenX - Moldova citizenship by descent",
      url: "https://citizenx.com/insights/moldova-citizenship-by-descent",
    },
    {
      label: "Embassy of Moldova - Citizenship",
      url: "https://china.mfa.gov.md/en/content/citizenship",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [500, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Documented Bessarabia/pre-1940 line; recognition checklist may not require a language exam (the official consular checklist does not list one), though some summaries cite a Romanian/Constitution test. Many practitioners route applicants to Romanian citizenship for EU access instead.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: true,
      level: "basic Romanian (oral/written conversational)",
      note: "Contested: official Article 12 recognition checklist does not list a language exam, though some practitioner summaries report one. Pass mark, where applied, is not publicly specified.",
    },
    knowledgeTest: {
      required: true,
      note: "Constitution-knowledge component reported in some summaries but not on the official recognition checklist.",
    },
  },
};
