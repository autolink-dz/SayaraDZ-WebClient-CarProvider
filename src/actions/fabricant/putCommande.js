var request = require('../api/service');

export function putCommande(etas,id) {

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'Content-Type': 'application/json'
        }
    };
    let body={
        'etas':etas
    };
    return dispatch =>{
        request.put('/commandes/'+id, body, head)
            .then(function (response) {
                dispatch(end(response));
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const end = (response) => ({
    type: "END_PUT_COMMANDE",
    payload:response
});

export const err = (error) => ({
    type: "ERROR_PUT_COMMANDE",
    payload: error
});