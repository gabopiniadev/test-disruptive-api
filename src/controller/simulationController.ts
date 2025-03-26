import { Request, Response } from 'express';
import { simulateEarnings } from "../service/simulatorService";

export const simulatorController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { capital, duration, type } = req.body;

        if (!capital || !duration || !type) {
            res.status(400).json({ error: 'Por favor, completa todos los campos.' });
            return;
        }

        const result = simulateEarnings(Number(capital), Number(duration), type);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al calcular la simulación.' });
    }
};
