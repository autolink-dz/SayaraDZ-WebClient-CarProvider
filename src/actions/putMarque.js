var request = require('./api/service');

export function putMarque(id,nom,url) {
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
        url
    };

    return dispatch =>{
        request.put('/marques/'+id,body,head)
            .then(function (response) {
                dispatch(end(id,nom,url));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export const end = (id,nom,url) => ({
    type: "END_PUT",
    id,
    nom,
    url
});