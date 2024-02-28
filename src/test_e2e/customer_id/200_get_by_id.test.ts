import request from "supertest";
import { app, pool } from "../../app";
afterAll(() => {
	pool.end();
});

test("GET customers by iD", async () => {
	const response = await request(app).get("/customers/1");

	expect(response.status).toBe(200);

	const data: Array<{ id: number }> = response.body.result;

	expect(data.every(({ id }) => id === 1)).toBe(true);

	expect(data.length === 1).toBe(true);
});
test("should return empty result if customer is not found", async () => {
	const response = await request(app).get("/customers/70");

	expect(response.status).toBe(200);

	expect(response.body.result).toEqual([]);
});
