import express from 'express';
import { methods as characterController } from '../controllers/characterController.js';

const router = express.Router();

router
  .route('/')
  .get(characterController.getAllCharacters)
  .post(characterController.createCharacter);
router
  .route('/:id')
  .get(characterController.getCharacter)
  .patch(characterController.updateCharacter)
  .delete(characterController.deleteCharacter);

export default router;
