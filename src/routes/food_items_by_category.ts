import { badRequest } from "@hapi/boom";
import { Router } from "express";
import { z } from "zod";
import { pool } from "../app";

const router = Router();

const categorySchema = z.string();

router.get(
	"/foods/:category",
	async (req, res, next) => {
		const { category } = req.params;

		const validationResult = categorySchema.safeParse(category);

		if (validationResult.success) {
			next();
		} else {
			next(badRequest("Invalid category parameter"));
		}
	},
	async (req, res, next) => {
		try {
			const { category } = req.params;

			const connection = await pool.getConnection();

			try {
				// Query food items based on the specified category
				const [result] = await connection.query(
					"SELECT * FROM food_items WHERE category = ?;",
					[category],
				);

				if (Array.isArray(result)) {
					if (result.length === 0) {
						next(badRequest("No data found for the specified category"));
					} else {
						res.json({ result });
					}
				} else {
					next(badRequest("Invalid data format returned from database"));
				}
			} catch (error) {
				next(error);
			} finally {
				connection.release();
			}
		} catch (error) {
			next(error);
		}
	},
);

export default router;
