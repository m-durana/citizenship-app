import type { Path } from "../../types/path";
import { grandparentsBornIn, parentsBornIn } from "../../engine/helpers";

export const ghanaDescent: Path = {
  id: "gh-descent",
  country: "Ghana",
  countryCode: "GH",
  flag: "🇬🇭",
  pathType: "descent",
  name: "Ghanaian citizenship by descent (Article 6 / Act 591)",
  shortDescription:
    "Article 6 of the 1992 Constitution and the Citizenship Act 2000 (Act 591) recognise persons born on or after 7 January 1993 as Ghanaian by birth if at the date of birth either parent or one grandparent was a Ghanaian citizen.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "GH");
    const gp = grandparentsBornIn(p, "GH");
    const selfBirthYear = p.self.birthYear;
    const post1993 =
      typeof selfBirthYear === "number" ? selfBirthYear >= 1993 : undefined;
    if (par.length || gp.length) {
      const closest = par[0] ?? gp[0];
      if (post1993 === false) {
        return {
          tier: "unlikely",
          reasons: [
            `You have a Ghana-born ancestor (${closest.key}), but the modern descent rule applies to births on or after 7 January 1993.`,
            "Ghana separately offers a Right of Abode for African-descent diaspora (residence, not citizenship).",
          ],
        };
      }
      return {
        tier: "likely",
        reasons: [
          `You have a Ghana-born ancestor (${closest.key}).`,
          "Article 6 / Act 591 recognises grandparent-anchored descent for births on or after 7 January 1993.",
        ],
        needToVerify: [
          "Documentary chain back to a Ghanaian-citizen parent or grandparent.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Ghana-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Born on or after 7 January 1993 with a Ghanaian-citizen parent or grandparent.",
    "Dual citizenship permitted since the 2000 amendments.",
    "No language test, no civics test.",
  ],
  documentsOutline: [
    "Ghanaian-citizen ancestor's birth and citizenship records",
    "Birth and marriage certificates linking generations",
    "Applicant's identity documents",
  ],
  caveats: [
    "The 7 January 1993 cutoff is the practical filter for older diaspora.",
    "Older diaspora can use the separate Right of Abode (residence, not citizenship).",
  ],
  officialLinks: [
    {
      label: "Citizenship Act 2000 (Act 591) - statutory text",
      url: "http://citizenshiprightsafrica.org/wp-content/uploads/2016/02/Ghana_Citizenship_Act_with_forms_591_2000.pdf",
    },
    {
      label: "Ghanaian nationality law overview",
      url: "https://en.wikipedia.org/wiki/Ghanaian_nationality_law",
    },
    {
      label: "ghanacitizenship.com - Act 591 plain-English guide",
      url: "https://ghanacitizenship.com/ghana-citizenship-act-explained/",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [1000, 4000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Grandparent reach for births on or after 7 Jan 1993; older diaspora must use Right-of-Abode (residence, not citizenship). Document burden is the main filter.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
