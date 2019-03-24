import './../utils/crypt';
import {cipher} from "../utils/crypt";

export function signInClick(email,password){
    return dispatch =>{
        let api = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAtt4h5FUVwtrMPJK2EHmRnHcq9MpCgj_o'
        const request = new Request(api, {
            method: 'POST',
            body: JSON.stringify(
                {
                    'email':email,
                    'password':password,
                    'returnSecureToken':true
                }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        dispatch(signInBegin());
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((response) => {
                localStorage.setItem('localId', response.localId);
                localStorage.setItem('idToken', response.idToken);
                console.log(response);

                let url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/admin"
                const requestType = new Request(url, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+response.idToken,
                        'cache-control': 'no-cache'
                    }),
                });

                fetch(requestType)
                    .then(responseType => {
                    if (responseType.status < 200 || responseType.status >= 300) {
                        throw new Error(responseType.statusText);
                    }
                    return responseType.json();
                    })
                    .then((responseType) => {
                        dispatch(signInEND());
                        let admin = responseType.admin;
                        let myCipher = cipher('hashedSalt');
                        let _SSID = myCipher('8JhnuSv3e8VRyt4DCv8Dv4lCWMj1');
                        let response = myCipher(String(admin));

                        localStorage.setItem(_SSID, response);

                        if (admin){
                            window.location.assign("/admin");
                        }
                        else {
                            window.location.assign("/fabricant");
                        }
                    })
                    .catch((e)=>{
                        dispatch(signInErr(e));
                        console.log(e);
                    });

            })
            .catch((e)=>{
                dispatch(signInErr(e));
                console.log(e);
            });
    }
};
export const signInBegin = () => ({
    type: "BEGIN_SIGN_IN"
});
export const signInEND = () => ({
    type: "END_SIGN_IN"
});
export const signInErr = () => ({
    type: "ERR_SIGN_IN"
});
