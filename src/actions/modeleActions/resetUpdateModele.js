export function resetUpdateModele() {
    return dispatch =>{
        setTimeout( ()=>{
            dispatch(reset());
        },3001);
    }
}
export const reset = () => ({
    type: "RESET_UPDATE_MODELE"
});