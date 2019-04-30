import * as React from 'react'
import { CategoryType } from '../../store/reducer/category'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { categoryRemove } from '../../store/action'
import { compose } from 'redux'
import { connect } from 'react-redux'

type PropTypes = {
  category: CategoryType
  onRemove: (category: CategoryType) => ReturnType<typeof categoryRemove>
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

class CategoryCard extends React.PureComponent<
  PropTypes & RouteComponentProps<any>
> {
  handleRemove = (category: CategoryType) => {
    const yes = confirm(`确认删除产品分类"${category.name}"？`)

    if (yes) {
      this.props.onRemove(category)
    }
  }
  render() {
    const { category } = this.props
    return (
      <FullWidthCard>
        <CardContent>
          <Typography variant="h5" component="h2">
            {category.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => this.handleRemove(category)}
          >
            删除
          </Button>
        </CardActions>
      </FullWidthCard>
    )
  }
}

export default compose(
  withRouter,
  connect(
    null,
    { onRemove: categoryRemove }
  )
)(CategoryCard)
