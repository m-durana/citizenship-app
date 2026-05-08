import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const eastTimorDescent: Path = {
  id: "tl-article-3",
  country: "East Timor (Timor-Leste)",
  countryCode: "TL",
  flag: "🇹🇱",
  pathType: "descent",
  name: "East Timorese citizenship by descent (Article 3, 2002 Constitution)",
  shortDescription:
    "Article 3 of the Timor-Leste Constitution and Section 1 of the 2002 Citizenship Law confer original citizenship on children of a father or mother born in East Timor. Grandparent reach is not automatic - the intermediate parent must have established Timorese citizenship before the applicant's birth. Dual citizenship is permitted.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "TL");
    const gp = grandparentsBornIn(p, "TL");
    const anyTl = ancestorsBornIn(p, "TL");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have an East Timor-born parent (${par[0].key}).`,
          "Article 3 confers original citizenship on children of a parent born in East Timor.",
        ],
        needToVerify: [
          "Parent's Timorese birth certificate or citizenship documentation.",
          "Registration of the applicant's birth with Timorese civil registry.",
        ],
      };
    }
    if (gp.length || anyTl.length) {
      const closest = gp[0] ?? anyTl[0];
      return {
        tier: "unlikely",
        reasons: [
          `You have an East Timor-born ancestor (${closest.key}), but Article 3 attributes citizenship through the parent line, not directly through grandparents.`,
          "If your intermediate parent established Timorese citizenship before your birth, you may qualify - otherwise the chain typically does not transmit automatically.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No East Timor-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Father or mother born in East Timor or holding Timorese citizenship at the applicant's birth.",
    "No language or civics test for original citizenship by descent.",
    "Dual citizenship recognised.",
    "Grandparent transmission requires the intermediate parent to have established Timorese citizenship first.",
  ],
  documentsOutline: [
    "Parent's East Timorese birth certificate or passport",
    "Applicant's birth certificate",
    "Civil-registry forms",
    "Apostilled translations where required",
  ],
  caveats: [
    "Pre-1999 documentation can be fragmented due to Indonesian-occupation and Portuguese-era registry disruptions; transitional-origin provisions may apply for older cohorts.",
    "Statelessness-protection clauses cover children of unknown / incognito parents but do not extend grandparent reach generally.",
  ],
  officialLinks: [
    {
      label: "Timor-Leste 2002 Constitution (Constitute Project)",
      url: "https://www.constituteproject.org/constitution/East_Timor_2002",
    },
    {
      label: "Migracao Timor-Leste - 2002 Citizenship Law (PDF)",
      url: "https://www.migracao.gov.tl/pdf/[0503-07]citizenship%20Law.pdf",
    },
    {
      label: "Tribunal de Recurso - Citizenship and State-Building in East Timor",
      url: "https://www.tribunais.tl/wp-content/uploads/2020/07/Citizenship-and-State-Building_Prof-Patricia-Jeronimo.pdf",
    },
  ],
  estTimelineMonths: [3, 12],
  estCostUSD: [200, 1500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Parent-line transmission is straightforward where civil-registry records exist; grandparent cases require the intermediate parent to have first established Timorese citizenship.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
