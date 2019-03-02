const initialState = {
    marques: {},
    modeles: {},
    versions: {'name':'Cupcake', 'calories':305,'fat': 3.7, 'carbs':67,'protein': 4.3},
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
        
        default :
            return state;
    }
};
export default gestionReducer;
