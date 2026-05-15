import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Father-line parent key: used for the § 26 unmarried-father-abroad declaration flag.
const PATERNAL_PARENT_KEYS: AncestorKey[] = ["father"];

export const finlandDescent: Path = {
  id: "fi-descent",
  country: "Finland",
  countryCode: "FI",
  flag: "🇫🇮",
  pathType: "descent",
  name: "Finnish citizenship by descent (Kansalaisuuslaki 359/2003, § 9)",
  shortDescription:
    "Under the Finnish Nationality Act (Kansalaisuuslaki 359/2003), § 9 confers Finnish citizenship at birth on a child whose mother is Finnish, OR whose father is Finnish AND married to the mother, OR whose father is Finnish AND the child is born in Finland. § 26 provides a declaration during minority for children born abroad to an unmarried Finnish father. The dominant chain-killer is § 34: a Finn born abroad with no sufficient connection to Finland loses citizenship at age 22.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "FI");
    const selfYear = p.self.birthYear;
    const under22 = selfYear !== undefined && 2026 - selfYear < 22;
    const retentionEvidence = par.some((x) => x.ancestor.citizenshipRetained === true);
    const paternalOnly = par.length > 0 &&
      par.every((x) => PATERNAL_PARENT_KEYS.includes(x.key));

    const sec34Verify =
      "Finland § 34 (Kansalaisuuslaki 359/2003) age-22 retention: a Finn born abroad loses citizenship at 22 unless they have a sufficient connection to Finland, established by one of (i) 7 years cumulative residence in any Nordic country, (ii) a Finnish passport application filed between ages 18 and 21, (iii) Finnish military / civilian service, or (iv) a retention application granted by DVV. The Digital and Population Data Services Agency (DVV) has stated explicitly that an application filed on the 22nd birthday is void - the deadline is the day before.";
    const sec26Verify =
      "Finland § 26 declaration: if your Finnish-linked parent is your father AND your parents were not married at your birth AND you were born abroad, transmission was not automatic - a § 26 declaration had to be filed during your minority. Confirm whether the declaration was filed.";
    const sec29Verify =
      "Finland § 29 adult-child declaration window largely closed on 31 May 2008 - the corrective declaration for adult children of Finnish mothers born before the 1984 reform is no longer broadly available. This closure date is single-sourced; confirm against finlex.fi history if relying on it.";

    if (par.length) {
      if (under22 || retentionEvidence) {
        return {
          tier: "likely",
          reasons: [
            `You have a Finland-linked parent (${par[0].key}).`,
            "§ 9 of Kansalaisuuslaki 359/2003 transmits Finnish citizenship at birth via Finnish mother, married Finnish father, or unmarried Finnish father with birth in Finland.",
            under22
              ? "You are under 22, so the § 34 retention deadline has not yet passed."
              : "You have indicated retention evidence on the transmitting parent.",
          ],
          needToVerify: [
            sec34Verify,
            ...(paternalOnly ? [sec26Verify] : []),
            sec29Verify,
          ],
        };
      }
      return {
        tier: "possibly",
        reasons: [
          `You have a Finland-linked parent (${par[0].key}).`,
          "§ 9 transmits Finnish citizenship at birth (subject to the rule matrix), but you are at or past age 22 and § 34 sufficient-connection status is not established.",
          "If no sufficient connection was established and no retention application was granted, Finnish citizenship may already have been lost.",
        ],
        needToVerify: [
          sec34Verify,
          sec26Verify,
          sec29Verify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Finland-linked parent recorded.",
        "Finnish jus sanguinis under § 9 Kansalaisuuslaki 359/2003 requires a Finnish-citizen parent at birth - grandparent-only links do not transmit.",
      ],
    };
  },
  requirementsSummary: [
    "A Finnish-citizen parent at the time of your birth, per the § 9 rule matrix (mother / married father / father + birth in Finland).",
    "§ 26 declaration during minority for unmarried-father-abroad cases.",
    "§ 34 age-22 loss unless sufficient connection (7yr Nordic / passport application 18-21 / military or civilian service).",
    "Dual citizenship legalized 1 June 2003 (the current Act).",
    "§ 29 adult-child declaration window largely closed 31 May 2008.",
  ],
  documentsOutline: [
    "Parent's Finnish passport or population-register extract at the time of your birth",
    "Applicant's foreign birth certificate (apostilled, translated into Finnish, Swedish, or English)",
    "Parents' marriage certificate (if relevant to the § 9 paternal-transmission rule matrix)",
    "Evidence of any § 26 declaration filed during minority (unmarried-father-abroad cases)",
    "Documentation of sufficient connection: Nordic residence record, Finnish passport application 18-21, or military / civilian service record",
    "§ 34 retention application filed with DVV before (not on) the 22nd birthday",
  ],
  caveats: [
    "§ 34 age-22 retention is the dominant chain-killer; DVV has explicitly stated that an application filed on the 22nd birthday is void.",
    "The § 9 rule matrix is the most complex of the Nordic countries: mother always transmits; father transmits only if married OR if the child is born in Finland (otherwise § 26 declaration).",
    "§ 29 adult-child declaration corrections for pre-reform maternal cases largely closed on 31 May 2008 (single-sourced - verify against finlex.fi).",
  ],
  officialLinks: [
    {
      label: "Migri - Finnish citizenship",
      url: "https://migri.fi/en/finnish-citizenship",
    },
    {
      label: "Finlex - Kansalaisuuslaki 359/2003",
      url: "https://www.finlex.fi/fi/laki/ajantasa/2003/20030359",
    },
    {
      label: "DVV - Retention of Finnish citizenship (age 22)",
      url: "https://dvv.fi/en/retention-of-finnish-citizenship",
    },
  ],
  estTimelineMonths: [6, 24],
  estCostUSD: [100, 500],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct parent-to-child verification succeeds reliably where the § 9 rule matrix is satisfied and § 34 sufficient connection is documented. The age-22 deadline is unforgiving (DVV: applications on the 22nd birthday are void).",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
