export function resetAddVersion() {
    return dispatch =>{
        setTimeout( ()=>{
            dispatch(reset());
        },3001);
    }
}
export const reset = () => ({
    type: "RESET_ADD_VERSION"
});