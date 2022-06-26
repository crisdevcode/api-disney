import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';

import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';
import characterRouter from './routes/characterRoutes.js';
import movieRouter from './routes/movieRoutes.js';
import userRouter from './routes/userRoutes.js';
import genreRouter from './routes/genreRoutes.js';

const app = express();

app.set('view engine', 'pug');

// app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/api/v1/characters', characterRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/genres', genreRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
