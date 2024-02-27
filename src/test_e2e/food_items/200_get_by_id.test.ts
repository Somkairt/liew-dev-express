import request from "supertest";
import { app, pool } from "../../app";
afterEach(() => {
	pool.end();
});

test("should create fooditems success 40 item", async () => {
	const response = await request(app).get("/foods").expect("Content-Type", /json/).expect(200);

	expect(response.body.result.length).toBe(40);
});
