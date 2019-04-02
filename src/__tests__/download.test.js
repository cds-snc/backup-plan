require('dotenv-safe').config({ allowEmptyValues: true });
const downloadZip = require('../lib/download').downloadZip;
const repoName = process.env.TEST_REPO;

test('downloads a file into the expected dir', async () => {
    const name = repoName;
    const result = await downloadZip(name);
    expect(result).toEqual(true);
});
