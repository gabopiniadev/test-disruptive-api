import { Response } from 'express';

export const handleControllerError = (
    error: unknown,
    res: Response,
    defaultMessage: string
): void => {
    if (typeof error === 'object' && error !== null && 'message' in error) {
        res.status(500).json({
            error: defaultMessage,
            details: (error as { message: string }).message,
        });
        return;
    }
    res.status(500).json({
        error: defaultMessage,
        details: 'Unknown error',
    });
};
