const axios = require('axios');

export function addFabricant(nom,url) {

    return dispatch =>{
        //Dispatch loading
       dispatch(begin());
        // Send the request
        axios.post('https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques', {
            nom: nom,
            url: url
        })
            .then(function (response) {
                dispatch(end());
                console.log(response);
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}
export const begin = () => ({
    type: "BEGIN_LOADING"
});

export const end = () => ({
    type: "END_LOADING"
});

export const err = (error) => ({
    type: "ERROR",
    payload: error
});