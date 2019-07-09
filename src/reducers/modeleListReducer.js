const initialState = {
    loading: false,
    modeles:[],
    next:0,
    error:false
};

const modeleListReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'END_GET_MODELES':
            return {
                ...state,
                loading: true,
                modeles:action.payload.data.data,
                next:action.payload.data.next || null
            };

        case 'ERROR_GET_MODELES':
            return {
                ...state,
                loading: true,
                error : true
            };

        default :
            return state;
    }
};
export default modeleListReducer;
