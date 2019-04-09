const axios = require('axios');

const BASE_URL = 'https://api.citygridmedia.com/content/places/v2/search/where?';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
      'Authorization': `Bearer 10000025428`
  }
});

export const main = async () => {
  try {
    const resp = await api.get('what=restaurant&where=brooklyn,NY&tag=11383&page=1&rpp=5&sort=alpha&publisher=test', {

    });
    console.log(resp.data);
    return resp.data;
  } catch (e) {
    console.log(e.message);
  }
};
