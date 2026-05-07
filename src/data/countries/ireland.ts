import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const irelandDescent: Path = {
  id: "ie-descent",
  country: "Ireland",
  countryCode: "IE",
  flag: "🇮🇪",
  pathType: "descent",
  name: "Irish citizenship by descent (Foreign Births Register)",
  shortDescription:
    "Children of an Irish citizen, and grandchildren of an Irish-born ancestor, are entitled to Irish citizenship via the Foreign Births Register. Great-grandchildren may qualify if their parent registered before they were born.",
  evaluate: (profile) => {
    const irishParents = parentsBornIn(profile, "IE");
    if (irishParents.length > 0) {
      return {
        tier: "likely",
        reasons: [
          `You have a parent born in Ireland (${irishParents[0].key}).`,
          "Children of an Irish-born citizen are automatically entitled to Irish citizenship.",
        ],
      };
    }

    const irishGrandparents = grandparentsBornIn(profile, "IE");
    if (irishGrandparents.length > 0) {
      return {
        tier: "likely",
        reasons: [
          `You have an Irish-born grandparent (${irishGrandparents[0].key}).`,
          "You can claim Irish citizenship by registering on the Foreign Births Register.",
        ],
        needToVerify: [
          "Your grandparent was born on the island of Ireland (north or south).",
          "You can produce their Irish birth certificate plus your parent's and your own birth/marriage records.",
        ],
      };
    }

    const irishGGP = greatGrandparentsBornIn(profile, "IE");
    if (irishGGP.length > 0) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Irish-born great-grandparent (${irishGGP[0].key}).`,
          "Great-grandchildren are eligible only if the qualifying parent registered on the Foreign Births Register BEFORE the applicant's birth.",
        ],
        needToVerify: [
          "Was your relevant parent registered on the Foreign Births Register before you were born?",
          "If yes, you qualify. If no (or unknown), this path is closed.",
        ],
      };
    }

    return {
      tier: "unlikely",
      reasons: [
        "No Irish-born parent, grandparent, or great-grandparent recorded.",
      ],
    };
  },
  requirementsSummary: [
    "An Irish-born parent OR grandparent (great-grandparent only via pre-registered parent).",
    "No language test, no residency requirement.",
    "Dual citizenship is allowed.",
  ],
  documentsOutline: [
    "Irish birth certificate of the qualifying ancestor",
    "Birth certificates linking each generation to the applicant",
    "Marriage certificates where surnames change",
    "Applicant's valid passport and proof of current address",
    "Two passport photos witnessed per consular instructions",
  ],
  caveats: [
    "Foreign Births Register processing typically 6–12+ months.",
    "If claiming through a great-grandparent, the chain breaks unless your parent was registered before your birth.",
  ],
  officialLinks: [
    {
      label: "Department of Foreign Affairs - Citizenship",
      url: "https://www.ireland.ie/en/dfa/citizenship/",
    },
    {
      label: "Foreign Births Register",
      url: "https://www.ireland.ie/en/dfa/citizenship/born-abroad/",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [350, 800],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "high",
    successNote:
      "Near-universal approval when the Irish-born ancestor's birth cert is in hand and names match across generations. Current FBR processing is ~12 months.",
    lawyerTypicallyNeeded: "no",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
