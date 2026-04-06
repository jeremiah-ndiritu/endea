import { faker } from "@faker-js/faker";
type EmailOptions = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  provideR?: string | undefined;
  allowSpecialCharacters?: boolean | undefined;
};
// Map common field names to Faker methods
const strategyMap: Record<string, () => any> = {
  email: (options?: EmailOptions) => faker.internet.email(options),
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
