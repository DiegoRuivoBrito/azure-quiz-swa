const { CosmosClient } = require('@azure/cosmos');
const QUESTIONS = require('../src/data/questions');

const { COSMOS_ENDPOINT, COSMOS_KEY } = process.env;

if (!COSMOS_ENDPOINT || !COSMOS_KEY) {
  console.error('Defina COSMOS_ENDPOINT e COSMOS_KEY como variáveis de ambiente antes de rodar o seed.');
  console.error('Exemplo: $env:COSMOS_ENDPOINT="https://..."; $env:COSMOS_KEY="..."; npm run seed');
  process.exit(1);
}

async function seed() {
  const client = new CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY });
  const container = client.database('quizdb').container('questions');

  let total = 0;
  for (const [topic, questions] of Object.entries(QUESTIONS)) {
    for (let i = 0; i < questions.length; i++) {
      await container.items.upsert({ id: `${topic}-${i}`, topic, ...questions[i] });
      total++;
    }
    console.log(`✓ ${topic}: ${questions.length} perguntas`);
  }

  console.log(`\nSeed concluído — ${total} documentos inseridos no container questions`);
}

seed().catch((err) => {
  console.error('Erro no seed:', err.message);
  process.exit(1);
});
