import {Router} from "express";
import {generateQR, getQR, getAllQR, deleteQR } from '../controllers/qrController.js';
const router = Router();

router.post('/generate', generateQR);
router.get('/:id', getQR);


export default router;  