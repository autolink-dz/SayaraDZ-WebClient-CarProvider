import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {cipher,decipher} from "../utils/crypt";


const myDecipher = decipher('hashedSalt');
const myCecipher = cipher('hashedSalt');
const decy = myCecipher('8JhnuSv3e8VRyt4DCv8Dv4lCWMj1');

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        const localId = localStorage.getItem('localId');
        if (localId != null) {
            const admin = myDecipher(localStorage.getItem(decy));
            if (admin==='true') {
               return (
                   <div>
                       <Redirect to='/admin'/>
                       <Component {...props} />
                   </div>
                   )
            }
            else if ( admin==='false') {
                return (
                    <div>
                        <Redirect to='/fabricant'/>
                        <Component {...props} />
                    </div>
                    )
            }
            else {
                return (
                    <div>
                        <Redirect to='/'/>
                    </div>
                )
            }
        }
        else {
            return <Redirect to='/'/>
        }
    }
    } />
);
