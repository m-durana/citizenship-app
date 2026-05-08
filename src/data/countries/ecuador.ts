import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const ecuadorDescent: Path = {
  id: "ec-descent",
  country: "Ecuador",
  countryCode: "EC",
  flag: "🇪🇨",
  pathType: "descent",
  name: "Ecuadorian citizenship by descent (Article 7)",
  shortDescription:
    "Article 7 of Ecuador's 2008 Constitution extends birthright nationality to children, grandchildren, and great-grandchildren of native-born Ecuadorians.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "EC");
    const gp = grandparentsBornIn(p, "EC");
    const ggp = greatGrandparentsBornIn(p, "EC");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: par.length ? "likely" : "possibly",
        reasons: [
          `You have an Ecuador-born ancestor (${closest.key}).`,
          "Article 7 reaches up to great-grandchildren of native-born Ecuadorians.",
        ],
        needToVerify: [
          "Birth registered with the Ecuadorian Civil Registry or consulate.",
          "At least one ancestor in the chain was Ecuadorian by birth (not naturalisation).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Ecuador-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Native-born Ecuadorian parent, grandparent, or great-grandparent.",
    "Birth registered with Ecuadorian Civil Registry or consulate abroad.",
    "No language test, no civics test.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Ecuador-born ancestor's birth certificate",
    "Birth and marriage certificates linking generations",
    "Apostilled translations into Spanish",
    "Applicant's identity documents",
  ],
  caveats: [
    "Naturalised-citizen ancestors create murkier conditions; the great-grandchild route is most reliable when each ancestor in the chain was Ecuadorian by birth.",
  ],
  officialLinks: [
    {
      label: "Ecuadorian nationality law overview",
      url: "https://en.wikipedia.org/wiki/Ecuadorian_nationality_law",
    },
    {
      label: "My Latin Life - Ecuador citizenship by descent",
      url: "https://mylatinlife.com/ecuador-citizenship-by-descent/",
    },
    {
      label: "LegalClarity - Nationality of Ecuador",
      url: "https://legalclarity.org/nationality-of-ecuador-birthright-and-naturalization-laws/",
    },
  ],
  estTimelineMonths: [6, 12],
  estCostUSD: [500, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Constitutional 3-generation reach; great-grandchild claims succeed where each link in chain is documented. No public approval-rate statistic.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
