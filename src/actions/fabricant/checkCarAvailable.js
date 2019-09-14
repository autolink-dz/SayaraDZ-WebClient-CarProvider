var request = require('./../api/service');

export function checkCarAvailable(options,color,codeVersion,codeModel) {
    let head = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch => {
        request.get('/vehicules/'
            + localStorage.getItem('id_marque')
            +'?'+'modele='+ codeModel
            +'&version='+ codeVersion
            +'&couleur='+ color
            +'&options=' + options
            ,head
             )
            .then( (response) => {
                dispatch(end(response));
            })
            .catch( (error) => {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const end = (response) => ({
    type: 'END_checkCar',
    payload: response
});

export const err = (error) => ({
    type: "ERROR_checkCar",
    payload: error
});