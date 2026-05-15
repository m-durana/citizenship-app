import type { Path } from "../../types/path";
import {
  ancestorLinkedTo,
  parentsBornIn,
} from "../../engine/helpers";

export const australiaDescent: Path = {
  id: "au-descent",
  country: "Australia",
  countryCode: "AU",
  flag: "🇦🇺",
  pathType: "descent",
  name: "Australian citizenship by descent (Australian Citizenship Act 2007, s.16)",
  shortDescription:
    "A person born outside Australia on or after 26 January 1949 acquires Australian citizenship by descent if at least one parent was an Australian citizen at the time of birth. If the transmitting parent was themselves a citizen by descent, that parent must have been lawfully present in Australia for a total of at least 2 years at some point before the application.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "AU");
    const parAll = (["father", "mother"] as const)
      .map((k) => ({ key: k, ancestor: p.ancestors[k] }))
      .filter((x): x is { key: typeof x.key; ancestor: NonNullable<typeof x.ancestor> } => !!x.ancestor);
    const auLinked = parAll.filter((x) => ancestorLinkedTo(x.ancestor, "AU"));

    const pre2002LossRisk = auLinked.some((x) => {
      const nat = x.ancestor.naturalizedElsewhere;
      if (!nat) return false;
      const by = x.ancestor.birthYear;
      // Former s.17 auto-loss applied to Australians who acquired another
      // nationality before 4 April 2002. We surface the risk whenever the
      // parent has any recorded foreign naturalisation and a birth year that
      // makes pre-2002 naturalisation possible.
      return typeof by !== "number" || by < 2002;
    });

    const adultGoodCharacterVerify =
      "Adult applicants (18+) are subject to a good-character assessment that typically requires police clearance certificates from every country where you have lived for 90+ days since age 18.";

    if (auLinked.length) {
      const needToVerify: string[] = [
        "Your parent was an Australian citizen at the time of your birth (not merely born in Australia).",
        "If the transmitting parent was themselves an Australian citizen by descent (rather than by birth or grant), s.16(2)(b) requires that parent to have been lawfully present in Australia for a total of at least 2 years at some point - confirm this before applying.",
        adultGoodCharacterVerify,
      ];
      if (pre2002LossRisk) {
        needToVerify.push(
          "Former s.17 of the Australian Citizenship Act 1948 caused automatic loss of Australian citizenship for adults who voluntarily acquired another nationality before 4 April 2002. If your parent naturalised elsewhere before that date, verify they had not already lost Australian citizenship at the moment of your birth.",
        );
      }
      return {
        tier: "likely",
        reasons: [
          `You have an Australian-linked parent (${(par[0] ?? auLinked[0]).key}).`,
          "Section 16 of the Australian Citizenship Act 2007 transmits Australian citizenship to a child born outside Australia where at least one parent was an Australian citizen at the time of birth.",
        ],
        needToVerify,
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Section 16 descent runs through an Australian-citizen parent at the time of your birth.",
        "Grandparent-only links do not confer citizenship by descent under the Australian Citizenship Act 2007.",
      ],
    };
  },
  requirementsSummary: [
    "At least one Australian-citizen parent at the time of your birth (s.16).",
    "If the transmitting parent was a citizen by descent, that parent must have at least 2 years lawful presence in Australia (s.16(2)(b)).",
    "Good-character assessment for adult applicants.",
    "Dual citizenship permitted since 4 April 2002.",
  ],
  documentsOutline: [
    "Form 118 (Application for Australian citizenship by descent)",
    "Parent's Australian birth certificate, citizenship certificate, or passport at the time of your birth",
    "Applicant's foreign birth certificate",
    "Marriage certificates where surnames differ",
    "Police clearances from every country of 90+ days residence since age 18 (adult applicants)",
  ],
  caveats: [
    "Pre-4 April 2002: former s.17 of the 1948 Act caused automatic loss of Australian citizenship on voluntary acquisition of another nationality - chains running through a parent who naturalised abroad before that date need careful verification.",
    "Children born outside Australia before 26 January 1949 are governed by the s.16(3) transitional rule rather than the standard s.16(2) descent test.",
    "Citizens-by-descent face the 2-year lawful-presence requirement before they themselves can transmit further.",
  ],
  officialLinks: [
    {
      label: "Department of Home Affairs - Citizenship by descent",
      url: "https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/by-descent",
    },
    {
      label: "Australian Citizenship Act 2007 (Cth) - Federal Register of Legislation",
      url: "https://www.legislation.gov.au/Details/C2024C00200",
    },
    {
      label: "Australian Citizenship Act 2007 - AustLII",
      url: "https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/aca2007254/",
    },
  ],
  estTimelineMonths: [4, 8],
  estCostUSD: [200, 400],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Direct parent-to-child applications routinely succeed when the parent's citizenship at the time of birth is documented and the citizen-by-descent 2-year residency test (if applicable) is met. Form 118 processing typically completes in 4-8 months.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false, note: "No citizenship test for descent applications (s.16 is exempt from the s.21 test)." },
    singleSource: "government",
  },
};
