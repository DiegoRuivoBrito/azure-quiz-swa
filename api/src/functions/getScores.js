const { app } = require('@azure/functions');
const { scoresContainer } = require('../lib/cosmos');

app.http('getScores', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'scores',
  handler: async (request) => {
    const email = request.query.get('email');

    if (!email) {
      return {
        status: 400,
        jsonBody: { error: 'Parâmetro obrigatório: email' },
      };
    }

    const { resources } = await scoresContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.email = @email ORDER BY c.timestamp DESC',
        parameters: [{ name: '@email', value: email.toLowerCase().trim() }],
      })
      .fetchAll();

    if (resources.length === 0) {
      return {
        status: 404,
        jsonBody: { error: 'Nenhum resultado encontrado para este email' },
      };
    }

    const name = resources[0].name;

    const byTopic = {};
    for (const r of resources) {
      if (!byTopic[r.topic]) {
        byTopic[r.topic] = { label: r.topicLabel, total: 0, attempts: 0 };
      }
      byTopic[r.topic].total += (r.score / r.totalQuestions) * 100;
      byTopic[r.topic].attempts += 1;
    }

    const averageByTopic = {};
    for (const [topic, data] of Object.entries(byTopic)) {
      averageByTopic[topic] = {
        label: data.label,
        average: Math.round(data.total / data.attempts),
        attempts: data.attempts,
      };
    }

    const overallAverage = Math.round(
      Object.values(averageByTopic).reduce((sum, t) => sum + t.average, 0) /
        Object.values(averageByTopic).length
    );

    return {
      jsonBody: {
        name,
        history: resources.map(({ topic, topicLabel, score, totalQuestions, timestamp }) => ({
          topic,
          topicLabel,
          score,
          totalQuestions,
          timestamp,
        })),
        averageByTopic,
        overallAverage,
      },
    };
  },
});
