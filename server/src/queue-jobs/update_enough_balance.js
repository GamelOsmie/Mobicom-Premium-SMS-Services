const Bull = require('bull');
const Subscriber = require('../modules/subscribers/subscribers,model');
const { Sequelize } = require('sequelize');

const updateEnoughBalanceQueue = new Bull('updateEnoughBalance', {
  redis: {
    host: 'oregon-redis.render.com',
    port: 6379,
  },
});

updateEnoughBalanceQueue.on('error', (error) => {
  console.error('Bull queue error:', error);
});

updateEnoughBalanceQueue.process(async (job, done) => {
  const { msisdn_nos } = job.data;

  try {
    const update_subscribers = await Subscriber.bulkUpdate(
      {
        has_enough_balance: true,
      },
      {
        where: {
          msisdn_no: { [Sequelize.Op.in]: msisdn_nos },
        },
      },
    );

    console.log(update_subscribers);

    done();
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = updateEnoughBalanceQueue;
