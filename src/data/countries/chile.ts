import type { Path } from "../../types/path";
import { grandparentsBornIn, parentsBornIn } from "../../engine/helpers";

export const chileDescent: Path = {
  id: "cl-descent",
  country: "Chile",
  countryCode: "CL",
  flag: "🇨🇱",
  pathType: "descent",
  name: "Chilean citizenship by descent (Article 10)",
  shortDescription:
    "Article 10 of Chile's 1980 Constitution recognises derivative nationality for children born abroad to a Chilean parent or grandparent. Chain integrity (whether the parent ever claimed Chilean nationality) is the operative caveat.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CL");
    const gp = grandparentsBornIn(p, "CL");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Chile-born parent (${par[0].key}).`],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Chile-born grandparent (${gp[0].key}).`,
          "Article 10 reaches grandparent-anchored claims, but the chain may be considered broken if the parent never claimed or registered Chilean nationality.",
        ],
        needToVerify: [
          "Whether your parent was registered as Chilean (consular acceptance varies).",
          "Documentary chain of vital records.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Chile-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Chilean-by-birth parent or grandparent (Article 10).",
    "Application via Chilean consulate; registration with Servicio de Registro Civil.",
    "No language test, no civics test for descent.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Chilean-born ancestor's birth certificate",
    "Birth and marriage certificates linking generations",
    "Apostilled translations into Spanish",
    "Applicant's identity documents",
  ],
  caveats: [
    "Chain-integrity reading varies: some consulates require the parent to have actively claimed Chilean nationality.",
  ],
  officialLinks: [
    {
      label: "Chilean nationality law overview",
      url: "https://en.wikipedia.org/wiki/Chilean_nationality_law",
    },
    {
      label: "SERMIG - Chilean citizenship",
      url: "https://serviciomigraciones.cl/en/citizenship/",
    },
    {
      label: "Golden Harbors - Chile citizenship by descent",
      url: "https://goldenharbors.com/articles/chile-citizenship-by-descent",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [500, 2000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Constitutional grandparent-anchored route available but chain-integrity (parent-claim) reading varies; consular-acceptance not uniform.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
