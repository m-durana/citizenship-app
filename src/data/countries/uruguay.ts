import type { Path } from "../../types/path";
import { grandparentsBornIn, parentsBornIn } from "../../engine/helpers";

export const uruguayDescent: Path = {
  id: "uy-descent",
  country: "Uruguay",
  countryCode: "UY",
  flag: "🇺🇾",
  pathType: "descent",
  name: "Uruguayan citizenship for grandchildren of natural citizens (Law 19.362)",
  shortDescription:
    "Law 19.362 (2015) recognises children and grandchildren of Uruguayan natural citizens born abroad as natural citizens, subject to meeting at least two of the Article 4 connection conditions. Reach stops at grandchild.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "UY");
    const gp = grandparentsBornIn(p, "UY");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Uruguay-born parent (${par[0].key}).`],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Uruguay-born grandparent (${gp[0].key}).`,
          "Law 19.362 grants natural-citizenship recognition to grandchildren of Uruguayan natural citizens.",
        ],
        needToVerify: [
          "You meet at least two of the Article 4 connection conditions (residence, property ownership, employment, sustained connection to Uruguay).",
          "Registration with the Electoral Court (Corte Electoral).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Uruguay-born parent or grandparent recorded.",
        "Law 19.362 reach stops at grandchild; great-grandchildren are not eligible.",
      ],
    };
  },
  requirementsSummary: [
    "Uruguayan natural-citizen parent or grandparent.",
    "At least two of the Article 4 connection conditions (residence/property/employment/sustained connection).",
    "Registration with the Electoral Court.",
    "No language or civics test for the descent claim.",
  ],
  documentsOutline: [
    "Uruguay-born ancestor's birth certificate",
    "Birth and marriage certificates linking generations",
    "Evidence of at least two Article 4 connection conditions",
    "Applicant's identity documents",
  ],
  caveats: [
    "Natural-citizenship status under Law 19.362 differs from legal-citizenship (ciudadanía legal) in voting and other rights.",
    "Some opposition challenges argue the law is unconstitutional under Article 74; law remains in force.",
  ],
  officialLinks: [
    {
      label: "Embassy of Uruguay - National Law 19362",
      url: "https://embassyofuruguay.us/newyork/index.php/national-law-19362-grandchild-of-a-natural-uruguayan-citizen-born-abroad/",
    },
    {
      label: "Globalcit - Law 19,362 commentary",
      url: "https://globalcit.eu/new-law-grants-citizenship-to-grandchildren-of-uruguayan-citizens-who-reisde-abroad/",
    },
    {
      label: "Uruguayan nationality law overview",
      url: "https://en.wikipedia.org/wiki/Uruguayan_nationality_law",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [1000, 3500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Grandchild route requires at least two of Article 4 connection conditions (residence/property/employment); reach stops at grandchild.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
