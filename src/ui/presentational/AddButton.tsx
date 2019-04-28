import * as React from 'react'
import AddIcon from '@material-ui/icons/Add'

class AddButton extends React.PureComponent<{ onClick: () => void }> {
  render() {
    return <AddIcon onClick={this.props.onClick} />
  }
}

export default AddButton
