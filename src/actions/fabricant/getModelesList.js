var request = require('./../api/service');

export function getModeleList(next, id) {
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
        request.get('/modeles?next=' + next + '&page=20&id_marque='+ id, head)
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
    type: 'END_GET_MODELES',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET_MODELES",
    payload: error
});