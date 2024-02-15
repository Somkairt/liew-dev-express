import request from "supertest";
import { app, pool } from "../../app";

afterEach(() => {
	pool.end();
});

test("GET customers and reject status 400", async () => {
	const response = await request(app)
		.get("/customers/xxx")
		.expect("Content-Type", /json/)
		.expect(400);

	const { message }: { message: string } = response.body.errors[0];

	expect(response.status).toBe(400);
	expect(message).toContain("Expected number");
});
