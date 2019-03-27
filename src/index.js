const isMaster = require('./lib/isMaster').isMaster;
const handleBackup = require('./handleBackup').handleBackup;

const backupRepo = async (req, res) => {
    const body = req.body;

    if (!isMaster(body)) {
        res.status(200).send('No action taken.');
        return;
    }

    const result = await handleBackup(body);
    res.send(result);
};

module.exports.backupRepo = backupRepo;
