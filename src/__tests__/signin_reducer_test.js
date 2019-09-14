import fireSignIn from '../reducers/fireSignIn';

describe('fireSignIn Reducer', () => {
    const initialState = {

        loading: false,

    };

    it('returns the initial state when an action type is not passed', () => {
        const reducer = fireSignIn(undefined, {});

        expect(reducer).toEqual(initialState);
    });
});