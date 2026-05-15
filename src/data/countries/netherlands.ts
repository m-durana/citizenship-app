import type { Path } from "../../types/path";
import type { AncestorKey } from "../../types/profile";
import { ancestorsBornIn, parentsBornIn } from "../../engine/helpers";

// Maternal-line keys for the Art. 6(1)(i) option (Dutch mother + non-Dutch
// father, ancestor born before 1 Jan 1985).
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

export const netherlandsDescent: Path = {
  id: "nl-descent",
  country: "Netherlands",
  countryCode: "NL",
  flag: "🇳🇱",
  pathType: "descent",
  name: "Dutch citizenship by descent (RWN Art. 3)",
  shortDescription:
    "The Rijkswet op het Nederlanderschap (RWN, in force 1 Jan 1985) transmits Dutch citizenship by descent from a Dutch-citizen parent at the moment of birth (Art. 3). Article 15(1)(c) imposes an automatic loss after 13 years (extended from 10 on 1 April 2022) of residence outside the Kingdom and the EU.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "NL");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Dutch-linked parent (${par[0].key}).`,
          "RWN Art. 3: the child of a Dutch citizen acquires Dutch nationality at birth.",
        ],
        needToVerify: [
          "Your parent was a Dutch citizen at the time of your birth (not merely born in the Netherlands).",
          "RWN Art. 15(1)(c) 13-year rule (extended from 10 on 1 April 2022): a Dutch dual citizen aged 18+ resident outside the Kingdom and the EU for 13 consecutive years loses Dutch nationality automatically. The clock resets by Dutch passport renewal or a Declaration of Possession (verklaring van bezit). Check whether the transmitting ancestor's clock ever expired.",
          "Children born before 1 Jan 1985 to a Dutch mother and a non-Dutch father may have to use the Article 6(1)(i) option procedure rather than ordinary descent.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Standard Dutch descent under RWN Art. 3 runs through a Dutch-citizen parent only.",
        "If you have a Dutch mother and a non-Dutch father and the relevant ancestor was born before 1 Jan 1985, see the Article 6(1)(i) option path.",
      ],
    };
  },
  requirementsSummary: [
    "A Dutch-citizen parent at the time of your birth (RWN Art. 3).",
    "No Article 15(1)(c) automatic loss: 13 years (10 pre-1 April 2022) of residence outside the Kingdom and the EU without a passport renewal or Declaration of Possession.",
    "Pre-1985 maternal-line cases use the Article 6(1)(i) option procedure.",
    "Dual citizenship is highly restricted in naturalization and option procedures but tolerated for birth-acquired Dutch nationality.",
  ],
  documentsOutline: [
    "Parent's Dutch passport or nationality document valid at the time of your birth",
    "Birth certificate of applicant and parent",
    "Marriage certificates if surnames differ",
    "Evidence that the parent's RWN Art. 15(1)(c) clock never expired (Dutch passport renewals, Declarations of Possession)",
  ],
  caveats: [
    "RWN Art. 15(1)(c) 13-year rule (extended from 10 on 1 April 2022) is the dominant chain-killer for diaspora Dutch families.",
    "The 1995 cliff: 1985 RWN transitional rules synchronised 10-year clocks, causing mass automatic loss in 1995 for Dutch citizens abroad who had not renewed their passports.",
    "Pre-1985 children of a Dutch mother and a non-Dutch father were patrilineal-only under prior law and rely on the Art. 6(1)(i) option correction.",
  ],
  officialLinks: [
    {
      label: "Wetten.overheid.nl - Rijkswet op het Nederlanderschap",
      url: "https://wetten.overheid.nl/BWBR0003738/",
    },
    {
      label: "IND - Dutch nationality by descent",
      url: "https://ind.nl/en/dutch-citizenship",
    },
    {
      label: "Government.nl - Acquiring Dutch citizenship",
      url: "https://www.government.nl/topics/dutch-citizenship",
    },
  ],
  estTimelineMonths: [4, 12],
  estCostUSD: [200, 800],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Direct parent-to-child descent is well-defined under RWN Art. 3. The Art. 15(1)(c) 13-year loss rule and its 1995 cliff are the main failure modes for diaspora cases.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};

