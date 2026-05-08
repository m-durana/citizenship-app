import type { Path } from "../../types/path";

export const sierraLeoneDNAHeritage: Path = {
  id: "sl-dna-heritage",
  country: "Sierra Leone",
  countryCode: "SL",
  flag: "🇸🇱",
  pathType: "heritage",
  name: "Sierra Leonean citizenship via DNA heritage",
  shortDescription:
    "Sierra Leone's diaspora DNA-heritage pathway (administrative under the 1973 Citizenship Act, 2006 'negro African descent' definition, and 2017 amendments) lets African-diaspora applicants whose maternal or paternal lineage traces to Sierra Leone obtain citizenship via DNA test, certified tour, and a conferment ceremony.",
  evaluate: (p) => {
    if (p.heritage.africanDiasporaDescendant !== true) {
      return {
        tier: "unlikely",
        reasons: [
          "This route is restricted to African-diaspora applicants who can document maternal or paternal lineage to Sierra Leone via DNA testing.",
        ],
      };
    }
    return {
      tier: "possibly",
      reasons: [
        "Sierra Leone offers a discretionary DNA-heritage citizenship route to African-diaspora applicants.",
        "More than 250 applicants have received Sierra Leonean citizenship and passports since the first ceremony in April 2019.",
      ],
      needToVerify: [
        "DNA test from an approved provider (typically African Ancestry's MatriClan / PatriClan) showing maternal or paternal lineage to Sierra Leone.",
        "Self-identification as a person of negro African descent (the 2006 amendment defines the eligibility category).",
        "Travel to Sierra Leone via a certified tour company.",
        "Discretionary grant by the President / Ministry of Internal Affairs; conferment ceremony required.",
      ],
    };
  },
  requirementsSummary: [
    "DNA test (MatriClan or PatriClan) confirming maternal or paternal lineage to Sierra Leone.",
    "Travel to Sierra Leone via certified tour company.",
    "Confirmation of negro African descent under the 2006 amendment.",
    "Discretionary grant by the President / Ministry of Internal Affairs; conferment ceremony.",
  ],
  documentsOutline: [
    "DNA test results from approved provider",
    "Tour-company certification of in-country travel",
    "Applicant's identity documents",
    "Application materials per Ministry of Internal Affairs",
  ],
  caveats: [
    "Discretionary administrative grant; no published approval-rate statistic beyond the 250+ figure.",
    "Limited intake capacity may slow demand.",
    "The 2006 'negro African descent' statutory definition is an ethnic-restriction clause; engine surfaces this rule without auto-evaluating against ethnicity self-identification.",
  ],
  officialLinks: [
    {
      label: "Visit Sierra Leone - DNA heritage citizenship guidelines",
      url: "https://www.visitsierraleone.org/traced-dna-to-sierra-leone-check-out-guidelines-for-african-diaspora-accession-of-passports-citizenship-from-the-government-of-sierra-leone/",
    },
    {
      label: "Sierra Leone Immigration Department - Policy guidance on nationality",
      url: "https://slid.gov.sl/wp-content/uploads/2020/02/Policy-Guidance-on-Nationality.pdf",
    },
    {
      label: "Travel Africa Movement - Citizenship by DNA lineage",
      url: "https://www.travelafricamovement.com/citizenship-by-dna-lineage/",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [5000, 15000],
  lastReviewed: "2026-05-08",
  practical: {
    successSignal: "moderate",
    successNote:
      "Citizenship grants confirmed (250+ since 2019) via DNA + ceremony; discretionary admin grant. GO-FOR-GOLD investment route ($100k / 60-day timeline) reported.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
