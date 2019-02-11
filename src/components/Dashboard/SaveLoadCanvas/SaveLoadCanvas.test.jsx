import React from 'react';
import { shallow } from 'enzyme';
import SaveLoadCanvas from './SaveLoadCanvas';

describe('SaveLoadCanvas component', () => {
  it('renders without crashing', () => {
    const mockFunction = jest.fn();
    shallow(<SaveLoadCanvas onLoadFile={mockFunction} />);
  });

  describe('onFilesChange', () => {
    let wrapper;

    beforeEach(() => {
      const mockFunction = jest.fn();
      wrapper = shallow(<SaveLoadCanvas onLoadFile={mockFunction} />);
    });

    it('creates a new file reader', () => {
      wrapper.instance().onFilesChange();
      expect(wrapper.instance().fileReader).not.toBeNull();
    });

    it('sets the file reader onloadend method', () => {
      wrapper.instance().onFilesChange();
      expect(wrapper.instance().fileReader.onloadend).not.toBeNull();
    });

    it('reads the latest file if it exists', () => {
      const fakeFile = new Blob(['Hello, World!', { type: 'text/plain' }]);
      fakeFile.lastModifiedDate = '';
      fakeFile.name = 'test.txt';
      const files = [fakeFile];
      wrapper.instance().onFilesChange(files);
      expect(files).toHaveLength(0);
    });
  });

  describe('handleFileRead', () => {
    let wrapper;
    let mockFunction;

    beforeEach(() => {
      mockFunction = jest.fn();
      wrapper = shallow(<SaveLoadCanvas onLoadFile={mockFunction} />);
    });

    it('calls onLoad prop function', () => {
      wrapper.instance().fileReader = new FileReader();
      wrapper.instance().fileReader.onloadend = () => null;
      wrapper.instance().handleFileRead();
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
