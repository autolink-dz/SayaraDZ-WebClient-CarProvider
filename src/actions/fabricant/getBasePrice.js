var request = require('./../api/service');

export function getBasePrice(codeModel,codeVersion) {
    let head = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch => {
        request.get('/tarifs/'
                    + localStorage.getItem('id_marque') + '/'
                    + codeModel + '/'
                    + 'versions/' +
                    codeVersion
                    , head)
                    .then( (response) => {
                        dispatch(end(response));
                    })
                    .catch( (error) => {
                        dispatch(err(error));
                        console.log(error);
                    });
    }
}

export const end = (response) => ({
    type: 'END_GET_BASE_PRICE',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_GET_BASE_PRICE",
    payload: error
});