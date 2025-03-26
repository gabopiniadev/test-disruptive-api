import express from 'express';
import { simulatorController } from "../controller/simulationController";

const router = express.Router();

router.post('/calculate', simulatorController);

export default router;
