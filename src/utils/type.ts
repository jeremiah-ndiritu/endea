
export function getType(value: any): string {
  if (value === null) return "null";

  if (Array.isArray(value)) {
    if (value.length === 0) return "array<any>";
    return `array<${getType(value[0])}>`;
  }

  if (value instanceof Date) return "date";

  if (typeof value === "object") return "object";

  return typeof value;
}