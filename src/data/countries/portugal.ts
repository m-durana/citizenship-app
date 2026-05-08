import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  isTrue,
  parentsBornIn,
} from "../../engine/helpers";

export const portugalDescent: Path = {
  id: "pt-descent",
  country: "Portugal",
  countryCode: "PT",
  flag: "🇵🇹",
  pathType: "descent",
  name: "Portuguese citizenship by descent",
  shortDescription:
    "Children of Portuguese citizens are Portuguese by origin; grandchildren of a Portuguese citizen can also acquire nationality, subject to an A2-level Portuguese language test.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "PT");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [`You have a Portuguese-born parent (${par[0].key}).`],
      };
    }
    const gp = grandparentsBornIn(p, "PT");
    if (gp.length) {
      return {
        tier: "likely",
        reasons: [`You have a Portuguese-born grandparent (${gp[0].key}).`],
        needToVerify: [
          "You can pass an A2 Portuguese language exam (CIPLE).",
          "You can produce the grandparent's Portuguese birth certificate from the Civil Registry.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Portuguese-born parent or grandparent recorded."],
    };
  },
  requirementsSummary: [
    "Portuguese-citizen parent (direct, by origin) or Portuguese-born grandparent.",
    "A2 Portuguese language certificate required for the grandparent route.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Ancestor's Portuguese Civil Registry birth certificate",
    "Portuguese ID or passport of the ancestor (if available)",
    "Birth/marriage certificates linking generations, apostilled",
    "Sworn Portuguese translations of foreign documents",
    "A2 CIPLE language certificate",
    "Criminal record certificates from each country of residence",
  ],
  caveats: [
    "Portugal tightened immigration & nationality rules in 2024–2025; verify current processing times.",
  ],
  officialLinks: [
    {
      label: "Instituto dos Registos e do Notariado",
      url: "https://justica.gov.pt/en",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [400, 2500],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "moderate",
    successNote:
      "Grandchild route requires demonstrating 'effective ties', satisfied by passing the CIPLE A2 exam. Processing typically 12-18 months. Children of citizens are generally exempt from the language test.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: true,
      level: "A2 (CIPLE)",
      note: "Pass: at least 55 points overall, with at least 11 in each section. Required for grandchild route; children of citizens generally exempt.",
    },
    knowledgeTest: { required: false },
  },
};

