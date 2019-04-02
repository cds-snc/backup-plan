require('dotenv-safe').config({ allowEmptyValues: true });

const AWS = require('aws-sdk');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const KEY = process.env.AWS_KEY;
const SECRET = process.env.AWS_SECRET;

const s3 = new AWS.S3({
    accessKeyId: KEY,
    secretAccessKey: SECRET
});

const bucketName = 'cds-github';
const baseDir = process.env.BASE_DIR || '/tmp';

const s3Upload = params => {
    return new Promise((resolve, reject) => {
        s3.upload(params, function(s3Err, data) {
            if (s3Err) {
                reject(s3Err);
                return;
            }
            resolve(data);
        });
    });
};

const uploadFile = async (file, name) => {
    const data = await readFile(`${baseDir}/${file}`);

    const params = {
        Bucket: bucketName,
        Key: name,
        Body: data
    };

    const s3Data = await s3Upload(params);

    if (s3Data && s3Data.Location) {
        return `File uploaded successfully at ${s3Data.Location}`;
    }

    return s3Data;
};

module.exports = {
    uploadFile
};
