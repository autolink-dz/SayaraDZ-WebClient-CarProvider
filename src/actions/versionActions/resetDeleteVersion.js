export function resetDeleteVersion() {
    return dispatch =>{
        setTimeout( ()=>{
            dispatch(reset());
        },3001);
    }
}
export const reset = () => ({
    type: "RESET_DELETE_VERSION"
});