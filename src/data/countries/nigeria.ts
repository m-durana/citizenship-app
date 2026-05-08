import type { Path } from "../../types/path";
import { grandparentsBornIn, parentsBornIn } from "../../engine/helpers";

export const nigeriaSection26: Path = {
  id: "ng-section-26",
  country: "Nigeria",
  countryCode: "NG",
  flag: "🇳🇬",
  pathType: "descent",
  name: "Nigerian citizenship by registration (Section 26, grandparent route)",
  shortDescription:
    "Section 26(2)(a) of Nigeria's 1999 Constitution provides a registration route for adults born outside Nigeria with at least one Nigerian grandparent. Registered (vs. by-birth) Nigerians must renounce other nationalities, and good character plus intent to domicile in Nigeria are required.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "NG");
    const gp = grandparentsBornIn(p, "NG");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Nigeria-born parent (${par[0].key}).`,
          "Section 25(1)(c) recognises persons born outside Nigeria as citizens by birth where either parent is a Nigerian citizen.",
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Nigeria-born grandparent (${gp[0].key}).`,
          "Section 26(2)(a) registration is open to adults born outside Nigeria whose grandparent is a Nigerian citizen.",
        ],
        needToVerify: [
          "Evidence of good character and intent to domicile in Nigeria.",
          "Willingness to renounce other nationality - dual citizenship is only allowed for citizens by birth, not for registered persons.",
          "Documentation of the grandparent's Nigerian citizenship.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Nigeria-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Adult applicant with a Nigerian-citizen parent (Section 25) or grandparent (Section 26 registration).",
    "Section 26: good character, intent to domicile in Nigeria, Oath of Allegiance.",
    "Registered persons must renounce other nationality (dual citizenship is only for citizens by birth).",
  ],
  documentsOutline: [
    "Documentation of the Nigerian-citizen parent or grandparent",
    "Birth and marriage certificates linking generations",
    "Evidence of good character (police clearance, references)",
    "Statement of intent to domicile in Nigeria",
  ],
  caveats: [
    "Dual-citizenship constraint on registered persons is a material gate for diaspora applicants.",
    "Domicile-in-Nigeria requirement is non-trivial.",
  ],
  officialLinks: [
    {
      label: "Nigerian Senate - Chapter 3 Citizenship",
      url: "https://sccr.gov.ng/chapter-3-citizenship/",
    },
    {
      label: "International Bar Association - Citizenship in Nigeria",
      url: "https://www.ibanet.org/article/89d400a4-ea2d-41d6-9ace-e19b4af99337",
    },
    {
      label: "Nigerian nationality law overview",
      url: "https://en.wikipedia.org/wiki/Nigerian_nationality_law",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [1500, 6000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Section 26 grandparent-registration requires good character, intent to domicile in Nigeria, and renunciation of other nationality (no dual citizenship for registered persons).",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
