const axios = require("axios");

const options = {
  method: "GET",
  url: "https://shazam.p.rapidapi.com/shazam-events/list",
  params: {
    artistId: "73406786",
    l: "en-US",
    from: "2022-12-31",
    limit: "50",
    offset: "0",
  },
  headers: {
    "X-RapidAPI-Key": "a4b8fc666fmsh1e54679c657eb25p1ce870jsnce3374cc91c9",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

(async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();
