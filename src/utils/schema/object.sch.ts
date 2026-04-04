import { FieldDescription, Schema } from "index";
import { generateSchema } from "schemagenerator";
import { generateSmartDesc } from "utils/ai/description";
import { getType } from "utils/type";
import { generateArraySchema } from "./array.sch";

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
