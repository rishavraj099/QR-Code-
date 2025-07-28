import express from 'express';
import {generateQRCode} from "../services/qrService.js";
import {getAllQR, deleteQR} from "../controllers/qrController.js";

const router = express.Router();

// Render the form
router.get('/', (req, res) => {
  res.render('index', { error: null });
});

// Handle form submission
router.post('/generate', async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.render('index', { error: 'Please enter some data.' });
  }
  try {
    const qrDoc = await generateQRCode(data);
    res.render('qr', { qrImage: qrDoc.qrImage, data: qrDoc.data });
  } catch (err) {
    res.render('index', { error: 'Error generating QR code.' });
  }
});

// List all QR codes (tabular view)
router.get('/list', getAllQR);

// Delete QR code (from list)
router.post('/delete/:id', deleteQR);

export default router;