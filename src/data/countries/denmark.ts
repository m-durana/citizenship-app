import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Father-line parent key: used for the 1993-2014 unmarried-father declaration flag.
const PATERNAL_PARENT_KEYS: AncestorKey[] = ["father"];

export const denmarkDescent: Path = {
  id: "dk-descent",
  country: "Denmark",
  countryCode: "DK",
  flag: "🇩🇰",
  pathType: "descent",
  name: "Danish citizenship by descent (Indfødsretsloven, § 1)",
  shortDescription:
    "Under Indfødsretsloven (the Consolidated Act on Danish Nationality), § 1 confers Danish citizenship on a child of a Danish parent at birth. The either-parent rule (including co-mother) has applied since 1 July 2014. The dominant chain-killer is § 8: a Dane born abroad who has not had at least one year cumulative physical presence in Denmark by age 22 loses citizenship unless a retention application is granted.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "DK");
    const selfYear = p.self.birthYear;
    const under22 = selfYear !== undefined && 2026 - selfYear < 22;
    const retentionEvidence = par.some((x) => x.ancestor.citizenshipRetained === true);
    const paternalOnly = par.length > 0 &&
      par.every((x) => PATERNAL_PARENT_KEYS.includes(x.key));

    const sec8Verify =
      "Denmark § 8 (Indfødsretsloven) age-22 retention: empirical test requiring at least one year cumulative physical presence in Denmark by your 22nd birthday. The test counts actual time on Danish soil (the precise treatment of short consular / family visits is not fully settled). If you cannot demonstrate one year, you must file a § 8 retention application with the Udlændinge- og Integrationsministeriet (UIM) before age 22.";
    const sec5DeclVerify =
      "If your Danish-linked parent is your father AND your parents were not married at your birth AND you were born between 11 October 1993 and 30 June 2014, transmission was not automatic - the father had to file a declaration. Confirm whether the declaration was filed.";
    const sec4ReacquisitionVerify =
      "Denmark § 4 reacquisition window (1 July 2021 - 30 June 2026): former Danes who lost citizenship under the old single-citizenship rule (before the 1 September 2015 dual-citizenship reform via Lov 1496 af 23/12/2014) may reacquire by declaration during this transitional window. This sunset date is single-sourced - verify the current statute text on retsinformation.dk before relying on it.";

    if (par.length) {
      if (under22 || retentionEvidence) {
        return {
          tier: "likely",
          reasons: [
            `You have a Denmark-linked parent (${par[0].key}).`,
            "§ 1 of Indfødsretsloven transmits Danish citizenship to the child of a Danish parent at birth (either-parent rule, including co-mother, since 1 July 2014).",
            under22
              ? "You are under 22, so the § 8 retention deadline has not yet passed."
              : "You have indicated retention evidence on the transmitting parent.",
          ],
          needToVerify: [
            sec8Verify,
            ...(paternalOnly ? [sec5DeclVerify] : []),
            sec4ReacquisitionVerify,
          ],
        };
      }
      return {
        tier: "possibly",
        reasons: [
          `You have a Denmark-linked parent (${par[0].key}).`,
          "§ 1 transmits citizenship at birth, but you are at or past age 22 and § 8 retention is not established.",
          "If the 1-year physical-presence test was not met and no retention application was granted, Danish citizenship may already have been lost.",
        ],
        needToVerify: [
          sec8Verify,
          sec5DeclVerify,
          sec4ReacquisitionVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Denmark-linked parent recorded.",
        "Danish jus sanguinis under § 1 Indfødsretsloven requires a Danish-citizen parent at birth - grandparent-only links do not transmit.",
      ],
    };
  },
  requirementsSummary: [
    "A Danish-citizen parent at the time of your birth (Indfødsretsloven, § 1).",
    "Either-parent rule (incl. co-mother) since 1 July 2014; 11 Oct 1993 - 30 June 2014 unmarried Danish fathers required a declaration.",
    "§ 8 age-22 retention: empirical >=1 year cumulative physical presence in Denmark.",
    "Dual citizenship legalized 1 September 2015 (Lov 1496 af 23/12/2014).",
    "§ 4 reacquisition window for former Danes: 1 July 2021 - 30 June 2026 (verify currency).",
  ],
  documentsOutline: [
    "Parent's Danish passport or indfødsret certificate at the time of your birth",
    "Applicant's foreign birth certificate (apostilled and translated)",
    "Parents' marriage certificate (relevant to the pre-2014 unmarried-father declaration regime)",
    "Evidence of any § 5 declaration filed by an unmarried Danish father (1993-2014 cases)",
    "Travel records / school records / residence registration documenting >=1 year physical presence in Denmark by age 22",
    "§ 8 retention application filed with UIM before the 22nd birthday, if presence requirement is not met",
  ],
  caveats: [
    "§ 8 age-22 retention uses an empirical 1-year physical-presence test, distinct from the Swedish affinity test and the Norwegian 2yr/7yr formulation.",
    "Pre-1 July 2014 unmarried-father cases required a declaration during the 1993-2014 regime - easy to miss.",
    "The § 4 reacquisition window sunsetting on 30 June 2026 is single-sourced; confirm against retsinformation.dk before relying on the date.",
  ],
  officialLinks: [
    {
      label: "Udlændinge- og Integrationsministeriet (UIM) - Danish nationality",
      url: "https://uim.dk/arbejdsomraader/statsborgerskab/",
    },
    {
      label: "Retsinformation - Indfødsretsloven (consolidated act)",
      url: "https://www.retsinformation.dk/eli/lta/2021/1656",
    },
  ],
  estTimelineMonths: [4, 18],
  estCostUSD: [150, 500],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Verification through UIM is reliable when the parent's status and >=1 year DK presence are documented. The § 8 empirical 1-year test is stricter than the Swedish affinity test - missed retention is the dominant failure mode.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
