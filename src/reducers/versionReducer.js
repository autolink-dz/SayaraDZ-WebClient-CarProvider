const initialState = {
    versions: [{"id":"ceAD233W6ZuOPn6vX33L","nom":"1.0","prix":77000000,"date_debut":"01-06-2019","date_fin":"01-09-2019","options":["ops2","ops3","ops5"]},
    {"id":"lsq8mz9Un09gSs51Sbel","nom":"1.2","prix":1500000,"date_debut":"01-06-2019","date_fin":"01-09-2019","options":["ops1","ops2","ops4"]}
    ],
    error:false,
    add:false,
    update:false,
    delete:false,
    loading:false,
    next:0
};
let versions=null;
const gestionReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'SELECT_VERSIONS':
            versions = Object.assign(Object.create(Object.getPrototypeOf(state.versions)), state.versions);
            let tmp=false;
            if(action.payload.data.data ==null){
                versions.push(action.payload.data);
                tmp=true;
                versions.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
                versions.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                versions,
                add:tmp,
                next:action.payload.data.next || null
            };
            
        case 'ADD_VERSION':
            versions = Object.assign(Object.create(Object.getPrototypeOf(state.versions)), state.versions);
            let tmp1=false;
            if(action.payload.data.data ==null){
                versions.push(action.payload.data);
                tmp1=true;
                versions.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
                versions.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                versions,
                add:tmp1,
                next:action.payload.data.next || null
            };
        case 'RESET_ADD_VERSION':
            return{
                ...state,
                add:false
            };
        case 'PUT_VERSION':
                versions = Object.assign(Object.create(Object.getPrototypeOf(state.versions)), state.versions);
                versions.forEach(version=>{
                if (version.id===action.id){
                    version.nom = action.nom;
                    version.url = action.url;
                }
            });
            return{
                ...state,
                update:true,
                versions
            };
        case 'RESET_UPDATE_VERSION':
            return{
                ...state,
                update:false
            };
        case 'BEGIN_DELETE_VERSION':
            return {
                ...state,
                loading: true
            };

        case 'ERROR_DELETE_VERSION':
            return {
                ...state,
                loading:false,
                err:true
            };

        case 'END_DELETE_VERSION':
            versions = Object.assign(Object.create(Object.getPrototypeOf(state.versions)), state.versions);
            versions.forEach((version,i)=>{
                if (version.id===action.id){
                    versions.splice(i,1);
                }
            });
            return{
                ...state,
                delete:true,
                versions
            };
        case 'RESET_DELETE_VERSION':
            return{
                ...state,
                delete:false
            };
        default :
            return state;
    }
};
export default gestionReducer;
