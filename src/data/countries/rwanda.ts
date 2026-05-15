import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const rwandaDescent: Path = {
  id: "rw-descent",
  country: "Rwanda",
  countryCode: "RW",
  flag: "🇷🇼",
  pathType: "descent",
  name: "Rwandan citizenship by origin / diaspora track (Organic Law N° 002/2021.OL)",
  shortDescription:
    "Articles 5–6 of Organic Law N° 002/2021.OL of 16/07/2021 establish citizenship by origin for any child of a Rwandan-by-origin parent. A broader reading of Art. 13 and the implementing Ministerial Order N° 007/01 of 23/03/2022 supports an open-ended diaspora track for persons of Rwandan origin and their descendants, applied on an evidence-driven basis. Dual citizenship is permitted (2003 constitutional reform; confirmed by the 2021 organic law).",
  evaluate: (p) => {
    const par = parentsBornIn(p, "RW");
    const gp = grandparentsBornIn(p, "RW");
    const ggp = greatGrandparentsBornIn(p, "RW");

    const diasporaScopeVerify =
      "Rwanda diaspora track: the broad reading of Organic Law N° 002/2021.OL (Art. 13 and its implementing Ministerial Order N° 007/01 of 23/03/2022) as a no-generation-cap diaspora route is contested across sources. Verify the exact statutory wording and the DGIE's evidentiary menu before assuming a multi-generation claim.";
    const civilRegistryCaveat =
      "1994 genocide and civil-registry disruption: many older Rwandan birth and marriage records were destroyed or scattered. Corroborated sworn testimony may substitute for civil records in some cases - confirm DGIE practice.";
    const dgieVerify =
      "Applications are made to the Directorate General of Immigration and Emigration (DGIE) under the 2022 Ministerial Order. The evidentiary standard is administrative and case-by-case.";

    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Rwandan-linked parent (${par[0].key}).`,
          "Articles 5–6 of Organic Law N° 002/2021.OL establish citizenship by origin for the child of a Rwandan-by-origin parent.",
        ],
        needToVerify: [
          dgieVerify,
          civilRegistryCaveat,
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Rwandan-linked grandparent (${gp[0].key}).`,
          "A documentary chain back to a Rwandan-by-origin grandparent supports the diaspora track under Arts. 5–6 and 13 of the organic law.",
        ],
        needToVerify: [
          diasporaScopeVerify,
          civilRegistryCaveat,
          dgieVerify,
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Rwandan-linked great-grandparent (${ggp[0].key}).`,
          "The diaspora track is evidence-driven; great-grandparent claims are supportable with a corroborated documentary chain but the no-generation-cap reading is contested.",
        ],
        needToVerify: [
          diasporaScopeVerify,
          civilRegistryCaveat,
          dgieVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Rwandan-linked ancestor recorded. The diaspora track under Organic Law N° 002/2021.OL is open to persons of Rwandan origin and their descendants, but requires at least one ancestor of Rwandan origin in the direct line.",
        "If you have a Rwandan-origin ancestor not yet recorded, add them above and this path will re-evaluate.",
      ],
    };
  },
  requirementsSummary: [
    "A Rwandan-by-origin ancestor in the direct line (Arts. 5–6, Organic Law N° 002/2021.OL).",
    "Diaspora track applied on an evidence-driven basis under Art. 13 + Ministerial Order N° 007/01 of 23/03/2022.",
    "Dual citizenship permitted (2003 constitutional reform; confirmed 2021 organic law).",
    "Applications filed with the Directorate General of Immigration and Emigration (DGIE).",
  ],
  documentsOutline: [
    "Birth certificates linking each generation to the Rwandan-by-origin ancestor",
    "Marriage and death certificates as needed for the chain",
    "Where civil records are unavailable, corroborated sworn testimony or community attestations",
    "Applicant's current passport and proof of residence",
    "DGIE diaspora declaration / application form",
  ],
  caveats: [
    "The 1994 genocide disrupted civil registries; older records may be missing or destroyed.",
    "The no-generation-cap reading of the diaspora track is contested - verify with DGIE for great-grandparent claims.",
    "Evidentiary standard is administrative; outcomes depend on case-by-case DGIE assessment.",
    "Dual citizenship is permitted; the 2021 organic law confirmed the 2003 constitutional position.",
  ],
  officialLinks: [
    {
      label: "Directorate General of Immigration and Emigration (DGIE)",
      url: "https://www.migration.gov.rw/",
    },
    {
      label: "RwandaLII - Organic Law N° 002/2021.OL",
      url: "https://rwandalii.org/akn/rw/act/ol/2021/002/eng@2021-07-16",
    },
    {
      label: "Ministry of Justice (Rwanda)",
      url: "https://www.minijust.gov.rw/",
    },
  ],
  estTimelineMonths: [3, 12],
  estCostUSD: [50, 200],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct-parent and grandparent cases with intact civil records succeed reliably. Great-grandparent claims depend on a contested reading of Art. 13 and on DGIE evidentiary discretion. The 1994 civil-registry disruption is the main practical obstacle for older cases.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
