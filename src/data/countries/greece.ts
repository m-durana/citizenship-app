import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const greeceDescent: Path = {
  id: "gr-descent",
  country: "Greece",
  countryCode: "GR",
  flag: "🇬🇷",
  pathType: "descent",
  name: "Greek citizenship by descent (determination procedure)",
  shortDescription:
    "Greek citizenship is recognized through a determination procedure for descendants of Greek nationals. Eligibility commonly extends to grandchildren and great-grandchildren if the citizenship line was preserved.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "GR");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Greek-born parent (${par[0].key}).`],
      };
    }
    const gp = grandparentsBornIn(p, "GR");
    if (gp.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Greek-born grandparent (${gp[0].key}).`,
          "Determination procedure recognizes descent through grandparents.",
        ],
      };
    }
    const ggp = greatGrandparentsBornIn(p, "GR");
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [`You have a Greek-born great-grandparent (${ggp[0].key}).`],
        needToVerify: [
          "Each intermediate ancestor was registered with Greek authorities (mother- or father-line, depending on era).",
          "Pre-1984 paternal-line bias means maternal-line claims through that period need closer review.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Greek-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Greek-citizen parent, grandparent, or great-grandparent.",
    "Registration with the male-line municipality (dimotologio) historically required.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Ancestor's Greek birth/baptismal record and proof of municipal registration",
    "Birth/marriage certificates linking each generation",
    "Apostilled Greek translations",
  ],
  caveats: [
    "Pre-1984 Greek law was male-line oriented; maternal-line claims spanning that era often need extra review.",
    "Process can be 1.5–4 years.",
  ],
  officialLinks: [
    {
      label: "Ministry of Interior - citizenship",
      url: "https://www.ypes.gr/en/",
    },
  ],
  estTimelineMonths: [18, 48],
  estCostUSD: [400, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Determination procedure typically 2-5 years; turns on locating the ancestor's municipal-roll (dimotologio) entry. No language test for descent claims.",
    lawyerTypicallyNeeded: "yes",
    languageTest: {
      required: false,
      note: "Greek language proficiency is required for naturalization-by-residency, not for descent claims.",
    },
    knowledgeTest: { required: false },
    singleSource: true,
  },
};
