import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';

describe('Dashboard component', () => {
  let wrapper;
  let canvases;

  beforeEach(() => {
    wrapper = shallow(<Dashboard />);
    canvases = [
      {
        id: 0,
        name: 'Root',
        widgets: [
          {
            type: 'ATTRIBUTE_PLOTTER',
            device: 'sys/tg_test/1',
            x: 210,
            y: 495,
            attribute: 'double_scalar',
            params: {
              nbrDataPoints: 100,
              width: 300,
              height: 200,
              showGrid: true,
              yAxisLabel: '',
              strokeWidth: 1
            }
          },
          {
            type: 'ATTRIBUTE_READ_ONLY',
            device: 'sys/tg_test/1',
            x: 210,
            y: 450,
            attribute: 'double_scalar',
            params: { scientific: false, showDevice: false, showAttribute: true }
          },
          {
            type: 'SET_ATTRIBUTE',
            device: 'sys/tg_test/1',
            x: 540,
            y: 495,
            attribute: 'double_scalar',
            params: { value: 500 }
          }
        ]
      },
      { id: 1, name: 'Subcanvas 1', widgets: [] },
      { id: 2, name: 'Subcanvas 2', widgets: [] },
      { id: 3, name: 'Subcanvas 3', widgets: [] }
    ];
  });

  describe('handleLoadCanvases', () => {
    it('fails if the file loaded is invalid', () => {
      const badCanvases = [{}];
      const setHistory = jest.spyOn(Dashboard.prototype, 'setHistory');
      wrapper.instance().handleLoadCanvases(badCanvases);
      expect(setHistory).not.toHaveBeenCalled();
    });

    it('calls setHistory', () => {
      const setHistory = jest.spyOn(Dashboard.prototype, 'setHistory');
      wrapper.instance().handleLoadCanvases(canvases);
      expect(setHistory).toHaveBeenCalledWith(canvases);
    });

    it('sets the canvases in state', () => {
      wrapper.instance().handleLoadCanvases(canvases);
      expect(wrapper.state().canvases).toEqual(canvases);
    });
  });
});
