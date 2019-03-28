var request = require('../api/service');

export function addCsvStock() {
    let head= {
        headers: {
            "Accept": "application/json",
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
        }
    };

    let body={

    };

    return dispatch =>{

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