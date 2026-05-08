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

export const spainSephardicClosed: Path = {
  id: "es-sephardic-closed",
  country: "Spain",
  countryCode: "ES",
  flag: "🇪🇸",
  pathType: "heritage",
  name: "Spanish Sephardic-origin citizenship (Law 12/2015, CLOSED)",
  shortDescription:
    "Law 12/2015 offered Spanish citizenship to descendants of Sephardic Jews expelled from Spain in 1492. The application window CLOSED on 1 October 2019, with a documentation completion grace period extended to 1 September 2021. Approximately 9,361 applications remain pending; no new applicants accepted.",
  evaluate: (p) => {
    if (isTrue(p.heritage.sephardicAncestry)) {
      return {
        tier: "unlikely",
        reasons: [
          "Spain's Sephardic-origin program (Law 12/2015) CLOSED 1 October 2019; documentation grace ran to 1 September 2021.",
          "Approximately 132,000 applications were filed; ~72,000 granted, ~7,189 rejected, ~9,361 still pending.",
          "There is no announced successor program for Sephardic Jewish heritage.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Spain's Sephardic-origin program is CLOSED.",
        "You did not indicate Sephardic Jewish ancestry.",
      ],
    };
  },
  requirementsSummary: [
    "CLOSED to new applicants since 1 October 2019 (documentation grace 1 September 2021).",
    "When active: FCJE certificate, family-tree documentation, approved-rabbi certification, DELE A2, CCSE, notarial deed in Spain.",
  ],
  documentsOutline: [],
  caveats: [
    "Pre-deadline pipeline running 24-48 months.",
    "If you have Sephardic ancestry and Jewish-heritage citizenship matters to you, see the Israel Law of Return result.",
  ],
  officialLinks: [
    {
      label: "The Local Spain - 72,000 Sephardic grants (Feb 2025)",
      url: "https://www.thelocal.es/20250224/72000-foreigners-with-sephardic-jewish-ancestry-granted-spanish-citizenship",
    },
    {
      label: "Times of Israel - Spain Sephardic rejections",
      url: "https://www.timesofisrael.com/after-welcoming-sephardic-jews-spain-rejects-thousands-of-citizenship-requests/",
    },
    {
      label: "Spanish nationality law overview",
      url: "https://en.wikipedia.org/wiki/Spanish_nationality_law",
    },
  ],
  estTimelineMonths: [0, 0],
  estCostUSD: [0, 0],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "CLOSED 1 Oct 2019 (completion grace 1 Sep 2021). Pending-application counts vary by source (figures of ~9,361 to 50,000+ pending, against ~153,000 total filed).",
    lawyerTypicallyNeeded: "yes",
    languageTest: {
      required: true,
      level: "DELE A2 (Latin American applicants partly exempt)",
      note: "Required only for pre-deadline applications still in pipeline.",
    },
    knowledgeTest: {
      required: true,
      note: "CCSE constitutional/cultural knowledge test, applicable to pre-deadline pipeline only.",
    },
    singleSource: "secondary",
  },
};

// Spanish-speaking Ibero-American + privileged-country codes for the 2-year residence path.
const SPAIN_IBERO_PRIVILEGED = new Set<string>([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "GT", "HN",
  "MX", "NI", "PA", "PY", "PE", "PR", "SV", "UY", "VE",
  "BR", "PT", "AD", "PH", "GQ",
]);

export const spainIberoAmericanResidence: Path = {
  id: "es-ibero-american-residence",
  country: "Spain",
  countryCode: "ES",
  flag: "🇪🇸",
  pathType: "ancestry-visa",
  name: "Spain - Ibero-American shortened naturalization (2-year residence)",
  shortDescription:
    "Article 22 of the Spanish Civil Code reduces the residence requirement to 2 years for nationals of Ibero-American countries, Andorra, the Philippines, Equatorial Guinea, Portugal, and Sephardic-origin certified persons. This is a residence-based path, not a pure descent path.",
  evaluate: (p) => {
    const eligible = p.self.currentCitizenships.some((c) =>
      SPAIN_IBERO_PRIVILEGED.has(c),
    );
    if (eligible) {
      return {
        tier: "possibly",
        reasons: [
          "You hold citizenship of an eligible country (Ibero-American, Andorra, Philippines, Equatorial Guinea, Portugal).",
          "Article 22 reduces the residence requirement from 10 to 2 years for your category.",
          "Spain has dual-citizenship treaties with these countries, so renunciation is generally not enforced.",
        ],
        needToVerify: [
          "2 years' legal continuous residence in Spain.",
          "CCSE constitutional/cultural test (25 questions, pass mark 15).",
          "DELE A2 (Ibero-American + other Spanish-speaking nationals are exempt as of the 2025 update).",
          "Clean criminal record (Spain + home country).",
        ],
      };
    }
    if (isTrue(p.heritage.sephardicAncestry)) {
      return {
        tier: "possibly",
        reasons: [
          "Sephardic-origin certified persons also qualify for the 2-year residence track under Article 22.",
        ],
        needToVerify: [
          "FCJE certification of Sephardic origin.",
          "2 years' legal continuous residence in Spain.",
          "DELE A2 + CCSE.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "You do not hold an eligible nationality (Ibero-American, Andorra, Philippines, Equatorial Guinea, Portugal) and no Sephardic origin recorded.",
      ],
    };
  },
  requirementsSummary: [
    "Nationality of an Ibero-American country, Andorra, Philippines, Equatorial Guinea, Portugal, or Sephardic-origin certified.",
    "2 years' legal continuous residence in Spain.",
    "DELE A2 (Ibero-American + other Spanish-speaking nationals exempt, 2025 update).",
    "CCSE: 25 questions, pass mark 15.",
    "Clean criminal record (Spain + home country).",
  ],
  documentsOutline: [
    "Passport showing eligible nationality",
    "Spanish residence permit and registration history (2+ years)",
    "DELE A2 certificate (if not exempt)",
    "CCSE certificate",
    "Criminal record certificates (Spain + home country)",
  ],
  caveats: [
    "Renunciation is waived only for citizens of countries with which Spain has a dual-citizenship treaty.",
    "This is a residence-based path; eligibility is heritage-keyed but the path is not pure descent.",
  ],
  officialLinks: [
    {
      label: "Spanish nationality law overview",
      url: "https://en.wikipedia.org/wiki/Spanish_nationality_law",
    },
    {
      label: "Jobbatical - Spain reduced residency for Latin Americans (2026)",
      url: "https://www.jobbatical.com/blog/spain-citizenship-latin-americans-reduced-residency-guide",
    },
    {
      label: "Lexmovea - Spanish nationality by residence",
      url: "https://lexmovea.us/services/spanish-nationality/residence/",
    },
  ],
  estTimelineMonths: [36, 60],
  estCostUSD: [2000, 6000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "2-year residence + CCSE; DELE A2 exempt for Ibero-American nationals (2025 update). Heritage-eligibility-keyed but a residence path, not pure descent.",
    lawyerTypicallyNeeded: "optional",
    languageTest: {
      required: true,
      level: "DELE A2",
      note: "Ibero-American + other Spanish-speaking nationals exempt from DELE A2 (2025 update).",
    },
    knowledgeTest: {
      required: true,
      note: "CCSE: 25 questions, pass mark 15.",
    },
    singleSource: "secondary",
  },
};
