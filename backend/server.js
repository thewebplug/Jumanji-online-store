import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paystack/publicKey', (req, res) => {
  res.send({publicKey: config.PAYSTACK_PUBLIC_KEY});
});
app.get('/api/paystack/secretKey', (req, res) => {
  res.send({secretKey: config.PAYSTACK_SECRET_KEY});
});
app.use('/uploads', express.static('uploads'));
app.use(express.static('frontend'));
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(config.PORT, () => {
  console.log('serve at http://localhost:5000');
});
