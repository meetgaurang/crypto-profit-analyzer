import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as router from 'react-router';
import { Welcome } from './Welcome';

Enzyme.configure({ adapter: new Adapter() });

describe("<Welcome />", () => {
    beforeEach(() => {
        
    });
    it("Will render Welcome component", () => {
        jest.unmock('react-router');
        // require the actual module so that we can mock exports on the module
        const router = require.requireActual('react-router');

        let mockedFunc = jest.fn();

        router.useHistory = jest.fn(() => {return {push: mockedFunc}});

        const wrapper = shallow(<Welcome />);
        expect(wrapper).toBeDefined();
        const getStartedClickHandler = wrapper.find('div').getElement().props.children.props.onClick;
        getStartedClickHandler();
        expect(mockedFunc).toBeCalledTimes(1);
    });
});
