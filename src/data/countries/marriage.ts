import type { Path, PracticalNotes } from "../../types/path";
import type { UserProfile } from "../../types/profile";

type MarriageSpec = {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  residencyYears: number;
  notes: string;
  links: { label: string; url: string }[];
  practical?: PracticalNotes;
};

function marriagePath(s: MarriageSpec): Path {
  return {
    id: s.id,
    country: s.country,
    countryCode: s.countryCode,
    flag: s.flag,
    pathType: "marriage",
    name: `${s.country} naturalization fast-track via marriage (${s.residencyYears} yr)`,
    shortDescription: `Spouses of ${s.country} citizens can naturalize after ${s.residencyYears} year${s.residencyYears === 1 ? "" : "s"} of marriage and residency. ${s.notes}`,
    evaluate: (p: UserProfile) => {
      const sp = p.spouse;
      if (sp && sp.citizenships.includes(s.countryCode)) {
        return {
          tier: "likely",
          reasons: [
            `Your spouse holds ${s.country} citizenship.`,
            `${s.country} reduces residency to ${s.residencyYears} year${s.residencyYears === 1 ? "" : "s"} for spouses.`,
          ],
          needToVerify: [
            `You meet the ${s.residencyYears}-year residency requirement (and any local-language requirement).`,
            "The marriage is genuine and ongoing at time of application.",
          ],
        };
      }
      return {
        tier: "unlikely",
        reasons: [
          `You did not indicate a spouse with ${s.country} citizenship.`,
        ],
      };
    },
    requirementsSummary: [
      `Spouse holds ${s.country} citizenship.`,
      `${s.residencyYears}-year residency in ${s.country} after marriage (varies; check current rules).`,
      "Genuine and ongoing marriage at the time of application.",
    ],
    documentsOutline: [
      "Marriage certificate (apostilled)",
      "Spouse's national ID / passport / citizenship document",
      "Proof of joint residence in the country",
      "Language certificate where applicable",
      "Criminal record certificates",
    ],
    caveats: [
      "Marriage fast-tracks generally still require local residency; this is faster naturalization, not automatic citizenship.",
    ],
    officialLinks: s.links,
    estTimelineMonths: [s.residencyYears * 12, s.residencyYears * 12 + 18],
    estCostUSD: [200, 2000],
    lastReviewed: "2026-05-08",
    practical: s.practical,
  };
}

export const spainMarriage = marriagePath({
  id: "es-marriage",
  country: "Spain",
  countryCode: "ES",
  flag: "🇪🇸",
  residencyYears: 1,
  notes: "Spain offers the fastest marriage track in Europe (1 year of legal residency).",
  links: [
    {
      label: "Ministerio de Justicia - Nacionalidad",
      url: "https://www.mjusticia.gob.es/en/ciudadania/nacionalidad",
    },
    {
      label: "Punto de Acceso General - Obtención de la nacionalidad española",
      url: "https://administracion.gob.es/pag_Home/en/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/obtencion-nacionalidad.html",
    },
  ],
  practical: {
    successSignal: "high",
    successNote:
      "1 year residency after marriage; INE reports 252,476 naturalizations in Spain in 2024. DELE A2 + CCSE required (Ibero-American nationals exempt from DELE).",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "DELE A2", note: "Ibero-American (Latin American) nationals are exempt." },
    knowledgeTest: { required: true, note: "CCSE civics test: pass 15/25 questions." },
  },
});

export const italyMarriage = marriagePath({
  id: "it-marriage",
  country: "Italy",
  countryCode: "IT",
  flag: "🇮🇹",
  residencyYears: 2,
  notes: "2 years if residing in Italy, 3 years if living abroad. B1 Italian language required.",
  links: [
    {
      label: "Ministero dell'Interno - Cittadinanza",
      url: "https://www.interno.gov.it/it/temi/cittadinanza-e-altri-diritti-civili/cittadinanza",
    },
    {
      label: "Consolato Generale d'Italia a New York - Cittadinanza per matrimonio",
      url: "https://consnewyork.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/cittadinanza/italian-citizenship-by-marriage-or-civil-union/",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "B1 Italian (CILS / CELI / PLIDA) required since DL 113/2018. Statutory cap reduced from 48 to 36 months but bureaucratic lag is real.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 (CILS / CELI / PLIDA)" },
    knowledgeTest: { required: false },
  },
});

