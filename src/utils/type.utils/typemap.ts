import type { Schema, FieldDescription } from "types/schema";

export function schemaFromEntypeResult(typeMap: Record<string, any>): Schema {
  const schema: Schema = [];

  for (const key in typeMap) {
    const value = typeMap[key];

    if (typeof value === "string") {
      // Primitive type
      schema.push({
        name: key,
        type: value,
        desc: `Auto-generated description for ${key}`,
      });
    } else if (Array.isArray(value)) {
      // Array type
      let children: FieldDescription[] | undefined;

      if (value.length === 0) {
        // Empty array: cannot infer type
        children = undefined;
      } else if (typeof value[0] === "string") {
        // Array of primitives
        children = [
          {
            name: "item",
            type: value[0],
            desc: `Array item of ${key}`,
          },
        ];
      } else if (typeof value[0] === "object") {
        // Array of objects → recurse
        children = schemaFromEntypeResult(value[0]);
      }

      schema.push({
        name: key,
        type: "array",
        desc: `Array of ${key}`,
        children,
      });
    } else if (typeof value === "object" && value !== null) {
      // Nested object
      schema.push({
        name: key,
        type: "object",
        desc: `Nested object for ${key}`,
        children: schemaFromEntypeResult(value),
      });
    } else {
      // Fallback
      schema.push({
        name: key,
        type: typeof value,
        desc: `Unknown type for ${key}`,
      });
    }
  }

  return schema;
}
