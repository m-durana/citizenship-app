import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const polandDescent: Path = {
  id: "pl-descent",
  country: "Poland",
  countryCode: "PL",
  flag: "🇵🇱",
  pathType: "restoration",
  name: "Polish citizenship - confirmation of citizenship (potwierdzenie)",
  shortDescription:
    "Poland has no formal generational limit: if your direct ancestor held Polish citizenship and the chain to you was never broken, you have it too - you just need to confirm it via the Voivodeship Office.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "PL");
    const gp = grandparentsBornIn(p, "PL");
    const ggp = greatGrandparentsBornIn(p, "PL");
    if (par.length || gp.length || ggp.length) {
      const closest = par[0] ?? gp[0] ?? ggp[0];
      return {
        tier: "possibly",
        reasons: [
          `You have a Poland-born ancestor (${closest.key}).`,
          "Polish citizenship descends without a generation cap if the chain is intact.",
        ],
        needToVerify: [
          "No intermediate ancestor lost Polish citizenship - common chain-breakers: foreign military service, naturalization in another country before 1951, or formal renunciation.",
          "Your ancestor was a Polish citizen (not just born in territory that is now Poland) - borders shifted dramatically 1918–1945.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: ["No Poland-born ancestor recorded."],
    };
  },
  requirementsSummary: [
    "Polish ancestor at any depth, with an unbroken citizenship chain.",
    "No language test, no residency requirement.",
    "Dual citizenship is allowed.",
  ],
  documentsOutline: [
    "Polish ancestor's birth certificate and citizenship records (passport, military, voter records)",
    "Evidence the ancestor never renounced or lost Polish citizenship",
    "Birth/marriage certificates linking each generation",
    "Apostilled Polish translations of all foreign records",
  ],
  caveats: [
    "Citizenship-confirmation (potwierdzenie) - not naturalization - is the key procedure.",
    "Pre-1951 naturalization elsewhere is a frequent chain break.",
    "Borders changed: a town that's now in Ukraine, Belarus, Lithuania, or Germany may still count if the ancestor was a Polish citizen at the relevant time.",
  ],
  officialLinks: [
    {
      label: "Mazowiecki Urząd Wojewódzki - Confirmation of Polish citizenship",
      url: "https://www.gov.pl/web/mazowiecki/potwierdzenie-posiadania-obywatelstwa-polskiego",
    },
  ],
  estTimelineMonths: [12, 30],
  estCostUSD: [500, 3000],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "moderate",
    successNote:
      "Approval turns on chain integrity. Pre-1951 naturalization, foreign military service, or formal renunciation are common chain-breakers. Confirmation stamp duty rose from PLN 58 to PLN 277 effective 1 Aug 2025.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false, note: "No Polish language test for citizenship confirmation (only for residency-based recognition)." },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
