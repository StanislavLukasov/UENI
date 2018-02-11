import { connect } from 'react-redux'
import StepTwo from './stepTwo'

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = ({ state }, { dispatch }, ownProps) => {

    const { breakpoint, funds } = state

    return Object.assign({}, ownProps, {
        breakpoint: breakpoint.breakpoint,
        dispatch
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StepTwo)
