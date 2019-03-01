const initialState = {
    loading: false,
    error:false
};
const addFabricantReducer = (state=initialState,action)=>{
    switch (action.type) {

        case 'BEGIN_LOADING':
            return {
                ...state,
                loading: false
            };
        case 'END_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'ERROR':
            return {
                ...state,
                loading: true,
                err : true
            };
        default :
            return state;
    }
};
export default addFabricantReducer;
