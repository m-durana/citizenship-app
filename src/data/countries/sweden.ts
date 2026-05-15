import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { parentsBornIn } from "../../engine/helpers";

// Maternal-line parent keys: used for the pre-2015 unmarried-father anmälan flag.
const MATERNAL_PARENT_KEYS: AncestorKey[] = ["mother"];

export const swedenDescent: Path = {
  id: "se-descent",
  country: "Sweden",
  countryCode: "SE",
  flag: "🇸🇪",
  pathType: "descent",
  name: "Swedish citizenship by descent (SFS 2001:82, Lag om svenskt medborgarskap)",
  shortDescription:
    "Under the Lag om svenskt medborgarskap (SFS 2001:82), a child of a Swedish parent acquires Swedish citizenship at birth. The either-parent rule has been in force since 1 April 2015; before that date an unmarried Swedish father had to file a § 5 anmälan (notification) to transmit. The dominant chain-killer for Swedish births abroad is § 14: a Swede born abroad who has never lived in Sweden and lacks sufficient attachment loses citizenship at age 22 unless a retention application is filed.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "SE");
    const selfYear = p.self.birthYear;
    const under22 = selfYear !== undefined && 2026 - selfYear < 22;
    const retentionEvidence = par.some((x) => x.ancestor.citizenshipRetained === true);
    const maternalOnly = par.length > 0 &&
      par.every((x) => MATERNAL_PARENT_KEYS.includes(x.key));

    const sec14Verify =
      "Sweden § 14 (SFS 2001:82) age-22 retention: a Swede born abroad who has never been resident in Sweden and lacks an affinity / attachment to Sweden loses citizenship at age 22 unless a retention application has been granted by Migrationsverket. Verify the section is still in force and confirm the retention filing window directly with Migrationsverket - some commercial sources have claimed (incorrectly, per current government guidance) that § 14 was repealed in 2015.";
    const sec5Verify =
      "If your Swedish-linked parent is your father AND your parents were not married at your birth AND you were born before 1 April 2015, transmission was not automatic - § 5 anmälan (notification, filed before your 18th birthday) was required. Confirm whether the anmälan was filed.";

    if (par.length) {
      if (under22 || retentionEvidence) {
        return {
          tier: "likely",
          reasons: [
            `You have a Swedish-linked parent (${par[0].key}).`,
            "SFS 2001:82 transmits Swedish citizenship to the child of a Swedish parent at birth (either-parent rule since 1 April 2015).",
            under22
              ? "You are under 22, so the § 14 retention deadline has not yet passed."
              : "You have indicated retention evidence on the transmitting parent.",
          ],
          needToVerify: [
            sec14Verify,
            ...(maternalOnly ? [] : [sec5Verify]),
          ],
        };
      }
      return {
        tier: "possibly",
        reasons: [
          `You have a Swedish-linked parent (${par[0].key}).`,
          "SFS 2001:82 transmits Swedish citizenship at birth, but you are at or past age 22 and retention status is not established.",
          "If § 14 retention was never secured, Swedish citizenship may already have been lost.",
        ],
        needToVerify: [
          sec14Verify,
          sec5Verify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Swedish-linked parent recorded.",
        "Swedish jus sanguinis under SFS 2001:82 requires a Swedish-citizen parent at birth - grandparent-only links do not transmit.",
      ],
    };
  },
  requirementsSummary: [
    "A Swedish-citizen parent at the time of your birth (SFS 2001:82, § 2).",
    "Either-parent rule in force since 1 April 2015; pre-2015 unmarried Swedish fathers required a § 5 anmälan.",
    "§ 14 age-22 retention rule: Swedes born abroad without residence or attachment lose citizenship at 22 absent a retention application.",
    "Affinity / attachment test (not the Danish empirical 1-year rule) governs retention.",
    "Dual citizenship legalized 1 July 2001.",
  ],
  documentsOutline: [
    "Parent's Swedish passport or personbevis (population-register extract) at the time of your birth",
    "Applicant's foreign birth certificate (apostilled, translated into Swedish or English)",
    "Parents' marriage certificate (if relevant to pre-2015 paternal transmission)",
    "Evidence of any § 5 anmälan filed before your 18th birthday (where applicable)",
    "§ 14 retention application or proof of Swedish residence / attachment, if you are approaching age 22",
  ],
  caveats: [
    "§ 14 age-22 retention is the dominant chain-killer: file the retention application well before the 22nd birthday.",
    "Pre-1 April 2015 unmarried-father cases required a § 5 anmälan and are easy to miss.",
    "Sweden does not operate a formal citizenship-by-descent application for adults who acquired citizenship at birth - the process is verification (passport / personbevis), not naturalisation.",
  ],
  officialLinks: [
    {
      label: "Migrationsverket - Swedish citizenship",
      url: "https://www.migrationsverket.se/English/Private-individuals/Becoming-a-Swedish-citizen.html",
    },
    {
      label: "Riksdagen - Lag om svenskt medborgarskap (SFS 2001:82)",
      url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-200182-om-svenskt-medborgarskap_sfs-2001-82/",
    },
  ],
  estTimelineMonths: [6, 36],
  estCostUSD: [100, 600],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct parent-to-child verification is straightforward when the parent's Swedish status is documented. The § 14 age-22 retention rule is the dominant failure mode for diaspora cases born abroad with no Swedish residence.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
