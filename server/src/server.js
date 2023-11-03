const app = require('./app');
const http = require('http');
const sequelize = require('./utils/dbConfig');
// const getClient = require('./utils/redisClient');
//system constants
const PORT = process.env.PORT || 5000;

//creating a server
const server = http.createServer(app);

// redis connection
// getClient();

sequelize
  .sync({ force: true })
  .then(() => {
    console.log(`Database is connected and ready ✅`);
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is connected and ready on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.error(err));
