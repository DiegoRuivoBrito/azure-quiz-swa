const { app } = require('@azure/functions');
const { scoresContainer } = require('../lib/cosmos');

app.http('postScore', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'scores',
  handler: async (request) => {
    const body = await request.json();
    const { name, email, topic, topicLabel, score, totalQuestions } = body;

    if (!name || !email || !topic || !topicLabel || score === undefined || !totalQuestions) {
      return {
        status: 400,
        jsonBody: { error: 'Campos obrigatórios: name, email, topic, topicLabel, score, totalQuestions' },
      };
    }

    const item = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      topic,
      topicLabel,
      score,
      totalQuestions,
      timestamp: new Date().toISOString(),
    };

    await scoresContainer.items.create(item);

    return {
      status: 201,
      jsonBody: { message: 'Resultado salvo com sucesso' },
    };
  },
});
