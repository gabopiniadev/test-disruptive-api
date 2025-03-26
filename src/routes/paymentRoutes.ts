import express from 'express';
import {checkPaymentStatus, createPayment} from "../controller/paymentController";

const router = express.Router();

router.post('/create', createPayment);
router.get('/status/:address', checkPaymentStatus);

export default router;