export const portugalMarriage = marriagePath({
  id: "pt-marriage",
  country: "Portugal",
  countryCode: "PT",
  flag: "🇵🇹",
  residencyYears: 3,
  notes: "Married for 3+ years; A2 Portuguese language required.",
  links: [
    {
      label: "Instituto dos Registos e do Notariado",
      url: "https://justica.gov.pt/Servicos/Nacionalidade",
    },
    {
      label: "Consulate General of Portugal in Newark - Nationality by marriage",
      url: "https://newark.consuladoportugal.mne.gov.pt/en/consular-matters/civil-registry/nationality-by-marriage",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "After 3 years of marriage, applicants must prove 'ligação efetiva à comunidade portuguesa'. A2 CIPLE is one accepted proof but not strictly universal; IRN guidance waives language proof after 6+ years of marriage.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: {
      required: false,
      level: "A2 (CIPLE) commonly used",
      note: "Per IRN and Embassy Bratislava guidance, language proof is one way to demonstrate community ties, not a hard universal requirement; waived after 6+ years of marriage.",
    },
    knowledgeTest: { required: false },
  },
});

export const irelandMarriage = marriagePath({
  id: "ie-marriage",
  country: "Ireland",
  countryCode: "IE",
  flag: "🇮🇪",
  residencyYears: 3,
  notes: "3 years of marriage and residency in Ireland.",
  links: [
    {
      label: "Department of Justice - Citizenship",
      url: "https://www.irishimmigration.ie/how-to-become-a-citizen/",
    },
    {
      label: "Citizens Information - Becoming an Irish citizen through naturalisation",
      url: "https://www.citizensinformation.ie/en/moving-country/irish-citizenship/becoming-an-irish-citizen-through-naturalisation/",
    },
  ],
  practical: {
    successSignal: "high",
    successNote: "No language test, no civics test. Approval is reliable when 3-year residency and marriage validity are met.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
});

export const usaMarriage = marriagePath({
  id: "us-marriage",
  country: "United States",
  countryCode: "US",
  flag: "🇺🇸",
  residencyYears: 3,
  notes:
    "Spouses of U.S. citizens may naturalize after 3 years as a lawful permanent resident (versus the standard 5), provided they have lived in marital union with the citizen spouse for those 3 years.",
  links: [
    {
      label: "USCIS Policy Manual Vol. 12 Pt. G Ch. 3 - Spouses of U.S. citizens",
      url: "https://www.uscis.gov/policy-manual/volume-12-part-g-chapter-3",
    },
    {
      label: "8 CFR §319.1 - Cornell Legal Information Institute",
      url: "https://www.law.cornell.edu/cfr/text/8/319.1",
    },
  ],
  practical: {
    successSignal: "high",
    successNote:
      "3-year LPR rule (INA §319(a)). English + civics test required; high approval rate when residency and continuous-marriage rules are met.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "Basic English (USCIS interview)" },
    knowledgeTest: { required: true, note: "100-question civics study list; 10 asked, 6 must be correct." },
  },
});

export const ukMarriage = marriagePath({
  id: "gb-marriage",
  country: "United Kingdom",
  countryCode: "GB",
  flag: "🇬🇧",
  residencyYears: 3,
  notes:
    "Spouses of British citizens can naturalize after 3 years of UK residence (vs. the standard 5) plus ILR or EU Settled Status.",
  links: [
    {
      label: "GOV.UK - Become a British citizen if your spouse is British",
      url: "https://www.gov.uk/becoming-a-british-citizen/if-your-spouse-is-a-british-citizen",
    },
    {
      label: "House of Commons Library - British citizenship by naturalisation (CBP-8580)",
      url: "https://commonslibrary.parliament.uk/research-briefings/cbp-8580/",
    },
  ],
  practical: {
    successSignal: "high",
    successNote: "Requires ILR / Settled Status, B1 English, and the Life in the UK test.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 English" },
    knowledgeTest: { required: true, note: "Life in the UK test." },
  },
});

