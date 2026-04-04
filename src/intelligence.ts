import { MockOptions } from ".";
import { Schema } from "types/schema";

export function intelligenceProcess<ST>(
  schema: Schema,
  options?: MockOptions,
): ST[] {
  const count = options?.count || 20;
  const result: ST[] = [];

  const generateMockRow = (currentSchema: Schema, index: number): any => {
    // 1. BASE CASE: If schema is empty
    if (!currentSchema || currentSchema.length === 0) return null;

    // 2. PRIMITIVE
    if (
      currentSchema.length === 1 &&
      (!currentSchema[0].children || currentSchema[0].children.length === 0)
    ) {
      // If there's only one field and it's NOT an object/array, return the value directly
      const field = currentSchema[0];
      if (field.type === "number") return index + 1;
      if (field.type === "string") return `Mock-${field.name}-${index + 1}`;
      return null;
    }
    // 3. TOP-LEVEL ARRAY CHECK
    // If the schema is just one field named "items" of type "array",
    if (
      currentSchema.length === 1 &&
      currentSchema[0].name === "items" &&
      currentSchema[0].type.startsWith("array")
    ) {
      const field = currentSchema[0];
      const r = generateMockRow(field.children || [], index);
      return [r];
    }

    // 4. OBJECT LOGIC
    // If we have multiple fields, or a single field that clearly acts as a key
    let row: any = {};
    let hasKeys = false;

    currentSchema.forEach((field) => {
      hasKeys = true;
      if (field.children && field.children.length > 0) {
        if (field.type.startsWith("array")) {
          row[field.name] = [generateMockRow(field.children, index)];
        } else {
          row[field.name] = generateMockRow(field.children, index);
        }
      } else {
        // Assign primitive to the key
        if (field.type === "number") row[field.name] = index + 1;
        else if (field.type === "string")
          row[field.name] = `${field.name}-${index + 1}`;
        else row[field.name] = null;
      }
    });

    return hasKeys ? row : null;
  };;;

  for (let i = 0; i < count; i++) {
    const mocked = generateMockRow(schema, i);
    result.push(mocked as ST);
  }

  return result;
}
