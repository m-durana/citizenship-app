import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const southafricaDescent: Path = {
  id: "za-descent",
  country: "South Africa",
  countryCode: "ZA",
  flag: "🇿🇦",
  pathType: "descent",
  name: "South African citizenship by descent (Citizenship Act 88 of 1995, § 2(1)(b))",
  shortDescription:
    "Section 2(1)(b) of the South African Citizenship Act 88 of 1995 confers SA citizenship by descent on a child born outside SA to at least one SA-citizen parent at the time of birth. The Constitutional Court's 6 May 2025 ruling in Democratic Alliance v Minister of Home Affairs (CCT 184/23, [2025] ZACC 8) struck down former § 6(1)(a) retroactively to 6 October 1995, restoring citizenship to South Africans who had been deemed to lose it on voluntary acquisition of another nationality.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "ZA");
    const gp = grandparentsBornIn(p, "ZA");

    const concourtVerify =
      "South Africa: the 6 May 2025 ConCourt ruling in DA v Minister of Home Affairs (CCT 184/23, ZACC 8/2025) struck down former § 6(1)(a) retroactively to 6 October 1995 - persons stripped under that provision are deemed not to have lost SA citizenship. DHA operational practice on re-registration and confirmation letters is still evolving; confirm with the nearest SA mission whether you must affirmatively re-register.";
    const registrationVerify =
      "Birth abroad should ordinarily be registered with DHA within 1 year (discretionary thereafter). Chisuse and Others v Director-General, Home Affairs [2020] ZACC 20 held that citizenship by birth is not contingent on timely registration, but DHA may still administratively require a late-registration approval before issuing documents.";

    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a South African-linked parent (${par[0].key}).`,
          "Section 2(1)(b) of the Citizenship Act 88 of 1995 transmits SA citizenship to a child born outside SA where at least one parent was a SA citizen at the time of birth.",
          "Post-6 May 2025: ConCourt restoration of former § 6(1)(a) cases removes a previously common chain-break where the parent had naturalised abroad.",
        ],
        needToVerify: [
          "Your parent was a SA citizen at the time of your birth (or is now deemed not to have lost SA citizenship under the 2025 ConCourt ruling - pre-2025 § 6(1)(a) stripping does not break the chain).",
          concourtVerify,
          registrationVerify,
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a South African-linked grandparent (${gp[0].key}).`,
          "SA citizenship by descent runs one generation - the intermediate parent must themselves have been a SA citizen at your birth.",
          "Cases stripped under former § 6(1)(a) before 6 May 2025 are now restored (ZACC 8/2025), which may revive a previously broken grandparent-to-parent-to-grandchild chain.",
        ],
        needToVerify: [
          "Whether the intermediate parent was a SA citizen at the time of your birth - either by retaining SA citizenship or by being a beneficiary of the post-2025 restoration of former § 6(1)(a) cases.",
          concourtVerify,
          registrationVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Section 2(1)(b) requires at least one SA-citizen parent at the time of your birth.",
        "Grandchild-only cases without intermediate-parent SA citizenship at the grandchild's birth do not satisfy § 2(1)(b).",
      ],
    };
  },
  requirementsSummary: [
    "At least one SA-citizen parent at the time of your birth (Citizenship Act 88 of 1995, § 2(1)(b)).",
    "Post-6 May 2025: persons stripped under former § 6(1)(a) before that date are deemed not to have lost SA citizenship (ZACC 8/2025).",
    "Birth abroad ordinarily registered with DHA within 1 year (discretionary thereafter; Chisuse confirms citizenship not contingent on timely registration).",
    "Dual citizenship now permitted without prior § 6(1)(a) stripping.",
  ],
  documentsOutline: [
    "DHA-529 (Determination of citizenship status) and BI-24 / BI-529 as required",
    "Parent's SA birth certificate, ID, or citizenship certificate at the time of applicant's birth",
    "Applicant's foreign birth certificate",
    "Marriage certificates where surnames differ",
    "For post-2025 restoration cases: evidence of prior § 6(1)(a) stripping (former foreign naturalisation records)",
  ],
  caveats: [
    "The 6 May 2025 ConCourt ruling is recent - DHA operational practice on re-registration of restored citizens and on derivative claims by their children is still evolving.",
    "Birth-abroad registration within 1 year is the administrative rule; later registrations are discretionary and Chisuse does not fully eliminate the DHA documentary requirement in practice.",
    "Grandchild claims without intermediate-parent SA citizenship at the grandchild's birth fail § 2(1)(b) - the restoration of an intermediate parent's citizenship under ZACC 8/2025 is the typical route to reopen such cases.",
  ],
  officialLinks: [
    {
      label: "Department of Home Affairs - Citizenship",
      url: "https://www.dha.gov.za/index.php/civic-services/citizenship",
    },
    {
      label: "Constitutional Court of South Africa - DA v Minister of Home Affairs (CCT 184/23)",
      url: "https://www.concourt.org.za/index.php/judgement/620-democratic-alliance-v-minister-of-home-affairs-and-another-cct-184-23",
    },
    {
      label: "SAFLII - search [2025] ZACC 8",
      url: "https://www.saflii.org/za/cases/ZACC/2025/",
    },
  ],
  estTimelineMonths: [6, 24],
  estCostUSD: [50, 500],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "moderate",
    successNote:
      "Direct parent-to-child applications are well-grounded in § 2(1)(b). Post-May-2025 restoration cases and grandchild claims that rely on the ConCourt ruling face an unsettled DHA practice; backlogs at SA missions and at DHA in Pretoria can extend timelines materially.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
