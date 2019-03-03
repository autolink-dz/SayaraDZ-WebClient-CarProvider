var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: 'https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques',
});

module.exports = axiosInstance;