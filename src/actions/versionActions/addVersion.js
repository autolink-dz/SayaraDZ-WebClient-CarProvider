var request = require('./../api/service');

export function addModele(nom, url) {

    let body={
        "nom": "Volkswagen Passat TEST 30",
        "url": "https://www.autobip.com/storage/photos/car_models/3235.png",
        "code": "VOL_PASSAT_DZ TEST 30",
        "id_marque": "HE54VwUdghgPRb6ZO6I8",
        "options": [
            {
                "code": "VOL_PASSAT_OPT_1",
                "nom": "Volant cuir"
            },
            {
                "code": "VOL_PASSAT_OPT_2",
                "nom": "Commandes aux volant"
            },
            {
                "code": "VOL_PASSAT_OPT_3",
                "nom": "Vitres teintés"
            },
            {
                "code": "VOL_PASSAT_OPT_4",
                "nom": "Verouillage centralisé"
            },
            {
                "code": "VOL_PASSAT_OPT_5",
                "nom": "Anti démarrage"
            },
            {
                "code": "VOL_PASSAT_OPT_6",
                "nom": "Boite a gants refrigerante"
            }
        ],
        "couleurs": [
            {
                "code": "VOL_PASSAT_CLR_V",
                "nom": "vert"
            },
            {
                "code": "VOL_PASSAT_CLR_R",
                "nom": "rouge"
            },
            {
                "code": "VOL_PASSAT_CLR_O",
                "nom": "orange"
            },
            {
                "code": "VOL_PASSAT_CLR_N",
                "nom": "noir"
            }
        ],
     //   "id": "AAAAAAAAAAAA"
    };

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };
    return dispatch =>{
        request.post('/modeles', body, head)
            .then(function (response) {
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