import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Maternal-line parent key: used for the 1964-1982 corrective-route flag.
const MATERNAL_PARENT_KEYS: AncestorKey[] = ["mother"];

export const icelandDescent: Path = {
  id: "is-descent",
  country: "Iceland",
  countryCode: "IS",
  flag: "🇮🇸",
  pathType: "descent",
  name: "Icelandic citizenship by descent (Lög nr. 100/1952, Art. 1)",
  shortDescription:
    "Under Lög nr. 100/1952 (Icelandic Nationality Act), Art. 1 confers Icelandic citizenship on a child of an Icelandic parent at birth. Sources disagree on when full either-parent parity took effect: island.is points to 1 July 2018 for unmarried-father parity, while earlier reform language dates to 1982. Art. 8 imposes an age-22 retention rule on Icelanders born abroad without a connection to Iceland.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "IS");
    const selfYear = p.self.birthYear;
    const under22 = selfYear !== undefined && 2026 - selfYear < 22;
    const retentionEvidence = par.some((x) => x.ancestor.citizenshipRetained === true);
    const maternalOnly = par.length > 0 &&
      par.every((x) => MATERNAL_PARENT_KEYS.includes(x.key));

    const eitherParentDateVerify =
      "Iceland either-parent rule: sources contradict. island.is dates full parity (incl. unmarried Icelandic father transmission) to 1 July 2018; earlier sex-equality reform language points to 1982. Likely both are correct - a partial 1982 reform (married couples) and a fuller 2018 reform (unmarried fathers). Confirm the rule in force at the relevant ancestor's date of birth against the consolidated statute on althingi.is.";
    const art8Verify =
      "Iceland Art. 8 (Lög nr. 100/1952) age-22 retention: an Icelander born abroad who has never been domiciled in Iceland loses citizenship at age 22 unless a retention application is granted. Útlendingastofnun guidance has required two letters from Iceland residents confirming the applicant's connection to Iceland as part of the retention application (government-sourced procedural detail - confirm currency at filing time).";
    const corrective1964_1982Verify =
      "Corrective route for children born 1 July 1964 - 30 June 1982 to an Icelandic mother and a foreign father: island.is describes a remedial declaration route for this cohort, who under the pre-1982 statute did not automatically acquire Icelandic citizenship through their mother. This carve-out is single-sourced (island.is) - if your claim runs through an Icelandic-mother / foreign-father chain born in this window, verify the declaration is still open and what evidence is required.";

    if (par.length) {
      if (under22 || retentionEvidence) {
        return {
          tier: "likely",
          reasons: [
            `You have an Iceland-linked parent (${par[0].key}).`,
            "Art. 1 of Lög nr. 100/1952 transmits Icelandic citizenship to the child of an Icelandic parent at birth.",
            under22
              ? "You are under 22, so the Art. 8 retention deadline has not yet passed."
              : "You have indicated retention evidence on the transmitting parent.",
          ],
          needToVerify: [
            eitherParentDateVerify,
            art8Verify,
            ...(maternalOnly ? [corrective1964_1982Verify] : []),
          ],
        };
      }
      return {
        tier: "possibly",
        reasons: [
          `You have an Iceland-linked parent (${par[0].key}).`,
          "Art. 1 transmits Icelandic citizenship at birth, but you are at or past age 22 and Art. 8 retention is not established.",
          "If retention was never secured, Icelandic citizenship may already have been lost.",
        ],
        needToVerify: [
          eitherParentDateVerify,
          art8Verify,
          corrective1964_1982Verify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Iceland-linked parent recorded.",
        "Icelandic jus sanguinis under Art. 1 Lög nr. 100/1952 requires an Icelandic-citizen parent at birth - grandparent-only links do not transmit.",
      ],
    };
  },
  requirementsSummary: [
    "An Icelandic-citizen parent at the time of your birth (Lög nr. 100/1952, Art. 1).",
    "Either-parent rule: full parity per island.is since 1 July 2018; partial sex-equality reform dated to 1982 - verify the rule in force at the relevant birth.",
    "Art. 8 age-22 retention: Icelanders born abroad with no domicile in Iceland must apply to retain.",
    "Útlendingastofnun retention procedure requires two letters from Iceland residents confirming connection (government source, verify currency).",
    "Dual citizenship legalized 1 July 2003 (Act 9/2003).",
    "Corrective declaration available for children born 1 July 1964 - 30 June 1982 to Icelandic mother + foreign father (island.is, single-sourced).",
  ],
  documentsOutline: [
    "Parent's Icelandic passport or þjóðskrá (population register) extract at the time of your birth",
    "Applicant's foreign birth certificate (apostilled and translated into Icelandic or English)",
    "Parents' marriage certificate (if relevant under the pre-2018 paternal-transmission rules)",
    "Two letters from Iceland residents attesting the applicant's connection to Iceland (Art. 8 retention procedure)",
    "Art. 8 retention application filed with Útlendingastofnun before the 22nd birthday",
    "Pre-1982 maternal-line cases: documentation supporting the 1964-1982 corrective declaration",
  ],
  caveats: [
    "The either-parent date is contradicted in the source record (1982 vs 1 July 2018) - encode as needs-verification and check althingi.is for the consolidated statute history.",
    "Art. 8 age-22 retention is the dominant chain-killer for diaspora cases.",
    "The 1964-1982 maternal-line corrective declaration is single-sourced (island.is) and high-value - surface it explicitly for relevant cohorts.",
    "The 2-letter Iceland-resident connection requirement is sourced to Útlendingastofnun guidance; confirm at filing time.",
  ],
  officialLinks: [
    {
      label: "Ísland.is - Icelandic citizenship",
      url: "https://island.is/en/icelandic-citizenship",
    },
    {
      label: "Útlendingastofnun - Citizenship",
      url: "https://www.utl.is/index.php/en/icelandic-citizenship",
    },
    {
      label: "Althingi - Lög nr. 100/1952 (Icelandic Nationality Act)",
      url: "https://www.althingi.is/lagas/nuna/1952100.html",
    },
  ],
  estTimelineMonths: [4, 12],
  estCostUSD: [100, 400],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct parent-to-child verification through Útlendingastofnun succeeds reliably when Art. 8 retention is documented. The contradicted either-parent date (1982 vs 2018) and the narrow 1964-1982 maternal-line corrective declaration are the main complexity drivers.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
