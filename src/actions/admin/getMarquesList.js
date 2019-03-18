var request = require('../api/service');

export function getMarquesList(next) {

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
        request.get('/marques?next='+next+'&page=20',head)
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
    type: "END_GET",
    payload:response
});

export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});