import { primitives } from "schemagenerator";
import { FieldDescription, Schema } from "types/schema";
import { generateObjectSchema } from "utils/schema/object.sch";

function getArrayType(arr: any[]): string {
  if (arr.length === 0) return "array<any>";

  const first = arr[0];

  if (Array.isArray(first)) return "array<array>";
  if (first === null) return "array<null>";
  if (typeof first === "object") return "array<object>";

  return `array<${typeof first}>`;
}

export function generateArraySchema(arr: any[]): Schema {
  if (arr.length === 0) {
    return [
      {
        name: "items",
        type: "array<any>",
        desc: "Empty array",
      },
    ];
  }

  const firstItem = arr[0];
  const type = getArrayType(arr);

  // 🔥 Fix: Create a proper FieldDescription object
  const base: FieldDescription = {
    name: "items",
    type: type,
    desc: `Array of ${type.split("<")[1].replace(">", "")}`,
  };

  // 🔥 Array of objects or nested arrays → assign to children
  if (typeof firstItem === "object" && firstItem !== null) {
    // If it's an array of objects, the children define what's INSIDE the array
    base.children = Array.isArray(firstItem)
      ? generateArraySchema(firstItem)
      : generateObjectSchema(firstItem);
  } else if (primitives.includes(typeof firstItem as any)) {
    return [{ name: "prm", type, desc: `Primitive item for array` }];
  }
  if (base.children) {
    return [
      {
        ...base,
        children: base?.children.map((c) => c),
      },
    ];
  }
  return [base]
}
