import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Father-line parent key: used for pre-1979 / pre-2006 paternal-transmission flags.
const PATERNAL_PARENT_KEYS: AncestorKey[] = ["father"];

export const norwayDescent: Path = {
  id: "no-descent",
  country: "Norway",
  countryCode: "NO",
  flag: "🇳🇴",
  pathType: "descent",
  name: "Norwegian citizenship by descent (Lov om norsk statsborgerskap 2005, § 4)",
  shortDescription:
    "Under the 2005 Citizenship Act (Lov om norsk statsborgerskap, in force 1 September 2006), § 4 confers Norwegian citizenship on a child of a Norwegian parent at birth. The either-parent rule has applied since 1 September 2006. The dominant chain-killer for Norwegians born abroad is § 24: a Norwegian born abroad who has never lived in Norway loses citizenship at age 22 unless they have 2 years of residence in Norway, 7 years cumulative in the Nordic countries, or have applied to retain citizenship.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "NO");
    const selfYear = p.self.birthYear;
    const under22 = selfYear !== undefined && 2026 - selfYear < 22;
    const retentionEvidence = par.some((x) => x.ancestor.citizenshipRetained === true);
    const paternalOnly = par.length > 0 &&
      par.every((x) => PATERNAL_PARENT_KEYS.includes(x.key));

    const sec24Verify =
      "Norway § 24 (Lov om norsk statsborgerskap 2005) age-22 retention: a Norwegian born abroad who has never lived in Norway loses citizenship at age 22 unless one of (i) 2 years of residence in Norway, (ii) 7 years cumulative residence in the Nordic countries, or (iii) a granted retention application. The retention application must be filed with UDI before the 22nd birthday.";
    const prePaternalVerify =
      "If your Norwegian-linked parent is your father AND your parents were not married at your birth AND you were born before 1 September 2006, § 4 of the 2005 Act did not apply automatically - paternal transmission outside marriage required legitimation or a declaration. Pre-1979 cases were patrilineal-in-wedlock only. Confirm the rule that applied at your birth.";
    const sec20Verify =
      "Norway § 20 declaration (post-2020 reform): former Norwegians who lost citizenship under the old single-citizenship rule may reacquire by declaration since dual citizenship was legalized on 1 January 2020. If your parent reacquired before your birth, confirm the date.";

    if (par.length) {
      if (under22 || retentionEvidence) {
        return {
          tier: "likely",
          reasons: [
            `You have a Norway-linked parent (${par[0].key}).`,
            "§ 4 of the 2005 Citizenship Act transmits Norwegian citizenship to the child of a Norwegian parent at birth (either-parent rule since 1 September 2006).",
            under22
              ? "You are under 22, so the § 24 retention deadline has not yet passed."
              : "You have indicated retention evidence on the transmitting parent.",
          ],
          needToVerify: [
            sec24Verify,
            ...(paternalOnly ? [prePaternalVerify] : []),
            sec20Verify,
          ],
        };
      }
      return {
        tier: "possibly",
        reasons: [
          `You have a Norway-linked parent (${par[0].key}).`,
          "§ 4 transmits Norwegian citizenship at birth, but you are at or past age 22 and § 24 retention status is not established.",
          "If retention was never secured (no 2yr NO / 7yr Nordic / retention application), Norwegian citizenship may already have been lost.",
        ],
        needToVerify: [
          sec24Verify,
          prePaternalVerify,
          sec20Verify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Norway-linked parent recorded.",
        "Norwegian jus sanguinis under § 4 of the 2005 Act requires a Norwegian-citizen parent at birth - grandparent-only links do not transmit.",
      ],
    };
  },
  requirementsSummary: [
    "A Norwegian-citizen parent at the time of your birth (Lov om norsk statsborgerskap 2005, § 4).",
    "Either-parent rule in force since 1 September 2006; pre-1979 paternal-in-wedlock only, 1979-2006 unmarried fathers required legitimation.",
    "§ 24 age-22 retention: 2yr Norway / 7yr Nordic / retention application by UDI.",
    "Dual citizenship legalized 1 January 2020.",
    "§ 20 declaration available for former Norwegians who lost citizenship under the old single-citizenship regime.",
  ],
  documentsOutline: [
    "Parent's Norwegian passport or citizenship certificate at the time of your birth",
    "Applicant's foreign birth certificate (apostilled and translated)",
    "Parents' marriage certificate (if relevant to pre-2006 paternal transmission)",
    "Evidence of legitimation (where the pre-2006 unmarried-father rule applies)",
    "§ 24 retention application or evidence of qualifying Norway / Nordic residence, if approaching age 22",
  ],
  caveats: [
    "§ 24 age-22 retention is the dominant chain-killer for diaspora births.",
    "Pre-1979 paternal-in-wedlock only; pre-1 September 2006 unmarried-father cases required legitimation.",
    "Norway operates citizenship verification (not naturalisation) for those who acquired at birth - the UDI process confirms existing citizenship rather than granting it.",
  ],
  officialLinks: [
    {
      label: "UDI - Norwegian citizenship",
      url: "https://www.udi.no/en/want-to-apply/citizenship/",
    },
    {
      label: "Lovdata - Lov om norsk statsborgerskap (LOV-2005-06-10-51)",
      url: "https://lovdata.no/dokument/NL/lov/2005-06-10-51",
    },
    {
      label: "Regjeringen.no - Dual citizenship reform (2020)",
      url: "https://www.regjeringen.no/en/topics/immigration-and-integration/innsikt/dual-citizenship/id2606433/",
    },
  ],
  estTimelineMonths: [4, 18],
  estCostUSD: [100, 400],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Direct parent-to-child verification through UDI succeeds reliably when § 24 retention has been secured. The age-22 retention deadline is the principal failure mode.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
