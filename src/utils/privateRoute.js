import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {cipher,decipher} from "../utils/crypt";


const myDecipher = decipher('hashedSalt');
const myCecipher = cipher('hashedSalt');
const decy = myCecipher('8JhnuSv3e8VRyt4DCv8Dv4lCWMj1');
const regexAdmin = new RegExp('/admin/?.*');
export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                const url = props.location.pathname;
                const localId = localStorage.getItem('localId');

                if (localId != null) {
                    const admin = myDecipher(localStorage.getItem(decy));
                    if (admin === 'true') {
                        if (regexAdmin.test(url)) {
                            return (
                                <div>
                                    <Redirect to={props.location.pathname}/>
                                    <Component {...props} />
                                </div>
                            )
                        }
                        return (
                            <div>
                                <Redirect to={'/admin'}/>
                                <Component {...props} />
                            </div>
                        )
                    } else if (admin === 'false') {
                        return (
                            <div>
                                <Redirect to='/fabricant'/>
                                <Component {...props} />
                            </div>
                        )
                    }
                }
                return (
                    <div>
                        <Redirect to='/'/>
                        <Component {...props} />
                    </div>
                )
            }
            }
        />
    );
};