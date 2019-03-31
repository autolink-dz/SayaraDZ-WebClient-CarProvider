const initialState = {
    loading: false,
    error:false,
    add:false,
    msg:'',
    cmdArray:[],
    automobilistes:[],
    versions:[]
};

function formatter(n) {
    let formatter = new Intl.NumberFormat('en-DZD', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 2,
    });
    return formatter.format(n)
}
function formatState(etat) {
    if(etat===0)return 'rejeté';
    if(etat===1)return 'en cours';
    if(etat===2)return 'approuvé';
}
const commandesReducer = (state=initialState, action)=> {
    switch (action.type) {
        case 'ENG_GET_COMMANDES':
            let data=[];
            action.payload.data.data.forEach((cmd,i)=>{
                data.push({
                    photo:action.payload.data.extras.automobilistes[cmd.id_automobiliste].photoURL,
                    nom:action.payload.data.extras.automobilistes[cmd.id_automobiliste].nom,
                    version:action.payload.data.extras.versions[cmd.id_version].nom,
                    prix: formatter(action.payload.data.data[i].prix),
                    versement:formatter(action.payload.data.data[i].versement),
                    etas:formatState(action.payload.data.data[i].etas),
                    id_automobiliste:cmd.id_automobiliste,
                    id_version:cmd.id_version,
                    id:cmd.id
                })
            });
            return {
                ...state,
                loading: true,
                cmdArray: action.payload.data.data,
                automobilistes: action.payload.data.extras.automobilistes,
                versions: action.payload.data.extras.versions,
                commandes:data
            };
        case 'ERROR_GET_COMMANDES':
            return {
                ...state,
                loading: true,
                msg:action.payload.error,
            };
        default :
            return state;
    }
};

export default commandesReducer;