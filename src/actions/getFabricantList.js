const axios = require('axios');

export function getFabricantList() {

    return dispatch =>{
        //Dispatch loading
        dispatch(begin());
        // Send the request
        axios.get('https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques?next=0')
            .then(function (response) {
                console.log(response);
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
    payload:response
});

export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});