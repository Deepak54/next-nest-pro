import { Factory } from "fishery";
import { faker } from "@faker-js/faker";

type UserAttrs = { name: string; email: string; password: string; roles?: string[] };

export const UserFactory = Factory.define<UserAttrs>(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: "Str0ng!Pass1",
  roles: ["admin"],
}));
