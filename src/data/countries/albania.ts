import type { Path } from "../../types/path";
import { ancestorsBornIn, parentsBornIn } from "../../engine/helpers";

export const albaniaEthnicOrigin: Path = {
  id: "al-ethnic-origin",
  country: "Albania",
  countryCode: "AL",
  flag: "🇦🇱",
  pathType: "heritage",
  name: "Albanian citizenship by ethnic origin (Law 113/2020)",
  shortDescription:
    "Law 113/2020 lets persons of Albanian origin who can show direct descent from an Albanian-citizen ancestor petition the President of the Republic for citizenship, with no firm generational cap.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "AL");
    const ancestors = ancestorsBornIn(p, "AL");
    if (par.length || ancestors.length) {
      const closest = par[0] ?? ancestors[0];
      return {
        tier: "possibly",
        reasons: [
          `You have an Albania-born ancestor (${closest.key}).`,
          "Law 113/2020 has no firm generational cap for persons of Albanian origin.",
          "Final approval is by Presidential Decree.",
        ],
        needToVerify: [
          "Direct provable descent from an Albanian-citizen ancestor or person of Albanian origin.",
          "You self-identify as Albanian (this engine has no ethnic-Albanian flag and uses birth country as a proxy).",
          "Implementation is patchy; expect Presidential-decree bottlenecks.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Albania-born ancestor recorded.",
        "Law 113/2020 still allows ethnic-Albanian applicants in former-Yugoslav successor states, Greece, and the Western diaspora; contact a consulate if you are of Albanian origin.",
      ],
    };
  },
  requirementsSummary: [
    "Direct provable descent from an Albanian citizen or person of Albanian origin.",
    "Petition to the President of the Republic via Ministry of Interior or consular mission.",
    "No statutory language test for ethnic-origin admission; Albanian-language ability viewed favourably.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Documentation of the ancestor's Albanian citizenship or ethnic origin",
    "Birth and marriage certificates linking generations",
    "Apostilled translations into Albanian",
    "Applicant's identity and residency documents",
  ],
  caveats: [
    "Implementation reports are uneven; Presidential decree processing can be slow.",
    "This engine uses birthCountry as a proxy for ethnic-Albanian identity; a future schema should add an ethnic-Albanian flag.",
  ],
  officialLinks: [
    {
      label: "Republic of Albania - Law No. 113/2020 on Citizenship (English)",
      url: "https://data.globalcit.eu/NationalDB/docs/Law%20No.%20113-2020%20(English).pdf",
    },
    {
      label: "Globalcit - Albania ethnic-Albanians and diaspora",
      url: "https://globalcit.eu/albania-to-grant-citizenship-to-ethnic-albanians-in-the-neighbourhood-and-diaspora/",
    },
    {
      label: "Edinburgh Law School - Citizenship in Albania (working paper)",
      url: "https://www.law.ed.ac.uk/sites/default/files/2020-02/277_citizenshipinanemigrantnationstatethecaseofalbania.pdf",
    },
  ],
  estTimelineMonths: [6, 36],
  estCostUSD: [1500, 5000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "unknown",
    successNote:
      "Statutory framework exists since Law 113/2020 but implementation reports are uneven; no published approval-rate statistic.",
    lawyerTypicallyNeeded: "yes",
    languageTest: {
      required: false,
      note: "No statutory test for ethnic-origin route; Albanian ability viewed favorably.",
    },
    knowledgeTest: { required: false },
  },
};
