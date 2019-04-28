import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from './SimpleNavigation'
import AddButton from '../presentational/AddButton'
import { List, ListItem } from '@material-ui/core'
import CategoryCard from '../presentational/CategoryCard'
import { getCategories } from '../../store/getter'
import { CategoryType } from '../../store/reducer/category'
import { connect } from 'react-redux'

type PropTypes = {
  categories: CategoryType[]
}

class Categories extends React.PureComponent<PropTypes> {
  render() {
    const { categories } = this.props
    return (
      <Container>
        <SimpleNavigation
          title="种类目录"
          rightAction={props => (
            <AddButton onClick={() => props.history.push('/category/add')} />
          )}
        >
          <List>
            {categories.map(category => (
              <ListItem key={category.id}>
                <CategoryCard category={category} />
              </ListItem>
            ))}
          </List>
        </SimpleNavigation>
      </Container>
    )
  }
}

export default connect(getCategories)(Categories)
