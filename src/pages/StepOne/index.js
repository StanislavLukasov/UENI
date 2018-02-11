import { connect } from 'react-redux'
import StepOne from './stepOne'

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = ({ state }, { dispatch }, ownProps) => {

    const { breakpoint, funds } = state

    return Object.assign({}, ownProps, {
        breakpoint: breakpoint.breakpoint,
        dispatch
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StepOne)
