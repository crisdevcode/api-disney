import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Character = sequelize.define('Character', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a image',
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a name',
      },
    },
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a age',
      },
    },
  },
  weight: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a weight',
      },
    },
  },
  story: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a story',
      },
    },
  },
});

export default Character;
