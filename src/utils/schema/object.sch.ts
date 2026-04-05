import { FieldDescription, Schema } from "index";
import { generateSchema } from "schemagenerator";
import { generateSmartDesc } from "utils/ai/description";
import { generateArraySchema } from "./array.sch";
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
export function generateObjectSchema(obj: any): Schema {
  return Object.keys(obj).map((key) => {
    const value = obj[key];

    const base: FieldDescription = {
      name: key,
      type: getType(value),
      desc: generateSmartDesc(key, value),
    };

    // 🔥 recursive schema for nested objects
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return {...base, children: generateObjectSchema(value)};
    }

    // 🔥 handle arrays of objects
    if (Array.isArray(value)) {
      return {...base, children: generateArraySchema(value)};
    }

    return base;
  });
}
