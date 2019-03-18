const initialState = {
    loading: false,
    fabs:[],
    error:false,
    add:false,
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
                add:false,
                error:false,
            };

        case 'ERROR_DELETE_FABS':
            return {
                ...state,
                error:true,
                msg:action.payload.error
            };

        case 'END_DELETE_FABS':
            fabArray = [...state.fabs];
            fabArray.forEach((fab,i)=>{
                if (fab.id===action.idFab){
                    fabArray.splice(i,1);
                }
            });
            return{
                ...state,
                fabs:fabArray,
                add:true,
            };

        case 'END_PUT_FABS':
            fabArray = [...state.fabs];
            fabArray.forEach(fab=>{
                if (fab.id===action.id){
                    fab.nom = action.nom;
                    fab.prenom = action.prenom;
                    fab.mdp = action.mdp;
                    fab.mail = action.mail;
                    fab.adresse = action.adresse;
                    fab.num_tlp = action.num_tlp;
                    fab.disabled = action.disabled;
                }
            });
            return{
                ...state,
                fabs:fabArray,
                add:true
            };
        default :
            return state;
    }
};
export default fabAdminListReducer;
