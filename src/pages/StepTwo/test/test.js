import React from 'react';
import { expect } from 'chai';
import Component from '../stepTwo';
import { mount } from 'enzyme';
import data from '../dummyTestData'
import reviews from '../dummyTestReviewsData'

let props = {
    data,
    reviews,
    params: {
        id: 1
    }
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
        expect(wrapper.find('Content')).to.have.length(1);
        expect(wrapper.find('#content')).to.have.length(1);
        expect(wrapper.find('BusinessArticle')).to.have.length(1);
        expect(wrapper.state().error).to.equal(false);
        expect(wrapper.state().loading).to.equal(false);
    });
    
    it('It sets business id', () => {
        wrapper.instance().setBusinessId()
        expect(wrapper.instance().businessId).to.equal(1);
    });
    
    it('It sets loading', () => {
        wrapper.instance().setLoading(true)
        expect(wrapper.state().loading).to.equal(true);
    });
    
    it('It sets error', () => {
        wrapper.instance().setError(true)
        expect(wrapper.state().error).to.equal(true);
    });
    
    it('It sets business', () => {
        let business = {
            id: 1,
            name: 'business'
        }
        
        wrapper.instance().setBusiness(business)
        expect(wrapper.state().business).to.deep.equal(business);
    });
    
    it('It sets reviews', () => {
        let reviews = {
            "1": [{
                "business_id": 1,
                "score": 3
            }, {
                "business_id": 1,
                "score": 4.5
            }]
        }
        
        let result = [
            { business_id: 1, score: 3 },
            { business_id: 1, score: 4.5 }
        ]
        
        wrapper.instance().setReviews(reviews)
        expect(wrapper.state().reviews).to.deep.equal(result);
    });
    
    it('It sets review score', () => {
        wrapper.instance().setReviewScore()
        expect(wrapper.state().reviewScore).to.equal(3.75);
    });
    
    it('It formats location', () => {
        let location = wrapper.instance().formatLocation('London', 'United Kingdom')
        expect(location).to.equal('London, United Kingdom');
    });
});