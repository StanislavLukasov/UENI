import React, { Component } from 'react'
import styles from './styles'
import Settings from '../../components/Settings'
import BoxNumber from '../../components/BoxNumber'
import Title from '../../components/Title'
import BusinessArticle from '../../components/BusinessArticle'
import isBreakpointSmall from '../../components/Breakpoint/isBreakpointSmall'
import isBreakpointMedium from '../../components/Breakpoint/isBreakpointMedium'
import Content from '../../containers/Content'

export default class StepTwo extends Component {
	constructor(props) {
		super(props);
		
		/**
		* @var object
		*/
		this.state = {
			loading: true,
			error: false,
			business: {},
			reviews: {},
			reviewScore: false
		}
		
		/**
		* @var object
		*/
		this.styles = {}
		
		/**
		* @var int
		*/
		this.businessId = false
		
		this.setStyles()
		this.setBusinessId()
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
	* Set class business id
	*
	* @return false
	*/
	setBusinessId() {
		if(this.props.params.id) {
			this.businessId = this.props.params.id
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
	* Set business state
	*
	* @param object business
	* @return false
	*/
	setBusiness(business) {
		if(business) {
			if(typeof(business) == 'object') {
				this.setState({
					business
				})
			}
		}
	}
	
	/**
	* Set reviews
	*
	* @param object reviews
	* @return false
	*/
	setReviews(reviews) {
		const array = []
		
		if(typeof(reviews) == 'object') {
			Object.keys(reviews).forEach(function (key) {
				array.push(reviews[key])
			});
			
			const flattenedArray = [].concat(...array)
			
			this.setState({
				reviews: flattenedArray
			}), () => {
				this.setReviewScore()
			}
		}
	}
	
	/**
	* Sets review score state
	*
	* @return false
	*/
	setReviewScore() {
		let sum = 0
		let sumset = false
		let reviews = false
		
		reviews = this.state.reviews
			.filter(item => item.business_id == this.businessId)
			.map(item => item.score) 

		if(reviews) {
			for(let i = 0; i < reviews.length; i++ ){
				sum += reviews[i]
				sumset = true
			}
			
			if(reviews.length > 0 && sumset) {
				this.setState({
					reviewScore: sum/reviews.length
				})
			}
		}
	}
	
	/**
	* fetches business data from json
	*
	* @return false
	*/
	async fetchBusinessData() {
		try {
			let data = {}
			let reviews = {}
			
			if(process.env.NODE_ENV !== 'test') {
				data = await fetch('/data/businesses-data.json').then(res => res.json())
				data = data.filter(item => item.id == this.businessId)
				reviews = await fetch('/data/reviews-data.json').then(res => res.json())
			}
			
			if(process.env.NODE_ENV == 'test') {
				data = this.props.data
				reviews = this.props.reviews
			}
			
			this.setBusiness(...data)
			this.setReviews(reviews)
			this.setError(false)
			this.setLoading(false)
		} catch (e) {
			this.setError(e)
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
						number={2}
						mobile={isBreakpointSmall(this.props.breakpoint)}
					/>
					
					<Title 
						text="Review"
						textTransform="uppercase"
						margin="0 0 0 1rem"
						mobile={isBreakpointSmall(this.props.breakpoint)}
					/>
				</div>
			</div>
		)	
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
		if(!this.state.loading && !this.state.error && Object.keys(this.state.business).length > 0) {
			let { name, category, city, country, description, imageUrl, href } = this.state.business
			
			return (
				<div 
					style={this.styles.articles} 
					id="content">
					
					<div style={Object.assign({},
						this.styles.article,
						this.styles.articleOdd,
						isBreakpointSmall(this.props.breakpoint) && this.styles.articleSmall)}>
						
						<BusinessArticle 
							image={imageUrl}
							title={name}
							location={this.formatLocation(city, country)}
							description={description}
							href={href}
							rating={this.state.reviewScore}
							category={category}
							displayRatingAndCategory={true}
							displayHeroImage={true}
							buttonText="Submit"
							tablet={isBreakpointMedium(this.props.breakpoint)}
							mobile={isBreakpointSmall(this.props.breakpoint)}
						/>
					</div>
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
				{this.renderContentContainer()}
			</div>
		)
	}
}
