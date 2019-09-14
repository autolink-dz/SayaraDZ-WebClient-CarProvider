var request = require('./../api/service');

export function getModelById(id) {
    let head = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch => {
        request.get('/modeles/'+id, head)
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
    type: 'END_GET_MODELE',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET_MODELE",
    payload: error
});