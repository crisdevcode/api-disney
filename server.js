import {} from 'dotenv/config';
import sequelize from './database/database.js';
import app from './app.js';

// DATABASE
(async function dbConnect() {
  try {
    await sequelize.sync({ force: false });
    console.log('Status: DB connection successful...');
  } catch (err) {
    console.log('Status: Unable to connect to the database: ', err);
  }
})();

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running  on port ${port}...`);
});
