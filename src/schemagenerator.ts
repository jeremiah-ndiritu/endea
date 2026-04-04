import { Schema } from "types/schema";
import { generateObjectSchema } from "./utils/schema/object.sch";
import { generateArraySchema } from "utils/schema/array.sch";

export  const primitives = ["string", "number", "boolean", "undefined"] as const;

export function generateSchema(obj: any): Schema {
 

  const type = typeof obj;

  // Handle null
  if (obj === null) {
    return [
      {
        name: "value",
        type: "null",
        desc: "Auto-generated description",
      },
    ];
  }

  // Handle primitives
  if (primitives.includes(type as any)) {
    
    return [
      {
        name: "value",
        type,
        desc: `Auto-generated description for ${type}`,
      },
    ];
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return generateArraySchema(obj);
  }

  // Handle objects
  if (type === "object") {
    return generateObjectSchema(obj)
  }

  // Fallback
  return [
    {
      name: "value",
      type,
      desc: `Auto-generated description`,
    },
  ];
}