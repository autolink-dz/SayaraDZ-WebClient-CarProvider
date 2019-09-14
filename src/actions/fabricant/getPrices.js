var request = require('./../api/service');

export function getPrices(code_model, type,  code_option) {
    let head = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch => {
        request.get('/tarifs/'
            + localStorage.getItem('id_marque') + '/'
            + code_model + '/'
            + type + '/'
            + code_option
            , head)
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
    type: 'END_PRICES',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_PRICES",
    payload: error
});