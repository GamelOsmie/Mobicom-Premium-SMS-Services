const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

//creating a server
const server = http.createServer(app);

// redis connection
// getClient();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log('MongoDB server is connected and ready 👍');
      console.log(`Server has started on ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
