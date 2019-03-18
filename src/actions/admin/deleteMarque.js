var request = require('../api/service');

export function deleteMarque(id) {
    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        dispatch(begin());
        request.delete('/marques/'+id, head)
            .then(function (response) {
                dispatch(end(id));
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const begin = () => ({
    type: "BEGIN_DELETE",
});


export const end = (id) => ({
    type: "END_DELETE",
    id
});

export const err = (error) => ({
    type: "ERROR_DELETE",
    payload: error
});