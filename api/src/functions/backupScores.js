const { app } = require('@azure/functions');
const { BlobServiceClient } = require('@azure/storage-blob');
const { scoresContainer } = require('../lib/cosmos');

app.timer('backupScores', {
  schedule: '0 0 2 * * *', // todo dia às 02:00 UTC
  handler: async (_timer, context) => {
    const { resources: scores } = await scoresContainer.items.readAll().fetchAll();

    const today = new Date().toISOString().split('T')[0];
    const blobName = `scores-${today}.json`;
    const content = JSON.stringify(scores, null, 2);

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.BACKUP_STORAGE_CONNECTION
    );
    const containerClient = blobServiceClient.getContainerClient('backups');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(content, Buffer.byteLength(content), {
      blobHTTPHeaders: { blobContentType: 'application/json' },
    });

    context.log(`Backup concluído: ${scores.length} scores → backups/${blobName}`);
  },
});
