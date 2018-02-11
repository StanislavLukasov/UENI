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
		}
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)
	
    return styles
}