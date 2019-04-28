import * as React from 'react'
import { Grid, Divider } from '@material-ui/core'
import Button from './BlockButton'

type PropTypes = {
  onSubmit: () => void
  onCancel: () => void
}

export default class BottomButtonGroup extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={this.props.onCancel}
          >
            取消
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={this.props.onSubmit}
          >
            保存
          </Button>
        </Grid>
      </Grid>
    )
  }
}
