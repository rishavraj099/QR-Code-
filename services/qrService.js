import QRCode from 'qrcode';

import  QRCodeModel from '../models/qrModel.js';

export const generateQRCode = async (data) =>{
    const qrImage = await QRCode.toDataURL(data);
    const qrDoc = new QRCodeModel({data, qrImage});
        await qrDoc.save();
        return qrDoc;    
};

export const getQRCodeById = async (id) =>{
    return await QRCodeModel.findById(id);
};