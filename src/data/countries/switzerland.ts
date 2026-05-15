import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const switzerlandDescent: Path = {
  id: "ch-descent",
  country: "Switzerland",
  countryCode: "CH",
  flag: "🇨🇭",
  pathType: "descent",
  name: "Swiss citizenship by descent (jus sanguinis)",
  shortDescription:
    "Switzerland transmits citizenship by descent through any Swiss-citizen parent (no first-generation cap), but children born abroad must be registered with a Swiss representation and declare intent to retain citizenship before age 25 (formerly 22), or the right lapses for them AND their descendants.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CH");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a parent linked to Switzerland (${par[0].key}).`,
          "Children of a Swiss-citizen parent acquire Swiss citizenship at birth.",
        ],
        needToVerify: [
          "Your parent was a Swiss citizen at the time of your birth (not just born in Switzerland — Switzerland has no jus soli).",
          "If you were born abroad, you were registered with a Swiss representation before age 25 to retain Swiss citizenship.",
        ],
      };
    }
    const gp = grandparentsBornIn(p, "CH");
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a grandparent linked to Switzerland (${gp[0].key}).`,
          "Swiss citizenship passes through any number of generations as long as each generation born abroad registered before the cutoff age (25, formerly 22).",
        ],
        needToVerify: [
          "Your Swiss grandparent's child (your parent) was registered with the Swiss authorities and declared intent to retain citizenship before age 25 / 22.",
          "If that registration step was skipped, the chain is broken and the route is closed.",
        ],
      };
    }
    const ggp = greatGrandparentsBornIn(p, "CH");
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a great-grandparent linked to Switzerland (${ggp[0].key}).`,
          "There is no formal generation cap, but every intermediate generation born abroad must have registered/declared on time. With three generations abroad the chain is rarely intact.",
        ],
        needToVerify: [
          "Every intermediate generation registered with Swiss authorities and declared intent to retain citizenship before the cutoff age.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Swiss-citizen parent or Swiss-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "A Swiss-citizen parent at the time of your birth (Switzerland has no jus soli).",
    "If born abroad: registered with a Swiss representation and declared intent to retain Swiss citizenship before age 25 (age 22 for those born before 1 Jan 2018).",
    "Dual citizenship permitted since 1992.",
  ],
  documentsOutline: [
    "Swiss ancestor's certificate of origin (Heimatschein) or Swiss citizenship document",
    "Family/birth/marriage certificates linking generations",
    "Evidence of timely registration with a Swiss representation for each generation born abroad",
  ],
  caveats: [
    "Switzerland does NOT grant citizenship by birth in Switzerland — only by parentage.",
    "Missing the age-25 (or pre-2018 age-22) registration deadline closes the route for that person AND their descendants.",
    "Reinstatement of lost Swiss citizenship is possible but discretionary and time-limited (typically within 10 years of loss).",
  ],
  officialLinks: [
    {
      label: "Federal Act on Swiss Citizenship (SR 141.0)",
      url: "https://www.fedlex.admin.ch/eli/cc/2016/404/en",
    },
    {
      label: "SEM - Becoming Swiss (overview)",
      url: "https://www.sem.admin.ch/sem/en/home/integration-einbuergerung/schweizer-werden.html",
    },
    {
      label: "Swiss nationality law (Wikipedia overview)",
      url: "https://en.wikipedia.org/wiki/Swiss_nationality_law",
    },
  ],
  estTimelineMonths: [3, 12],
  estCostUSD: [150, 800],
  lastReviewed: "2026-05-14",
  practical: {
    successSignal: "high",
    successNote:
      "If the chain of registrations is intact, recognition is straightforward and handled at the Swiss representation. The make-or-break factor is the age-22/25 retention declaration for each generation born abroad.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
