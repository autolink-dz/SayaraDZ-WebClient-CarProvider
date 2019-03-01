const initialState = {
    loading: false,
    response:'',
    error:false
};
const getFabricantListReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'BEGIN_GET':
            return {
                ...state,
                loading: false
            };
        case 'END_GET':
            return {
                ...state,
                loading: true,
                response: action.payload
            };
        case 'ERROR_GET':
            return {
                ...state,
                loading: true,
                err : true
            };
        default :
            return state;
    }
};
export default getFabricantListReducer;
