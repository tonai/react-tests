export default {
  addArticle(article) {
    return fetch('/articles', {
      body: JSON.stringify(article),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    }).then(data => data.json());
  },

  getArticle(id) {
    return fetch(`/articles/${id}`)
      .then(data => data.json());
  },

  getArticles() {
    return fetch('/articles')
      .then(data => data.json());
  },

  removeArticle(id) {
    return fetch(`/articles/${id}`, {
      method: 'DELETE'
    }).then(data => data.json());
  },

  updateArticle(article) {
    return fetch(`/articles/${article.id}`, {
      body: JSON.stringify(article),
      headers: {'Content-Type': 'application/json'},
      method: 'PUT'
    }).then(data => data.json());
  }
}
