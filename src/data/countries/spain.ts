import type { Path } from "../../types/path";
import { isTrue, parentsBornIn, grandparentsBornIn } from "../../engine/helpers";

export const spainDescent: Path = {
  id: "es-descent",
  country: "Spain",
  countryCode: "ES",
  flag: "🇪🇸",
  pathType: "descent",
  name: "Spanish citizenship by origin",
  shortDescription:
    "Children of Spanish citizens are Spanish by origin regardless of where they were born. Grandchildren may qualify when their parent acquired Spanish nationality first.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "ES");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Spanish-born parent (${par[0].key}).`,
          "Spain transmits citizenship by origin to all children of Spanish citizens.",
        ],
        needToVerify: [
          "Your parent was a Spanish citizen at the time of your birth.",
        ],
      };
    }
    const gp = grandparentsBornIn(p, "ES");
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [`You have a Spanish-born grandparent (${gp[0].key}).`],
        needToVerify: [
          "Your parent must first acquire / have acquired Spanish nationality through this line.",
          "If your grandparent's exile during the Civil War / Franco era is documented, the Democratic Memory Law (Ley de Memoria Democrática) provides a direct path - see the Spanish exile descendants result.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Spanish-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Spanish-citizen parent (direct), or Spanish-citizen grandparent via parent's prior acquisition.",
    "Dual citizenship allowed for citizens by origin (and by treaty for some Latin American countries).",
  ],
  documentsOutline: [
    "Ancestor's Spanish birth certificate and citizenship record",
    "Birth/marriage certificates linking generations",
    "Apostilled Spanish translations",
  ],
  caveats: [
    "Citizenship by origin (origen) is preferred to citizenship by residency for dual-nationality preservation.",
  ],
  officialLinks: [
    {
      label: "Ministerio de Justicia - Nacionalidad",
      url: "https://www.mjusticia.gob.es/en/ciudadania/nacionalidad",
    },
  ],
  estTimelineMonths: [12, 30],
  estCostUSD: [200, 1500],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "high",
    successNote:
      "Citizens by origin are exempt from DELE A2 and CCSE. Process is registry-based; main bottleneck is consular appointment availability.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false, note: "DELE A2 only required for residency-based naturalization, not for citizenship by origin." },
    knowledgeTest: { required: false },
  },
};

export const spainExileDescendant: Path = {
  id: "es-exile-democratic-memory",
  country: "Spain",
  countryCode: "ES",
  flag: "🇪🇸",
  pathType: "restoration",
  name: "Spanish citizenship via Democratic Memory Law (exile descendants)",
  shortDescription:
    "Descendants of Spaniards who went into exile between 1936 and 1985 (Civil War + Franco era) can claim Spanish nationality of origin under Spain's Democratic Memory Law (Ley 20/2022).",
  evaluate: (p) => {
    if (isTrue(p.heritage.spanishCivilWarExileDescendant)) {
      return {
        tier: "likely",
        reasons: [
          "You marked descent from a Spanish exile of the Civil War / Franco era.",
          "The Democratic Memory Law provides a path to Spanish nationality of origin for such descendants.",
        ],
        needToVerify: [
          "Documentary evidence of the exiled ancestor's Spanish citizenship and exile (1936–1985).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "You did not indicate descent from a Spanish exile of the Civil War / Franco era.",
      ],
    };
  },
  requirementsSummary: [
    "Documented Spanish ancestor exiled between 1936 and 1985.",
    "Claim is for Spanish nationality of origin (dual citizenship preserved).",
  ],
  documentsOutline: [
    "Ancestor's Spanish birth certificate",
    "Evidence of exile: arrival records abroad, refugee documentation, period news clippings, etc.",
    "Birth/marriage certificates linking generations",
  ],
  caveats: [
    "Filing window has been extended; check current deadlines at consulates.",
  ],
  officialLinks: [
    {
      label: "Ley 20/2022 (Memoria Democrática) - government info",
      url: "https://www.mjusticia.gob.es/en/ciudadania/nacionalidad",
    },
  ],
  estTimelineMonths: [12, 24],
  estCostUSD: [150, 1000],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "low",
    successNote:
      "Filing window closed 21 Oct 2025; no further extensions granted. Authorities are processing only legacy files received before the deadline.",
    lawyerTypicallyNeeded: "unknown",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
