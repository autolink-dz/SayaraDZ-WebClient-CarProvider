import { allModeles } from "./allModeles";
var request = require('./../api/service');

export function deleteModele(id) {
    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        dispatch(begin());
        request.delete('/modeles/'+id, head)
            .then(function (response) {
                dispatch(end(id));
                setTimeout(()=>{
                    dispatch(allModeles());
                  },1000);
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const begin = () => ({
    type: "BEGIN_DELETE_MODELE",
});


export const end = (id) => ({
    type: "END_DELETE_MODELE",
    id
});

export const err = (error) => ({
    type: "ERROR_DELETE_MODELE",
    payload: error
});