import { DataTypes } from 'sequelize';
import slugify from 'slugify';
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
  slug: DataTypes.STRING,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a name',
      },
      len: {
        args: [3, 30],
        msg: 'A character name must have between 3 and 30 characters',
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
      min: {
        args: 1,
        msg: 'Age must be above 1',
      },
      max: {
        args: 100,
        msg: 'Age must be below 100',
      },
    },
  },
  weight: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        ags: true,
        msg: 'A character must have a weight',
      },
      min: {
        args: 1,
        msg: 'Weight must be above 1',
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

// Hooks
Character.addHook('beforeSave', (currentDoc) => {
  const { dataValues: character } = currentDoc;
  character.slug = slugify(character.name, { lower: true });
});

export default Character;
