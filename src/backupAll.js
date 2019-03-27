require('dotenv-safe').config({ allowEmptyValues: true });
const downloadZip = require('./lib/download').downloadZip;
const uploadFile = require('./lib/s3').uploadFile;
const getRepoNames = require('./lib/repos').getRepoNames;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

(async () => {
    const repoNames = await getRepoNames();
    const repos = repoNames;

    try {
        // download the repos
        await asyncForEach(repos, async name => {
            await downloadZip(name);
        });

        // upload the repos to s3
        await asyncForEach(repos, async name => {
            const result = await uploadFile(`backup/${name}-master.zip`);
            console.log(result);
        });
    } catch (e) {
        console.log(e.message);
    }
})();
