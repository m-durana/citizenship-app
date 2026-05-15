import type { Path } from "../../types/path";
import { parentsBornIn } from "../../engine/helpers";

export const newzealandDescent: Path = {
  id: "nz-descent",
  country: "New Zealand",
  countryCode: "NZ",
  flag: "🇳🇿",
  pathType: "descent",
  name: "New Zealand citizenship by descent (Citizenship Act 1977, s.7)",
  shortDescription:
    "Under section 7 of the Citizenship Act 1977, a person born outside New Zealand on or after 1 January 1978 acquires NZ citizenship by descent only if at least one parent was a NZ citizen otherwise than by descent at the time of birth. This is a strict one-generation cap: a NZ citizen by descent generally cannot transmit citizenship to a child born abroad.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "NZ");

    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a New Zealand-linked parent (${par[0].key}).`,
          "Section 7(1) of the Citizenship Act 1977 confers NZ citizenship by descent on a child born outside NZ to a parent who was a NZ citizen otherwise than by descent at the time of birth.",
        ],
        needToVerify: [
          "Your NZ parent was a citizen otherwise than by descent - i.e. acquired citizenship by birth in NZ or by grant. A parent who is themselves a citizen by descent generally cannot transmit under s.7.",
          "If the parent is a citizen by descent, two narrow exceptions may apply: s.7(4) (parent in Crown service or service of an international organisation of which NZ is a member at the time of your birth) and s.9 (discretionary ministerial special-cases grant - rare).",
          "Births before 1 January 1978 are governed by the British Nationality and New Zealand Citizenship Act 1948 (patrilineal transmission; registration at a NZ consulate within 12 months of birth was generally required).",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Section 7 of the Citizenship Act 1977 transmits NZ citizenship only through a parent who was a NZ citizen otherwise than by descent at the time of your birth.",
        "Grandparent-only links do not confer citizenship by descent. A grandchild claim is generally unavailable unless an intermediate parent themselves held NZ citizenship otherwise than by descent.",
      ],
    };
  },
  requirementsSummary: [
    "A parent who was a NZ citizen otherwise than by descent (i.e. by birth or grant) at the time of your birth (s.7).",
    "Strict one-generation cap on transmission abroad.",
    "Narrow exceptions: s.7(4) Crown / international-organisation service; s.9 ministerial discretionary grant.",
    "Dual citizenship permitted.",
  ],
  documentsOutline: [
    "Citizenship by Descent application form (DIA)",
    "Parent's NZ birth certificate or citizenship certificate evidencing citizenship otherwise than by descent",
    "Applicant's foreign birth certificate",
    "Marriage certificates where surnames differ",
    "Parent's passport at the time of applicant's birth (where available)",
  ],
  caveats: [
    "Pre-1 January 1978 births fall under the British Nationality and New Zealand Citizenship Act 1948 - patrilineal transmission and a 12-month consular registration window were the rule; cases outside that window may be irrecoverable.",
    "s.7 is the dominant chain-killer for the diaspora: NZ citizens by descent cannot transmit further by ordinary operation of law.",
    "Samoa-related cases sit under separate restoration legislation (Citizenship (Western Samoa) Act 1982 / Restoration of Citizenship to Persons Born in Western Samoa Act 2024) and require their own analysis.",
    "Standard application fee NZD 243 (citizenship by descent only); NZD 490 if applying with a passport.",
  ],
  officialLinks: [
    {
      label: "Citizenship Act 1977 - New Zealand Legislation",
      url: "https://www.legislation.govt.nz/act/public/1977/0061/latest/DLM443684.html",
    },
    {
      label: "Department of Internal Affairs - Citizenship by Descent",
      url: "https://www.dia.govt.nz/Citizenship-By-descent",
    },
    {
      label: "govt.nz - Apply for NZ citizenship by descent",
      url: "https://www.govt.nz/browse/passports-citizenship-and-identity/nz-citizenship/apply-for-nz-citizenship-by-descent/",
    },
  ],
  estTimelineMonths: [4, 12],
  estCostUSD: [150, 350],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Direct one-generation-abroad cases through a parent who is a NZ citizen otherwise than by descent are routine. Second-generation-abroad claims are essentially closed outside the s.7(4) and s.9 carve-outs.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
