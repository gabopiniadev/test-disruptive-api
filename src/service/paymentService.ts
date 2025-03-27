import axios from 'axios';
import { generateQRCode } from "../utils/qrGeneratorCode";

const API_URL = 'https://my.disruptivepayments.io/api';
const CLIENT_API = 'o0z8y85rjdx28iqef32f4mrl6e56b71742437588342';

export const createPaymentService = async (fundsGoal: number) => {
    try {
        console.log('Iniciando solicitud a la API externa', { fundsGoal });

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

        console.log('Respuesta de la API externa:', response.data);

        const { address, network } = response.data.data;
        if (!address) {
            throw new Error('API externa no devolvió la dirección del pago (address)');
        }

        console.log('Generando QR para la dirección:', address);

        const qrCode = await generateQRCode(address);

        return {
            qrCode,
            address,
            network,
            fundsGoal,
        };
    } catch (error: any) {
        console.error('Error en createPaymentService:', error?.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || `Error creando el pago: ${error.message || 'Error desconocido'}`
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
