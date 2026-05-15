import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Maternal-line parent keys: used for the pre-1985 patrilineal-only flag.
const MATERNAL_PARENT_KEYS: AncestorKey[] = ["mother"];

export const japanDescent: Path = {
  id: "jp-descent",
  country: "Japan",
  countryCode: "JP",
  flag: "🇯🇵",
  pathType: "descent",
  name: "Japanese nationality by descent (Nationality Act, Law 147/1950)",
  shortDescription:
    "Article 2 of the Nationality Act (Law 147/1950) confers Japanese nationality on a child of a Japanese parent at the time of birth (either-parent rule since Act 45/1984, effective 1 January 1985). The dominant chain-killer for Japanese births abroad is Article 12: nationality must be expressly reserved within 3 months of birth by checking the 国籍留保 (kokuseki ryuuho) box on the foreign-birth registration filed with a Japanese consulate. If the reservation is missed, Japanese nationality is lost retroactively to birth.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "JP");
    const maternalOnly = par.length > 0 &&
      par.every((x) => MATERNAL_PARENT_KEYS.includes(x.key));

    const art12Verify =
      "Japan Article 12: nationality reservation must have been filed within 3 months of your birth by checking 国籍留保 on the foreign-birth registration submitted to a Japanese consulate. If the reservation was missed, Japanese nationality was lost retroactively to birth. This is the single most common chain-killer for Japanese-American/European families.";
    const art14Verify =
      "Japan Article 14 nationality choice: dual nationals must choose between Japanese and foreign nationality by a statutory deadline. The MOJ Japanese-language Q&A and the official translation at japaneselawtranslation.go.jp disagree on the precise age (variously stated as 20 or 22, with the 2022 lowering of civil majority to 18 adding further uncertainty). Confirm the current deadline against the MOJ Q&A before acting.";
    const art11Verify =
      "Japan Article 11(1): voluntary acquisition of another nationality automatically forfeits Japanese nationality. The Tokyo District Court (January 2021) and Tokyo High Court (February 2023) upheld this provision against constitutional challenge. If your parent naturalised in another country, verify whether a 喪失 (soushitsu / loss) entry exists in the family register before your birth.";
    const kosekiVerify =
      "Confirm your parent has a current koseki (family register) entry establishing Japanese nationality at the time of your birth, with no 喪失 (loss) annotation predating your birth.";

    if (par.length) {
      if (maternalOnly) {
        return {
          tier: "possibly",
          reasons: [
            `You have a Japanese-linked mother (${par[0].key}).`,
            "The either-parent rule under Article 2 has been in force only since 1 January 1985 (Act 45/1984). Before that date, transmission was patrilineal: a child of a Japanese mother and foreign father did not automatically acquire Japanese nationality.",
            "If you were born before 1 January 1985 through a maternal line only, the standard Article 2 path does not apply; transitional remedies under Act 45/1984 are narrow and time-bounded.",
          ],
          needToVerify: [
            "Whether you were born on or after 1 January 1985 (either-parent rule applies) or before (pre-1985 patrilineal rule applies - maternal-line transmission was generally unavailable except via the Act 45/1984 transitional declaration window).",
            art12Verify,
            kosekiVerify,
            art11Verify,
            art14Verify,
          ],
        };
      }
      return {
        tier: "likely",
        reasons: [
          `You have a Japanese-linked parent (${par[0].key}).`,
          "Article 2 of the Nationality Act confers Japanese nationality on a child whose parent is Japanese at the time of birth.",
          "Eligibility hinges on the Article 12 reservation having been filed within 3 months of your foreign birth and on the absence of a prior Article 11(1) loss in the parent's koseki.",
        ],
        needToVerify: [
          art12Verify,
          kosekiVerify,
          art11Verify,
          art14Verify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Article 2 of the Nationality Act requires at least one Japanese parent at the time of your birth.",
        "Grandparent-only links do not confer Japanese nationality by descent.",
      ],
    };
  },
  requirementsSummary: [
    "A Japanese parent at the time of your birth (Nationality Act, Art. 2).",
    "Article 12 nationality reservation (国籍留保) filed within 3 months of foreign birth - missing this causes retroactive loss.",
    "Article 11(1): voluntary acquisition of another nationality forfeits Japanese nationality automatically.",
    "Article 14 nationality-choice deadline applies to dual nationals.",
    "Dual citizenship officially banned (Tokyo District Court Jan 2021; Tokyo High Court Feb 2023 upheld Art. 11(1)).",
  ],
  documentsOutline: [
    "Parent's koseki tohon (family register transcript) showing Japanese nationality at the time of your birth and no prior 喪失 entry",
    "Foreign birth registration (出生届) filed within 3 months at a Japanese consulate with 国籍留保 box checked (proof of Article 12 reservation)",
    "Applicant's foreign birth certificate and current passport",
    "Parent's Japanese passport at the time of your birth (where available)",
    "If pre-1985 maternal-line: documentation of any Act 45/1984 transitional declaration",
  ],
  caveats: [
    "Article 12 (3-month nationality reservation) is the dominant chain-killer: a missed reservation causes retroactive loss with no easy administrative cure.",
    "Pre-1 January 1985 births under a maternal line only do not benefit from Article 2 either-parent transmission and depend on narrow Act 45/1984 transitional declarations.",
    "Article 11(1) auto-loss on voluntary foreign naturalisation has been upheld by both the Tokyo District Court (Jan 2021) and Tokyo High Court (Feb 2023); a parent who naturalised before your birth may have already lost Japanese nationality.",
    "Article 14 nationality-choice age is internally inconsistent across MOJ Japanese guidance and the official English translation (variously 20 or 22), and the 2022 lowering of civil majority to 18 adds further uncertainty.",
    "Article 17(1) reacquisition before age 18 requires domicile in Japan and is unavailable to adults.",
    "Teijuusha (定住者) is an administrative immigration status (Nikkei to roughly the 3rd generation), NOT a citizenship path; it sits outside this Path.",
  ],
  officialLinks: [
    {
      label: "Ministry of Justice (Japan) - Nationality (国籍)",
      url: "https://www.moj.go.jp/MINJI/minji78.html",
    },
    {
      label: "Nationality Act (Law 147/1950) - Japanese Law Translation",
      url: "https://www.japaneselawtranslation.go.jp/en/laws/view/3434/en",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [100, 800],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct parent-to-child cases with a timely Article 12 reservation and a clean koseki succeed reliably. The Article 12 3-month window is unforgiving; missed-reservation cases are the dominant failure mode for the Japanese diaspora.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
