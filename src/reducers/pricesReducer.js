const initialState = {
    loading: false,
    prices:[],
    error:false
};

let price = {};
let prices = [];

const pricesReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'END_PRICES':
            prices = [...state.prices];
            price.code = action.payload.data.code;
            price.prix = action.payload.data.prix;
            prices.push(price);
            console.log("here prices",prices);
            return {
                ...state,
                loading: true,
                prices,
            };

        case 'ERROR_PRICES':
            return {
                ...state,
                loading: true,
                error : true
            };

        default :
            return state;
    }
};
export default pricesReducer;
