import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Movie = sequelize.define('Movie', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A movie must have a image',
      },
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A movie must have a title',
      },
    },
    unique: true,
  },
  rating: {
    type: DataTypes.DECIMAL,
    defaultValue: 4.5,
  },
});

export default Movie;
