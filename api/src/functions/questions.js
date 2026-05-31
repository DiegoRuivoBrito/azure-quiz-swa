const { app } = require('@azure/functions');
const { questionsContainer } = require('../lib/cosmos');

const VALID_TOPICS = ['twoAndAHalfMen', 'friends', 'got', 'theOffice', 'narcos', 'breakingBad'];

app.http('questions', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request) => {
    const topic = request.query.get('topic');

    if (!topic || !VALID_TOPICS.includes(topic)) {
      return {
        status: 400,
        jsonBody: { error: 'Tópico inválido ou não encontrado' },
      };
    }

    const { resources } = await questionsContainer.items
      .query({
        query: 'SELECT c.id, c.question, c.options, c.correct FROM c WHERE c.topic = @topic',
        parameters: [{ name: '@topic', value: topic }],
      })
      .fetchAll();

    return { jsonBody: resources };
  },
});
