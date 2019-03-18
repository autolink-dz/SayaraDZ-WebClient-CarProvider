export function showFabDialog(state) {
    return dispatch =>{
        if(state){
            dispatch(show());
        }
        else {
            dispatch(hide())
        }

    }
}
export const show = () => ({
    type: "SHOW_DIALOG"
});

export const hide = () => ({
    type: "HIDE_DIALOG"
});