import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const belgiumDescent: Path = {
  id: "be-descent",
  country: "Belgium",
  countryCode: "BE",
  flag: "🇧🇪",
  pathType: "descent",
  name: "Belgian nationality by descent (Articles 8-9, Code of Belgian Nationality)",
  shortDescription:
    "Belgian nationality is strictly parent-attribution: a Belgian parent must register or attribute the child's nationality through consular declaration. There is no general grandparent route, and a Belgian born abroad who does not reside in Belgium between ages 18 and 28 loses nationality unless they declare retention. A 2026 reform raised the application fee to EUR 1,030.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "BE");
    const gp = grandparentsBornIn(p, "BE");
    const anyBe = ancestorsBornIn(p, "BE");
    if (par.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Belgium-born parent (${par[0].key}).`,
          "Belgian nationality transmits parent-to-child only when the Belgian parent properly attributed nationality through consular declaration within the statutory window.",
        ],
        needToVerify: [
          "The Belgian parent attributed your nationality through a consular declaration before the relevant age cut-off.",
          "Your parent did not lose Belgian nationality by failing to declare retention between ages 18 and 28.",
          "January 2026 fee increase to EUR 1,030 applies to current declarations.",
        ],
      };
    }
    if (gp.length || anyBe.length) {
      return {
        tier: "unlikely",
        reasons: [
          "Belgium has no general grandparent-descent route.",
          "If your Belgian-born grandparent's child (your parent) was not formally attributed Belgian nationality, the chain is broken.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Belgium-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Belgian parent who held Belgian nationality at the time of the applicant's birth.",
    "Parent must have attributed nationality through consular declaration within statutory age windows.",
    "Applicant must not have lost Belgian nationality through ages 18-28 absence without retention declaration.",
    "No grandparent-descent route exists in current law.",
  ],
  documentsOutline: [
    "Parent's Belgian birth certificate and proof of Belgian nationality at the time of the applicant's birth",
    "Consular registration records / declaration of attribution",
    "Applicant's birth certificate",
    "If applicable: declaration of retention filed before the applicant's 28th birthday",
  ],
  caveats: [
    "No general grandparent route - if the intermediate parent did not retain or attribute Belgian nationality, the chain is permanently broken.",
    "January 2026 reform raised the citizenship-declaration / naturalisation fee from EUR 150 to EUR 1,030.",
    "Belgians born abroad lose nationality at age 28 unless they file a retention declaration or live in Belgium for a qualifying period.",
  ],
  officialLinks: [
    {
      label: "Belgian Foreign Affairs - nationality information",
      url: "https://unitedkingdom.diplomatie.belgium.be/en/belgians-uk/nationality",
    },
    {
      label: "Belgian nationality law overview",
      url: "https://en.wikipedia.org/wiki/Belgian_nationality_law",
    },
    {
      label: "European Network on Statelessness - 2026 fee reform",
      url: "https://index.statelessness.eu/news/belgium-tightens-naturalisation-and-family-reunification-rules",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [1200, 4000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Restrictive parent-attribution model; chains break easily when intermediate generations do not declare retention. The January 2026 fee jump to EUR 1,030 raises practical cost.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
