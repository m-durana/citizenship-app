import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { ancestorsBornIn, parentsBornIn } from "../../engine/helpers";

// Maternal-line keys: any path beginning with "mother" includes a woman in
// the line. Used for the pre-1934 patrilineal-only verify (1994 partial
// retroactive fix).
const MATERNAL_KEYS: AncestorKey[] = [
  "mother",
  "motherFather",
  "motherMother",
  "motherFatherFather",
  "motherFatherMother",
  "motherMotherFather",
  "motherMotherMother",
  "fatherMother",
  "fatherMotherFather",
  "fatherMotherMother",
  "fatherFatherMother",
];

const FEE_VERIFY =
  "USCIS and Department of State fees change periodically. CRBA filings are approximately USD 100; N-600 filings have ranged between USD 1,170 and USD 1,385 depending on year and edition. Check the current USCIS fee schedule (uscis.gov/g-1055) before filing.";

export const usaDescent: Path = {
  id: "us-descent",
  country: "United States",
  countryCode: "US",
  flag: "🇺🇸",
  pathType: "descent",
  name: "US citizenship at birth (INA Sec. 301 / 8 USC 1401, INA Sec. 309 / 1409)",
  shortDescription:
    "US citizenship at birth abroad is governed by INA Sec. 301 (8 USC 1401) for children of married parents and INA Sec. 309 (8 USC 1409) for children born out of wedlock. The transmitting parent must have accumulated specific physical presence in the United States before the applicant's birth - the rule changed by Congress in 1934, 1941, 1952, and 1986.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "US");
    const selfBirthYear = p.self.birthYear;

    const maternalUS = ancestorsBornIn(p, "US").filter((a) =>
      MATERNAL_KEYS.includes(a.key),
    );

    if (!par.length) {
      return {
        tier: "unlikely",
        reasons: [
          "US citizenship at birth abroad runs through a US-citizen parent. INA Sec. 301 / 309 do not extend to grandparents (the grandparent INA Sec. 322 / N-600K route requires the child to be a minor present in the United States, which is a separate path).",
        ],
      };
    }

    const parentKey = par[0].key;

    // Pre-1934 births: patrilineal-only with 1994 partial retroactive fix.
    if (typeof selfBirthYear === "number" && selfBirthYear < 1934) {
      const tier = maternalUS.length ? "possibly" : "possibly";
      return {
        tier,
        reasons: [
          `You have a US-linked parent (${parentKey}) and were born before 1934.`,
          "Pre-1934 births were patrilineal-only under then-prevailing US nationality law. The 1994 amendment (INA Sec. 301(h)) provided a partial retroactive fix for children of US-citizen mothers, but the equalization is limited.",
        ],
        needToVerify: [
          "Pre-1934 maternal-line claims: confirm whether your case fits the INA Sec. 301(h) 1994 retroactive provision (US-citizen mother who would have transmitted under post-1934 rules).",
          "Retention requirements that applied to children born abroad before 1978 (8 FAM 301; conditions on continued physical presence in the US after a certain age).",
          FEE_VERIFY,
          "Morales-Santana v. Lynch (137 S. Ct. 1678, 2017): the Supreme Court equalized the out-of-wedlock physical-presence rule between US-citizen mothers and fathers. Confirm impact on your specific birth-year matrix.",
        ],
      };
    }

    // 1934 to before 14 Dec 1941: combination of patrilineal carryover and
    // gradually-equalising rules. Treat as the same window as 1941-1952 for
    // tiering, but emit retention verify.
    if (typeof selfBirthYear === "number" && selfBirthYear < 1952) {
      return {
        tier: "likely",
        reasons: [
          `You have a US-linked parent (${parentKey}) and were born between 1934 and 1952.`,
          "INA Sec. 301 / 8 USC 1401 (and predecessor Nationality Act of 1940) transmitted US citizenship to a child born abroad to a US-citizen parent, but physical-presence and retention rules of the era apply.",
        ],
        needToVerify: [
          "For 1941-1952 births: the transmitting US-citizen parent must generally have accumulated 5 years of physical presence in the United States after age 16 before your birth.",
          "Retention requirements that applied to children born abroad before 1978 (8 FAM 301; the post-birth US-residence conditions that could strip citizenship if not met).",
          FEE_VERIFY,
          "Morales-Santana v. Lynch (137 S. Ct. 1678, 2017): the Supreme Court equalized the out-of-wedlock physical-presence rule between US-citizen mothers and fathers. Confirm impact on your specific birth-year matrix.",
        ],
      };
    }

    if (typeof selfBirthYear === "number" && selfBirthYear < 1986) {
      return {
        tier: "likely",
        reasons: [
          `You have a US-linked parent (${parentKey}) and were born between 1952 and 14 November 1986.`,
          "INA Sec. 301 / 8 USC 1401 transmitted US citizenship to a child born abroad to a US-citizen parent in this window, subject to a 10-year physical-presence test.",
        ],
        needToVerify: [
          "1952-1986 rule: the transmitting US-citizen parent must have accumulated 10 years of physical presence in the United States before your birth, with 5 of those years after age 14.",
          "Retention requirements that applied to children born abroad before 1978 (8 FAM 301; conditions on continued physical presence in the US after a certain age, which could strip citizenship if not met).",
          "Documentary proof of the parent's physical presence is the dominant failure mode - school transcripts, W-2s, SSA-7050 earnings statement, US passports, military records.",
          FEE_VERIFY,
          "Morales-Santana v. Lynch (137 S. Ct. 1678, 2017): the Supreme Court equalized the out-of-wedlock physical-presence rule between US-citizen mothers and fathers.",
        ],
      };
    }

    // Post-1986 (born on or after 14 Nov 1986): the modern rule.
    return {
      tier: "likely",
      reasons: [
        `You have a US-linked parent (${parentKey}).`,
        "Post-1986 rule (INA Sec. 301 / 8 USC 1401, as amended 14 Nov 1986): a child born abroad to a US-citizen parent acquires US citizenship at birth if the parent has the required physical presence in the United States before the child's birth.",
      ],
      needToVerify: [
        "Post-1986 rule: the transmitting US-citizen parent must have accumulated 5 years of physical presence in the United States before your birth, with 2 of those years after age 14.",
        "Documentary proof of the parent's physical presence is the dominant failure mode - school transcripts, W-2s, SSA-7050 earnings statement, US passports, military records.",
        FEE_VERIFY,
        "For out-of-wedlock cases, INA Sec. 309 / 8 USC 1409 applies. Morales-Santana v. Lynch (137 S. Ct. 1678, 2017) equalized the physical-presence rule between US-citizen mothers and fathers.",
      ],
    };
  },
  requirementsSummary: [
    "A US-citizen parent at the time of your birth (INA Sec. 301 / 8 USC 1401 for married parents; INA Sec. 309 / 8 USC 1409 for out of wedlock).",
    "Physical-presence requirement on the transmitting parent, varying by your birth year: post-1986 (5 years, 2 after 14); 1952-1986 (10 years, 5 after 14); 1941-1952 (5 years after age 16, plus retention rules); pre-1934 patrilineal-only with a 1994 partial retroactive fix for maternal cases.",
    "Pre-1978 births also have retention requirements (8 FAM 301).",
    "Dual citizenship is tolerated; Vance v. Terrazas (444 US 252, 1980) requires a voluntary expatriating act plus intent to relinquish.",
  ],
  documentsOutline: [
    "Consular Report of Birth Abroad (CRBA / Form FS-240) filed before age 18, OR",
    "Form N-600 (Application for Certificate of Citizenship) for adults",
    "Parent's school transcripts, W-2s, and Social Security Administration SSA-7050 itemized earnings statement (physical-presence proof)",
    "Parent's US passports (entry/exit stamps)",
    "Parent's military service records if applicable",
    "Birth and marriage certificates linking applicant to the US-citizen parent",
  ],
  caveats: [
    "Physical-presence proof is the dominant failure mode - SSA-7050 earnings statement is the practitioner-preferred document.",
    "Pre-1934 maternal-line cases rely on the 1994 INA Sec. 301(h) partial retroactive fix and are not automatic.",
    "Pre-1978 births carry retention requirements under 8 FAM 301 that may have been violated decades ago.",
    "Morales-Santana v. Lynch (2017) equalized the out-of-wedlock physical-presence rule between US-citizen mothers and fathers.",
  ],
  officialLinks: [
    {
      label: "US Department of State - Acquisition of US Citizenship by a Child Born Abroad (travel.state.gov)",
      url: "https://travel.state.gov/content/travel/en/legal/travel-legal-considerations/us-citizenship/Acquisition-US-Citizenship-Child-Born-Abroad.html",
    },
    {
      label: "USCIS - Citizenship Through Parents",
      url: "https://www.uscis.gov/citizenship-resource-center/learn-about-citizenship/citizenship-and-naturalization/citizenship-through-parents",
    },
    {
      label: "Cornell LII - 8 USC 1401 (INA Sec. 301)",
      url: "https://www.law.cornell.edu/uscode/text/8/1401",
    },
    {
      label: "Cornell LII - 8 USC 1409 (INA Sec. 309)",
      url: "https://www.law.cornell.edu/uscode/text/8/1409",
    },
  ],
  estTimelineMonths: [4, 24],
  estCostUSD: [100, 2000],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Post-1986 CRBA/N-600 cases with documented parental physical presence routinely succeed. Older birth-year windows (pre-1952, pre-1934 maternal) and retention-rule cases drop sharply in success rate.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
