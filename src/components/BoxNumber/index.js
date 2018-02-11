import React, { Component } from 'react';
import styles from './styles'
import responsiveStyles from './responsiveStyles'

export default class BoxNumber extends Component {
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
        if(this.props.number) {
            return (
                <div style={Object.assign({},
                    this.styles,
                    this.props.mobile && this.responsiveStyles)}>
                    
                    {this.props.number}
                </div>
            )
        }

        return false
    }
}

