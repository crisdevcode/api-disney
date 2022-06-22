import Character from '../Models/CharacterModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// GET
const getAllCharacters = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY: Filter
  const features = new APIFeatures(Character, req.query, ['image', 'name']);
  const characters = await features.filter();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: characters.length,
    data: {
      characters,
    },
  });
});

// GET
const getCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const character = await Character.findOne({
    where: {
      id,
    },
  });

  if (!character) {
    return next(new AppError('No character found with that ID', 404));
  }

  res.status(200).json({
    data: {
      character,
    },
  });
});

// POST
const createCharacter = catchAsync(async (req, res, next) => {
  const { image, name, age, weight, story } = req.body;
  const newCharacter = await Character.create({
    image,
    name,
    age,
    weight,
    story,
  });
  res.status(201).json({
    status: 'success',
    data: {
      character: newCharacter,
    },
  });
});

// UPDATE
const updateCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { image, name, age, weight, story } = req.body;

  const character = await Character.findByPk(id);

  if (!character) {
    return next(new AppError('No character found with that ID', 404));
  }

  character.set({
    image,
    name,
    age,
    weight,
    story,
  });

  await character.save();

  res.status(201).json({
    status: 'success',
    data: {
      character,
    },
  });
});
// DELETE
const deleteCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const character = await Character.destroy({
    where: {
      id,
    },
  });

  if (!character) {
    return next(new AppError('No character found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// eslint-disable-next-line import/prefer-default-export
export const methods = {
  getAllCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
