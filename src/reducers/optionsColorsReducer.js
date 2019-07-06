const initialState = {
    loading: false,
    options:[],
    colors:[],
    error:false
};

const optionsColorsReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'END_GET_OPTIONS_COLORS':
            return {
                ...state,
                loading: true,
                options:action.payload.data.options,
                colors:action.payload.data.couleurs,
            };

        case 'ERROR_GET_OPTIONS_COLORS':
            return {
                ...state,
                loading: true,
                error : true
            };

        default :
            return state;
    }
};
export default optionsColorsReducer;
