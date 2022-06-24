import Movie from '../Models/MovieModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// GET
const getAllMovies = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY: Filter
  const features = new APIFeatures(Movie, req.query, [
    'image',
    'title',
    'createdAt',
  ]);

  const movies = await features.filter();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

// GET
const getMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: {
      id,
    },
  });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(200).json({
    data: {
      movie,
    },
  });
});

// POST
const createMovie = catchAsync(async (req, res, next) => {
  const { image, title } = req.body;
  const newMovie = await Movie.create({
    image,
    title,
  });
  res.status(201).json({
    status: 'success',
    data: {
      movie: newMovie,
    },
  });
});

// UPDATE
const updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { image, title } = req.body;

  const movie = await Movie.findByPk(id);

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  movie.set({
    image,
    title,
  });

  await movie.save();

  res.status(201).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

// DELETE
const deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.destroy({
    where: {
      id,
    },
  });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// eslint-disable-next-line import/prefer-default-export
export const methods = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
