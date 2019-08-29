const initialState = {
    versions: [],
    error:false,
    add:false,
    update:false,
    delete:false,
    loading:false,
    next:0
};

let versions=[];
const gestionReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'CLEAR_VERSIONS':
                versions.splice(0,versions.length)
                return {
                    ...state,
                    loading: false,
                    versions,
                };

        case 'SELECT_VERSIONS':
            versions = Object.assign(Object.create(Object.getPrototypeOf(state.versions)), state.versions);
            let tmp=false;
            if(action.payload.data.data ==null){
            //    versions.splice(0,versions.length)
                versions.push(action.payload.data);
                tmp=true;
                versions.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
              //  versions.splice(0,versions.length)
                versions.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                versions,
                add:tmp,
                next:action.payload.data.next || null
            };
        case 'ADD_VERSIONS':
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
          //      next:action.payload.data.next || null
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
                    version.code = action.code;
                    version.url = action.url;
                    version.options = action.options;
                    version.couleurs = action.couleurs;
                    version.fiche_tech = action.fiche_tech;
                    version.id_modele = action.id_modele;
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
