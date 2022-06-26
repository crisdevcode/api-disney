import express from 'express';
import { methods as characterController } from '../controllers/characterController.js';
import { methods as authController } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(authController.protect, characterController.getAllCharacters)
  .post(characterController.createCharacter);
router
  .route('/:id')
  .get(characterController.getCharacterMovies, characterController.getCharacter)
  .patch(characterController.updateCharacter)
  .delete(characterController.deleteCharacter);

export default router;
