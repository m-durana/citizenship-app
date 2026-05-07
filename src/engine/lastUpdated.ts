import { allPaths } from "../data/countries/_registry";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function latestISO(): string {
  return allPaths
    .map((p) => p.lastReviewed)
    .filter(Boolean)
    .sort()
    .at(-1) ?? "";
}

export const LAST_UPDATED: string = (() => {
  const iso = latestISO();
  if (!iso) return "-";
  const [y, m] = iso.split("-");
  const monthIdx = Number(m) - 1;
  if (Number.isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) return iso;
  return `${MONTHS[monthIdx]} ${y}`;
})();
