import express from 'express';
import { methods as genreController } from '../controllers/genreController.js';

const router = express.Router();

router
  .route('/')
  .get(genreController.getAllGenres)
  .post(genreController.createGenre);

export default router;
