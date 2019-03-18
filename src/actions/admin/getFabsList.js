var request = require('../api/service');

export function getFabsList(id_marque) {

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        request.get('/fabricants?id_marque='+id_marque ,head)
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
    type: "END_GET_FABS",
    payload:response
});

export const err = (error) => ({
    type: "ERROR_GET_FABS",
    payload: error
});