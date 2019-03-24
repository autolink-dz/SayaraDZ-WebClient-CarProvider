const initialState = {
    modeles: [{"id":"eee","nom":"eeeeeeeeeeee"}],
    error:false,

    add:false,
    update:false,
    delete:false,
    loading:false,

    next:0
};
let modeles=null;
const gestionReducer = (state=initialState,action)=>{
    switch (action.type) {
            case 'SELECT_MARQUES':
            return {
                ...state,
                marques: action.payload
            };
        case 'SELECT_MODELES':
            modeles = Object.assign(Object.create(Object.getPrototypeOf(state.modeles)), state.modeles);
            let tmp=false;
            if(action.payload.data.data ==null){
                modeles.push(action.payload.data);
                tmp=true;
                modeles.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
                modeles.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                modeles,
                add:tmp,
                next:action.payload.data.next || null
            };
            
        case 'ADD_MODELE':
            modeles = Object.assign(Object.create(Object.getPrototypeOf(state.modeles)), state.modeles);
            let tmp1=false;
            if(action.payload.data.data ==null){
                modeles.push(action.payload.data);
                tmp1=true;
                modeles.sort((a, b) => a.nom !== b.nom ? a.nom < b.nom ? -1 : 1 : 0);
            }
            else {
                modeles.push(...action.payload.data.data);
            }
            return {
                ...state,
                loading: true,
                modeles,
                add:tmp1,
                next:action.payload.data.next || null
            };
        case 'RESET_ADD_MODELE':
            return{
                ...state,
                add:false
            };
        case 'PUT_MODELE':
            modeles = Object.assign(Object.create(Object.getPrototypeOf(state.modeles)), state.modeles);
            modeles.forEach(modele=>{
                if (modele.id===action.id){
                    modele.nom = action.nom;
                    modele.url = action.url;
                }
            });
            return{
                ...state,
                update:true,
                modeles
            };
        case 'RESET_UPDATE_MODELE':
            return{
                ...state,
                update:false
            };
        case 'BEGIN_DELETE_MODELE':
            return {
                ...state,
                loading: true
            };

        case 'ERROR_DELETE_MODELE':
            return {
                ...state,
                loading:false,
                err:true
            };

        case 'END_DELETE_MODELE':
            modeles = Object.assign(Object.create(Object.getPrototypeOf(state.modeles)), state.modeles);
            modeles.forEach((modele,i)=>{
                if (modele.id===action.id){
                    modeles.splice(i,1);
                }
            });
            return{
                ...state,
                delete:true,
                modeles
            };
        case 'RESET_DELETE_MODELE':
            return{
                ...state,
                delete:false
            };
        default :
            return state;
    }
};
export default gestionReducer;
