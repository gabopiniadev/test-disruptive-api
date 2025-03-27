import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import simulatorRoutes from './routes/simulatorRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use('/api/simulations', simulatorRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server run in http://localhost:${PORT}`);
});
