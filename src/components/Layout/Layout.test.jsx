import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders without crashing', () => {
    shallow(<Layout />);
  });
});
