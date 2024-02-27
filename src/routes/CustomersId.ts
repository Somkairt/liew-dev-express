import { badRequest } from "@hapi/boom";
import { Router } from "express";
import { z } from "zod";
import { pool } from "../app";

const router = Router();

router.get(
	"/customers/:id",
	(req, _res, next) => {
		const schema = z.object({
			id: z.coerce.number(),
		});

		const validateSchemResult = schema.safeParse(req.params);
		if (validateSchemResult.success) {
			next();
		} else {
			next(badRequest(validateSchemResult.error));
		}
	},
	async (req, res, next) => {
		try {
			const connection = await pool.getConnection();

			try {
				const result = await connection.query(
					`SELECT * FROM customers WHERE customers.id = "${req.params.id}";`,
				);
				res.json({ result: result[0] });
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
