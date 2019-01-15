import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('displays text correctly', () => {
    const wrapper = shallow(<App />);
    const text = (
      <p>
        Edit&nbsp;
        <code>src/App.js</code>
        &nbsp;and save to reload.
      </p>
    );
    expect(wrapper).toContainReact(text);
  });
});
