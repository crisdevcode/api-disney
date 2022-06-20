import Character from '../Models/CharacterModel.js';

// GET
const getAllCharacters = async (req, res) => {
  try {
    // 1) Build query
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 2) Filtering data
    const characters = await Character.findAll({
      where: queryObj,
      attributes: ['image', 'name'],
    });

    // 3) Send response
    res.status(200).json({
      status: 'success',
      results: characters.length,
      data: {
        characters,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// GET
const getCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await Character.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      data: {
        character,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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
const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, age, weight, story } = req.body;

    const character = await Character.findByPk(id);
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// DELETE
const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    await Character.destroy({
      where: {
        id,
      },
    });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'success',
      message: err,
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const methods = {
  getAllCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