export const netherlandsArt6Option: Path = {
  id: "nl-art6-option",
  country: "Netherlands",
  countryCode: "NL",
  flag: "🇳🇱",
  pathType: "restoration",
  name: "Dutch citizenship option (RWN Art. 6(1)(i))",
  shortDescription:
    "Pre-1985 Dutch law was patrilineal: children born to a Dutch mother and a non-Dutch father did not automatically acquire Dutch nationality. RWN Article 6(1)(i) provides an option procedure to correct this gendered exclusion for the ancestor born before 1 Jan 1985.",
  evaluate: (p) => {
    const dutchAncestors = ancestorsBornIn(p, "NL");
    const maternalDutch = dutchAncestors.filter((a) =>
      MATERNAL_KEYS.includes(a.key),
    );
    const pre1985MaternalDutchMother = maternalDutch.filter((a) => {
      const by = a.ancestor.birthYear;
      const isFemale = a.ancestor.gender === "F";
      return isFemale && typeof by === "number" && by < 1985;
    });

    if (pre1985MaternalDutchMother.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Dutch-linked woman in your maternal line born before 1985 (${pre1985MaternalDutchMother[0].key}).`,
          "RWN Art. 6(1)(i) opens the option procedure to descendants whose Dutch mother could not transmit citizenship under pre-1985 patrilineal rules.",
        ],
        needToVerify: [
          "The relevant Dutch ancestor was a Dutch citizen at the time the next-generation child was born to a non-Dutch father.",
          "RWN Art. 15(1)(c) 13-year rule (extended from 10 on 1 April 2022): the 1995 cliff (1985 transitional rules synchronising 10-year clocks) caused mass automatic loss in 1995 - confirm the mother's Dutch nationality was not lost before the option is exercised.",
          "Option procedures are filed with the IND or a Dutch consulate; the procedure takes 13 weeks (extendable to 26).",
        ],
      };
    }

    if (maternalDutch.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Dutch-linked woman in your maternal line (${maternalDutch[0].key}).`,
          "If she was born before 1 Jan 1985 and the next-generation child was born to a non-Dutch father before 1985, RWN Art. 6(1)(i) option may be available.",
        ],
        needToVerify: [
          "Whether the Dutch-linked woman in the line was born before 1 Jan 1985.",
          "Whether the chain involves a pre-1985 Dutch mother and a non-Dutch father (the gendered exclusion that Art. 6(1)(i) corrects).",
          "RWN Art. 15(1)(c) status of the Dutch mother (1995 cliff risk).",
        ],
      };
    }

    return {
      tier: "unlikely",
      reasons: [
        "No Dutch-linked woman recorded in your maternal line.",
        "RWN Art. 6(1)(i) applies only to descendants of a pre-1985 Dutch mother whose citizenship was non-transmissible under prior patrilineal rules.",
      ],
    };
  },
  requirementsSummary: [
    "A pre-1985 Dutch mother whose child (the next-in-line ancestor) was born to a non-Dutch father.",
    "Confirmation that the Dutch mother did not lose nationality under RWN Art. 15(1)(c) before the option is exercised.",
    "Option procedure filed with the IND or a Dutch consulate.",
    "Dual citizenship: highly restricted under option procedures - confirm current rules with the IND.",
  ],
  documentsOutline: [
    "Dutch mother's birth certificate and proof of Dutch nationality at the relevant date",
    "Birth and marriage certificates linking each generation",
    "Evidence the Dutch mother's RWN Art. 15(1)(c) clock did not expire (passport renewals, Declarations of Possession)",
    "Applicant's identity and residence documents",
  ],
  caveats: [
    "The 1995 cliff: 1985 RWN transitional rules synchronised 10-year Art. 15(1)(c) clocks, causing mass automatic loss in 1995 - many pre-1985 Dutch mothers lost nationality before their children could exercise the Art. 6(1)(i) option.",
    "Option procedure timeline is short (13 weeks, extendable to 26) but depends on the underlying mother's nationality being intact at the moment the option is filed.",
  ],
  officialLinks: [
    {
      label: "Wetten.overheid.nl - Rijkswet op het Nederlanderschap, Art. 6",
      url: "https://wetten.overheid.nl/BWBR0003738/",
    },
    {
      label: "IND - Option procedure (optieverklaring)",
      url: "https://ind.nl/en/dutch-citizenship/option-procedure-for-dutch-citizenship",
    },
    {
      label: "Government.nl - Becoming Dutch through the option procedure",
      url: "https://www.government.nl/topics/dutch-citizenship/becoming-a-dutch-citizen-through-the-option-procedure",
    },
  ],
  estTimelineMonths: [3, 7],
  estCostUSD: [250, 450],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Clean Art. 6(1)(i) cases succeed reliably, but the 1995 cliff means many eligible-on-paper mothers had already lost Dutch nationality under Art. 15(1)(c) before the option could be exercised.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
