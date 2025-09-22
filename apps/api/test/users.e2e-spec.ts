import request from "supertest";
import { UserFactory } from "./factories/user.factory";

const BASE = process.env.API_URL ?? "http://localhost:4000";

describe("Users (e2e)", () => {
  let token = "";

  beforeAll(async () => {
    const u = UserFactory.build({ roles: ["admin"] });
    await request(BASE).post("/auth/register").send(u);
    const r = await request(BASE).post("/auth/login").send({ email: u.email, password: u.password });
    token = r.body.accessToken;
  });

  it("GET /users (admin)", async () => {
    const r = await request(BASE).get("/users").set("Authorization", `Bearer ${token}`);
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
});
