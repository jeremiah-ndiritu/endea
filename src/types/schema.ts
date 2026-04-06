export type FieldDescription = {
  name: string;
  type: string;
  desc?: string;
  children?: FieldDescription[]; // This allows nesting!
};

export type Schema = FieldDescription[];
