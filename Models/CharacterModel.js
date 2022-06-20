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
    type: DataTypes.DECIMAL(10, 2),
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

// Hooks
Character.addHook('beforeSave', (currentDoc) => {
  const { dataValues: character } = currentDoc;
  character.slug = slugify(character.name, { lower: true });
});

export default Character;
