import React from 'react';
import { expect } from 'chai';
import Component from '../index';
import { shallow } from 'enzyme';

const props = {
    number: 1
}

const wrapper = shallow(<Component {...props}/>);

describe('BoxNumber component', () => {

    it('It exists!', () => {
    	expect(Component).to.exist
    });

    it('It displays the correct content', () => {
        expect(wrapper.find('div')).to.have.length(1)
        const div = wrapper.find('div').first()
        expect(div.text()).to.equal('1')
    });
});