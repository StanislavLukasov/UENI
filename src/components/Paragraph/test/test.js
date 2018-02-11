import React from 'react';
import { expect } from 'chai';
import Component from '../index';
import { shallow } from 'enzyme';

const props = {
    items: [
        { text: 'This is a paragraph!' },
        { text: 'This is a second paragraph!' }
    ]
}

const wrapper = shallow(<Component {...props}/>);

describe('Paragraph component', () => {

    it('It exists!', () => {
    	expect(Component).to.exist
    });

    it('It displays correct amount of paragraphs when props passed', () => {
        expect(wrapper.find('p')).to.have.length(2);
    });

    it('It shows the right text when props passed', () => {
        const paragraph = wrapper.childAt(1).find('p');
        expect(paragraph.text()).to.equal('This is a second paragraph!');
    });
});