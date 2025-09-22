import request from "supertest";
import { UserFactory } from "./factories/user.factory";

const BASE = process.env.API_URL ?? "http://localhost:4000";

describe("Auth (e2e)", () => {
  const u = UserFactory.build();

  it("register -> login -> me -> refresh -> logout", async () => {
    // register
    let r = await request(BASE).post("/auth/register").send(u);
    expect([200,201]).toContain(r.status);

    // login
    r = await request(BASE).post("/auth/login").send({ email: u.email, password: u.password });
    expect(r.status).toBe(200);
    const access = r.body.accessToken;
    expect(access).toBeTruthy();
    const cookies = r.headers["set-cookie"];
    expect(cookies?.some((c: string) => c.startsWith("rt="))).toBe(true);

    // me
    r = await request(BASE).get("/auth/me").set("Authorization", `Bearer ${access}`);
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.roles)).toBe(true);

    // refresh (usa cookie)
    const agent = request.agent(BASE);
    await agent.post("/auth/login").send({ email: u.email, password: u.password });
    r = await agent.post("/auth/refresh").send();
    expect(r.status).toBe(200);
    expect(r.body.accessToken).toBeTruthy();

    // logout
    r = await agent.post("/auth/logout").send();
    expect(r.status).toBe(200);
  });
});
