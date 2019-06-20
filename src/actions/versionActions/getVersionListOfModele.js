var request = require('./../api/service');

export function getVersionListOfModele(next,modele_id) {

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        if(next==null){
            return;
        }//ome50dBzVvuAP7h7f3na
        request.get('/versions?next='+next+'&id_modele='+modele_id+'&page=20',head)
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