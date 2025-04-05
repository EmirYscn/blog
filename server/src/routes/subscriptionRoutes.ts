import express from "express";

import * as subscribtionController from "../controllers/subscriptionController";

const router = express.Router();

router.post("/", subscribtionController.subscribe);

export { router };
