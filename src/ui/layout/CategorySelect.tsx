import * as React from 'react'
import { CategoryType } from '../../store/reducer/category'
import { connect } from 'react-redux'
import { getCategories } from '../../store/getter'
import { findDOMNode } from 'react-dom'
import { get } from 'lodash'
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@material-ui/core'

type PropTypes = {
  categories: CategoryType[]
  selected: CategoryType[]
  onSelect: (categories: CategoryType[]) => void
}
type StateProps = {
  labelWidth: 0
}

class CategorySelect extends React.PureComponent<PropTypes, StateProps> {
  InputLabelRef: null | InputLabel
  constructor(props: PropTypes) {
    super(props)
    this.InputLabelRef = null
    this.state = { labelWidth: 0 }
  }

  componentDidMount() {
    this.setState({
      labelWidth: findDOMNode(this.InputLabelRef).offsetWidth,
    })
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = this.props.categories.find(
      ({ id }) => id === event.target.value
    )

    if (!category) {
      return
    }

    this.props.onSelect([category])
  }

  render() {
    return (
      <FormControl variant="outlined">
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref
          }}
          htmlFor="outlined-age-simple"
        >
          添加产品类别
        </InputLabel>
        <Select
          disabled={this.props.categories.length === 0}
          value={get(this.props, 'selected[0].id', 'none')}
          onChange={this.handleChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name="category"
              id="product-category-select"
            />
          }
        >
          <MenuItem value="none">
            <em>无分类</em>
          </MenuItem>
          {this.props.categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

export default connect(getCategories)(CategorySelect)
