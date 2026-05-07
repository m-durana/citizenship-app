export type Country = { code: string; name: string; flag: string };

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "LV", name: "Latvia", flag: "🇱🇻" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "CZ", name: "Czechia", flag: "🇨🇿" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "OTHER", name: "Other / not listed", flag: "🌍" },
];

export const COUNTRY_BY_CODE: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
);

export function countryName(code?: string): string {
  if (!code) return "-";
  return COUNTRY_BY_CODE[code]?.name ?? code;
}
