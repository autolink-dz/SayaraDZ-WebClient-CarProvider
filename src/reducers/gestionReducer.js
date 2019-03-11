const initialState = {
    marques: {},
    modeles: {},
    versions: {},
    options: {},
    couleurs: {}
    
};
const gestionReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'SELECT_MARQUES':
            return {
                ...state,
                marques: action.payload
            };
        case 'SELECT_MODELES':
            return {
                ...state,
                modeles: action.payload
            };
        case 'SELECT_VERSIONS':
            return {
                ...state,
                versions: action.payload
            };
        case 'SELECT_OPTIONS':
            return {
                ...state,
                options: action.payload
            };
        default :
            return state;
    }
};
export default gestionReducer;