export const portugalSephardicClosed: Path = {
  id: "pt-sephardic-closed",
  country: "Portugal",
  countryCode: "PT",
  flag: "🇵🇹",
  pathType: "heritage",
  name: "Sephardic Jewish heritage program (closed)",
  shortDescription:
    "Portugal's Sephardic Jewish heritage citizenship route closed on 19 June 2025. Only direct relatives (children, spouses) of those who already obtained nationality through this route may still apply.",
  evaluate: (p) => {
    if (isTrue(p.heritage.sephardicAncestry)) {
      return {
        tier: "unlikely",
        reasons: [
          "Portugal's Sephardic Jewish heritage program closed on 19 June 2025.",
          "Spain's parallel program expired earlier - that route is also closed.",
          "The only way in via this lineage is now if a direct relative (parent, spouse) already obtained Portuguese citizenship via the program - they can transmit normally.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["You did not indicate Sephardic Jewish ancestry."],
    };
  },
  requirementsSummary: [
    "Program closed for new applicants as of 19 June 2025.",
    "Existing-citizen relatives remain eligible via standard descent.",
  ],
  documentsOutline: [],
  caveats: [
    "If you have Sephardic ancestry and a Jewish heritage path matters to you, see the Israel Law of Return result.",
  ],
  officialLinks: [
    {
      label: "Defesa Legal - Sephardic program update",
      url: "https://defesalegal.com/services/portuguese-citizenship-sephardic/",
    },
  ],
  estTimelineMonths: [0, 0],
  estCostUSD: [0, 0],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Closed to new applicants. Organic Law 1/2024 added a 3-year residency precondition; the program was terminated in mid-2025.",
    lawyerTypicallyNeeded: "unknown",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};

// Former Portuguese overseas provinces ("ultramar") with their independence-cutoff dates.
const PORTUGAL_ULTRAMAR_CODES = new Set<string>([
  "AO", // Angola (1975)
  "MZ", // Mozambique (1975)
  "CV", // Cape Verde (1975)
  "GW", // Guinea-Bissau (1975)
  "ST", // Sao Tome and Principe (1975)
  "TL", // Portuguese Timor (1975)
  "IN", // Portuguese India / Goa (1961)
  "MO", // Macau (1999)
]);

export const portugalUltramar: Path = {
  id: "pt-ultramar",
  country: "Portugal",
  countryCode: "PT",
  flag: "🇵🇹",
  pathType: "descent",
  name: "Portugal - 'ultramar' / former-colony conservation (Law 37/81)",
  shortDescription:
    "Conservation-of-nationality-by-transcription provisions for those born in former Portuguese overseas provinces (Angola, Mozambique, Cape Verde, Guinea-Bissau, Sao Tome, Goa, Macau, Portuguese Timor) before independence, with a direct ascendant up to the third degree born in mainland Portugal or Madeira/Azores.",
  evaluate: (p) => {
    const selfBornUltramar = p.self.currentCitizenships.length === 0
      ? false
      : false; // Engine has no self-birthCountry field; rely on ancestor chain.
    const ancestors = Object.values(p.ancestors);
    const ancestorBornUltramar = ancestors.find(
      (a) => a && a.birthCountry && PORTUGAL_ULTRAMAR_CODES.has(a.birthCountry),
    );
    const ancestorBornMainland = ancestors.find(
      (a) => a && a.birthCountry === "PT",
    );

    if (ancestorBornUltramar && ancestorBornMainland) {
      return {
        tier: "possibly",
        reasons: [
          "You have an ancestor born in a former Portuguese overseas province before independence.",
          "You also have an ancestor born in mainland Portugal (or Madeira/Azores) within the third-degree window.",
          "Conservation by transcription via the Conservatoria dos Registos Centrais may apply.",
        ],
        needToVerify: [
          "The ultramar-born ancestor's birth predates that province's independence (Angola/Mozambique/Cape Verde/Guinea-Bissau/Sao Tome 1975; Goa 1961; Timor 1975; Macau 1999).",
          "The mainland-Portugal ascendant is within the third degree (great-grandparent or closer).",
          "Documentary chain of vital records.",
        ],
      };
    }
    if (ancestorBornUltramar) {
      return {
        tier: "possibly",
        reasons: [
          "You have an ancestor born in a former Portuguese overseas province.",
          "Conservation requires a direct ascendant up to the third degree born in mainland Portugal or Madeira/Azores.",
        ],
        needToVerify: [
          "Whether you have a mainland-Portuguese-born ascendant within the third degree.",
        ],
      };
    }
    void selfBornUltramar;
    return {
      tier: "unlikely",
      reasons: [
        "No ancestor born in a former Portuguese overseas province recorded.",
      ],
    };
  },
  requirementsSummary: [
    "Born in (or descended from someone born in) a former Portuguese overseas province before its independence date.",
    "Direct ascendant up to third degree born in mainland Portugal or Madeira/Azores.",
    "Application via Conservatoria dos Registos Centrais.",
    "No language test; dual citizenship permitted.",
  ],
  documentsOutline: [
    "Pre-independence birth certificate from the former overseas province",
    "Mainland-Portugal-born ascendant's birth certificate (within third degree)",
    "Birth and marriage certificates linking generations",
    "Apostilled translations into Portuguese",
  ],
  caveats: [
    "Document burden is the practical filter; archival records sit in former-province registries and Lisbon central archives.",
    "Independence dates: Angola/Mozambique/Cape Verde/Guinea-Bissau/Sao Tome 1975; Goa 1961; Timor 1975; Macau 1999.",
  ],
  officialLinks: [
    {
      label: "Lamares, Capela & Associados - Ultramar nationality",
      url: "https://www.lamarescapela.pt/en/knowledge/portuguese-citizenship/ultramar-acquire-or-reacquire-portuguese-nationality/",
    },
    {
      label: "IAS Services - Portuguese citizenship for former colonies",
      url: "https://iasservices.org.uk/pt/citizenship/citizens-of-former-colonies/",
    },
    {
      label: "Portuguese Empire - province independence dates",
      url: "https://en.wikipedia.org/wiki/Portuguese_Empire",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [2500, 8000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Conservation/transcription path for pre-independence colonial births with mainland-Portugal-born ascendant up to 3rd degree; document burden is main filter.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
