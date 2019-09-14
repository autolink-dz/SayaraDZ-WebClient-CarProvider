const initialState = {
    loading: false,
    available:false,
    error:false,
};

const checkCarReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'END_checkCar':
            if (action.payload.data.data.length===0){
                console.log("here");
                return {
                    ...state,
                    loading: true,
                    available : false,
                    error: true
                };
            }
            else
                return {
                    ...state,
                    loading: true,
                    available:action.payload.data.data.disponible
                };

        case 'ERROR_checkCar':
            return {
                ...state,
                loading: true,
                error : true
            };

        case 'RESET_CAR_CHECK':
            return {
                ...state,
                loading: true,
                error : false,
                available: false
            };


        default :
            return state;
    }
};
export default checkCarReducer;
