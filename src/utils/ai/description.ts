export function generateSmartDesc(key: string, value: any): string {
  const lower = key.toLowerCase();

  if (lower.includes("name")) return "A human-readable name";
  if (lower.includes("age")) return "Age in years";
  if (lower.includes("email")) return "User email address";
  if (lower.includes("id")) return "Unique identifier";

  if (typeof value === "number") return "Numeric value";
  if (typeof value === "boolean") return "True or false value";

  return `Field representing ${key}`;
}
