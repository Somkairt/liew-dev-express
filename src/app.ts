import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createPool } from "mysql2/promise";
import ServerlessHttp from "serverless-http";
import errorHandler from "./middlewares/errors";
<<<<<<< HEAD
import customersRouter from "./routes/customers";
=======

import CustomersIdRouter from "./routes/CustomersId";
>>>>>>> feature/liew/get_customer
import foodRouter from "./routes/foods";

export const app = express();

app.use(bodyParser.json());

app.use(cors());

export const handler = ServerlessHttp(app);

export const pool = createPool({
	connectionLimit: 1,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

app.get("/", (req, res) => {
	res.status(200).json({
		status: "OK",
		request: { params: req.params, query: req.query, body: req.body },
	});
});

app.use(foodRouter);
<<<<<<< HEAD
app.use(customersRouter);
=======
app.use(CustomersIdRouter);
>>>>>>> feature/liew/get_customer
app.use(errorHandler);
