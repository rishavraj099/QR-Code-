import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import webRoutes from './routes/webRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import { generateQRCode } from './services/qrService.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>
    console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', webRoutes);

app.use('/api/qr', qrRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});



