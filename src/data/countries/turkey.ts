import type { Path } from "../../types/path";
import {
  grandparentsBornIn,
  greatGrandparentsBornIn,
  parentsBornIn,
} from "../../engine/helpers";

export const turkeyDescent: Path = {
  id: "tr-descent",
  country: "Turkey",
  countryCode: "TR",
  flag: "🇹🇷",
  pathType: "descent",
  name: "Turkish citizenship by descent (Law 5901, Art. 7)",
  shortDescription:
    "Article 7 of the Turkish Citizenship Law (TVK, Law No. 5901 of 2009) confers Turkish citizenship on a child born to a Turkish mother OR father, in or out of wedlock, anywhere in the world. There is no statutory generation cap, but transmission is de facto registration-based: each generation must appear on the Turkish civil register (nüfus).",
  evaluate: (p) => {
    const par = parentsBornIn(p, "TR");
    const gp = grandparentsBornIn(p, "TR");
    const ggp = greatGrandparentsBornIn(p, "TR");

    const conscriptionVerify =
      "Turkey: adult male Turkish citizens are subject to conscription from age 20 (approximately 6 months under current rules). The diaspora paid-exemption scheme (bedelli askerlik) typically costs €5,000+. Registering as a Turkish citizen as an adult male activates this liability - verify with the Turkish consulate before completing nüfus registration.";
    const registrationVerify =
      "Turkish descent is registration-driven: each generation in the chain must have been entered on the nüfus (civil register). Verify that the transmitting parent holds a current TC Kimlik (national ID) number and that intermediate births in your line were properly registered.";
    const dualVerify =
      "Article 27 of Law 5901 permits dual citizenship unconditionally. Notification of foreign nationality acquisition is requested but failure to notify does not cause loss of Turkish citizenship.";

    if (par.length) {
      return {
        tier: "likely",
        reasons: [
          `You have a Turkish-linked parent (${par[0].key}).`,
          "Article 7 of Law 5901 transmits Turkish citizenship from a Turkish mother or father to the child regardless of wedlock or place of birth.",
        ],
        needToVerify: [
          "Your parent held current Turkish citizenship (TC Kimlik) at the time of your birth.",
          registrationVerify,
          conscriptionVerify,
          dualVerify,
        ],
      };
    }
    if (gp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Turkish-linked grandparent (${gp[0].key}).`,
          "Turkish descent has no statutory generation cap, but transmission is registration-based - the intermediate parent must also be on the nüfus for the chain to continue.",
        ],
        needToVerify: [
          "Whether the intermediate parent was registered on the nüfus and held Turkish citizenship at your birth.",
          registrationVerify,
          conscriptionVerify,
          dualVerify,
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Turkish-linked great-grandparent (${ggp[0].key}).`,
          "Turkish descent has no statutory generation cap; great-grandparent chains can in principle reach you, but every intermediate ancestor must have been on the nüfus.",
        ],
        needToVerify: [
          "Full documentary chain showing each generation was registered on the Turkish civil register (nüfus kayıt örneği).",
          registrationVerify,
          conscriptionVerify,
          dualVerify,
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "No Turkish-linked parent, grandparent, or great-grandparent recorded.",
        "Article 7 transmission requires a Turkish ancestor in the direct line, and de facto registration on the nüfus.",
      ],
    };
  },
  requirementsSummary: [
    "A Turkish parent at the time of your birth (Law 5901, Art. 7) - either-parent, in or out of wedlock, anywhere.",
    "No statutory generation cap; transmission is de facto registration-based on the nüfus.",
    "Dual citizenship permitted unconditionally under Art. 27.",
    "Adult male citizens subject to conscription liability (~6 months or paid exemption).",
  ],
  documentsOutline: [
    "Turkish parent's nüfus kayıt örneği (civil register extract) and TC Kimlik",
    "Parent's Turkish ID card or passport at the time of your birth",
    "Applicant's foreign birth certificate, apostilled and translated into Turkish",
    "Marriage certificate of the parents (if married)",
    "Intermediate-generation birth/marriage certificates for grandparent or great-grandparent chains",
  ],
  caveats: [
    "Descent has no statutory generation cap, but intermediate births must have been registered on the nüfus.",
    "Adult male applicants register into active conscription liability; diaspora paid exemption (~€5,000+) is the common practical exit.",
    "Pre-2009 cases were governed by Law 403/1964; transitional registration issues may surface.",
    "Article 25 deprivation cases (revocations) may leave descendants with a descent claim rather than a Mavi Kart route.",
  ],
  officialLinks: [
    {
      label: "Mevzuat - Law 5901 (Türk Vatandaşlığı Kanunu)",
      url: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5901.pdf",
    },
    {
      label: "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü (NVI)",
      url: "https://www.nvi.gov.tr/",
    },
    {
      label: "Turkish Presidency",
      url: "https://www.tccb.gov.tr/en/",
    },
  ],
  estTimelineMonths: [4, 18],
  estCostUSD: [100, 800],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "Direct-parent cases with a registered nüfus entry succeed reliably. Multi-generation chains require nüfus continuity at every link; unregistered intermediate births are the dominant failure mode. Adult-male conscription is the main practical deterrent.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
};

