export const SELECT_CATEGORY_UDACITY = "SELECT_CATEGORY_UDACITY"
export const SELECT_CATEGORY_REACT = "SELECT_CATEGORY_REACT"
export const SELECT_CATEGORY_REDUX = "SELECT_CATEGORY_REDUX"

export function select_category_udacity(posts) {
  return {
    type: SELECT_CATEGORY_UDACITY,
    posts
  }
}

export function select_category_react(posts) {
  return {
    type: SELECT_CATEGORY_REACT,
    posts
  }
}

export function select_category_redux(posts) {
  return {
    type: SELECT_CATEGORY_REDUX,
    posts
  }
}
