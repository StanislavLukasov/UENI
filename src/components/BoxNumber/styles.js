import Prefixer from 'inline-style-prefixer'

export default function styles(props = {}) {
	let styles = {
		fontSize: props.fontSize || '2rem',
		lineHeight: '3rem',
		fontWeight: props.fontWeight || '700',
		color: props.color || '#333333',
		textAlign: props.textAlign || 'center',
		margin: props.margin || 0,
		padding: props.padding || 0,
		border: props.border || '0.1rem solid #333333',
		width: props.width || '4rem',
		height: props.height || '4rem',
		display: props.display || 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)
	
    return styles
}