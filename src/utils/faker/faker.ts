import { faker, Sex } from "@faker-js/faker";
type PNP = "full" | "first" | "last" | "middle";
export function getPersonName(options?: { nametype?: PNP; sex?: Sex }) {
  let name = "";
  switch (options?.nametype) {
    case "first":
      name += faker.person.firstName(options.sex);
      break;
    case "full":
      name += faker.person.fullName({ sex: options.sex });
      break;
    case "last":
      name += faker.person.lastName(options.sex);
      break;
    case "middle":
      name += faker.person.middleName(options.sex);
      break;
    default:
      name += faker.person.fullName({ sex: options?.sex });
      break;
  }

  console.log(`faker.person['fullName']() :>> `, name);
  return name;
}
getPersonName();

// Map common field names to Faker methods
const strategyMap: Record<string, () => any> = {
  email: () => faker.internet.email(),
  username: () => faker.internet.username(),
  avatarurl: () => faker.image.avatar(),
  image: () => faker.image.url(),
  street: () => faker.location.streetAddress(),
  city: () => faker.location.city(),
  country: () => faker.location.country(),
  zipcode: () => faker.location.zipCode(),
  phone: () => faker.phone.number(),
  id: () => faker.string.uuid(),
  uuid: () => faker.string.uuid(),
  description: () => faker.lorem.sentence(),
  website: () => faker.internet.url(),
};

export function getSemanticValue(
  fieldName: string,
  type: string,
  index: number,
): any {
  const lowerName = fieldName.toLowerCase();

  // 1. Handle Names (Your existing logic + extra checks)
  if (
    (lowerName.includes("name") || lowerName === "fullname") &&
    lowerName !== "username"
  ) {
    return faker.person.fullName();
  }

  // 2. Exact Match from Strategy Map
  if (strategyMap[lowerName]) {
    return strategyMap[lowerName]();
  }

  // 3. Partial Matches (e.g., "userEmail", "homeAddress")
  for (const [key, generator] of Object.entries(strategyMap)) {
    if (lowerName.includes(key)) return generator();
  }

  // Inside getSemanticValue...
  if (type === "boolean") return faker.datatype.boolean();
  if (lowerName.includes("date") || lowerName.includes("at")) {
    return faker.date.recent().toISOString();
  }

  // 4. Fallback to your original "Mock-..." logic
  return type === "string" ? `${fieldName}-${index + 1}` : index + 1;
}
