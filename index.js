require("dotenv-safe").config({ allowEmptyValues: true });
const downloadZip = require("./src/download").downloadZip;
const uploadFile = require("./src/s3").uploadFile;
const getRepoNames = require("./src/repos").getRepoNames;

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
      await uploadFile(`backup/${name}-master.zip`);
    });
  } catch (e) {
    console.log(e.message);
  }
})();
