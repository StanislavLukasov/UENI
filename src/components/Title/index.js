import React, { Component } from 'react';
import styles from './styles'
import responsiveStyles from './responsiveStyles'

export default class Title extends Component {
    constructor(props) {
        super(props);
        
        /**
        * @var object
        */
        this.styles = {}
        
        /**
        * @var object
        */
        this.responsiveStyles = {}
        
        /**
        * @var string
        */
        this.tag = this.props.tag || 'h1'
        
        this.setStyles()
        this.setResponsiveStyles()
    }
    
    /**
    * Set class styles
    *
    * @return false
    */
    setStyles() {
        this.styles = styles(this.props)
    }
    
    /**
    * Set class responsive styles
    *
    * @return false
    */
    setResponsiveStyles() {
        this.responsiveStyles = responsiveStyles()
    }

    /**
    * Renders DOM elements
    *
    * @return DOM elements
    */
    render() {
        if(this.props.text) {
            return (
                <this.tag 
                    style={Object.assign({},
                    this.styles,
                    this.props.mobile && this.responsiveStyles)}>
                    
                    {this.props.text}
                </this.tag>
            )
        }

        return false
    }
}

