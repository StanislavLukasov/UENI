import React from 'react';
import { expect } from 'chai';
import Component from '../index';
import { mount } from 'enzyme';

const wrapper = mount(<Component/>);

describe('BusinessArticle component', () => {

    it('It exists!', () => {
    	expect(Component).to.exist
    });

    it('It displays the correct default elements', () => {
        let props = {
            image: 'image',
            title: 'Title',
            location: 'location',
            description: 'Description',
            href: 'link',
            rating: 5,
            category: 'Builders',
            buttonText: 'Continue'
        }
        
        wrapper.setProps(props)
        
        expect(wrapper.find('.business-article')).to.have.length(1);
        expect(wrapper.find('.business-article-image')).to.have.length(1);
        expect(wrapper.find('h2')).to.have.length(1);
        expect(wrapper.find('span#location')).to.have.length(1);
        expect(wrapper.find('p')).to.have.length(1);
        expect(wrapper.find('Link')).to.have.length(1);
        
        let title = wrapper.find('h2').text();
        expect(title).to.equal(props.title);
        
        let location = wrapper.find('span#location').text();
        expect(location).to.equal(props.location);
        
        let description = wrapper.find('p').text();
        expect(description).to.equal(props.description);
        
        let button = wrapper.find('a').text();
        expect(button).to.equal('Continue');
    });
    
    it('It displays the correct hero elements', () => {
        let props = {
            renderHero: true
        }
        
        let wrapper = mount(<Component {...props}/>);
        expect(wrapper.find('.business-article')).to.have.length(1);
        expect(wrapper.find('.business-article-image')).to.have.length(0);
        expect(wrapper.find('h2')).to.have.length(0);
        expect(wrapper.find('span#location')).to.have.length(0);
        expect(wrapper.find('span#rating')).to.have.length(0);
        expect(wrapper.find('span#category')).to.have.length(0);
        expect(wrapper.find('p')).to.have.length(0);
        expect(wrapper.find('a')).to.have.length(0);
    });
});