import { StoreActionTypes, CATEGORY_ADD, CATEGORY_REMOVE } from '../action'

export type CategoryType = {
  id: string
  name: string
}

const defaultState: CategoryType[] = []

export default (
  state: CategoryType[] = defaultState,
  action: StoreActionTypes
): CategoryType[] => {
  switch (action.type) {
    case CATEGORY_ADD:
      if (state.find(({ id }) => id === action.category.id)) {
        return state
      }

      return [...state, action.category]

    case CATEGORY_REMOVE:
      return state.filter(category => category.id !== action.category.id)
    default:
      return state
  }
}
