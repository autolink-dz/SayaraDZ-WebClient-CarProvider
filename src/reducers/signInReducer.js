const initialState = {
    loading: false,
};
const signInReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'BEGIN_SIGN_IN':
            return {
                ...state,
                loading: true
            };
        case 'END_SIGN_IN':
            return {
                ...state,
                loading: false
            };
        case 'ERR_SIGN_IN':
            return {
                ...state,
                loading: false
            };
        default :
            return state;
    }
};
export default signInReducer;
