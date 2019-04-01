'use strict';
const request = require('superagent');
const fs = require('fs');
const mv = require('mv');
const ext = '.zip';

const move = (src, repoName, zipFileName) => {
    const outputDir = `/tmp/backup/`;
    mv(
        src,
        `${outputDir}/${repoName}-${zipFileName}${ext}`,
        { mkdirp: true },
        function(err) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`finished dowloading ${repoName}`);
        }
    );
};

const downloadZip = async repoName => {
    const zipFileName = 'master';
    const href = `https://github.com/cds-snc/${repoName}/archive/${zipFileName}${ext}`;
    const src = `/tmp/${zipFileName}-${repoName}${ext}`;

    request
        .get(href)
        .on('error', function(err) {
            if (err) {
                console.log(err);
            }
        })
        .pipe(fs.createWriteStream(src))
        .on('finish', function() {
            move(src, repoName, zipFileName);
        });
};

module.exports = {
    downloadZip
};
