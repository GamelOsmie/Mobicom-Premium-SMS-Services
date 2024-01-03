const redis = require('redis');

async function getClient() {
  const client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  // Send and retrieve some values
  await client.set('key', 'Redis connected 🔥');
  const value = await client.get('key');

  console.log(value);
}

module.exports = getClient;

