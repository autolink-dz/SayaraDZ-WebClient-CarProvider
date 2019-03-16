const initialState = {
    loading: false,
    fabs:[],
    error:false,
    add:false,
    next:0,
    msg:''
};

let fabArray=[]; // for copy uses

const fabAdminListReducer = (state=initialState, action)=>{
    switch (action.type) {

        case 'END_GET_FABS':
            let tmp=false;
            if(action.payload.data.data ==null){
                fabArray = [...state.fabs];
                fabArray.push(action.payload.data);
                fabArray.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
                tmp=true;
            }
            else {
                fabArray=[];
                fabArray.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                fabs:fabArray,
                add:tmp,
                next:action.payload.data.next || null
            };

        case 'ERROR_GET_FABS':
            return {
                ...state,
                loading: true,
                error : true,
                msg:action.payload
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
            fabArray = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            fabArray.forEach((fab,i)=>{
                if (fab.id===action.id){
                    fabArray.splice(i,1);
                }
            });
            return{
                ...state,
                fabs:fabArray
            };

        case 'END_PUT_FABS':
            fabArray = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            fabArray.forEach(fab=>{
                if (fab.id===action.id){
                    fab.nom = action.nom;
                    fab.url = action.url;
                }
            });
            return{
                ...state,
                fabs:fabArray
            };
        default :
            return state;
    }
};
export default fabAdminListReducer;
