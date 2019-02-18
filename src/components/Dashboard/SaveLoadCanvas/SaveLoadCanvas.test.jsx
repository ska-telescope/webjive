import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedSaveLoadCanvas, { SaveLoadCanvas } from './SaveLoadCanvas';
import { SAVE_CANVASES } from '../../../actions/modal';
import { SET_MODAL } from '../../../actions/actionTypes';

const mockStore = configureMockStore();
const store = mockStore();

describe('SaveLoadCanvas component', () => {
  it('renders without crashing', () => {
    shallow(<SaveLoadCanvas />);
  });

  describe('Save Button', () => {
    it('should handle save button clicks', () => {
      const clickHandler = jest.spyOn(SaveLoadCanvas.prototype, 'handleSaveButtonClick');
      const wrapper = shallow(<SaveLoadCanvas />);
      const saveButton = wrapper.find('#save-button');
      saveButton.simulate('click');
      expect(clickHandler).toHaveBeenCalled();
    });

    it('trigger the set modal action on save click', () => {
      const wrapper = shallow(<ConnectedSaveLoadCanvas store={store} />);
      wrapper.props().onSave();
      const actions = store.getActions();
      const expectedAction = { type: SET_MODAL, modalInstance: SAVE_CANVASES, entity: undefined };
      expect(actions).toContainEqual(expectedAction);
    });
  });
});
