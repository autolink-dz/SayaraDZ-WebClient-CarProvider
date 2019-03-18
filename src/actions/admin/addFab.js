var request = require('../api/service');

export function addFab(nom, prenom , mdp , mail, adresse , num_tlp,id_marque ) {

    let body={
        nom,
        prenom,
        mail ,
        mdp ,
        adresse ,
        num_tlp ,
        id_marque
    };
    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache',
        }
    };

    return dispatch =>{
        request.post('/fabricants', body, head)
            .then(function (response) {
                dispatch(end(response));
            })
            .catch(function (error) {
                dispatch(err(error.response.data.message));
                console.log(error);
            });
    }
}

export const end = (response) => ({
    type: "END_GET_FABS",
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET_FABS",
    payload: error
});