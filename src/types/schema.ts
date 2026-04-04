export type FieldDescription = {
  name: string;
  type: string // "string" | "number" | "boolean" | "object" | "array" | "null"; // Specific types are better
  desc?: string;
  children?: FieldDescription[]; // This allows nesting!
};

export type Schema = FieldDescription[];
