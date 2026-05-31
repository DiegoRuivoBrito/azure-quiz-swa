const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});

const db = client.database('quizdb');

module.exports = {
  questionsContainer: db.container('questions'),
  scoresContainer: db.container('scores'),
};
