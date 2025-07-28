import {generateQRCode, getQRCodeById} from '../services/qrService.js';
import QRCodeModel from '../models/qrModel.js';

export const generateQR = async(req, res, next) => {
    const { data} = req.body;
    if (!data) 
        return res.status(400).json({error: "no data provided"});
     try{
        const qrDoc = await generateQRCode(data);
        res.status(201).json({id: qrDoc._id, data: qrDoc.data , qrImage: qrDoc.qrImage });

     }catch (err){
        next(err);
    }
};

export const getQR = async(req,res,next) =>{
    try{
        const qrDoc = await getQRCodeById(req.params.id);
        if(!qrDoc) return res.status(404).json({error: "QR Code not found"});
        res.json(qrDoc);

    }
    catch (err){
        next (err);
    }
}


export const getAllQR =  async(req, res, next) =>{
    try{
    const qrCodes = await QRCodeModel.find().sort({createdAt: -1});
    res.render('list',{qrCodes });
    } catch (err){
        next(err);
    }
}

export const deleteQR = async(req,res, next) =>{
    try{
        const qrCodes = await QRCodeModel.findByIdAndDelete(req.params.id);
        if(!qrCodes) return res.status(404).json({error: "QR Code not found"});
        res.redirect('/list');

    } catch(err){
        next(err);
    }

};