const initialState = {
    loading: false,
    price: ''

};

const basePriceReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'END_GET_BASE_PRICE':
                    return {
                        ...state,
                        loading: true,
                        price: action.payload.data.prix
                    };
            case 'ERROR_GET_BASE_PRICESXX':
                return {
                    ...state,
                    loading: true,
                    price: '-1'
                };

            default :
                return state;
        }
    }
;
export default basePriceReducer;