export const franceMarriage = marriagePath({
  id: "fr-marriage",
  country: "France",
  countryCode: "FR",
  flag: "🇫🇷",
  residencyYears: 4,
  notes:
    "Spouses of French citizens can apply by declaration after 4 years of marriage (5 if not continuously resident in France for 3+ years).",
  links: [
    {
      label: "Service-Public - Déclaration de nationalité française par mariage",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2726",
    },
    {
      label: "Code civil - Title I bis: De la nationalité française (Légifrance)",
      url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070721/LEGISCTA000006136159/",
    },
  ],
  practical: {
    successSignal: "high",
    successNote: "Declaration route under Article 21-2 of the Civil Code. B1 French required.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 French (TCF / DELF)" },
    knowledgeTest: { required: false },
  },
});

export const netherlandsMarriage = marriagePath({
  id: "nl-marriage",
  country: "Netherlands",
  countryCode: "NL",
  flag: "🇳🇱",
  residencyYears: 3,
  notes:
    "Married to (or partnered with) a Dutch citizen: naturalization after 3 years of marriage and shared residence.",
  links: [
    {
      label: "IND - Exceptions to the 5-year term for naturalisation",
      url: "https://ind.nl/en/exceptions-to-the-5-year-term-for-naturalisation-in-the-netherlands",
    },
    {
      label: "Rijkswet op het Nederlanderschap - wetten.overheid.nl",
      url: "https://wetten.overheid.nl/BWBR0003738",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Civic-integration exam required. The Netherlands generally requires renouncing prior citizenship, with limited exceptions.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "A2 Dutch" },
    knowledgeTest: { required: true, note: "Inburgeringsexamen civic-integration test." },
  },
});

export const belgiumMarriage = marriagePath({
  id: "be-marriage",
  country: "Belgium",
  countryCode: "BE",
  flag: "🇧🇪",
  residencyYears: 3,
  notes:
    "Spouses can apply by declaration after 5 years of legal residence (3 of them married and cohabiting with the Belgian spouse).",
  links: [
    {
      label: "FPS Justice - Declaration of acquisition of Belgian nationality",
      url: "https://justice.belgium.be/en/themes_and_files/children_and_youth/citizenship/become_belgian/declaration_of_acquisition",
    },
    {
      label: "Code de la nationalité belge (Loi du 28 juin 1984) - eJustice",
      url: "https://www.ejustice.just.fgov.be/eli/loi/1984/06/28/1984900065/justel",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Article 12bis declaration route. Requires proof of language (A2) and social/economic integration.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "A2 in one of FR/NL/DE" },
    knowledgeTest: { required: false },
  },
});

export const switzerlandMarriage = marriagePath({
  id: "ch-marriage",
  country: "Switzerland",
  countryCode: "CH",
  flag: "🇨🇭",
  residencyYears: 5,
  notes:
    "Simplified naturalization for spouses of Swiss citizens: 5 years of CH residence + 3 years of marriage. If living abroad, the route requires 6 years of marriage plus close ties to Switzerland (no CH residence).",
  links: [
    {
      label: "SEM - Married with a Swiss citizen",
      url: "https://www.sem.admin.ch/sem/en/home/integration-einbuergerung/schweizer-werden/verheiratet.html",
    },
    {
      label: "Bürgerrechtsgesetz (BüG, SR 141.0) - Fedlex",
      url: "https://www.fedlex.admin.ch/eli/cc/2016/404/en",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Requires integration into Swiss life, respect for legal order, and no threat to Swiss security. Cantonal interview is common.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "A2 written / B1 oral in a national language" },
    knowledgeTest: { required: true, note: "Cantonal civics interview." },
  },
});

export const swedenMarriage = marriagePath({
  id: "se-marriage",
  country: "Sweden",
  countryCode: "SE",
  flag: "🇸🇪",
  residencyYears: 3,
  notes:
    "Spouses / cohabitees of Swedish citizens can naturalize after 3 years of residence (vs. the standard 5) plus 2 years of cohabitation. Reform effective 6 June 2026 raises this to 7 years residence + 5 years together.",
  links: [
    {
      label: "Migrationsverket - Citizenship for adults",
      url: "https://www.migrationsverket.se/en/you-want-to-apply/swedish-citizenship/citizenship-for-adults/citizenship-for-adults.html",
    },
    {
      label: "Nordic Council - Info Norden: Swedish citizenship",
      url: "https://www.norden.org/en/info-norden/swedish-citizenship",
    },
  ],
  practical: {
    successSignal: "high",
    successNote:
      "No language or civics test under current rules. Reform effective 6 June 2026 introduces longer residence and tougher conduct requirements.",
    lawyerTypicallyNeeded: "no",
    languageTest: { required: false },
    knowledgeTest: { required: false },
  },
});

