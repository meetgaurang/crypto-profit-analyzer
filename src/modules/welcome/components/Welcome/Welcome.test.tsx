import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { useHistory } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import { Welcome } from './Welcome';

Enzyme.configure({ adapter: new Adapter() });

const mockedFunction = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useHistory: () => ({
        push: mockedFunction
    })
}));

describe('<Welcome />', () => {
    it('Will render Welcome component', () => {
        const wrapper = shallow(<Welcome />);
        expect(wrapper).toBeDefined();
        const getStartedClickHandler = wrapper.find('div').getElement().props.children.props.onClick;
        getStartedClickHandler();
        expect(mockedFunction).toBeCalledWith('/analytics');
    });
});
