var request = require('./../api/service');

export function getVersionsList(next, id_marque, id_modele) {
    let head = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };
    return dispatch => {
        if (next == null) {
            return;
        }
        request.get('/versions?id_marque=' + id_marque + '&id_modele=' + id_modele + '&next=' + next, head)
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
    type: 'END_GET_VERSIONS',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET_VERSIONS",
    payload: error
});