export default {
  getCategories: () => new Promise(resolve => resolve([
    {
      "id": 1,
      "title": "News"
    },
    {
      "id": 2,
      "title": "Blog post"
    }
  ]))
};
