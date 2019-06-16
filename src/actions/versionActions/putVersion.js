var request = require('./../api/service');

export function putVersion(id,nom,code,url,options,couleurs,fiche_tech,id_modele) {
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
        url,
        options,
        couleurs,
        fiche_tech,
        id_modele
    };
    return dispatch =>{
        request.put('/versions/'+id,body,head)
            .then(function (response) {
                
                dispatch(end(id,nom,code,url,options,couleurs,fiche_tech,id_modele));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export const end = (id,nom,code,url,options,couleurs,fiche_tech,id_modele) => ({
    type: "PUT_VERSION",
    id,
    nom,
    code,
    url,
    options,
    couleurs,
    fiche_tech,
    id_modele
});