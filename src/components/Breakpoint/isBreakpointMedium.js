export default function isBreakpointMedium(breakpoint) {
	if(breakpoint) {
		if(breakpoint == 'small' || breakpoint == 'xsmall' || breakpoint == 'medium') {
	        return true
	    }
	}

    return false
}
