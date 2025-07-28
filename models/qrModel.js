import mongoose from 'mongoose';
// models/qrModel.js
const qrSchema = new mongoose.Schema({
    data:{
        type: String,
        required: true,
    },
    qrImage: {        
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }

});

const QRCode = mongoose.model('QRCode', qrSchema);
export default QRCode;