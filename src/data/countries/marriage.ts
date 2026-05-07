import type { Path, PracticalNotes } from "../../types/path";
import type { UserProfile } from "../../types/profile";

type MarriageSpec = {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  residencyYears: number;
  notes: string;
  link: { label: string; url: string };
  practical?: PracticalNotes;
};

function marriagePath(s: MarriageSpec): Path {
  return {
    id: s.id,
    country: s.country,
    countryCode: s.countryCode,
    flag: s.flag,
    pathType: "marriage",
    name: `${s.country} naturalization fast-track via marriage (${s.residencyYears} yr)`,
    shortDescription: `Spouses of ${s.country} citizens can naturalize after ${s.residencyYears} year${s.residencyYears === 1 ? "" : "s"} of marriage and residency. ${s.notes}`,
    evaluate: (p: UserProfile) => {
      const sp = p.spouse;
      if (sp && sp.citizenships.includes(s.countryCode)) {
        return {
          tier: "likely",
          reasons: [
            `Your spouse holds ${s.country} citizenship.`,
            `${s.country} reduces residency to ${s.residencyYears} year${s.residencyYears === 1 ? "" : "s"} for spouses.`,
          ],
          needToVerify: [
            `You meet the ${s.residencyYears}-year residency requirement (and any local-language requirement).`,
            "The marriage is genuine and ongoing at time of application.",
          ],
        };
      }
      return {
        tier: "unlikely",
        reasons: [
          `You did not indicate a spouse with ${s.country} citizenship.`,
        ],
      };
    },
    requirementsSummary: [
      `Spouse holds ${s.country} citizenship.`,
      `${s.residencyYears}-year residency in ${s.country} after marriage (varies; check current rules).`,
      "Genuine and ongoing marriage at the time of application.",
    ],
    documentsOutline: [
      "Marriage certificate (apostilled)",
      "Spouse's national ID / passport / citizenship document",
      "Proof of joint residence in the country",
      "Language certificate where applicable",
      "Criminal record certificates",
    ],
    caveats: [
      "Marriage fast-tracks generally still require local residency; this is faster naturalization, not automatic citizenship.",
    ],
    officialLinks: [s.link],
    estTimelineMonths: [s.residencyYears * 12, s.residencyYears * 12 + 18],
    estCostUSD: [200, 2000],
    lastReviewed: "2026-05-01",
    practical: s.practical,
  };
}

export const spainMarriage = marriagePath({
  id: "es-marriage",
  country: "Spain",
  countryCode: "ES",
  flag: "🇪🇸",
  residencyYears: 1,
  notes: "Spain offers the fastest marriage track in Europe (1 year of legal residency).",
  link: {
    label: "Ministerio de Justicia - Nacionalidad",
    url: "https://www.mjusticia.gob.es/en/ciudadania/nacionalidad",
  },
  practical: {
    successSignal: "high",
    successNote:
      "1 year residency after marriage; INE reports 252,476 naturalizations in Spain in 2024. DELE A2 + CCSE required (Ibero-American nationals exempt from DELE).",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "DELE A2", note: "Ibero-American (Latin American) nationals are exempt." },
    knowledgeTest: { required: true, note: "CCSE civics test: pass 15/25 questions." },
  },
});

export const italyMarriage = marriagePath({
  id: "it-marriage",
  country: "Italy",
  countryCode: "IT",
  flag: "🇮🇹",
  residencyYears: 2,
  notes: "2 years if residing in Italy, 3 years if living abroad. B1 Italian language required.",
  link: {
    label: "Ministero dell'Interno - Cittadinanza",
    url: "https://www.interno.gov.it/it/temi/cittadinanza-e-altri-diritti-civili/cittadinanza",
  },
  practical: {
    successSignal: "moderate",
    successNote:
      "B1 Italian (CILS / CELI / PLIDA) required since DL 113/2018. Statutory cap reduced from 48 to 36 months but bureaucratic lag is real.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 (CILS / CELI / PLIDA)" },
    knowledgeTest: { required: false },
  },
});

export const portugalMarriage = marriagePath({
  id: "pt-marriage",
  country: "Portugal",
  countryCode: "PT",
  flag: "🇵🇹",
  residencyYears: 3,
  notes: "Married for 3+ years; A2 Portuguese language required.",
  link: {
    label: "Instituto dos Registos e do Notariado",
    url: "https://justica.gov.pt/en",
  },
  practical: {
    successSignal: "moderate",
    successNote:
      "After 3 years of marriage, applicants must prove 'ligação efetiva à comunidade portuguesa'. A2 CIPLE is one accepted proof but not strictly universal; IRN guidance waives language proof after 6+ years of marriage.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: false,
      level: "A2 (CIPLE) commonly used",
      note: "Per IRN and Embassy Bratislava guidance, language proof is one way to demonstrate community ties, not a hard universal requirement; waived after 6+ years of marriage.",
    },
    knowledgeTest: { required: false },
  },
});

export const irelandMarriage = marriagePath({
  id: "ie-marriage",
  country: "Ireland",
  countryCode: "IE",
  flag: "🇮🇪",
  residencyYears: 3,
  notes: "3 years of marriage and residency in Ireland.",
  link: {
    label: "Department of Justice - Citizenship",
    url: "https://www.irishimmigration.ie/how-to-become-a-citizen/",
  },
  practical: {
    successSignal: "high",
    successNote: "No language test, no civics test. Approval is reliable when 3-year residency and marriage validity are met.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
});

export const germanyMarriage = marriagePath({
  id: "de-marriage",
  country: "Germany",
  countryCode: "DE",
  flag: "🇩🇪",
  residencyYears: 3,
  notes: "3 years of legal residence + 2+ years of marriage. B1 German required.",
  link: {
    label: "Bundesverwaltungsamt - Citizenship",
    url: "https://www.bva.bund.de/EN/Services/Citizens/ID-Documents-Law/Citizenship/citizenship_node.html",
  },
  practical: {
    successSignal: "high",
    successNote:
      "B1 German + Einbürgerungstest civics test required. Post-2024 reform allows dual citizenship in most cases.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 German" },
    knowledgeTest: { required: true, note: "Einbürgerungstest: 33-question multiple choice on history, society, and law." },
  },
});
