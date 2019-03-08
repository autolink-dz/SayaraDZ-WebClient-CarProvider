const initialState = {
    loading: false,
    fabricants:[],
    error:false,
    add:false,
    next:0
};

let fabricants=null; // for several uses

const marquesListReducer = (state=initialState, action)=>{
    switch (action.type) {

        case 'BEGIN_GET':
            return {
                ...state,
                add:true
            };

        case 'END_GET':
            fabricants = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            let tmp=false;
            if(action.payload.data.data ==null){
                fabricants.push(action.payload.data);
                tmp=true;
                fabricants.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
                fabricants.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                fabricants,
                add:tmp,
                next:action.payload.data.next || null
            };

        case 'ERROR_GET':
            return {
                ...state,
                loading: true,
                err : true
            };

        case 'RESET_ADD':
            return{
                ...state,
                add:false
            };

        case 'BEGIN_DELETE':
            return {
                ...state,
                loading: true
            };

        case 'ERROR_DELETE':
            return {
                ...state,
                loading:false,
                err:true
            };

        case 'END_DELETE':
            fabricants = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            fabricants.forEach((fab,i)=>{
                if (fab.id===action.id){
                    fabricants.splice(i,1);
                }
            });
            return{
                ...state,
                fabricants
            };

        case 'END_PUT':
            fabricants = Object.assign(Object.create(Object.getPrototypeOf(state.fabricants)), state.fabricants);
            fabricants.forEach(fab=>{
                if (fab.id===action.id){
                    fab.nom = action.nom;
                    fab.url = action.url;
                }
            });
            return{
                ...state,
                fabricants
            };
        default :
            return state;
    }
};
export default marquesListReducer;
