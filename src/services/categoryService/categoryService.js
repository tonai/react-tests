export default {
  getCategories() {
    return fetch('/categories')
      .then(data => data.json());
  }
}
