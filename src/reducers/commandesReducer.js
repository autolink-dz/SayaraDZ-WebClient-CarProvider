const initialState = {
    loading: false,
    cmdArray:[],
    error:false,
    add:false,
    msg:''
};

const commandesReducer = (state=initialState, action)=> {
    switch (action.type) {
        case 'ENG_GET_COMMANDES':
            return {
                ...state,
                loading: true,
                cmdArray: action.payload.data.data
            };
        case 'ERROR_GET_COMMANDES':
            return {
                ...state,
                loading: true
            };
        default :
            return state;
    }
};

export default commandesReducer;