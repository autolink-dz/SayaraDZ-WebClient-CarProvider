import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import {signInClick} from "../actions/signInClick";



const mockStore = configureMockStore([thunk]);


describe("signin Actions", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            users: {}
        });
    })

    it("dispatches SignIN action and returns data on success", async () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);



        await store.dispatch(signInClick("admin@sayara.com","admin2019"));

        await mockFetchPromise
        const actions = store.getActions();
        // [ { type: "GET_USERS_PENDING" },
        //   { type: "GET_USERS_FULFILLED", payload: { data: [Array] } }
        // ]

        //expect.assertions(3);
        expect(actions).toContainEqual({"type": "BEGIN_SIGN_IN"});

    });
});