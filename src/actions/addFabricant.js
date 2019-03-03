const axios = require('axios');

export function addFabricant(nom,url) {

    return dispatch =>{
        //dispatch(begin());
        axios.post('https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques', {
            nom: nom,
            url: url
        })
            .then(function (response) {
                dispatch(end(response));
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}
export const begin = () => ({
    type: "BEGIN_GET"
});

export const end = (response) => ({
    type: "END_GET",
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});