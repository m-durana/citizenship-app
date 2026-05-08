import type { Path } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";

export const cubaDescent: Path = {
  id: "cu-descent",
  country: "Cuba",
  countryCode: "CU",
  flag: "🇨🇺",
  pathType: "descent",
  name: "Cuban citizenship by descent",
  shortDescription:
    "Cuba's 2019 Constitution and prior Decree 358/1944 recognise descent through a Cuban parent, but historically require establishing residency in Cuba and obtaining a Certificate of Nationality. A 2024 reform anticipated to broaden this is not yet confirmed in force.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "CU");
    if (par.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Cuba-born parent (${par[0].key}).`,
          "Cuban descent claims historically require establishing residency in Cuba and obtaining a Certificate of Nationality.",
        ],
        needToVerify: [
          "Willingness to establish Cuban residency.",
          "Whether the 2024 citizenship law has come into force with implementing regulations.",
          "Dual nationality recognition: not formally recognised under prior law; anticipated under the 2024 reform.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Cuba-born parent recorded.",
        "Grandchild expansion is anticipated under the 2024 law but not confirmed in force.",
      ],
    };
  },
  requirementsSummary: [
    "Cuban-citizen parent.",
    "Establishment of Cuban residency and a Certificate of Nationality (under prior law).",
    "2024 reform anticipated to expand grandchild reach and dual nationality, but implementation status unconfirmed.",
  ],
  documentsOutline: [
    "Parent's Cuban citizenship and birth records",
    "Applicant's birth certificate",
    "Evidence of Cuban residency",
    "Apostilled translations into Spanish",
  ],
  caveats: [
    "Residency-on-island requirement filters most diaspora applicants.",
    "Implementation of the 2024 reform is unconfirmed; grandchild claims are not yet being processed.",
  ],
  officialLinks: [
    {
      label: "Cuban nationality law overview",
      url: "https://en.wikipedia.org/wiki/Cuban_nationality_law",
    },
    {
      label: "LegalClarity - How to get Cuban citizenship",
      url: "https://legalclarity.org/how-to-get-cuban-citizenship-requirements-and-process/",
    },
    {
      label: "Cuba 2019 Constitution (Constitute Project)",
      url: "https://www.constituteproject.org/constitution/Cuba_2019",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [2000, 7000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "Residency-on-island requirement filters most diaspora; 2024 reform reportedly enacted via Laws 171, 172, 173 but implementation status not independently corroborated as of early 2026.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
