var request = require('./../api/service');

export function allModeles() {

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        request.get('/modeles?next',head)
            .then(function (response) {
           /*     console.log("++++++++++++++++++++++++++++++++++++++")
                console.log(response.data)
                console.log("++++++++++++++++++++++++++++++++++++++")*/
                dispatch({type : 'ALL_MODELES', payload: response.data.data});
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