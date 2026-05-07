import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const romaniaDescent: Path = {
  id: "ro-descent",
  country: "Romania",
  countryCode: "RO",
  flag: "🇷🇴",
  pathType: "restoration",
  name: "Romanian citizenship by descent / restoration (Article 11)",
  shortDescription:
    "Romanian citizenship can be restored to descendants - up to great-grandchildren - of former Romanian citizens who lost citizenship involuntarily.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "RO");
    const gp = grandparentsBornIn(p, "RO");
    const ggp = greatGrandparentsBornIn(p, "RO");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      const tier = par.length ? "likely" : "possibly";
      return {
        tier,
        reasons: [`You have a Romanian-born ancestor (${closest.key}).`],
        needToVerify: tier === "possibly"
          ? [
              "Your ancestor was a Romanian citizen who lost citizenship involuntarily (often via post-WWII border changes / forced emigration).",
            ]
          : undefined,
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Romanian-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Romanian parent, grandparent, or great-grandparent who was a Romanian citizen.",
    "Basic Romanian language knowledge.",
    "Dual citizenship is allowed.",
  ],
  documentsOutline: [
    "Ancestor's Romanian birth certificate and citizenship records",
    "Proof of involuntary loss of citizenship if applicable",
    "Birth/marriage certificates linking generations",
    "Romanian translations by authorized translator",
  ],
  caveats: [
    "Restoration applications go through the National Authority for Citizenship and can take 1–3 years.",
    "Includes ancestors from Bessarabia, Northern Bukovina, and the Hertsa region (now Moldova/Ukraine).",
  ],
  officialLinks: [
    {
      label: "National Authority for Citizenship (ANC)",
      url: "https://cetatenie.just.ro/",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [200, 1500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Mar 2025 reform makes B1 Romanian mandatory for Article 11 restoration. Statutory processing extended to 2 years; practical waits often 24-36 months.",
    lawyerTypicallyNeeded: "yes",
    languageTest: {
      required: true,
      level: "B1 Romanian",
      note: "Mandatory since 15 Mar 2025 for Article 11 cases; formal certification or 3 years of Romanian-medium education accepted.",
    },
    knowledgeTest: { required: false },
  },
};
