import QRCode from 'qrcode';

export const generateQRCode = async (data: string) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        throw new Error('Error generating QR code');
    }
};
