import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const southkoreaDescent: Path = {
  id: "kr-descent",
  country: "South Korea",
  countryCode: "KR",
  flag: "🇰🇷",
  pathType: "descent",
  name: "South Korean nationality by descent (Nationality Act, Art. 2)",
  shortDescription:
    "Article 2 of the Nationality Act confers Korean nationality on a child of a Korean parent at the time of birth. The either-parent rule has applied only since 14 June 1998; before that date, transmission was patrilineal. Limited dual citizenship has been permitted since 1 January 2011 via the Article 13 retention pledge.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "KR");
    const gp = grandparentsBornIn(p, "KR");

    const conscriptionVerify =
      "South Korea Art. 13: male dual nationals must declare their intent to retain or renounce Korean nationality by 31 March of the year they turn 18. Failing to renounce subjects them to ROK conscription liability; an Article 13 retention pledge can typically only be filed after age 38 if conscription was not completed.";
    const art15Verify =
      "Nationality Act Art. 15(1): voluntary acquisition of another nationality results in automatic loss of Korean nationality. Verify that the transmitting Korean parent did not naturalize elsewhere (no 국적상실 / loss entry on the family register) before your birth.";
    const pre1998Verify =
      "Pre-14 June 1998 births: transmission was patrilineal-only. A child of a Korean mother and foreign father born before that date did not automatically acquire Korean nationality; narrow transitional remedies exist.";

    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Korean-linked parent (${par[0].key}).`,
          "Article 2 of the Nationality Act confers Korean nationality on a child of a Korean parent at the time of birth (either-parent rule since 14 June 1998).",
        ],
        needToVerify: [
          art15Verify,
          pre1998Verify,
          conscriptionVerify,
          "Article 12 nationality-choice procedure: dual nationals must choose between Korean and foreign nationality within statutory windows.",
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "unlikely",
        reasons: [
          `You have a Korean-linked grandparent (${gp[0].key}), but Article 2 transmits only from a Korean parent to a child.`,
          "Grandparent-only links do not confer Korean nationality by descent. The F-4 Overseas Korean visa may be available as a heritage path - see the separate F-4 result.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Article 2 of the Nationality Act requires at least one Korean parent at the time of your birth.",
        "Grandparent or more distant links do not confer Korean nationality by descent.",
      ],
    };
  },
  requirementsSummary: [
    "A Korean parent at the time of your birth (Nationality Act, Art. 2).",
    "Either-parent rule applies only to births on or after 14 June 1998; pre-1998 births were patrilineal.",
    "Article 15(1): voluntary foreign naturalisation by the transmitting parent causes automatic loss.",
    "Article 12 nationality-choice and Article 13 retention pledge govern dual nationals.",
    "Limited dual citizenship permitted since 1 January 2011 via the Art. 13 pledge.",
  ],
  documentsOutline: [
    "Korean parent's 가족관계증명서 (family relation certificate) at the time of your birth, with no 국적상실 entry",
    "Korean parent's 기본증명서 (basic certificate) confirming Korean nationality at birth",
    "Applicant's foreign birth certificate and current passport",
    "Marriage certificate of the parents (where applicable)",
    "Apostilled translations into Korean",
  ],
  caveats: [
    "Pre-14 June 1998 maternal-line births fall under the prior patrilineal rule with narrow transitional remedies.",
    "Art. 15(1) auto-loss on voluntary foreign naturalisation is a dominant chain-killer; check for any 국적상실 entry predating your birth.",
    "Male dual nationals face a 31 March deadline in the year of their 18th birthday to declare intent; missing it triggers conscription liability.",
    "Limited dual citizenship since 1 January 2011 still requires the Article 13 pledge not to exercise foreign nationality in Korea.",
  ],
  officialLinks: [
    {
      label: "Ministry of Justice (Korea) - Nationality",
      url: "https://www.moj.go.kr/moj/2412/subview.do",
    },
    {
      label: "Hi Korea - Nationality and Visa",
      url: "https://www.hikorea.go.kr/",
    },
    {
      label: "Korean Law Information Center - Nationality Act",
      url: "https://www.law.go.kr/LSW/eng/engLsSc.do?menuId=2&query=NATIONALITY+ACT",
    },
  ],
  estTimelineMonths: [6, 18],
  estCostUSD: [100, 600],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Direct parent-to-child cases with a clean 가족관계증명서 and no prior 국적상실 entry succeed reliably. Art. 15(1) voluntary-naturalisation loss and the male-conscription declaration deadline are the dominant failure modes.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};

export const southkoreaF4: Path = {
  id: "kr-f4-overseas-korean",
  country: "South Korea",
  countryCode: "KR",
  flag: "🇰🇷",
  pathType: "heritage",
  name: "South Korea F-4 Overseas Korean visa (Overseas Koreans Act)",
  shortDescription:
    "The F-4 visa under the Overseas Koreans Act grants long-term residence, work, and near-citizen rights (excluding voting and conscription) to former Korean nationals and their descendants. It is a HERITAGE STATUS, not Korean citizenship.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "KR");
    const gp = grandparentsBornIn(p, "KR");
    const ggp = greatGrandparentsBornIn(p, "KR");

    const conscriptionVerify =
      "Male applicants: F-4 holders are not Korean citizens and are not subject to ROK conscription, but men who hold or held Korean nationality and have unresolved conscription obligations may face restrictions when applying. Verify status with the Korean consulate.";
    const greatGrandchildVerify =
      "F-4 great-grandchild eligibility post-2019 reform is contested across sources. The Overseas Koreans Act has been read as expanding access to great-grandchildren in practice, but the exact ROK MOFA position is not cleanly verified. Confirm with the Overseas Koreans Agency or the nearest Korean consulate before relying on a great-grandparent claim.";

    if (par.length || gp.length) {
      const which = par.length ? par[0].key : gp[0].key;
      return {
        tier: "likely",
        reasons: [
          `You have a Korean-linked ${par.length ? "parent" : "grandparent"} (${which}).`,
          "The Overseas Koreans Act covers former Korean nationals and their descendants; parent- and grandparent-linked applicants are clearly within scope.",
        ],
        needToVerify: [
          conscriptionVerify,
          "F-4 issuance is administrative; documentary proof of the qualifying ancestor's former Korean nationality (old family register, Korean passport, naturalisation record) is required.",
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Korean-linked great-grandparent (${ggp[0].key}).`,
          "Post-2019 reform readings of the Overseas Koreans Act have been described as expanding F-4 access to great-grandchildren, but the scope of that expansion is contested across sources.",
        ],
        needToVerify: [
          greatGrandchildVerify,
          conscriptionVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "F-4 requires a documented former-Korean ancestor (typically parent or grandparent; great-grandparent claims are contested).",
        "No qualifying Korean-linked ancestor recorded.",
      ],
    };
  },
  requirementsSummary: [
    "Former Korean national or descendant (parent/grandparent core; great-grandchild contested).",
    "Documentary proof of the qualifying ancestor's former Korean nationality.",
    "F-4 grants long-term residence, work, and many civic rights but is NOT Korean citizenship.",
    "65+ former Korean nationals may reacquire Korean nationality with intent to reside (separate path).",
  ],
  documentsOutline: [
    "Qualifying ancestor's former Korean family register (구 호적 / 제적등본) or Korean passport",
    "Naturalisation record showing the ancestor's loss of Korean nationality",
    "Birth and marriage certificates linking each generation",
    "Applicant's passport and police clearance",
    "Apostilled translations into Korean",
  ],
  caveats: [
    "F-4 is a HERITAGE VISA, not citizenship. Holders cannot vote, hold elective office, or serve in the military.",
    "Great-grandchild eligibility post-2019 reform is contested across sources - verify with the Korean consulate.",
    "Male applicants with unresolved Korean conscription obligations may face restrictions.",
    "65+ former Korean nationals can reacquire Korean nationality with intent to reside in Korea - a separate, narrower path.",
  ],
  officialLinks: [
    {
      label: "Ministry of Foreign Affairs (Korea) - Overseas Koreans",
      url: "https://www.mofa.go.kr/eng/index.do",
    },
    {
      label: "Hi Korea - F-4 Overseas Korean visa",
      url: "https://www.hikorea.go.kr/",
    },
    {
      label: "Korean Law Information Center - Overseas Koreans Act",
      url: "https://www.law.go.kr/LSW/eng/engLsSc.do?menuId=2&query=OVERSEAS+KOREANS+ACT",
    },
  ],
  estTimelineMonths: [3, 6],
  estCostUSD: [50, 300],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Parent- and grandparent-linked F-4 applications routinely succeed when the former-Korean ancestor's records are clean. Great-grandparent claims are post-2019-reform-dependent and contested. The 65+ reacquisition route is single-source.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "secondary",
  },
};
