require('dotenv-safe').config({ allowEmptyValues: true });
const downloadZip = require('../lib/download').downloadZip;
const uploadFile = require('../lib/s3').uploadFile;
const repoName = process.env.TEST_REPO;

test('uploads to S3', async () => {
    const name = 'etait-ici';
    await downloadZip(name);
    const result = await uploadFile(`${name}-master.zip`, name);
    const msg = `File uploaded successfully at https://cds-github.s3.amazonaws.com/${repoName}`;
    expect(result).toEqual(msg);
});
