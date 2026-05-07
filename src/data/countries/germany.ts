import type { Path } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";
import { isTrue } from "../../engine/helpers";

export const germanyDescent: Path = {
  id: "de-descent",
  country: "Germany",
  countryCode: "DE",
  flag: "🇩🇪",
  pathType: "descent",
  name: "German citizenship by descent (StAG §4)",
  shortDescription:
    "German citizenship is generally passed only by a German-citizen parent. There are special restoration paths for descendants of Germans persecuted by the Nazi regime (see the Article 116 / §15 StAG result below).",
  evaluate: (p) => {
    const par = parentsBornIn(p, "DE");
    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a German-born parent (${par[0].key}).`,
          "If they were a German citizen at the time of your birth, you acquired German citizenship automatically.",
        ],
        needToVerify: [
          "Your parent was a German citizen at the time of your birth (not merely born in Germany).",
          "Children of German mothers born before 1 Jan 1975 to non-German fathers may need to file under §5 StAG (declaration procedure).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Standard German descent runs through a German-citizen parent only.",
        "If you have a German grandparent and they/an ancestor was persecuted by the Nazi regime, see the Article 116 / §15 StAG path.",
      ],
    };
  },
  requirementsSummary: [
    "A German-citizen parent at the time of your birth.",
    "Special declaration procedure (§5 StAG) for children of German mothers born pre-1975.",
    "Dual citizenship now broadly allowed since the 2024 reform.",
  ],
  documentsOutline: [
    "Parent's German citizenship document (Staatsangehörigkeitsausweis) or passport at time of your birth",
    "Birth certificate of applicant and parent",
    "Marriage certificates if surnames differ",
  ],
  caveats: [
    "Pre-1975 German mothers + non-German fathers: gendered citizenship transmission was reformed; declaration procedure is required.",
    "Ordinary descent is parent-to-child - grandparent-only links require the persecution-restoration paths (Art. 116 / §15 StAG).",
  ],
  officialLinks: [
    {
      label: "Bundesverwaltungsamt - Citizenship",
      url: "https://www.bva.bund.de/EN/Services/Citizens/ID-Documents-Law/Citizenship/citizenship_node.html",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [200, 800],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "high",
    successNote:
      "Direct parent-to-child descent is well-defined. §5 StAG declaration covers pre-1975 mother-line and pre-1993 unmarried-father cases, but sunsets on 19 Aug 2031.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};

export const germanyArticle116: Path = {
  id: "de-article-116",
  country: "Germany",
  countryCode: "DE",
  flag: "🇩🇪",
  pathType: "restoration",
  name: "German citizenship restoration (Article 116(2) GG / §15 StAG)",
  shortDescription:
    "Descendants - at any depth - of Germans deprived of their citizenship between 30 January 1933 and 8 May 1945 on political, racial, or religious grounds may have it restored. The 2021 §15 StAG amendment closed gaps that the old Article 116(2) couldn't reach.",
  evaluate: (p) => {
    if (isTrue(p.heritage.naziPersecutionDescendant)) {
      return {
        tier: "likely",
        reasons: [
          "You marked at least one ancestor as deprived of German citizenship by the Nazi regime (1933–1945).",
          "Article 116(2) of the Basic Law restores citizenship to former Germans persecuted on political/racial/religious grounds and to their descendants - there is no generation limit.",
          "Cases that don't fit Art. 116(2) (e.g. ancestors who emigrated and were never formally deprived) often qualify under §15 StAG (added Aug 2021).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "You did not indicate Nazi-era persecution in your direct ancestry.",
        "If you discover one of your ancestors lost German citizenship between 1933 and 1945 on political/racial/religious grounds, revisit this - the path is open to all generations.",
      ],
    };
  },
  requirementsSummary: [
    "Ancestor deprived of German citizenship 30 Jan 1933 – 8 May 1945 on political/racial/religious grounds (Art. 116(2)) - or otherwise persecuted but excluded from Art. 116 (§15 StAG).",
    "No generational limit; descendants of any depth are eligible.",
    "Dual citizenship allowed.",
  ],
  documentsOutline: [
    "Documentation of the ancestor's deprivation/persecution (often archival records from German authorities)",
    "Birth/marriage certificates linking each generation to the persecuted ancestor",
    "Applicant's identity and residency documents",
  ],
  caveats: [
    "§15 StAG (post-Aug 2021) reaches cases the old Art. 116(2) excluded - e.g. those who emigrated before formal deprivation.",
    "Application is free of charge to applicants under both routes.",
  ],
  officialLinks: [
    {
      label: "Federal Foreign Office - Naturalisation of victims of Nazi persecution",
      url: "https://www.germany.info/us-en/2370240-2370240",
    },
    {
      label: "BVA - Art. 116(2) GG vs. §15 StAG",
      url: "https://www.bva.bund.de/EN/Services/Citizens/ID-Documents-Law/Citizenship/116GG_15StA.html",
    },
    {
      label: "Article 116 Reconciliation Project",
      url: "https://www.article116reconciliationproject.org/article116",
    },
  ],
  estTimelineMonths: [12, 36],
  estCostUSD: [0, 1500],
  lastReviewed: "2026-05-01",
  practical: {
    successSignal: "high",
    successNote:
      "Approval is near-certain for documented cases. No language, civics, or fee. BVA processing delays are the main constraint and can run 2-4 years (Section 15 sometimes longer).",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false, note: "Free legal help available via the Article 116 Reconciliation Project." },
    singleSource: true,
  },
};
