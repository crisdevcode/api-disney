import {} from 'dotenv/config';
import sequelize from './database/database.js';
import app from './app.js';

// DATABASE
(async function dbConnect() {
  await sequelize.sync({ force: false });
  console.log('Status: DB connection successful...');
})();

// SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running  on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
