const axios = require('axios');
const url = 'https://github.com/darwinjhm3000/api_github';
const reposUrl = url + '/repos?sort=stargazers&per_page=10';

(async () => {
  try {
    const response = await axios.get(reposUrl);
    const repos = response.data;
    console.log(repos);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Finished executing');
  }
})();
