const initialState = {
    showPut:false
};

const showDialogReducer = (state=initialState, action)=> {
    switch (action.type) {
        case 'SHOW_DIALOG':
            return {
                ...state,
                showPut: true
            };
        case 'HIDE_DIALOG':
            return {
                ...state,
                showPut: false
            };
        default :
            return state;
    }
};

export default showDialogReducer;