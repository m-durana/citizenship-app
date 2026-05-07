import type { Path, PracticalNotes } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";

function parentOnlyDescent(
  countryCode: string,
  countryName: string,
  flag: string,
  link: { label: string; url: string },
  practical?: PracticalNotes,
): Path {
  return {
    id: `${countryCode.toLowerCase()}-descent`,
    country: countryName,
    countryCode,
    flag,
    pathType: "descent",
    name: `${countryName} citizenship by descent (parent only)`,
    shortDescription: `${countryName} transmits citizenship by descent through a citizen parent. Grandchildren are not eligible by descent alone.`,
    evaluate: (p) => {
      const par = parentsBornIn(p, countryCode);
      if (par.length) {
        return {
          tier: "likely",
          reasons: [
            `You have a parent born in ${countryName} (${par[0].key}).`,
          ],
          needToVerify: [
            `Your parent was a ${countryName} citizen at the time of your birth.`,
          ],
        };
      }
      return {
        tier: "unlikely",
        reasons: [
          `${countryName} grants descent only through a citizen parent (no grandparent route).`,
        ],
      };
    },
    requirementsSummary: [
      `${countryName}-citizen parent.`,
      "Dual citizenship allowed.",
    ],
    documentsOutline: [
      `Parent's ${countryName} birth certificate and citizenship document`,
      "Applicant's birth certificate, apostilled and translated",
    ],
    caveats: [
      "No grandparent descent path; grandchildren typically need to naturalize via residency.",
    ],
    officialLinks: [link],
    estTimelineMonths: [6, 18],
    estCostUSD: [100, 1000],
    lastReviewed: "2026-05-08",
    practical,
  };
}

export const mexicoDescent = parentOnlyDescent(
  "MX",
  "Mexico",
  "🇲🇽",
  {
    label: "Secretaría de Relaciones Exteriores - Nacionalidad",
    url: "https://www.gob.mx/sre",
  },
  {
    successSignal: "high",
    successNote:
      "Consular registration of birth is largely administrative; clean files typically conclude in 2-6 weeks with negligible state fees.",
    lawyerTypicallyNeeded: "no",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
);

export const argentinaDescent = parentOnlyDescent(
  "AR",
  "Argentina",
  "🇦🇷",
  {
    label: "Dirección Nacional de Migraciones",
    url: "https://www.argentina.gob.ar/interior/migraciones",
  },
  {
    successSignal: "high",
    successNote:
      "Direct parent-to-child registration is fast and reliable. No grandparent route exists; extended descendants must naturalize via residency.",
    lawyerTypicallyNeeded: "no",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
);

export const brazilDescent = parentOnlyDescent(
  "BR",
  "Brazil",
  "🇧🇷",
  {
    label: "Ministério da Justiça - Nacionalidade",
    url: "https://www.gov.br/mj/pt-br",
  },
  {
    successSignal: "high",
    successNote:
      "Consular birth registration is typically sufficient and processes in 6-18 months. Court 'nationality option' is the fallback for those not registered by majority.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
);
