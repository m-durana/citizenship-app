import type { Path } from "../../types/path";
import {
  greatGrandparentsBornIn,
  grandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const sriLankaDescent: Path = {
  id: "lk-descent",
  country: "Sri Lanka",
  countryCode: "LK",
  flag: "🇱🇰",
  pathType: "descent",
  name: "Sri Lankan citizenship by descent and resumption",
  shortDescription:
    "The Citizenship Act recognises descent through father, paternal grandfather, or paternal great-grandfather (with post-2003 maternal-line recognition for births after the relevant amendment). Section 19(2) provides resumption for those who lost citizenship by foreign naturalisation.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "LK");
    const gp = grandparentsBornIn(p, "LK");
    const ggp = greatGrandparentsBornIn(p, "LK");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Sri Lanka-born ancestor (${closest.key}).`,
          "Descent runs through father, paternal grandfather, or paternal great-grandfather; post-2003 amendments recognise maternal transmission for later births.",
        ],
        needToVerify: [
          "Whether your line is paternal or maternal; for older cohorts (pre-22 May 1972) the rule is paternal-only.",
          "If you lost Sri Lankan citizenship by foreign naturalisation, you may use Section 19(2) resumption (categories: age 55+, qualifying credentials, or LKR 2.5M+ assets/fixed deposit held 3+ years).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Sri Lanka-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Descent up to paternal great-grandfather (post-1972 cohort) or maternal line for post-2003 births.",
    "Resumption (Section 19(2)) requires fitting a category: age 55+, qualifying credentials, or asset/deposit hold.",
    "No language or civics test.",
    "Dual citizenship permitted under specific resumption framework.",
  ],
  documentsOutline: [
    "Sri Lanka-born ancestor's birth certificate",
    "Birth and marriage certificates linking generations",
    "Evidence supporting Section 19(2) category (for resumption)",
    "Applicant's identity documents",
  ],
  caveats: [
    "Paternal-line bias persists for older cohorts.",
    "Resumption fees and asset-hold thresholds may apply.",
  ],
  officialLinks: [
    {
      label: "Sri Lanka Department of Immigration - Dual Citizenship",
      url: "https://www.immigration.gov.lk/pages_e.php?id=4",
    },
    {
      label: "Sri Lanka Permanent Mission to the UN - Dual Citizenship",
      url: "https://www.un.int/srilanka/dual-citizenship",
    },
    {
      label: "Sri Lanka Citizenship Act (statutory text)",
      url: "https://www.srilankalaw.lk/revised-statutes/alphabetical-list-of-statutes/196-citizenship-act.html",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [1000, 4500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Resumption requires fitting category (age, credentials, or asset hold); descent up to paternal great-grandfather is generous but paternal-line bias persists for older cohorts.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
