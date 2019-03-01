const initialState = {
    etat: 0,
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
                etat: 1
            };
        case 'STOCK':
            return {
                ...state,
                etat: 2
            };
        case 'SIMULATION':
            return {
                ...state,
                etat: 3
            };
        case 'COMMANDE':
            return {
                ...state,
                etat: 4
            };
        default :
            return state;
    }
};
export default navbarReducer;
