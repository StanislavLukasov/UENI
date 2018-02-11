import React from 'react';
import { expect } from 'chai';
import Component from '../stepOne';
import { mount } from 'enzyme';
import data from '../dummyTestData'

let props = {
    data
}

const wrapper = mount(<Component {...props}/>);

describe('StepOne', () => {

    it('It exists!', () => {
    	expect(Component).to.exist
    });

    it('It displays correct elements on load', () => {
        expect(wrapper.find('#header')).to.have.length(1);
        expect(wrapper.find('BoxNumber')).to.have.length(1);
        expect(wrapper.find('#loading')).to.have.length(0);
        expect(wrapper.find('#error')).to.have.length(0);
        expect(wrapper.find('#no-results')).to.have.length(0);
        expect(wrapper.find('Content')).to.have.length(1);
        expect(wrapper.find('#content')).to.have.length(1);
        
        expect(wrapper.state().error).to.equal(false);
        expect(wrapper.state().loading).to.equal(false);
    });
    
    it('It sets sort', () => {
        wrapper.instance().setSort('new sort')
        expect(wrapper.state().sort).to.equal('new sort');
    });
    
    it('It sets businesses', () => {
        let data = [
            {key: 'value'},
            {key: 'value'}
        ]
        
        wrapper.instance().setBusinessess(data);
        expect(wrapper.state().businesses).to.deep.equal(data);
        
        // Only sets array
        wrapper.instance().setBusinessess('string');
        expect(wrapper.state().businesses).to.deep.equal(data);
    });
    
    it('It sets categories', () => {
        let data = [
            {category: 'finance'},
            {category: 'builders'},
            {category: 'builders'},
            {category: 'finance'}
        ]
        
        let result = ['finance', 'builders']
        
        wrapper.instance().setCategories(data);
        expect(wrapper.state().categories).to.deep.equal(result);
        
        // Only sets array
        wrapper.instance().setCategories('string');
        expect(wrapper.state().categories).to.deep.equal(result);
    });
    
    it('It sets loading', () => {
        wrapper.instance().setLoading(true)
        expect(wrapper.state().loading).to.equal(true);
    });
    
    it('It sets error', () => {
        wrapper.instance().setError(true)
        expect(wrapper.state().error).to.equal(true);
    });
    
    it('It sets setBusinesses copy', () => {
        let businesses = [
            {key: 'value'}
        ]
        
        wrapper.instance().setBusinessesCopy(businesses)
        expect(wrapper.instance().businessesCopy).to.deep.equal(businesses);
    });
    
    it('It formats location', () => {
        let location = wrapper.instance().formatLocation('London', 'United Kingdom')
        expect(location).to.equal('London, United Kingdom');
    });
    
    it('It sorts businesses on a-z click', () => {
        let wrapper = mount(<Component {...props}/>);
        wrapper.find('#sort-a-z').simulate('click');
        
        let businesses = wrapper.state().businesses
        expect(businesses[0].name).to.equal('Belfast Removals');
    });
    
    it('It filters businesses by category', () => {
        let wrapper = mount(<Component {...props}/>);
        wrapper.instance().handleCategoryChange({
            target: {
                value: 'Removals'
            }
        })
        
        let businesses = wrapper.state().businesses
        expect(businesses.length).to.equal(1);
    });
});