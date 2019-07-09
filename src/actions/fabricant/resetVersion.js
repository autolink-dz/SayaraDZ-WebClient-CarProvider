export function resetVersion() {
    return dispatch =>{
        dispatch(reset());
    }
}
export const reset = () => ({
    type: "RESET_VERSIONS"
});