export const norwayMarriage = marriagePath({
  id: "no-marriage",
  country: "Norway",
  countryCode: "NO",
  flag: "🇳🇴",
  residencyYears: 5,
  notes:
    "Spouses / partners of Norwegian citizens may naturalize when combined years of marriage + Norwegian residence reach 7, with at least 5 years of residence in Norway during the last 10 years.",
  links: [
    {
      label: "UDI - Citizenship for people with a residence permit in Norway",
      url: "https://www.udi.no/en/want-to-apply/citizenship/citizenship-for-people-who-hold-a-residence-permit-in-norway/",
    },
    {
      label: "UDI - Calculating the marriage period in citizenship cases",
      url: "https://www.udi.no/en/word-definitions/calculating-the-marriage-period-in-citizenship-cases/",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "B1 Norwegian and a citizenship test are required. Norway now permits dual citizenship (since 2020).",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 Norwegian" },
    knowledgeTest: { required: true, note: "Statsborgerprøven citizenship test." },
  },
});

export const argentinaMarriage = marriagePath({
  id: "ar-marriage",
  country: "Argentina",
  countryCode: "AR",
  flag: "🇦🇷",
  residencyYears: 2,
  notes:
    "Argentina has no formal marriage fast-track but the standard residency is just 2 years, and judges have discretion to waive it for spouses of Argentine citizens.",
  links: [
    {
      label: "Argentina.gob.ar - Obtener la ciudadanía argentina",
      url: "https://www.argentina.gob.ar/servicio/obtener-la-ciudadania-argentina",
    },
    {
      label: "Ley 346 (texto actualizado) - argentina.gob.ar",
      url: "https://www.argentina.gob.ar/normativa/nacional/ley-346-48854/actualizacion",
    },
  ],
  practical: {
    successSignal: "high",
    successNote:
      "Judicial naturalization route under Ley 346. Argentine citizenship is famously generous; dual citizenship allowed.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: false, note: "No formal test, but ability to communicate in Spanish is expected." },
    knowledgeTest: { required: false },
  },
});

export const brazilMarriage = marriagePath({
  id: "br-marriage",
  country: "Brazil",
  countryCode: "BR",
  flag: "🇧🇷",
  residencyYears: 1,
  notes:
    "Spouses of Brazilian citizens can naturalize after just 1 year of uninterrupted residence in Brazil.",
  links: [
    {
      label: "Ministério da Justiça - Naturalização ordinária (residência)",
      url: "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes/naturalizacao/o-que-e-naturalizacao/naturalizacao-ordinaria/ter-residencia-em-territorio-nacional-pelo-prazo-estabelecido-pela-lei-brasileira",
    },
    {
      label: "Lei 13.445/2017 (Lei de Migração) - Planalto",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm",
    },
  ],
  practical: {
    successSignal: "high",
    successNote: "Ordinary naturalization with reduced residency. Portuguese language proof required.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "Portuguese (Celpe-Bras or equivalent)" },
    knowledgeTest: { required: false },
  },
});

export const mexicoMarriage = marriagePath({
  id: "mx-marriage",
  country: "Mexico",
  countryCode: "MX",
  flag: "🇲🇽",
  residencyYears: 2,
  notes:
    "Spouses of Mexican citizens may naturalize after 2 years of residence in Mexico (vs. the standard 5).",
  links: [
    {
      label: "SRE - Carta de Naturalización por matrimonio",
      url: "https://sre.gob.mx/carta-de-naturalizacion-por-haber-contraido-matrimonio-con-varon-o-mujer-mexicanos",
    },
    {
      label: "Library of Congress - Mexico Naturalization Law overview (PDF)",
      url: "https://tile.loc.gov/storage-services/service/ll/llglrd/2019669333/2019669333.pdf",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Spanish, Mexican history, and culture exam administered by SRE. Dual citizenship allowed since 1998.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: true, level: "Spanish (oral interview)" },
    knowledgeTest: { required: true, note: "Mexican history and culture exam." },
  },
});

export const japanMarriage = marriagePath({
  id: "jp-marriage",
  country: "Japan",
  countryCode: "JP",
  flag: "🇯🇵",
  residencyYears: 3,
  notes:
    "Spouses of Japanese citizens can naturalize after 3 years of residence in Japan (or 1 year of residence after 3+ years of marriage).",
  links: [
    {
      label: "Ministry of Justice - The Nationality Law (Article 7)",
      url: "https://www.moj.go.jp/EN/MINJI/minji78.html",
    },
    {
      label: "Japanese Law Translation - Nationality Act (official)",
      url: "https://www.japaneselawtranslation.go.jp/en/laws/view/3784/en",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Japan does not permit dual citizenship for adults; existing citizenships must be renounced. Japanese-language and stable-livelihood requirements apply.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: true, level: "Roughly N3 Japanese (informal assessment)" },
    knowledgeTest: { required: false },
  },
});

export const southKoreaMarriage = marriagePath({
  id: "kr-marriage",
  country: "South Korea",
  countryCode: "KR",
  flag: "🇰🇷",
  residencyYears: 2,
  notes:
    "Spouses of Korean citizens can naturalize after 2 years of marriage + residence in Korea (or 3 years marriage + 1 year residence).",
  links: [
    {
      label: "Korean Nationality Act (Art. 6(2)) - National Law Information Center",
      url: "https://www.law.go.kr/LSW/eng/engLsSc.do?menuId=2&query=Nationality+Act",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Marriage-based naturalization permits dual citizenship under a non-renunciation oath. Korean-language and integration tests apply.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: true, level: "Korean integration test (KIIP) or TOPIK" },
    knowledgeTest: { required: true, note: "KIIP integration program / written test." },
    singleSource: "government",
  },
});

export const israelMarriage = marriagePath({
  id: "il-marriage",
  country: "Israel",
  countryCode: "IL",
  flag: "🇮🇱",
  residencyYears: 5,
  notes:
    "Non-Jewish spouses of Israeli citizens go through a graduated procedure of about 4.5 years of staggered status under Citizenship Law §7 before discretionary naturalization. Jewish spouses use the Law of Return path instead.",
  links: [
    {
      label: "Population and Immigration Authority - Getting citizenship",
      url: "https://www.gov.il/en/departments/topics/getting-citizenship",
    },
    {
      label: "Israeli Nationality Law 5712-1952 (text) - UNHCR Refworld",
      url: "https://www.refworld.org/docid/3ae6b4ec0.html",
    },
  ],
  practical: {
    successSignal: "moderate",
    successNote:
      "Discretionary multi-stage process under Citizenship Law 1952 §7, administered by Misrad HaPnim. Background and security checks; Hebrew expected at the final stage.",
    lawyerTypicallyNeeded: "recommended",
    languageTest: { required: true, level: "Working Hebrew" },
    knowledgeTest: { required: false },
  },
});

export const germanyMarriage = marriagePath({
  id: "de-marriage",
  country: "Germany",
  countryCode: "DE",
  flag: "🇩🇪",
  residencyYears: 3,
  notes: "3 years of legal residence + 2+ years of marriage. B1 German required.",
  links: [
    {
      label: "Bundesverwaltungsamt - Citizenship",
      url: "https://www.bva.bund.de/EN/Services/Citizens/ID-Documents-Law/Citizenship/citizenship_node.html",
    },
    {
      label: "German Nationality Act (StAG) - gesetze-im-internet.de",
      url: "https://www.gesetze-im-internet.de/englisch_stag/englisch_stag.html",
    },
  ],
  practical: {
    successSignal: "high",
    successNote:
      "B1 German + Einbürgerungstest civics test required. Post-2024 reform allows dual citizenship in most cases.",
    lawyerTypicallyNeeded: "optional",
    languageTest: { required: true, level: "B1 German" },
    knowledgeTest: { required: true, note: "Einbürgerungstest: 33-question multiple choice on history, society, and law." },
  },
});
