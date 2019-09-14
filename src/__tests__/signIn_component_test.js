import SignInContainer from "../containers/signIn/SignInContainer";
import SignInUi from "../components/signIn/SignInUi";
//import sinon from 'sinon';
import {mount} from 'enzyme';
import expect from 'expect';
import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import ReactTestUtils from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Input from '@material-ui/core/Input';
import configureMockStore from 'redux-mock-store';
import Button from '@material-ui/core/Button';
import Admin from '../components/admin/admin';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {signInClick} from "../actions/signInClick";
const mockStore = configureMockStore();
const buildStore = configureStore([thunk]);
describe('test authentification', () => {
    let wrapper, store;

    beforeEach(async () => {
        const initialState = {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn(),
            subscribe:jest.fn(),

            fireSignIn : {
                loading: true
            }

        }
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper =  mount(<Provider store={store}><Router><SignInContainer signInClick={signInClick} /></Router> </Provider>);
    });

    it('should invoke the BEGIN_SIGN_IN action', async () => {
        const p = Promise.resolve(resolve => setTimeout(resolve, 10000))
        const initialState = {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn(),
            subscribe:jest.fn(),

            fireSignIn : {
                loading: true
            }

        }
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        const signInClick = jest.fn(() => p)

        const store = buildStore(initialState);
        const component = mount(<Provider store={store}><Router><SignInContainer  /></Router> </Provider>);

        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const email_In = component.find(Input).first();
        //print(component.toString())
        const email = component.find('#email').at(0);
        email.instance().value = "admin@sayara.com";
        email.simulate('change');

        const password = component.find('#password').at(0);
        password.instance().value = 'admin2019';
        password.simulate('change');

        const button = component.find(Button).first();
        component.find("form").simulate("submit", {"target":[{"value":"admin@sayara.com"},{"value":"admin2019"}]});
        await mockFetchPromise
      //  expect(props.signInClick).toBeCalled();
        expect(store.getActions()).toContainEqual({"type": "BEGIN_SIGN_IN"});


       // expect(component.find(Admin)).toHaveLength(1);
       // expect(component.state().firstname).toEqual('hello');
        //  expect(true).toBeTruthy();
    })

    it('failing __tests__', () => {
        expect(false).toBeTruthy();
    })
})