export default {
  addArticle: () => new Promise(resolve => resolve({
    "id": 4,
    "title": "Article 4",
    "category": 2,
    "published": false,
    "content": ""
  })),

  getArticle: () => new Promise(resolve => resolve({
    "id": 1,
    "title": "Article 1",
    "category": 1,
    "published": true,
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  })),

  getArticles: () => new Promise(resolve => resolve([
    {
      "id": 1,
      "title": "Article 1",
      "category": 1,
      "published": true,
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "id": 2,
      "title": "Article 2",
      "category": 2,
      "published": true,
      "content": "Donec malesuada enim ac ipsum dictum placerat."
    },
    {
      "id": 3,
      "title": "Article 3",
      "category": 1,
      "published": false,
      "content": "Phasellus sit amet bibendum augue."
    }
  ])),

  removeArticle: () => new Promise(resolve => resolve()),

  updateArticle: () => new Promise(resolve => resolve())
};
