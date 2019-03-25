var request = require('../api/service');

export function deleteFab(id) {
    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };
    return dispatch =>{
        request.delete('/fabricants/'+id, head)
            .then(function (response) {
                console.log(response);
                dispatch(endFab(id));
            })
            .catch(function (error) {
                dispatch(errFab(error));
                console.log(error);
            });
    }
}

export const endFab = (idFab) => ({
    type: "END_DELETE_FABS",
    idFab

});

export const errFab = (error) => ({
    type: "ERROR_DELETE_FABS",
    payload: error
});