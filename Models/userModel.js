import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../database/database.js';
import AppError from '../utils/appError.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Please tell us your name!',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isLowercase: true,
      isEmail: {
        args: true,
        msg: 'Please provide a valid email',
      },
    },
  },
  photo: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Please provide a password',
      },
      min: 8,
    },
  },
  passwordConfirm: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Please confirm your password ',
      },
      isEqual(el) {
        if (el !== this.password) {
          throw new AppError('Password are not the same!');
        }
      },
    },
  },
});

User.beforeSave(async (currentUser) => {
  // Has the password with cost 12
  const { dataValues: user } = currentUser;
  user.password = await bcrypt.hash(user.password, 12);
  user.passwordConfirm = undefined;
});

User.prototype.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default User;
