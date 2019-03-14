const initialState = {
    loading: false,
    fabs:[],
    error:false,
    add:false,
    next:0
};

let fabs=[]; // for copy uses

const fabAdminListReducer = (state=initialState, action)=>{
    switch (action.type) {

        case 'END_GET_FABS':
            fabs = Object.assign(Object.create(Object.getPrototypeOf(state.fabs)), state.fabs);
            let tmp=false;
            if(action.payload.data.data ==null){
                fabs.push(action.payload.data);
                tmp=true;
                fabs.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
                fabs=[];
                fabs.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                fabs,
                add:tmp,
                next:action.payload.data.next || null
            };

        case 'ERROR_GET_FABS':
            return {
                ...state,
                loading: true,
                error : true
            };

        case 'RESET_ADD':
            return{
                ...state,
                add:false
            };

        case 'BEGIN_DELETE_FABS':
            return {
                ...state,
                loading: true
            };

        case 'ERROR_DELETE_FABS':
            return {
                ...state,
                loading:false,
                error:true
            };

        case 'END_DELETE_FABS':
            fabs = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            fabs.forEach((fab,i)=>{
                if (fab.id===action.id){
                    fabs.splice(i,1);
                }
            });
            return{
                ...state,
                fabs
            };

        case 'END_PUT_FABS':
            fabs = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            fabs.forEach(fab=>{
                if (fab.id===action.id){
                    fab.nom = action.nom;
                    fab.url = action.url;
                }
            });
            return{
                ...state,
                fabs
            };
        default :
            return state;
    }
};
export default fabAdminListReducer;
