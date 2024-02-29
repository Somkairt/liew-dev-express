import request from "supertest";
import { app, pool } from "../../app";
afterAll(() => {
	pool.end();
});

test("should create fooditems success 40 item", async () => {
	const response = await request(app).get("/foods").expect("Content-Type", /json/).expect(200);

	expect(response.body.result.length === 40).toBe(true);
});
