import Prefixer from 'inline-style-prefixer'

export default function styles(props = {}) {
	let styles = {
		header: {
			width: '100%',
			display: 'flex'
		},
		headerSmall: {
			display: 'block'
		},
		headerTitle: {
			width: '50%',
			display: 'flex',
			alignItems: 'center',
			padding: '0 1rem 0 0'
		},
		headerTitleSmall: {
			width: '100%',
			padding: 0
		},
		headerSort: {
			width: '50%',
			display: 'flex',
			alignItems: 'flex-end',
			padding: '0 0 0 1.5rem'
		},
		headerSortSmall: {
			width: '100%',
			display: 'block',
			padding: '1rem 0 0'
		},
		sortContainer: {
			display: 'flex',
			alignItems: 'center',
			width: '100%'
		},
		sort: {
			cursor: 'pointer'
		},
		category: {
			margin: '0 0.5rem 0 0'
		},
		categoryContainer: {
			margin: '0 0 0 auto'
		},
		select: {
			padding: '0.4rem 1.5rem',
			margin: '0',
			border: '0.065rem solid black',
			color: '#333',
			backgroundColor: 'transparent',
			fontSize: '0.9rem',
			appearance: 'none',
			MozAppearance: 'none',
			backgroundImage: 'url(/images/arrow-down.svg)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '0.75rem',
			backgroundPosition: 'right 0.5rem top 50%',
			direction: 'rtl',
			cursor: 'pointer',
			outline: 'none',
			borderRadius: 0
		},
		articles: {
			display: 'flex',
			flexWrap: 'wrap',
			//flexDirection: 'row',
			width: '100%',
			margin: '-2rem 0 0 0'
		},
		articlesSmall: {
			display: 'block'
		},
		article: {
			width: '50%',
			margin: '2rem 0 0 0'
		},
		articleOdd: {
			padding: '0 1.5rem 0 0'
		},
		articleEven: {
			padding: '0 0 0 1.5rem'
		},
		articleSmall: {
			width: '100%',
			padding: 0
		}
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)
	
    return styles
}