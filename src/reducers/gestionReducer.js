const initialState = {
    marques: {},
};
const gestionReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'SELECT_MARQUES':
            return {
                ...state,
                marques: action.payload
            };
        default :
            return state;
    }
};
export default gestionReducer;
