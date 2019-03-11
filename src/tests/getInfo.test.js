import { NavBar } from '../components/fabricant/navbar';
//const nbModel = require('../components/fabricant/navebar');
//<NavBar ref={(child) => { this._child = child; }} /

import {shallow} from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import {bindActionCreators} from "redux";
import navbarReducer from "../reducers/navbarReducer";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

import DataModele from '../fichier_json/modele.json'
import DataVersion from '../fichier_json/version.json'
import DataOption from '../fichier_json/option.json'
import DataCouleur from '../fichier_json/modele.json'
//console.log(DataModele);
//console.log(DataVersion);


describe('<NavBar/>', () => {
    let wrapper, store;
    const mockStore = configureStore();
    const initialState = {
        NavBar: {
            dataset: {
                list: [],
                fetching: false,
                success: false,
                error: null
            },
            action: {
                fetching: false,
                success: false,
                error: null
            }
        }
    };
    beforeAll(() => {
        store = mockStore(initialState);
       // wrapper = shallow(<NavBar />, { context: { store } });
    });

    it('should render without crashig', () => {
        //expect(wrapper.instance().getModel()).toHaveLength(1);
        shallow(<NavBar classes="root" />, { context: { store } });
    });




    it('should render 5 models', () => {

       const datas = Array.from(DataModele.data)
        expect(datas).toHaveLength(5);
        expect(datas[0].id).toBe("ceAD233W6ZuOPn6vX33L");
        expect(datas[1].id).toBe("lsq8mz9Un09gSs51Sbel");
        expect(datas[2].id).toBe("oBQKWEqtQ0PbTnolDeLq");
        expect(datas[3].id).toBe("2zUhjue9F8pDEaDqhp5B");
        expect(datas[4].id).toBe("uevaaezw7coOKxHPvHqF");



    });



    it('should render 5 versions', () => {

        const datas = Array.from(DataVersion.data)
        expect(datas).toHaveLength(5);
        expect(datas[0].id).toBe("ceAD233W6ZuOPn6vX33L");
        expect(datas[1].id).toBe("lsq8mz9Un09gSs51Sbel");
        expect(datas[2].id).toBe("oBQKWEqtQ0PbTnolDeLq");
        expect(datas[3].id).toBe("2zUhjue9F8pDEaDqhp5B");
        expect(datas[4].id).toBe("uevaaezw7coOKxHPvHqF");



    });




});




