var request = require('./../api/service');

export function getOptionsColors(id) {
    let head = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch => {
        request.get('/versions/'+id, head)
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
    type: 'END_GET_OPTIONS_COLORS',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET_OPTIONS_COLORS",
    payload: error
});