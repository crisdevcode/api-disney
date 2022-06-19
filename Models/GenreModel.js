import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Genre = sequelize.define('Genre', {
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

export default Genre;
