import request from "supertest";
import { app, pool } from "../../app";

afterAll(() => {
	pool.end();
});

test("should return food items for a valid category", async () => {
	const response = await request(app)
		.get("/foods/tea")
		.expect("Content-Type", /json/)
		.expect(200);

	expect(response.status).toBe(400);
	expect(Array.isArray(response.body.result)).toBeTruthy();
});
