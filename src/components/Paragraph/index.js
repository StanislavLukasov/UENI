import React, { Component } from 'react'
import styles from './styles'

export default class Paragraph extends Component {
    constructor(props) {
        super(props);
        
        /**
        * @var object
        */
        this.styles = {}
        
        this.setStyles()
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
    * Renders DOM elements
    *
    * @return DOM elements
    */
    render() {
        if(this.props.items) {
            if(this.props.items.constructor === Array) {
                return (
                    <div>
                    
                        {this.props.items.map((item, index) => {
                            return (
                                <p 
                                    key={index} 
                                    style={this.styles.text}>
                                    {item.text}
                                </p>
                            )
                        })}
                    </div>
                );
            }
        }
        
        return false
    }
}

