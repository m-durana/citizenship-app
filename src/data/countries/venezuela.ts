import type { Path } from "../../types/path";
import { grandparentsBornIn, parentsBornIn } from "../../engine/helpers";

export const venezuelaDescent: Path = {
  id: "ve-descent",
  country: "Venezuela",
  countryCode: "VE",
  flag: "🇻🇪",
  pathType: "descent",
  name: "Venezuelan citizenship by descent (Article 32)",
  shortDescription:
    "Article 32 of the Venezuelan Constitution recognises children born abroad to a Venezuelan parent and provides a residence-conditioned grandchild route. Consular access is constrained for many diaspora due to political conditions.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "VE");
    const gp = grandparentsBornIn(p, "VE");
    if (par.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Venezuela-born parent (${par[0].key}).`,
          "Children of Venezuelan-by-birth parents are recognised on consular registration; children of Venezuelan-by-naturalisation parents must establish residence in Venezuela before age 18 and declare intention before age 25.",
        ],
        needToVerify: [
          "Whether your parent is Venezuelan by birth or by naturalisation.",
          "Consular access in your country of residence.",
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Venezuela-born grandparent (${gp[0].key}).`,
          "Foreign-born grandchildren of Venezuelan-born grandparents may acquire nationality conditional on Venezuelan residence and a declaration of intention.",
        ],
        needToVerify: [
          "Willingness to establish residence in Venezuela.",
          "Declaration before the principal registrar of the judicial district of domicile.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Venezuela-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Venezuelan-by-birth or by-naturalisation parent (with age conditions for the latter), or grandparent route conditioned on Venezuelan residence.",
    "Declaration before the principal registrar of the judicial district.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Venezuela-born ancestor's birth certificate and citizenship record",
    "Birth and marriage certificates linking generations",
    "Evidence of Venezuelan residence (for naturalisation-line and grandchild routes)",
    "Apostilled translations into Spanish",
  ],
  caveats: [
    "Consular access constrained by political conditions (e.g. limited US-Venezuela consular relations); processing is uneven.",
    "Grandchild route requires Venezuelan residence and a domicile-based declaration.",
  ],
  officialLinks: [
    {
      label: "Constitution of the Bolivarian Republic of Venezuela (UMN)",
      url: "https://hrlibrary.umn.edu/research/venezuela-constitution.html",
    },
    {
      label: "Venezuelan nationality law overview",
      url: "https://en.wikipedia.org/wiki/Venezuelan_nationality_law",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [1000, 5000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Constitutional path exists; consular access constrained for many diaspora due to political conditions; grandchild route requires Venezuelan residence and declaration.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
