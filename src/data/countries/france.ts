import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const franceDescent: Path = {
  id: "fr-descent",
  country: "France",
  countryCode: "FR",
  flag: "🇫🇷",
  pathType: "descent",
  name: "French citizenship by descent (Code civil Arts. 18, 30-3)",
  shortDescription:
    "France transmits citizenship by descent without an explicit statutory generation cap (Code civil Art. 18). However, Article 30-3 lets a tribunal declare loss of nationality where neither the applicant nor the transmitting parent has exercised possession d'etat of French nationality for more than 50 years.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "FR");
    const gp = grandparentsBornIn(p, "FR");
    const ggp = greatGrandparentsBornIn(p, "FR");

    const maternalPre1973Verify =
      "If your claim runs through a woman in the line and the relevant ancestor transmitted before 1973, pre-1973 French law restricted maternal transmission - confirm whether the woman's status was equivalent under the rules in force at the time of each child's birth.";

    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a French-linked parent (${par[0].key}).`,
          "Article 18 of the Code civil transmits French nationality to the child of a French parent at the moment of birth.",
        ],
        needToVerify: [
          "Your parent was a French citizen at the time of your birth (not merely born in France).",
          "Article 30-3 of the Code civil: a tribunal may declare loss of nationality where neither you nor the transmitting French parent has exercised possession d'etat of French nationality (passport renewal, consular registration, voting from abroad) for more than 50 years.",
          maternalPre1973Verify,
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a French-linked grandparent (${gp[0].key}).`,
          "France has no explicit statutory generation cap on jus sanguinis transmission, so a grandparent chain can in principle reach you.",
          "A chain crossing two or more generations abroad triggers the Article 30-3 possession d'etat test.",
        ],
        needToVerify: [
          "Article 30-3 of the Code civil: if neither you nor the transmitting French ancestor has actively exercised French status (passport renewal, consular registration, voting from abroad) for more than 50 years, a tribunal may declare loss of nationality. Verify possession d'etat with the Tribunal judiciaire de Paris before applying for a CNF.",
          "The unbroken chain of citizenship between your French-born grandparent and you (each generation must have been French at the next child's birth).",
          maternalPre1973Verify,
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a French-linked great-grandparent (${ggp[0].key}).`,
          "France has no explicit statutory generation cap, but a chain reaching back to a great-grandparent almost always engages Article 30-3 possession d'etat scrutiny.",
        ],
        needToVerify: [
          "Article 30-3 of the Code civil: a chain spanning three generations abroad without active exercise of French nationality is highly likely to fail the 50-year possession d'etat test.",
          "Documentary chain (vital records, consular registrations, French passports) for every generation between your French-linked great-grandparent and you.",
          maternalPre1973Verify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No French-linked parent, grandparent, or great-grandparent recorded.",
        "French jus sanguinis under Article 18 of the Code civil requires a French ancestor in the direct line.",
      ],
    };
  },
  requirementsSummary: [
    "A French-citizen ancestor in the direct line at the time of the next generation's birth (Code civil Art. 18).",
    "No explicit statutory generation cap, but Code civil Art. 30-3 lets a tribunal declare loss of nationality after 50 years without possession d'etat abroad.",
    "Pre-1973 maternal transmission was gendered/restricted - verify case-by-case.",
    "Dual citizenship is currently permitted under French law.",
  ],
  documentsOutline: [
    "Certificat de Nationalite Francaise (CNF) application",
    "Cerfa 16237 (CNF request form)",
    "Vital records (birth, marriage, death certificates) for every generation in the chain",
    "Apostilled translations into French by an authorized translator",
    "Evidence of possession d'etat (French passports, consular registrations, voting records) for the transmitting ancestor(s)",
    "Applicant's current passport and proof of residence",
  ],
  caveats: [
    "Non-residents file the CNF application with the Tribunal judiciaire de Paris (Pole de la nationalite francaise).",
    "Article 30-3 (50-year possession d'etat) is the central chain-killer for diaspora cases.",
    "Pre-1973 maternal transmission was restricted under then-prevailing law - chains through women before 1973 require careful verification.",
  ],
  officialLinks: [
    {
      label: "Legifrance - Code civil, Art. 18",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006419672/",
    },
    {
      label: "Legifrance - Code civil, Art. 30-3",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006419739/",
    },
    {
      label: "Service-public.gouv.fr - Certificat de nationalite francaise",
      url: "https://www.service-public.fr/particuliers/vosdroits/F1051",
    },
  ],
  estTimelineMonths: [6, 24],
  estCostUSD: [200, 1500],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct-parent CNF applications routinely succeed when documentation is complete. Multi-generation chains face Article 30-3 possession d'etat scrutiny and frequently require litigation before the Tribunal judiciaire de Paris.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
