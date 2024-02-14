import request from "supertest";
import { app, pool } from "../../app";
afterEach(() => {
	pool.end();
});

test("GET customers and reject status 400", async () => {
	await request(app).get("/customers/xxx").expect("Content-Type", /json/).expect(400);
});
