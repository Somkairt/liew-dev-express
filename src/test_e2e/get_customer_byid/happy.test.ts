import request from "supertest";
import { app, pool } from "../../app";
afterEach(() => {
	pool.end();
});

test("GET customers by iD", async () => {
	const res = await request(app).get("/customers/1").expect("Content-Type", /json/).expect(200);
	const data: Array<{ id: number }> = res.body.result;

	//match id
	expect(data.every(({ id }) => id === 1)).toBe(true);
	//unique
	expect(data.length === 1).toBe(true);
});
