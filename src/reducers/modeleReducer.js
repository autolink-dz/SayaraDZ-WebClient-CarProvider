const request = require('./../actions/api/service');
const initialState = {
    loading: false,
    options: [],
    colors: [],
    code: '',
    promises: []

};

let head = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
        'cache-control': 'no-cache'
    }
};

const pricesReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'END_GET_MODELE':
                let code = action.payload.data.code;
                let options = action.payload.data.options;
                let colors = action.payload.data.couleurs;
                let promises = [];

                for (let i = 0; i < colors.length; i++) {
                    let promise = request.get('/tarifs/'
                        + localStorage.getItem('id_marque') + '/'
                        + code + '/'
                        + 'couleurs/'
                        + colors[i].code
                        , head);
                    promises.push(promise)
                }
                for (let i = 0; i < options.length; i++) {
                    let promise = request.get('/tarifs/'
                        + localStorage.getItem('id_marque') + '/'
                        + code + '/'
                        + 'options/'
                        + options[i].code
                        , head);
                    promises.push(promise)
                }
                return {
                    ...state,
                    loading: true,
                    options,
                    colors,
                    code,
                    promises
                };
            case 'ERROR_GET_MODELE':
                return {
                    ...state,
                    loading: true,
                    error: true
                };

            default :
                return state;
        }
    }
;
export default pricesReducer;