var request = require('./../api/service');

export function putModele(id,nom,code,url) {
    let head= {
        headers: {
            "Accept": "application/json",
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
        }
    };

    let body={
        id,
        nom,
        code,
        url
    };
    return dispatch =>{
        request.put('/modeles/'+id,body,head)
            .then(function (response) {
                
                dispatch(end(id,nom,code,url));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export const end = (id,nom,code,url) => ({
    type: "PUT_MODELE",
    id,
    nom,
    code,
    url
});