export const turkeyMaviKart: Path = {
  id: "tr-mavi-kart",
  country: "Turkey",
  countryCode: "TR",
  flag: "🇹🇷",
  pathType: "heritage",
  name: "Turkey Mavi Kart (Blue Card) for ex-citizens (Law 5901, Art. 28)",
  shortDescription:
    "Article 28 of Law 5901 grants Mavi Kart (Blue Card) status to former Turkish citizens who renounced with an izinli çıkma (permitted exit) decree, and to their descendants up to the third degree. Mavi Kart confers near-citizen civil rights but is NOT Turkish citizenship - holders cannot vote, hold elective office, be civil servants, or join the military or police. Mavi Kart holders are exempt from conscription.",
  evaluate: (p) => {
    const par = parentsBornIn(p, "TR");
    const gp = grandparentsBornIn(p, "TR");
    const ggp = greatGrandparentsBornIn(p, "TR");

    const izinliVerify =
      "Mavi Kart eligibility depends on the original Turkish ancestor having renounced citizenship via izinli çıkma (permitted exit) rather than by deprivation or automatic loss. Obtain the original izinli çıkma decree or its NVI archival reference before applying.";
    const thirdDegreeVerify =
      "Mavi Kart extends to descendants of izinli çıkma former-citizens up to the third degree (children, grandchildren, great-grandchildren per NVI guidance). Confirm the exact statutory wording with NVI before relying on a third-degree claim.";

    if (par.length || gp.length) {
      const which = par.length ? par[0].key : gp[0].key;
      return {
        tier: "likely",
        reasons: [
          `You have a Turkish-linked ${par.length ? "parent" : "grandparent"} (${which}) who may qualify as an izinli çıkma former-citizen or their descendant.`,
          "Article 28 covers former Turkish citizens who left with izinli çıkma and their descendants; first and second degree descendants are clearly within scope.",
        ],
        needToVerify: [
          izinliVerify,
          "Mavi Kart holders cannot vote, hold elective office, be civil servants, or join the military/police. It is a heritage status, not citizenship.",
          "Mavi Kart holders are exempt from Turkish conscription.",
        ],
      };
    }
    if (ggp.length) {
      return {
        tier: "possibly",
        reasons: [
          `You have a Turkish-linked great-grandparent (${ggp[0].key}).`,
          "Mavi Kart reaches descendants up to the third degree (great-grandchildren) per NVI guidance, but third-degree claims should be confirmed against the statute.",
        ],
        needToVerify: [
          thirdDegreeVerify,
          izinliVerify,
          "Mavi Kart holders cannot vote, hold elective office, be civil servants, or join the military/police. It is a heritage status, not citizenship.",
        ],
      };
    }
    return {
      tier: "unlikely",
      reasons: [
        "Mavi Kart requires a documented izinli çıkma former-Turkish ancestor in the direct line up to the third degree.",
        "No qualifying Turkish-linked ancestor recorded.",
      ],
    };
  },
  requirementsSummary: [
    "A direct ancestor (up to 3rd degree) who renounced Turkish citizenship via izinli çıkma (Art. 28).",
    "Mavi Kart confers near-citizen civil rights but is NOT Turkish citizenship.",
    "Holders cannot vote, hold elective office, be civil servants, or join the military or police.",
    "Mavi Kart holders are exempt from Turkish conscription.",
  ],
  documentsOutline: [
    "Original izinli çıkma decree of the qualifying ancestor (or NVI archival reference)",
    "Birth and marriage certificates linking each generation up to 3rd degree",
    "Applicant's foreign birth certificate and current passport",
    "Apostilled translations into Turkish",
  ],
  caveats: [
    "Mavi Kart is a HERITAGE STATUS, not Turkish citizenship.",
    "Civil-rights restrictions: no voting, no elective office, no civil-service employment, no military or police service.",
    "Third-degree (great-grandchild) eligibility is via NVI practice; confirm against statutory text before relying on it.",
    "Ancestors who lost citizenship by deprivation (Art. 25) or automatic loss rather than izinli çıkma typically do not produce a Mavi Kart claim.",
  ],
  officialLinks: [
    {
      label: "Mevzuat - Law 5901 (Türk Vatandaşlığı Kanunu)",
      url: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5901.pdf",
    },
    {
      label: "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü (NVI) - Mavi Kart",
      url: "https://www.nvi.gov.tr/mavi-kart",
    },
    {
      label: "Turkish Presidency",
      url: "https://www.tccb.gov.tr/en/",
    },
  ],
  estTimelineMonths: [3, 9],
  estCostUSD: [50, 400],
  lastReviewed: "2026-05-15",
  practical: {
    successSignal: "high",
    successNote:
      "First and second degree descendants of izinli çıkma former-citizens routinely succeed when the original decree is producible. Third-degree claims are NVI-practice-dependent.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
    singleSource: "government",
  },
};
