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

type PropTypes = {
  category: CategoryType
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

export default class ProductCard extends React.PureComponent<PropTypes> {
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
          <Button variant="outlined" size="small">
            修改
          </Button>
        </CardActions>
      </FullWidthCard>
    )
  }
}
