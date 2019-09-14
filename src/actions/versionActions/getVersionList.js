var request = require('./../api/service');

export function getVersionsList(next) {

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        if(next==null){
            return;
        }
        request.get('/versions?next='+next+'&page=20',head)
            .then(function (response) {
                dispatch({type : 'SELECT_VERSIONS', payload: response});
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});