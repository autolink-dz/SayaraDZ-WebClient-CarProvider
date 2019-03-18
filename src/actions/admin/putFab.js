var request = require('../api/service');

export function putFab(id,nom,prenom,mdp,mail,adresse,num_tlp,disabled) {
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
        prenom,
        mdp,
        mail,
        adresse,
        num_tlp,
        disabled
    };

    return dispatch =>{
        request.put('/fabricants/'+id,body,head)
            .then(function (response) {
                dispatch(end(response.data.id, response.data.nom, response.data.prenom, response.data.mdp, response.data.mail, response.data.adresse, response.data.num_tlp, response.data.disabled));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export const end = (id,nom, prenom,mdp, mail, adresse, num_tlp, disabled) => ({
    type: "END_PUT_FABS",
    id,
    nom,
    prenom,
    mdp,
    mail,
    adresse,
    num_tlp,
    disabled
});