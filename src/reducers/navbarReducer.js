const initialState = {
    etat: 0,
    s_etat:1
};
const navbarReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'DASHBORD':
            return {
                ...state,
                etat: 0
            };
        case 'GESTION':
            return {
                ...state,
                etat: 1,
                s_etat:1
            };
        case 'STOCK':
            return {
                ...state,
                etat: 2,
                s_etat:2
            };
        case 'SIMULATION':
            return {
                ...state,
                etat: 3,
                s_etat:3
            };
            case 'COMMANDE':
            return {
                ...state,
                etat: 4,
                s_etat:4
            };
            case 'MODELE':
            return {
                ...state,
                s_etat: 1
            };
            case 'VERSION':
            return {
                ...state,
                s_etat: 2
            };
            case 'OPTION':
            return {
                ...state,
                s_etat: 3
            };
            case 'COULEUR':
            return {
                ...state,
                s_etat: 4
            };
        
        default :
            return state;
    }
};
export default navbarReducer;
