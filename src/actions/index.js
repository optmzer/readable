export const SELECT_CATEGORY = "SELECT_CATEGORY"

//Combines 3 different actions into one with new property.
export function select_category(category, posts) {
  console.log("L5 action " + category, posts);

  return {
    type: SELECT_CATEGORY,
    category: category,
    category_posts: posts
  }
}
