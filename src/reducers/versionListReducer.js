const initialState = {
    loading: false,
    versions:[],
    next:0,
    error:false
};

const versionListReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'END_GET_VERSIONS':
            return {
                ...state,
                loading: true,
                versions:action.payload.data.data,
                next:action.payload.data.next || null
            };

        case 'ERROR_GET_VERSIONS':
            return {
                ...state,
                loading: true,
                error : true
            };

        case 'RESET_VERSIONS':
            return {
                ...state,
                loading: false,
                error : false,
                versions:[],
                next:0
            };

        default :
            return state;
    }
};
export default versionListReducer;
