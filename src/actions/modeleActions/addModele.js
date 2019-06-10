var request = require('./../api/service');

export function addModele(nom, url,code,opts,cols) {

    let body={
        "nom": nom,
        "url": "https://www.autobip.com/storage/photos/car_models/3235.png",
        "code": code,
        "id_marque": "HE54VwUdghgPRb6ZO6I8",
        "options": opts,
        "couleurs": cols,
    };

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };
    return dispatch =>{
        request.post('/modeles', body, head)
            .then(function (response) {
                console.log(response)
                dispatch({type : 'ADD_MODELE', payload: response});
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});