import Character from '../Models/CharacterModel.js';

// GET
const getAllCharacters = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not yet defined!',
  });
};

// GET
const getCharacter = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not yet defined!',
  });
};

// POST
const createCharacter = async (req, res) => {
  const { image, name, age, weight, story } = req.body;
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

// UPDATE
const updateCharacter = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not yet defined!',
  });
};

// DELETE
const deleteCharacter = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'This route is not yet defined!',
    data: null,
  });
};

// eslint-disable-next-line import/prefer-default-export
export const methods = {
  getAllCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
