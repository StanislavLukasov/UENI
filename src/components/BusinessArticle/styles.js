import Prefixer from 'inline-style-prefixer'

export default function styles(props = {}) {
	let styles = {
		container: {
			position: 'relative'
		},
		imageCopyContainer: {
			display: 'flex',
		},
		image: {
			width: '7rem',
			height: '7rem',
			background: 'url('+props.image+')',
			backgroundSize: 'cover'
		},
		imageHero: {
			width: '20rem',
			height: '20rem',
		},
		imageSmall: {
			maxWidth: '8rem',
			maxHeight: '8rem',
			margin: 0
		},
		content: {
			margin: '0 0 0 1rem',
			position: 'relative'
		},
		contentHero: {
			margin: '0 0 0 4rem'
		},
		title: {
			display: 'block',
			margin: '0 0 0.2rem',
			padding: 0,
			fontSize: '1.2rem',
			lineHeight: 1
		},
		span: {
			fontStyle: 'italic',
			fontWeight: 300,
			fontSize: '0.9rem',
			lineHeight: 1,
			display: 'block'
		},
		description: {
			fontStyle: 'italic',
			fontWeight: 300,
			fontSize: '0.85rem',
			margin: 0,
			padding: 0,
			overflow: 'hidden',
    		textOverflow: 'ellipsis',
    		display: '-webkit-box',
			lineHeight: 1.5,
			maxHeight: '4.5rem',
			WebkitLineClamp: 3,
			WebkitBoxOrient: 'vertical'
		},
		descriptionMargin: {
			margin: '0.5rem 0 0'
		},
		button: {
			margin: '1rem 0 0',
			display: 'block',
			width: '100%',
			padding: '0.5rem 1rem',
			textAlign: 'center',
			background: '#56D36B',
			color: 'white',
			textDecoration: 'none',
			textTransform: 'uppercase'
		},
		buttonAbsolute: {
			position: 'absolute',
			bottom: 0
		},
		ratingMargin: {
			margin: '0.5rem 0 0'
		}
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)
	
    return styles
}