import type { Path } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";

export const philippinesRA9225: Path = {
  id: "ph-ra-9225",
  country: "Philippines",
  countryCode: "PH",
  flag: "🇵🇭",
  pathType: "restoration",
  name: "Philippine citizenship reacquisition (RA 9225)",
  shortDescription:
    "Republic Act 9225 (2003) lets former natural-born Filipinos who lost citizenship by foreign naturalisation reacquire Philippine citizenship by Oath of Allegiance at a Philippine consulate. Minor unmarried children may be derivatively included.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "PH");
    if (par.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Philippines-born parent (${par[0].key}).`,
          "RA 9225 covers former natural-born Filipinos who lost citizenship by foreign naturalisation; adult children of former natural-born Filipinos are not directly covered (separate 1987 Constitution provisions may apply).",
        ],
        needToVerify: [
          "Whether you (or your parent) are a former natural-born Filipino who lost citizenship by foreign naturalisation.",
          "Minor unmarried children may be derivatively included as beneficiaries.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Philippines-born parent recorded.",
        "RA 9225 covers former natural-born Filipinos directly; adult children outside that category would need a separate provision.",
      ],
    };
  },
  requirementsSummary: [
    "Former natural-born Filipino who lost citizenship by foreign naturalisation (or minor child being derivatively included).",
    "Oath of Allegiance to the Republic of the Philippines before a Philippine Consular Officer.",
    "No language test, no civics test.",
    "Dual citizenship explicitly permitted under RA 9225.",
  ],
  documentsOutline: [
    "Proof of natural-born Filipino status (birth certificate, old Philippine passport)",
    "Foreign naturalisation certificate",
    "Applicant's current passport",
    "Children's birth certificates (for derivative inclusion)",
  ],
  caveats: [
    "Adult children of former natural-born Filipinos are not directly covered by RA 9225.",
  ],
  officialLinks: [
    {
      label: "Philippine Consulate San Francisco - Dual Citizenship (RA 9225)",
      url: "https://pcgsanfrancisco.org/dual-citizenship/",
    },
    {
      label: "Philippine Embassy DC - Dual Citizenship",
      url: "https://philippineembassy-dc.org/dual-citizenship-application/",
    },
    {
      label: "Philippine Embassy Madrid - Dual Citizenship",
      url: "https://www.philembassymadrid.com/dual-citizenship",
    },
  ],
  estTimelineMonths: [1, 3],
  estCostUSD: [50, 200],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "high",
    successNote:
      "Declarative path for former natural-born Filipinos and minor children; processed routinely at PH consulates with low refusal rate where status documentation is clean. Specific fee/timing claims (e.g., $50 fee, immediate approval upon oath) reported.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
