import type { Path } from "../../types/path";
import {
  ancestorsBornIn,
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const indiaOCI: Path = {
  id: "in-oci",
  country: "India",
  countryCode: "IN",
  flag: "🇮🇳",
  pathType: "heritage",
  name: "India OCI - Overseas Citizen of India (Citizenship Act 1955, § 7A) - NOT CITIZENSHIP",
  shortDescription:
    "OCI (Overseas Citizen of India) is a LIFELONG VISA status, NOT Indian citizenship. India does not permit dual citizenship. Section 7A of the Citizenship Act 1955 extends OCI eligibility up to the great-grandchild of a qualifying person whose Indian-citizenship status is anchored to the 26 January 1950 commencement date of the Constitution. Any Pakistan or Bangladesh citizenship in the applicant's self/parent/grandparent/great-grandparent line is a HARD STATUTORY BAR.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "IN");
    const gp = grandparentsBornIn(p, "IN");
    const ggp = greatGrandparentsBornIn(p, "IN");

    const pakBanBar = ancestorsBornIn(p, "PK");
    const bdBar = ancestorsBornIn(p, "BD");
    const hardBar = pakBanBar.length > 0 || bdBar.length > 0;

    const hardBarVerify =
      "India OCI § 7A hard bar: any past or present Pakistan or Bangladesh citizenship of you, your parent, grandparent, or great-grandparent is a statutory disqualification. Confirm none of those ancestors ever held Pakistani or Bangladeshi citizenship before applying.";
    const commencementVerify =
      "Eligibility hinges on the qualifying ancestor's Indian-citizenship status anchored to the 26 January 1950 commencement of the Constitution. Verify the ancestor was an Indian citizen at that date, or eligible to become one, and was not a citizen of Pakistan or Bangladesh at any time.";
    const cancelVerify =
      "The Ministry of Home Affairs (MHA) may unilaterally cancel OCI - see Aatish Taseer (2019). Treat OCI as a revocable privilege rather than a permanent right.";
    const reendorseVerify =
      "OCI re-endorsement: each Indian passport reissuance historically triggered OCI re-endorsement (waived for some age brackets). Confirm current MHA policy before traveling on a renewed foreign passport.";

    if (hardBar) {
      return {
        tier: "unlikely",
        reasons: [
          "Section 7A hard bar: you indicated an ancestor in scope (self, parent, grandparent, or great-grandparent) with Pakistan or Bangladesh citizenship.",
          "This disqualifies the entire OCI claim regardless of any Indian ancestry in the same line.",
        ],
        needToVerify: [
          "Whether the flagged Pakistani/Bangladeshi link is actually within the disqualifying scope (self/parent/grandparent/great-grandparent).",
          hardBarVerify,
        ],
      };
    }
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have an Indian-linked parent (${par[0].key}).`,
          "Section 7A grants OCI eligibility to children of qualifying former or current Indian citizens.",
          "OCI is a lifelong visa with broad rights but NOT Indian citizenship.",
        ],
        needToVerify: [
          commencementVerify,
          hardBarVerify,
          cancelVerify,
          reendorseVerify,
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "likely",
        reasons: [
          `You have an Indian-linked grandparent (${gp[0].key}).`,
          "Section 7A extends OCI eligibility to grandchildren of qualifying Indian citizens.",
        ],
        needToVerify: [
          commencementVerify,
          hardBarVerify,
          cancelVerify,
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have an Indian-linked great-grandparent (${ggp[0].key}).`,
          "Section 7A reaches up to great-grandchildren of qualifying Indian citizens, but great-grandparent documentation often runs into the 26 January 1950 commencement gate.",
        ],
        needToVerify: [
          commencementVerify,
          hardBarVerify,
          "Documentary chain establishing the great-grandparent's Indian-citizenship status at the 26 January 1950 commencement.",
          cancelVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Indian-linked parent, grandparent, or great-grandparent recorded.",
        "OCI under § 7A requires a qualifying Indian ancestor within four generations.",
        "Spouse route: a foreign national married to an Indian citizen or OCI for at least 2 years may apply separately.",
      ],
    };
  },
  requirementsSummary: [
    "OCI is a LIFELONG VISA, NOT Indian citizenship. India does not allow dual citizenship.",
    "Qualifying ancestor (self/parent/grandparent/great-grandparent) must be an Indian citizen at the 26 January 1950 commencement, or eligible to be.",
    "HARD BAR: any Pakistan or Bangladesh citizenship of self/parent/grandparent/great-grandparent.",
    "Spouse route: ≥2 years marriage to an Indian citizen or OCI.",
    "Fee USD 275 (initial, abroad) / USD 25 (renewal).",
  ],
  documentsOutline: [
    "Qualifying ancestor's old Indian passport or other proof of Indian citizenship",
    "Birth certificates linking each generation to the qualifying ancestor",
    "Marriage certificates (and ≥2-year proof for spouse route)",
    "Self-declaration that no ancestor in scope was ever a citizen of Pakistan or Bangladesh",
    "Applicant's current passport and recent photograph",
  ],
  caveats: [
    "OCI is NOT citizenship - it is a lifelong multi-entry visa with limited civic rights.",
    "Pakistan/Bangladesh-citizenship hard bar covers four generations up; this is the dominant failure mode.",
    "MHA may unilaterally cancel OCI (see Aatish Taseer 2019).",
    "OCI re-endorsement is required on certain passport reissuances; check current MHA policy.",
    "'Notified country' exclusions beyond Pakistan/Bangladesh may apply per the MHA FAQ.",
  ],
  officialLinks: [
    {
      label: "Ministry of Home Affairs - Citizenship",
      url: "https://www.mha.gov.in/en/division_of_mha/foreigners-division/citizenship",
    },
    {
      label: "OCI Services portal",
      url: "https://ociservices.gov.in/",
    },
    {
      label: "India Code - Citizenship Act 1955",
      url: "https://www.indiacode.nic.in/handle/123456789/1522",
    },
  ],
  estTimelineMonths: [2, 6],
  estCostUSD: [25, 350],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "OCI applications with clear documentation and no Pakistan/Bangladesh bar succeed reliably. The Pakistan/Bangladesh hard bar and OCI cancellation discretion are the chief risks.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
