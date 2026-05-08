import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const croatiaDescent: Path = {
  id: "hr-descent",
  country: "Croatia",
  countryCode: "HR",
  flag: "🇭🇷",
  pathType: "descent",
  name: "Croatian citizenship by descent / origin",
  shortDescription:
    "Citizens of Croatian origin (descendants up to great-grandparents) can acquire Croatian citizenship under the Citizenship Act.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "HR");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a parent born in Croatia (${par[0].key}).`],
      };
    }
    const gp = grandparentsBornIn(p, "HR");
    const ggp = greatGrandparentsBornIn(p, "HR");
    if (gp.length || ggp.length) {
      const closest = gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have an ancestor of Croatian origin born in Croatia (${closest.key}).`,
        ],
        needToVerify: [
          "Your ancestor did not leave Croatia before 8 October 1991 and migrate to another former-Yugoslav state - that disqualifies the line.",
          "Your ancestor's Croatian ethnic origin can be documented.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No ancestor born in Croatia recorded."],
    };
  },
  requirementsSummary: [
    "Croatian-origin parent, grandparent, or great-grandparent.",
    "Knowledge of Croatian language and culture required.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Ancestor's Croatian birth certificate / domovnica (citizenship certificate)",
    "Proof of Croatian ethnicity (church records, family registers)",
    "Birth/marriage certificates linking generations",
  ],
  caveats: [
    "Pre-1991 emigration to another former-Yugoslav state is a hard exclusion.",
    "Language requirement is interview-style - informal but real.",
  ],
  officialLinks: [
    {
      label: "Ministry of the Interior - Croatian Citizenship",
      url: "https://mup.gov.hr/citizenship-186/186",
    },
  ],
  estTimelineMonths: [12, 30],
  estCostUSD: [300, 1500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Post-2020 Article 16 amendments removed the Croatian language and culture test for descent applicants. Pre-1991 Yugoslav-state migration remains a hard exclusion.",
    lawyerTypicallyNeeded: "optional",
    languageTest: {
      required: false,
      note: "Descent applicants are exempt from the language/culture test post-2020. Naturalization-by-residency still requires B1.",
    },
    knowledgeTest: { required: false },
  },
};

export const croatiaArticle16: Path = {
  id: "hr-article-16",
  country: "Croatia",
  countryCode: "HR",
  flag: "🇭🇷",
  pathType: "heritage",
  name: "Croatian citizenship for members of the Croatian people (Article 16, post-2020)",
  shortDescription:
    "Article 16 of the Croatian Citizenship Act (post-1 Jan 2020 amendment) grants citizenship to 'members of the Croatian people' residing abroad on demonstration of Croatian-people belonging. The 2020 amendment removed the language and culture test and clarified the evidentiary standard.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "HR");
    const gp = grandparentsBornIn(p, "HR");
    const ggp = greatGrandparentsBornIn(p, "HR");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Croatia-born ancestor (${closest.key}).`,
          "Article 16 (post-2020) accepts ethnic-belonging declaration plus supporting public-document evidence; no language/culture test; renunciation of foreign nationality not required.",
        ],
        needToVerify: [
          "You self-identify as a member of the Croatian people (this engine has no ethnic-Croat flag and uses birth country as a proxy).",
          "Supporting evidence: self-declaration in legal transactions, mention in public documents, protection of Croatian-people interests, or active participation in Croatian cultural/scientific/sports organisations abroad.",
          "Statement that Croatia is regarded as your state.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Croatia-born ancestor recorded and no ethnic-Croat indicator captured.",
        "Article 16 still allows ethnic-Croat applicants outside Croatia; if you self-identify as Croat, contact a Croatian consulate to discuss documentary support.",
      ],
    };
  },
  requirementsSummary: [
    "Membership in the Croatian people (self-declaration plus supporting public-document evidence).",
    "Statement that Croatia is regarded as the applicant's state.",
    "No language or culture test (removed by 1 Jan 2020 amendment).",
    "Renunciation of foreign nationality NOT required for Article 16 applicants.",
  ],
  documentsOutline: [
    "Public-document evidence of Croatian ethnic belonging (church record, declaration in legal transactions, organisation membership)",
    "Statement regarding Croatia as one's state",
    "Birth and marriage certificates (chain not strictly required)",
    "Applicant's identity documents",
  ],
  caveats: [
    "This engine uses birthCountry as a proxy for ethnic-Croat identity; future schema should add an ethnic-Croat flag.",
    "Active participation in a Croatian cultural / scientific / sports organisation abroad is one accepted evidence type.",
  ],
  officialLinks: [
    {
      label: "Expat in Croatia - Article 16 guide (2026)",
      url: "https://www.expatincroatia.com/croatian-people-citizenship/",
    },
    {
      label: "Croatian By Descent - Proof of belonging",
      url: "https://croatianbydescent.com/proof-of-belonging-croatian-people",
    },
    {
      label: "Refworld - Croatia Citizenship Act",
      url: "https://www.refworld.org/legal/legislation/natlegbod/2020/123071",
    },
  ],
  estTimelineMonths: [12, 24],
  estCostUSD: [1500, 5000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "2020 amendment removed language/culture test and clarified evidence standard; ethnic-belonging declaration with supporting public docs accepted.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: false,
      note: "2020 amendment removed the language and culture test for Article 16 applicants.",
    },
    knowledgeTest: { required: false },
  },
};
