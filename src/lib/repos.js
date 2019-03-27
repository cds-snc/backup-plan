const fetch = require('node-fetch');

const getRepos = async endpoint => {
    const res = await fetch(endpoint);
    const data = await res.json();
    return { data, res };
};

const getRepoNames = async (
    endpoint = 'https://api.github.com/orgs/cds-snc/repos?per_page=300'
) => {
    const { data, res } = await getRepos(endpoint);
    const names = data.map(element => {
        return element.name;
    });

    return names;
};

module.exports = {
    getRepoNames,
    getRepos
};
