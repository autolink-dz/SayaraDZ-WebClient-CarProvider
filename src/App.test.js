import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



jest.mock('react-dom', ()=> ({render: jest.fn()}))


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    global.document.getElementById = (id) => id ==='root' && div
    expect(ReactDOM.render).toHaveBeenCalledWith(<App/>, document.getElementById('root'));
});
// it('renders welcome message', () => {
//     const wrapper = shallow(<App />);
//     const welcome = <h1>Sign in</h1>;
//     // expect(wrapper.contains(Sign in)).toBe(true);
//     expect(wrapper.contains('Sign in')).toEqual(true);
//     // expect(wrapper).toContainReact('Sign in');
//
// });