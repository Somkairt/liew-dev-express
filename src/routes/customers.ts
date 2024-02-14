import { badRequest } from "@hapi/boom";
import { Router } from "express";
import { z } from "zod";
import { pool } from "../app";

const router = Router();

router.get(
	"/customers/:id",
	(req, res, next) => {
		console.log("-------------");
		const schema = z.object({
			id: z.coerce.number(),
		});
		const { success } = schema.safeParse(req.params);
		if (success) {
			next();
		} else {
			next(badRequest());
		}
	},
	async (_req, res, next) => {
		console.log("*****___*******");
		try {
			const connection = await pool.getConnection();

			try {
				const result = await connection.query(
					"SELECT * FROM customers WHERE customers.id;",
				);
				res.json({ result });
			} catch (error) {
				next(error);
			} finally {
				connection.release();
			}
		} catch (error) {
			next(error);
		}
	}, //
);

export default router;
