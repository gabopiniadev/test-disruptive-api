import { Request, Response } from 'express';
import { checkPaymentStatusService, createPaymentService } from "../service/paymentService";
import {handleControllerError} from "../exceptions/handleControllerError";

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fundsGoal } = req.body;

        if (!fundsGoal) {
            res.status(400).json({ error: 'You need to specify the amount (fundsGoal).' });
            return;
        }

        const paymentData = await createPaymentService(fundsGoal);
        res.json(paymentData);
    } catch (error) {
        handleControllerError(error, res, 'Error generating the payment QR');
    }
};

export const checkPaymentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { address } = req.params;

        if (!address) {
            res.status(400).json({ error: 'The wallet address is required.' });
            return;
        }

        const status = await checkPaymentStatusService(address);
        console.log("Status de pago:", status);
        res.json(status);
    } catch (error) {
        handleControllerError(error, res, 'Failed to check payment status');
    }
};
