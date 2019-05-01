import * as React from 'react'
import { CategoryType } from '../../store/reducer/category'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  withStyles,
  Grid,
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { categoryRemove } from '../../store/action'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from '../presentational/BlockButton'

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
  handleEdit = (category: CategoryType) => {
    if (category.id) {
      this.props.history.push(`category/edit/${category.id}`)
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
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => this.handleRemove(category)}
              >
                删除
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.handleEdit(category)}
              >
                修改
              </Button>
            </Grid>
          </Grid>
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
