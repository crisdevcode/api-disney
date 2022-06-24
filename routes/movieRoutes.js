import express from 'express';
import { methods as movieController } from '../controllers/movieController.js';

const router = express.Router();

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);
router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

export default router;
