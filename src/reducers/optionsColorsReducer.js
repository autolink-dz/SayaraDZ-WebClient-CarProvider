const initialState = {
    loading: false,
    options:[],
    colors:[],
    error:false,
    codeVersion : '-1'
};

const optionsColorsReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'END_GET_OPTIONS_COLORS':
            return {
                ...state,
                loading: true,
                options:action.payload.data.options,
                colors:action.payload.data.couleurs,
                codeVersion:action.payload.data.code
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
