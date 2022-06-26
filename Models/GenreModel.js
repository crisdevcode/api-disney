import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Movie from './MovieModel.js';

const Genre = sequelize.define('Genre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A genre must have a title',
      },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A genre must have a image',
      },
    },
  },
});

Genre.hasMany(Movie, {
  foreignKey: 'genreId',
  sourceKey: 'id',
});

Movie.belongsTo(Genre, {
  foreignKey: 'genreId',
  targetId: 'id',
});

export default Genre;
