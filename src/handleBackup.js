const downloadZip = require('./lib/download').downloadZip;
const uploadFile = require('./lib/s3').uploadFile;

const handleBackup = async event => {
    const name = event.repository.name;
    await downloadZip(name);
    return await uploadFile(`${name}-master.zip`, name);
};

module.exports.handleBackup = handleBackup;
