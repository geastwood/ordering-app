import { withStyles, Button } from '@material-ui/core'

const StyledButton = withStyles({
  root: {
    width: '100%',
  },
  text: {
    textTransform: 'none',
  },
})(Button)

export default StyledButton
