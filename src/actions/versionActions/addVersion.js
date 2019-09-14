var request = require('./../api/service');

export function addVersion(nom,code, url,id_modele,options,couleurs,fiche_tech) {

    let body={
        "nom": nom,
        "code":code,
        "url": url,
        "id_modele":id_modele,
        "id_marque": localStorage.id_marque,
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
                dispatch({type : 'ADD_VERSIONS', payload: response});
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
                alert("Erreur : le code existe déja ou la connexion est interrompu")
            });
    }
}

export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});