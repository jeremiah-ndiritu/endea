import { intelligenceProcess } from "./intelligence";
import { generateSchema } from "./schemagenerator";

export type MockOptions = {
  count?: number;
  errorRate?: number;
  latency?: number;
};
// Generic mock function
export default async function endea<T>(
  obj: T,
  options?: MockOptions,
): Promise<T[]> {
  const delay = options?.latency || 200;
  const schema = generateSchema(obj);
  const enhancedData = intelligenceProcess<T>(schema, options);
  //console.log(`[Package::endea] enhanced data: `, enhancedData)

  await new Promise((r) => setTimeout(r, delay));
  return [obj, ...enhancedData];
}
type User = {
  name: string;
  age: number;
  city: { loc: string; address: string };
};

// (async () => {
//   const string = await endea<string>("Samuel");
//   console.log("string :>> ", string);
//   const number = await endea<number>(45);
//   console.log("number :>> ", number);
//   const object = await endea<User>({
//     name: "Samuel",
//     age: 21,
//     city: { loc: "Kutus", address: "10304" },
//   });
//   console.log("object :>> ", object);
//   const array = await endea<{ lan: string; code: number }[]>([
//     { lan: "en", code: 3 },
//   ], );
//   console.log("array :>> ", array);
// })();

// Type helper for users
export { endea };
export { intelligenceProcess, generateSchema };
export type { Schema, FieldDescription } from "types/schema";
export { entype, urlschema, type TypeOf } from "utils/type.utils/entype";
