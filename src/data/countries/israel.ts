import type { Path } from "../../types/path";

export const israelLawOfReturn: Path = {
  id: "il-law-of-return",
  country: "Israel",
  countryCode: "IL",
  flag: "🇮🇱",
  pathType: "heritage",
  name: "Israeli citizenship via the Law of Return",
  shortDescription:
    "Israel's Law of Return (1950, amended 1970) grants citizenship to Jews, people with at least one Jewish grandparent, and their spouses. Conversion to Judaism is also recognized, with denomination caveats.",
  evaluate: (p) => {
    const j = p.heritage.jewish;
    if (j === "maternal" || j === "paternal" || j === "both") {
      return {
        tier: "likely",
        reasons: [
          "Under the 1970 amendment to the Law of Return, anyone with at least one Jewish parent or grandparent qualifies.",
        ],
        needToVerify: [
          "Documentary proof of Jewish ancestry (e.g. parent or grandparent's ketubah, synagogue records, or rabbinical letter).",
        ],
      };
    }
    if (j === "convert") {
      return {
        tier: "possibly",
        reasons: [
          "You marked Jewish status by conversion - the Law of Return recognizes converts.",
        ],
        needToVerify: [
          "Israeli authorities scrutinize conversion route: Orthodox conversions are universally accepted; Conservative/Reform conversions performed abroad are accepted but may face additional review.",
          "Aliyah (relocation to Israel) is traditionally part of the process.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "You did not indicate Jewish heritage or conversion.",
        "The Law of Return is the primary heritage path; without it, ordinary naturalization in Israel is restrictive.",
      ],
    };
  },
  requirementsSummary: [
    "Jewish, OR at least one Jewish grandparent, OR Jewish spouse, OR converted to Judaism.",
    "Aliyah (immigration to Israel) is the traditional process; some pre-aliyah documents can be processed at consulates.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Proof of Jewish ancestry (parent or grandparent's marriage / synagogue records, rabbinical letter)",
    "For converts: certificate of conversion from a recognized rabbinical court",
    "Birth certificate, current passport, criminal record check",
  ],
  caveats: [
    "Conversion route: recognition of Conservative/Reform conversions performed abroad is accepted but periodically debated politically.",
    "Aliyah is the standard pathway; spend time on the ground is expected.",
  ],
  officialLinks: [
    {
      label: "Ministry of Aliyah and Integration",
      url: "https://www.gov.il/en/departments/ministry_of_aliyah_and_integration",
    },
  ],
  estTimelineMonths: [3, 18],
  estCostUSD: [0, 1500],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "high",
    successNote:
      "Declarative pathway with high approval when Jewish-grandparent documentation is in order. The 1970 amendment extends to non-Jewish spouse, child, and grandchild of a Jew.",
    lawyerTypicallyNeeded: "no",
    languageTest: { required: false, note: "Hebrew is offered after immigration via Ulpan; no test required for the Law of Return application." },
    knowledgeTest: { required: false, note: "The Jewish Agency (Sochnut) and Nefesh B'Nefesh handle most cases for free." },
  },
};
