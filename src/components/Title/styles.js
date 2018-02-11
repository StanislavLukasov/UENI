export default function styles(props = {}) {
	let styles = {
		fontSize: props.fontSize || '2rem',
		fontWeight: props.fontWeight || '700',
		color: props.color || '#333333',
		textAlign: props.textAlign || 'left',
		width: props.width || '100%',
		margin: props.margin || '0 0 1rem 0',
		padding: props.padding || 0,
		textTransform: props.textTransform || 'initial'
	}
	
    return styles
}