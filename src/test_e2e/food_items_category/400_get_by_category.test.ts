import request from "supertest";
import { app, pool } from "../../app";

afterAll(() => {
	pool.end();
});

test("should return bad request for a non-existing category", async () => {
	const response = await request(app)
		.get("/foods/nonexistent_category")
		.expect("Content-Type", /json/)
		.expect(400);
	const { message }: { message: string } = response.body.errors[0];

	expect(response.status).toBe(400);
	expect(message).toContain("No data found for the specified category");
});

test("should return bad request for a category with numeric value", async () => {
	const response = await request(app)
		.get("/foods/123")
		.expect("Content-Type", /json/)
		.expect(400);
	const { message }: { message: string } = response.body.errors[0];

	expect(response.status).toBe(400);
	expect(message).toContain("No data found for the specified category");
});

// test("should return not found for non-existent category", async () => {
// 	const response = await request(app).get("/foods/123");
// 	expect(response.status).toBe(404);
// 	expect(response.body.message).toBe("No data found for the specified category");
// });
