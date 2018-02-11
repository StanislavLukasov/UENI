import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles'
import responsiveStyles from './responsiveStyles'

export default class BusinessArticle extends Component {
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
        * @var bool
        */
        this.renderHero = false
        
        /**
        * @var string
        */
        this.titleTag = 'h2'
        
        this.setStyles()
        this.setResponsiveStyles()
        this.setRenderHero()
        this.setTitleTag()
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
    * Set hero render
    *
    * @return false
    */
    setRenderHero() {
        if(this.props.renderHero) {
            this.renderHero = true
        }
    }
    
    /**
    * Set title tag
    *
    * @return false
    */
    setTitleTag() {
        if(this.props.titleTag) {
            this.titleTag = this.props.titleTag
        }
    }
    
    /**
    * Gets review score from props
    *
    * @return false
    */
    getRating() {
        let result = 'No reviews'
        
        if(this.props.rating) {
            result = this.props.rating + '/5'
        }
        
        return result
    }
    
    /**
    * Renders link
    *
    * @return DOM elements
    */
    renderLink(text) {        
        if(!this.props.displayRatingAndCategory) {
            return (            
                <Link 
                    to={this.props.href}
                    style={this.styles.button}>
                    {text}
                </Link>
            )
        }
        
        if(this.props.displayRatingAndCategory) {
            return (            
                <a 
                    href={this.props.href}
                    style={Object.assign({}, 
                        this.styles.button,
                        !this.props.mobile && this.styles.buttonAbsolute)}>
                    {text}
                </a>
            )
        }
    }
    
    /**
    * Renders DOM elements
    *
    * @return DOM elements
    */
    render() {
        return (
            <div 
                className="business-article"
                style={this.styles.container}>
                
                <div style={Object.assign({},
                    this.styles.imageCopyContainer,
                    this.props.mobile && this.styles.imageCopyContainerMobile)}>
                    
                    {this.props.image &&
                        <div>
                            <div style={Object.assign({},
                                this.styles.image,
                                this.props.displayHeroImage && this.styles.imageHero,
                                this.props.mobile && this.styles.imageSmall)}
                                className="business-article-image">
                            </div>
                        </div>
                    }
                    
                    <div style={Object.assign({},
                        this.styles.content,
                        (this.props.displayHeroImage && !this.props.mobile) && this.styles.contentHero)}>
                        
                        {this.props.title &&
                            <this.titleTag 
                                style={this.styles.title}>
                                {this.props.title}
                            </this.titleTag>
                        }
                        
                        {this.props.location &&
                            <span style={this.styles.span} id="location">
                                {this.props.location}
                            </span>
                        }
                        
                        {this.props.description &&
                            <p style={Object.assign({},
                                this.styles.description,
                                (this.props.title || this.props.location) && this.styles.descriptionMargin)}>
                                {this.props.description}
                            </p>
                        }
                        
                        {this.props.displayRatingAndCategory &&
                            <div>
                                <span style={Object.assign({},
                                    this.styles.span,
                                    (this.props.title || this.props.location || this.props.description) && this.styles.ratingMargin)}
                                    id="rating">
                                    Rating: {this.getRating()}
                                </span>
                                
                                {this.props.category &&
                                    <span style={this.styles.span} id="category">
                                        Category: {this.props.category}
                                    </span>
                                }
                            </div>
                        }
                        
                        {this.props.displayRatingAndCategory &&
                            this.renderLink('Submit')
                        }
                    </div>
                </div>
                
                {(this.props.href && !this.props.displayHeroImage) &&                    
                    this.renderLink('Continue')
                }
            </div>
        )
    }
}

