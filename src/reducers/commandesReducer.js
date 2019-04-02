const initialState = {
    loading: false,
    error:false,
    add:false,
    msg:'',
    commandes:[],
    automobilistes:[],
    versions:[]
};

let cmdArray=[]; // for copy uses

function formatter(n) { // Currency Formatter
    let formatter = new Intl.NumberFormat('en-DZD', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 2,
    });
    return formatter.format(n)
}

function formatState(etat) { // State Formatter
    if(etat===0)return 'Rejetée';
    if(etat===1)return 'En cours';
    if(etat===2)return 'Approuvée';
}

function renderTime(secs) { // Date Formatter
    let d = new Date();
    d.setTime(secs * 1000);
    return d.toDateString();
}
const commandesReducer = (state=initialState, action)=> {
    switch (action.type) {

        case 'ENG_GET_COMMANDES':
            action.payload.data.data.forEach((cmd,i)=>{
                cmdArray.push({
                    photo:action.payload.data.extras.automobilistes[cmd.id_automobiliste].photoURL,
                    nom:action.payload.data.extras.automobilistes[cmd.id_automobiliste].nom,
                    version:action.payload.data.extras.versions[cmd.id_version].nom,
                    message:cmd.message,
                    prix: formatter(action.payload.data.data[i].prix),
                    versement:formatter(action.payload.data.data[i].versement),
                    etas:formatState(action.payload.data.data[i].etas),
                    date: renderTime(cmd.date._seconds),
                    id_automobiliste:cmd.id_automobiliste,
                    id_version:cmd.id_version,
                    id_vehicule:cmd.id_vehicule,
                    id:cmd.id,
                })
            });
            return {
                ...state,
                loading: true,
                automobilistes: action.payload.data.extras.automobilistes,
                versions: action.payload.data.extras.versions,
                commandes:cmdArray
            };

        case 'ERROR_GET_COMMANDES':
            return {
                ...state,
                loading: true,
                msg:action.payload.error,
            };

        case 'END_PUT_COMMANDE':
            let id = action.payload.data.id;
            let etas = action.payload.data.etas;
            cmdArray = [...state.commandes];
            for(let cmd of cmdArray)
            {
                if(cmd.id===id){
                    cmd.etas=formatState(etas);
                    break;
                }
            }
            return {
                ...state,
                add:true,
                error:false,
                commandes:cmdArray
            };
        case 'ERROR_PUT_COMMANDE':
            return {
                ...state,
                error:true,
            };

        case 'RESET_ADD':
            return{
                ...state,
                add:false,
                error:false,
            };

        default :
            return state;
    }
};

export default commandesReducer;