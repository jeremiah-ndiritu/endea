const exampleUser = {
  name: "Jeremiah",
  age: 20,
  email: "a@b.com",
  address: { city: "Nairobi", zip: 10100 },
  family: {
    nuclear: {
      father: "",
      mother: { mname: "", kids: [{ kname: "", kage: 2 }] },
      sister: "",
    },
  },
};

type TypeOf<T> = T extends string
  ? "string"
  : T extends number
    ? "number"
    : T extends boolean
      ? "boolean"
      : T extends null
        ? "null"
        : T extends undefined
          ? "undefined"
          : T extends any[]
            ? TypeOf<T[number]>[]
            : T extends object
              ? { [K in keyof T]: TypeOf<T[K]> }
              : "unknown";

function type<T>(obj: T): TypeOf<T> {
  if (obj === null) return "null" as TypeOf<T>;

  if (typeof obj !== "object") {
    return typeof obj as TypeOf<T>;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return [] as unknown as TypeOf<T>;
    return [type(obj[0])] as unknown as TypeOf<T>; // infer from first element
  }

  const result: any = {};

  for (const key in obj) {
    result[key] = type((obj as any)[key]);
  }

  return result;
}

const su = exampleUser; // {name: "jere", age: 30, ac: [{p: "", n:''}]};
console.dir(type(su), { depth: null, showHidden: true });

