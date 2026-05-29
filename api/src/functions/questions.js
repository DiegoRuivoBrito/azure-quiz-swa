const { app } = require('@azure/functions');
const QUESTIONS = require('../data/questions');

app.http('questions', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request) => {
    const topic = request.query.get('topic');

    if (!topic || !QUESTIONS[topic]) {
      return {
        status: 400,
        jsonBody: { error: 'Tópico inválido ou não encontrado' },
      };
    }

    return { jsonBody: QUESTIONS[topic] };
  },
});
