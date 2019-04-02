'use strict';
const request = require('superagent');
const fs = require('fs');
const ext = '.zip';
const baseDir = process.env.BASE_DIR;

const downloadZip = async repoName => {
    return new Promise((resolve, reject) => {
        const zipFileName = 'master';
        const href = `https://github.com/cds-snc/${repoName}/archive/${zipFileName}${ext}`;
        const src = `${baseDir}/${repoName}-${zipFileName}${ext}`;

        request
            .get(href)
            .on('error', function(err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
            })
            .pipe(fs.createWriteStream(src))
            .on('finish', function() {
                resolve(true);
            });
    });
};

module.exports = {
    downloadZip
};
