import express from 'express';
import morgan from 'morgan';
import characterRouter from './routes/characterRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// 1) MIDDLLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/api/v1/characters', characterRouter);
app.use('/api/v1/users', userRouter);

export default app;
