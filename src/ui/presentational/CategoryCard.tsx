import * as React from 'react'
import { CategoryType } from '../../store/reducer/category'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'

type PropTypes = {
  category: CategoryType
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

class CategoryCard extends React.PureComponent<
  PropTypes & RouteComponentProps<any>
> {
  render() {
    const { category } = this.props
    return (
      <FullWidthCard>
        <CardContent>
          <Typography variant="h5" component="h2">
            {category.name}
          </Typography>
        </CardContent>
      </FullWidthCard>
    )
  }
}

export default withRouter(CategoryCard)
