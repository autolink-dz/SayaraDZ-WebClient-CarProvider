const initialState = {
    loading: false,
    fabricants:[],
    error:false,
    add:false
};
const getFabricantListReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'BEGIN_GET':
            return {
                ...state,
                loading: false
            };
        case 'END_GET':
            let fabricants = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            let tmp=false;
            if(action.payload.data.data ==null){
                fabricants.push(action.payload.data);
                tmp =true;
            }
            else {
                fabricants.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                fabricants,
                add:tmp
            };
        case 'ERROR_GET':
            return {
                ...state,
                loading: true,
                err : true
            };
        default :
            return state;
    }
};
export default getFabricantListReducer;
