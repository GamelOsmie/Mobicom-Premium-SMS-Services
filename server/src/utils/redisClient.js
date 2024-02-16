const redis = require('redis');

async function getRedisClient() {
  const client = redis.createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  // Send and retrieve some values
  await client.set('key', 'Redis connected 🔥');
  const value = await client.get('key');

  console.log(value);
}

module.exports = getRedisClient;

