'use strict';
import "babel-polyfill"
import React, { Component } from 'react'
import 'isomorphic-fetch'
import styles from './styles'
import Settings from '../../components/Settings'
import BoxNumber from '../../components/BoxNumber'
import Title from '../../components/Title'
import BusinessArticle from '../../components/BusinessArticle'
import isBreakpointSmall from '../../components/Breakpoint/isBreakpointSmall'
import isBreakpointMedium from '../../components/Breakpoint/isBreakpointMedium'
import Content from '../../containers/Content'

export default class StepOne extends Component {
	constructor(props) {
		super(props);
		
		/**
		* @var object
		*/
		this.state = {
			sort: false,
			loading: true,
			error: false,
			businesses: [],
			categories: []
		}
		
		/**
		* @var object
		*/
		this.styles = {}
		
		/**
		* @var array
		*/
		this.businessesCopy = []
		
		/**
		* @var string
		*/
		this.defaultOption = 'default'
		
		this.setStyles()
	}
	
	componentWillMount() {
		this.fetchBusinessData()
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
	* Set sort value
	*
	* @param string sort
	* @return false
	*/
	setSort(sort) {
		if(sort) {
			this.setState({
				sort
			})
		}
	}
	
	/**
	* Set sort value
	*
	* @param array businesses
	* @return false
	*/
	setBusinessess(businesses) {
		if(businesses) {
			if(businesses.constructor === Array) {
				this.setState({
					businesses
				})
			}
		}
	}
	
	/**
	* Set categories array
	*
	* @param array businesses
	* @return false
	*/
	setCategories(businesses) {
		if(businesses) {
			if(businesses.constructor === Array) {
				let categories = Array.from(new Set(businesses.map(item => item.category))) || []
				
				this.setState({
					categories
				})
			}
		}
	}
	
	/**
	* Set loading state
	*
	* @param bool loading
	* @return false
	*/
	setLoading(loading) {
		if(this.state.loading !== loading) {
			this.setState({
				loading
			})
		}
	}
	
	/**
	* Set error state
	*
	* @param bool|string error
	* @return false
	*/
	setError(error) {
		if(this.state.error !== error) {
			this.setState({
				error
			})
		}
	}
	
	/**
	* Set a copy of businesses
	*
	* @param array businesses
	* @return false
	*/
	setBusinessesCopy(businesses = []) {
		this.businessesCopy = businesses
	}
	
	/**
	* fetches business data from json
	*
	* @return false
	*/
	async fetchBusinessData() {
		try {
			let data = []
			
			if(process.env.NODE_ENV !== 'test') {
				data = await fetch('./data/businesses-data.json')
					.then(res => res.json())
			}
			
			if(process.env.NODE_ENV == 'test') {
				data = this.props.data
			}
			
			this.setBusinessess(data)
			this.setBusinessesCopy(data)
			this.setCategories(data)
			this.setError(false)
			this.setLoading(false)
		} catch (e) {
			this.setError(e)
		}
	}
	
	/**
	* Handles category change
	*
	* @param event e
	* @return false
	*/
	async handleCategoryChange(e) {
		if(e) {
			if(e.target) {
				let value = e.target.value || false
				
				if(process.env.NODE_ENV !== 'test') {
					await this.setSort(value)
				}
				
				if(process.env.NODE_ENV == 'test') {
					this.setSort(value)
				}
				
				this.filterBusinessessByCategory()
			}
		}
	}
	
	/**
	* Handles category change
	*
	* @param event e
	* @return false
	*/
	handleSortClick() {
		if(this.state.businesses.length > 0) {
			let businesses = this.state.businesses
			businesses = businesses.sort((a, b) => a.name > b.name)
			
			this.setState({
				businesses
			})
		}
	}
	
	/**
	* Filters businesses state by a category
	*
	* @return false
	*/
	filterBusinessessByCategory() {
		if(this.state.sort && this.businessesCopy.length > 0) {
			if(this.state.sort !== this.defaultOption) {
				let result = this.businessesCopy.filter(e => e.category == this.state.sort)
				this.setBusinessess(result)
			}
			
			if(this.state.sort == this.defaultOption) {
				this.setBusinessess(this.businessesCopy)
			}
		}
	}
	
	/**
	* Creates a location string
	*
	* @param string city
	* @param string country
	* @return false
	*/
	formatLocation(city = false, country = false) {
		let result = ''
		
		if(city) {
			result += city
		}
		
		if(city && country) {
			result += ', '
		}
		
		if(country) {
			result += country
		}
		
		return result
	} 
	
	/**
	* Renders header elements
	*
	* @return DOM elements
	*/
	renderHeader() {
		return (			
			<div style={Object.assign({},
				this.styles.header,
				isBreakpointSmall(this.props.breakpoint) && this.styles.headerSmall)}
				id="header">
				
				<div style={Object.assign({},
					this.styles.headerTitle,
					isBreakpointSmall(this.props.breakpoint) && this.styles.headerTitleSmall)}>
					
					<BoxNumber 
						number={1}
						mobile={isBreakpointSmall(this.props.breakpoint)}
					/>
					
					<Title 
						text="Select your business"
						textTransform="uppercase"
						margin="0 0 0 1rem"
						mobile={isBreakpointSmall(this.props.breakpoint)}
					/>
				</div>
				
				<div style={Object.assign({},
					this.styles.headerSort,
					isBreakpointSmall(this.props.breakpoint) && this.styles.headerSortSmall)}>
					{this.renderSortContainer()}
				</div>
			</div>
		)	
	}
	
	renderSortContainer() {
		if(this.state.businesses.length > 0) {
			return (
				<div style={this.styles.sortContainer}>
					<span 
						id="sort-a-z"
						style={this.styles.sort}
						onClick={this.handleSortClick.bind(this)}>
						<strong>Sort:</strong> A-Z
					</span>
					
					{this.state.categories.length > 0 &&
						<div style={this.styles.categoryContainer}>
							<strong style={this.styles.category}>
								Category
							</strong>
							
							<select 
								id="filter-by-category"
								style={this.styles.select} 
								onChange={e => this.handleCategoryChange(e)} 
								value={this.state.value}>
								
								<option value={this.defaultOption}>All</option>

								{this.state.categories.map((item, index) => {
									return (
										<option 
											value={item} 
											key={index}>
											
											{item}
										</option>
									)
								})}
							</select>
						</div>
					}
				</div>
			)
		}
		
		return false
	}
	
	/**
	* Renders content container
	*
	* @return Content component
	*/
	renderContentContainer() {
		return (
			<Content
				content={this.renderContent()}
			/>
		)
	}
	
	/**
	* Renders content
	*
	* @return DOM elements
	*/
	renderContent() {
		if(!this.state.loading && !this.state.error) {
			return (
				<div 
					style={this.styles.articles} 
					id="content">
					
					{this.state.businesses.map((item, index) => {
						return (
							<div style={Object.assign({},
								this.styles.article,
								this.styles.articleOdd,
								isBreakpointSmall(this.props.breakpoint) && this.styles.articleSmall)}
								key={index}>
								
								<BusinessArticle 
									image={item.imageUrl}
									title={item.name}
									location={this.formatLocation(item.city, item.country)}
									description={item.description}
									href={"/business/"+item.id}
									buttonText="Continue"
									tablet={isBreakpointMedium(this.props.breakpoint)}
									mobile={isBreakpointSmall(this.props.breakpoint)}
								/>
							</div>
						)
					})}
				</div>
			)
		}
		
		return false
	}
	
	/**
	* Renders loading state
	*
	* @return DOM elements
	*/
	renderLoading() {
		if(this.state.loading && !this.state.error) {
			return (
				<div id="loading">
					<p>Loading ...</p>
				</div>
			)
		}
		
		return false
	}
	
	/**
	* Renders error state
	*
	* @return DOM elements
	*/
	renderError() {
		if(this.state.error && !this.state.loading) {
			return (
				<div id="error">
					Ooops, an error occured
				</div>
			)
		}
		
		return false
	}
	
	renderEmptyResults() {
		if(this.state.businesses.length == 0 && !this.state.error && !this.state.loading) {
			return (
				<div id="no-results">
					<p>No results found</p>
				</div>
			)
		}
		
		return false
	}

	/**
    * Renders DOM elements
    *
    * @return DOM elements
    */
	render() {
		return (
			<div style={Settings.width.container}>
				{this.renderHeader()}
				{this.renderLoading()}
				{this.renderError()}
				{this.renderEmptyResults()}
				{this.renderContentContainer()}
			</div>
		)
	}
}
