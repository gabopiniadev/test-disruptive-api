import axios from 'axios';
import { generateQRCode } from "../utils/qrGeneratorCode";

const API_URL = 'https://my.disruptivepayments.io/api';
const CLIENT_API = 'o0z8y85rjdx28iqef32f4mrl6e56b71742437588342';

export const createPaymentService = async (fundsGoal: number) => {
    try {
        const response = await axios.post(
            `${API_URL}/payments/create`,
            {
                network: 'BSC',
                fundsGoal,
                smartContractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            },
            {
                headers: {
                    Authorization: `Bearer ${CLIENT_API}`,
                },
            }
        );

        const { address, network } = response.data.data;
        const qrCode = await generateQRCode(address);

        return {
            qrCode,
            address,
            network,
            fundsGoal,
        };
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || `Error creating payment: ${error.message || 'Unknown error'}`
        );
    }
};

export const checkPaymentStatusService = async (address: string) => {
    try {
        const response = await axios.get(`${API_URL}/payments/status/${address}`, {
            headers: { Authorization: `Bearer ${CLIENT_API}` },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || `Failed to check payment status: ${error.message || 'Unknown error'}`
        );
    }
};
