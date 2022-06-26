import Genre from '../Models/GenreModel.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';

// GET
const getAllGenres = catchAsync(async (req, res, next) => {
  // 1) Filtering
  const features = new APIFeatures(Genre, req.query).filter();

  const characters = await features.data;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: characters.length,
    data: {
      characters,
    },
  });
});

// POST
const createGenre = catchAsync(async (req, res, next) => {
  const { image, title, genreId } = req.body;
  const newGenre = await Genre.create({
    image,
    title,
    genreId,
  });
  res.status(201).json({
    status: 'success',
    data: {
      Genre: newGenre,
    },
  });
});

// eslint-disable-next-line import/prefer-default-export
export const methods = {
  createGenre,
  getAllGenres,
};
