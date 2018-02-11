import React, { Component } from 'react'
import styles from './styles'

export default class Content extends Component {
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
		if(this.props.content) {
			return (
				<div style={this.styles}>
					{this.props.content}
				</div>
			)
		} 
		
		return false
	}
}
