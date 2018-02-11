import React from 'react';
import { expect } from 'chai';
import Component from '../index';
import { shallow } from 'enzyme';

const props = {
    tag: 'h2',
    text: 'This is a new title!'
}

const wrapper = shallow(<Component {...props}/>);

describe('Title component', () => {

    it('It exists!', () => {
    	expect(Component).to.exist
    });

    it('It displays the correct tag when props passed', () => {
        expect(wrapper.find('h2')).to.have.length(1);
    });

    it('It shows the right text when props passed', () => {
        const title = wrapper.find('h2');
        expect(title.text()).to.equal('This is a new title!');
    });
});