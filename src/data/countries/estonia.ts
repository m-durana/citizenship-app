import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const estoniaRestoration: Path = {
  id: "ee-restoration",
  country: "Estonia",
  countryCode: "EE",
  flag: "🇪🇪",
  pathType: "restoration",
  name: "Estonian citizenship by restoration (pre-1940 line)",
  shortDescription:
    "Estonia recognises legal continuity with the pre-1940 Republic: persons who held Estonian citizenship as of 16 June 1940 and their descendants in an unbroken ius-sanguinis line are recognised as citizens by origin.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "EE");
    const gp = grandparentsBornIn(p, "EE");
    const ggp = greatGrandparentsBornIn(p, "EE");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "likely",
        reasons: [
          `You have an Estonia-born ancestor (${closest.key}).`,
          "If the ancestor (or a forebear) held Estonian citizenship as of 16 June 1940 and the line was not voluntarily broken after 1991, you are recognised as a citizen by origin.",
        ],
        needToVerify: [
          "Documentary proof of the ancestor's pre-1940 Estonian citizenship (passport, archival registry, ID).",
          "No intervening generation voluntarily renounced Estonian nationality after 1991.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Estonia-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Documented ancestor who held Estonian citizenship as of 16 June 1940.",
    "Unbroken ius-sanguinis chain (no voluntary renunciation in any later generation).",
    "No language test for restoration by origin (applies only to ordinary naturalisation).",
  ],
  documentsOutline: [
    "Pre-1940 Estonian passport, ID card, or registry entry of the ancestor",
    "Birth and marriage certificates linking each generation",
    "Applicant's current identity documents",
  ],
  caveats: [
    "Estonia does not formally permit dual citizenship for birth-citizens, but the restoration-by-origin pathway treats the holder as never-having-lost; entry to Estonia must be on the Estonian passport.",
    "Archival records may sit in Tartu or Russian state archives; access can be slow.",
  ],
  officialLinks: [
    {
      label: "Estonian nationality law (Citizenship Act overview)",
      url: "https://en.wikipedia.org/wiki/Estonian_nationality_law",
    },
    {
      label: "Migration Policy Institute - Estonian citizenship policy",
      url: "https://www.migrationpolicy.org/article/estonian-citizenship-policy-restoration-country-leads-statelessness-some",
    },
    {
      label: "CitizenX - Estonia citizenship by descent",
      url: "https://citizenx.com/insights/estonia-citizenship-by-descent",
    },
  ],
  estTimelineMonths: [1, 12],
  estCostUSD: [0, 2500],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Recognition rests on continuity-by-birth where pre-1940 ancestor documented; archival burden is the main filter, not substantive review. No public approval-rate data for descendant recognitions.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: false,
      note: "Restoration by origin does not require language test; ordinary naturalization does.",
    },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
