import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const capeVerdeDescent: Path = {
  id: "cv-descent",
  country: "Cape Verde",
  countryCode: "CV",
  flag: "🇨🇻",
  pathType: "descent",
  name: "Cape Verdean citizenship by descent (4-generation reach)",
  shortDescription:
    "The 2018 Cape Verde Nationality Law (with 2023 diaspora-expansion amendment) lets children, grandchildren, great-grandchildren, and great-great-grandchildren of Cape Verdean nationals of origin claim nationality of origin by declaration.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CV");
    const gp = grandparentsBornIn(p, "CV");
    const ggp = greatGrandparentsBornIn(p, "CV");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "likely",
        reasons: [
          `You have a Cape Verde-born ancestor (${closest.key}).`,
          "The 2023 amendment formalised four-generation reach for descendants of Cape Verdean nationals of origin.",
        ],
        needToVerify: [
          "Documented direct line back to a Cape Verdean-by-birth ancestor.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Cape Verde-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Cape Verdean-by-birth ancestor up to four generations back.",
    "No residence requirement; no language test; no civics test.",
    "Dual citizenship permitted.",
    "Declarative process via consulate or central registries.",
  ],
  documentsOutline: [
    "Cape Verde-born ancestor's birth and citizenship records",
    "Birth and marriage certificates linking each generation",
    "Apostilled translations into Portuguese",
    "Applicant's identity documents",
  ],
  caveats: [
    "Documentation burden is the main filter for distant generations.",
  ],
  officialLinks: [
    {
      label: "Portal Consular - Acquisition of Nationality of Origin by Choice",
      url: "https://portalconsular.mnec.gov.cv/en/aquisicao-de-nacionalidade-de-origem-por-opcao",
    },
    {
      label: "Czech-Cape-Verdean Chamber - 2023 diaspora amendment",
      url: "https://ck-obchodnikomora.cz/en/cape-verde-parliament-unanimously-approves-amendment-to-law-granting-citizenship-to-members-of-the-diaspora/",
    },
    {
      label: "Cape Verdean nationality law overview",
      url: "https://en.wikipedia.org/wiki/Cape_Verdean_nationality_law",
    },
  ],
  estTimelineMonths: [2, 5],
  estCostUSD: [500, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Generous 4-generation reach since 2023 amendment; declarative process via consulate or central registries. Documentation burden is the main filter.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
