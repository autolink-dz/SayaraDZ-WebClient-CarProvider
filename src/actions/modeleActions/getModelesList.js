var request = require('./../api/service');

export function getModelesList(next) {

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
        request.get('/modeles?next='+next+'&page=20',head)
            .then(function (response) {
                console.log('***----')
                console.log(response)
                
                dispatch({type : 'SELECT_MODELES', payload: response});
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