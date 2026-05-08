import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const serbiaArticle23: Path = {
  id: "rs-article-23",
  country: "Serbia",
  countryCode: "RS",
  flag: "🇷🇸",
  pathType: "heritage",
  name: "Serbian citizenship for members of the Serbian people (Article 23)",
  shortDescription:
    "Article 23 of the Serbian Citizenship Law admits adult members of the Serbian people to Serbian citizenship without renouncing their existing nationality, on a written declaration that they regard Serbia as their state.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "RS");
    const ancestors = ancestorsBornIn(p, "RS");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Serbia-born parent (${par[0].key}).`,
          "Article 23 admits members of the Serbian people abroad without requiring residence in Serbia, language test, or civics test.",
        ],
        needToVerify: [
          "You self-identify as a member of the Serbian people (this engine has no ethnic-Serb flag and uses birth country as a proxy).",
          "Supporting documents identifying you or your ancestor as Serb (church record, census, Yugoslav citizenship doc).",
        ],
      };
    }
    if (ancestors.length) {
      const closest = ancestors[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Serbia-born ancestor (${closest.key}).`,
          "Article 23 has no firm generational cap and a permissive evidentiary standard.",
        ],
        needToVerify: [
          "You self-identify as a member of the Serbian people (engine uses birth country as a proxy for ethnic-Serb status).",
          "Documentary support: any public document identifying you or an ancestor as Serb.",
          "Written statement that you consider Serbia your state.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Serbia-born ancestor recorded and no ethnic-Serb indicator captured.",
        "Article 23 still allows ethnic-Serb applicants from outside the territory; if you are an ethnic Serb, contact a Serbian consulate to discuss documentary support.",
      ],
    };
  },
  requirementsSummary: [
    "Adult applicant declares membership in the Serbian people.",
    "Supporting documents identifying applicant or ancestor as Serb.",
    "Written statement that the applicant regards Serbia as their state.",
    "No residence in Serbia required; no language or civics test; dual citizenship permitted.",
  ],
  documentsOutline: [
    "Public document identifying applicant or ancestor as Serb (church record, census, Yugoslav citizenship document, school record)",
    "Birth/marriage certificates linking generations to a Serb ancestor",
    "Written declaration regarding Serbia as one's state",
    "Applicant's identity documents",
  ],
  caveats: [
    "Embassies vary in how strictly they parse origin documents; conversion-rate not publicly published.",
    "This engine uses birthCountry as a proxy for ethnic-Serb identity; future schema should add an ethnic-Serb flag.",
    "Refusals tied to weak ethnic-origin proof or political-security flags.",
  ],
  officialLinks: [
    {
      label: "Ministry of Foreign Affairs of Serbia - Citizenship",
      url: "https://www.mfa.gov.rs/en/citizens/services/citizenship",
    },
    {
      label: "Stojkovic Attorneys - Article 23 admission",
      url: "https://immigratetoserbia.com/request-for-admission-to-the-citizenship-of-the-republic-of-serbia-for-members-of-the-serbian-people-article-23-of-the-law/",
    },
    {
      label: "Zunic Law - Serbian citizenship by descent",
      url: "https://zuniclaw.com/en/serbian-citizenship-by-descent/",
    },
  ],
  estTimelineMonths: [6, 24],
  estCostUSD: [500, 3000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Permissive statutory standard but consular practice still demands ethnicity proof and translated/apostilled records. No publishable approval-rate or median-time data found.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
