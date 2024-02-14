import { isBoom } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (isBoom(err)) {
		res.status(err.output.statusCode).send({ errors: [{ message: err.message }] });
	} else {
		res.status(500).send({ errors: [{ message: "Something went wrong" }] });
	}
};

export default errorHandler;
