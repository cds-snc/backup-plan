require('dotenv-safe').config({ allowEmptyValues: true });

const express = require('express');
const bodyParser = require('body-parser');
const backupRepo = require('./index').backupRepo;
const server = express();
const port = parseInt(process.env.PORT, 10) || 4000;

server.use(bodyParser.json());

server.post('/', async (req, res) => {
    await backupRepo(req, res);
});

server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
});
