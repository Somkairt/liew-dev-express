import { badRequest } from "@hapi/boom";
import { Router } from "express";
import { z } from "zod";
import { pool } from "../app";

const router = Router();

router.get(
	"/foods",
	(req, _res, next) => {
		const schema = z.object({});
		const { success } = schema.safeParse(req);
		if (success) {
			next();
		} else {
			next(badRequest());
		}
	},
	async (_req, res, next) => {
		try {
			const connection = await pool.getConnection();

			try {
				const result = await connection.query("SELECT * FROM food_items;");
				res.json({ result: result[0] });
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
