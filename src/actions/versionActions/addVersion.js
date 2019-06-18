var request = require('./../api/service');

export function addVersion(nom,code, url,id_modele,options,couleurs,fiche_tech) {

    let body={
        "nom": nom,
        "code":code,
        "url": "https://www.autobip.com/storage/photos/car_models/3235.png",
        "id_modele":id_modele,
        "id_marque": "HE54VwUdghgPRb6ZO6I8",
        "options": options,
        "couleurs": couleurs,
        "fiche_tech":fiche_tech
    };
    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };
    return dispatch =>{
        request.post('/versions', body, head)
            .then(function (response) {
                console.log("success add version")
                dispatch({type : 'ADD_VERSIONS', payload: response});
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