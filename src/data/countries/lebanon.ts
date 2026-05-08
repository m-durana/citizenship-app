import type { Path } from "../../types/path";
import { ancestorsBornIn } from "../../engine/helpers";

export const lebanonLaw41Closed: Path = {
  id: "lb-law-41-closed",
  country: "Lebanon",
  countryCode: "LB",
  flag: "🇱🇧",
  pathType: "restoration",
  name: "Lebanese reacquisition under Law 41/2015 (CLOSED 25 Nov 2025)",
  shortDescription:
    "Law 41/2015 allowed paternal-line descendants of Lebanese ancestors listed on 1921-1924 or 1932 census records to reacquire Lebanese nationality. Application window CLOSED 25 November 2025.",
  evaluate: (p) => {
    const ancestors = ancestorsBornIn(p, "LB");
    if (ancestors.length) {
      return {
        tier: "unlikely",
        reasons: [
          "Law 41/2015 application window CLOSED on 25 November 2025.",
          "Pending applications continue to be reviewed by the Interior Ministry committee, but no new claims accepted.",
          "Maternal-line claims are excluded by the law's gendered transmission rule.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Law 41/2015 CLOSED 25 November 2025.",
        "No Lebanon-born ancestor recorded.",
      ],
    };
  },
  requirementsSummary: [
    "CLOSED to new applicants since 25 November 2025.",
    "Paternal-line linkage to 1921-1924 or 1932 census record.",
    "Decision by Ministry-of-Interior committee.",
  ],
  documentsOutline: [],
  caveats: [
    "Maternal line excluded - Lebanese women cannot transmit citizenship to children born to non-Lebanese fathers (separate live policy debate).",
    "Pre-deadline pipeline applications continue under committee review.",
  ],
  officialLinks: [
    {
      label: "Consulate General of Lebanon in New York - Reacquiring Lebanese Citizenship",
      url: "https://nylebcons.org/reacquiring-lebanese-citizenship/",
    },
    {
      label: "Legal Agenda - Restoring Citizenship Law in Lebanon",
      url: "https://english.legal-agenda.com/restoring-citizenship-law-in-lebanon-renaturalization-without-return/",
    },
    {
      label: "Lebanese nationality law overview",
      url: "https://en.wikipedia.org/wiki/Lebanese_nationality_law",
    },
  ],
  estTimelineMonths: [0, 0],
  estCostUSD: [0, 0],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "low",
    successNote:
      "CLOSED 25 Nov 2025; pre-deadline applications remain in committee pipeline. Excludes maternal-line claims.",
    lawyerTypicallyNeeded: "yes",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};
