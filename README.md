# Introduction

E2E test / UI test / Functional test
Visual (regression) test
Unit test

integration tests (https://hackernoon.com/testing-your-frontend-code-part-iv-integration-testing-f1f4609dc4d9)
* testing a group of things
* TDD: testing the outer boundaries (the code that interfaces with the outer-world)



## Terms 

https://knplabs.com/fr/blog/mocks-fakes-stubs-dummy-et-spy-faire-la-difference



## Best pratices

https://github.com/goldbergyoni/javascript-testing-best-practices





# Unit tests

## Services

```bash
npm i -D jest-fetch-mock
```



## Hooks

https://kentcdodds.com/blog/how-to-test-custom-react-hooks/

```bash
npm i -D @testing-library/react-hooks
```





# Storybook 

## Init

https://medium.com/@toastui/pragmatic-front-end-testing-strategies-1-4a969ab09453

```bash
npx sb init
```



## Create story

Create file `src/components/Article/Article.stories.js` with:
```js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../../contexts/Categories';

// Do not import memoized component to benefit from propTypes and defaultProps.
import { Article } from './Article';

const categories = [
  {
    id: 1,
    title: 'News'
  },
  {
    id: 2,
    title: 'Blog'
  }
];

export default {
  title: 'Article',
  component: Article
};

const Template = (args) => (
  <Categories.Provider value={categories}>
    <MemoryRouter>
      <Article {...args} />
    </MemoryRouter>
  </Categories.Provider>
);

export const Default = Template.bind({});
Default.args = {
  category: 1,
  content: 'Lorem ipsum dolor sit amet.',
  id: 1,
  published: true,
  title: 'Article 1',
};
```



## Addon actions

Already installed when you setup the storybook (part of essentials addon).

Update file `src/components/Article/Article.stories.js` with:
```js
export default {
  title: 'Article',
  component: Article,
  argTypes: { onRemove: { action: 'onRemove' } }
};
```



## Addon controls (new knobs)

Already installed when you setup the storybook (part of essentials addon).

Update file `src/components/Article/Article.stories.js` with:
```js
const options = Object.fromEntries(categories.map(({ id, title}) => [title, id]));

export default {
  title: 'Article',
  component: Article,
  argTypes: {
    category: {
      control: {
        type: 'select',
        options
      }
    },
    onRemove: { action: 'onRemove' },
  }
};
```



## Addon docs

Already installed when you setup the storybook (part of essentials addon).

Update file `.storybook/preview.js` with decorator:
```js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { addDecorator } from '@storybook/react';

import Categories from '../src/contexts/Categories';
import { categories } from '../src/data/categories';


const withAppProvider = (Story, context) => (
  <Categories.Provider value={categories}>
    <MemoryRouter>
      <Story {...context} />
    </MemoryRouter>
  </Categories.Provider>
);

addDecorator(withAppProvider);
```

Update file `src/components/Article/Article.stories.js` with simplified version:
```js
import React from 'react';

import { categories } from '../../data/categories';

// Do not import memoized component to benefit from propTypes and defaultProps.
import { Article } from './Article';

const options = Object.fromEntries(categories.map(({ id, title}) => [title, id]));

export default {
  title: 'Article',
  component: Article,
  argTypes: {
    category: {
      control: {
        type: 'select',
        options
      },
    },
    onRemove: { action: 'onRemove', },
  }
};

const Template = (args) => (<Article {...args} />);

export const Default = Template.bind({});
Default.args = {
  category: 1,
  content: 'Lorem ipsum dolor sit amet.',
  id: 1,
  published: true,
  title: 'Article 1',
};
```



## Storyshots

```bash
npm i -D @storybook/addon-storyshots
```

Create file `src/__tests__/Storyshots.js` with:
```js
import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```

Run:
```bash
npx run test
```

=> problem with `inputRef.current.focus();` because there is no real browser.

=> **it only gets the HTML output** (not the image)





# Cypress

## Setup

```bash
npm i -D cypress
```

Add scripts in `package.json`:
```json
"scripts": {
  "cypress:open": "cypress open"
}
```

Launch that script it will create and initialize the `cypress` folder:
```bash
npm run cypress:open
```

Create file `cypress/integration/e2e.js` with:
```js
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
```

Add new test:
```js
it('Visits the Kitchen Sink', () => {
  cy.visit('https://example.cypress.io')
})
```



## eslint config

```bash
npm i -D eslint-plugin-cypress
```

Update file `package.json` with:
```json
"eslintConfig": {
  "extends": [
    "react-app",
    "plugin:cypress/recommended"
  ]
}
```

Remove `.eslintrc` file (created by storybook or cypress maybe ?).



## Test app

Update file `cypress.json` with:
```json
{
  "baseUrl": "http://localhost:3000",
  "experimentalFetchPolyfill": true
}
```

Start serveur and app and test local app:
```js
describe('E2E', () => {
  it('Visits the app', () => {
    cy.visit('/');
    cy.get('.Title__title').should('contain', 'Articles');
    cy.get('.Article').should('have.length', 3);
  });

  it('Filters articles', () => {
    cy.visit('/');
    cy.get('[name=title]').type('1');
    cy.get('.Article').should('have.length', 1);
    cy.get('[name=title]').clear();
    cy.get('[name=category]').select('1');
    cy.get('.Article').should('have.length', 2);
    cy.get('[name=category]').select('');
    cy.get('[name=published][value=draft]').check();
    cy.get('.Article').should('have.length', 1);
  });

  it('Go to add page', () => {
    cy.visit('/');
    cy.get('.Title__button').click();
    cy.location('pathname').should('eq', '/article');
    cy.get('.Title__title').should('contain', 'Add new article');
  });

  it('Add article', () => {
    cy.visit('/article');
    cy.get('[name=title]').type('Article 4');
    cy.get('[name=category]').select('2');
    cy.get('[name=content]').type('This is a test.');
    cy.get('[name=published]').check();
    cy.get('.ArticleForm__button').click();
    cy.location('pathname').should('eq', '/article/4');
    cy.get('.Title__title').should('contain', 'Edit article (4)');
    cy.get('.Title__button').click();
    cy.location('pathname').should('eq', '/');
    cy.get('.Article').should('have.length', 4);
  });

  it('Go to edit page', () => {
    cy.visit('/');
    // cy.get('.Article__link').eq(6).click(); // BAD
    cy.get('.Article').eq(3).find('.Article__link').eq(0).click();
    cy.location('pathname').should('eq', '/article/4');
    cy.get('.Title__title').should('contain', 'Edit article (4)');
    cy.get('[name=content]').should('contain', 'This is a test.');
  });

  it('Edit article', () => {
    cy.visit('/article/4');
    cy.get('[name=category]').select('1');
    cy.get('.ArticleForm__button').click();
    cy.get('.Title__button').click();
    cy.location('pathname').should('eq', '/');
    cy.get('.Article').eq(3).find('.Article__cell').eq(1).should('contain', 'News');
  });

  it('Remove article', () => {
    cy.visit('/');
    cy.get('.Article').eq(3).find('.Article__link').eq(1).click();
    cy.get('.Article').should('have.length', 3);
  });

  it('Visits the app with fixtures', () => {
    cy.server();
    cy.route('/categories', 'fixture:categories.json').as('getCategories');
    cy.route('/articles', 'fixture:articles.json').as('getArticles');
    cy.visit('/');
    cy.get('.Article').should('have.length', 2);
  });
});
```



## Run tests

```bash
npm i -D concurrently wait-on
```

Add scripts in `package.json`:
```json
"scripts": {
  "cypress:test": "concurrently 'npm run start' 'npm run cypress:run' -k -s first",
  "cypress:run": "wait-on http://localhost:3000 && cypress run"
}
```



## Visual testing

```bash
npm i -D cypress-plugin-snapshots
```

Update file `cypress.json` with:
```js
{
  "baseUrl": "http://localhost:3000",
  "experimentalFetchPolyfill": true,
  "ignoreTestFiles": [
    "**/__snapshots__/*",
    "**/__image_snapshots__/*"
  ]
}
```

Update file `cypress/plugins/index.js` with:
```js
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  initPlugin(on, config);
  return config;
}
```

Update file `cypress/support/commands.js` with:
```js
import 'cypress-plugin-snapshots/commands';
```

Create file `cypress/integration/ui.js` with:
```js
describe('UI', () => {
  it('Homepage', () => {
    cy.visit('/');
    cy.document().toMatchImageSnapshot({
      imageConfig: {
        threshold: 20,
        thresholdType: 'pixel'
      }
    });
  });

  it('Add page', () => {
    cy.visit('/article');
    cy.document().toMatchImageSnapshot();
  });

  it('Edit page', () => {
    cy.visit('/article/1');
    cy.document().toMatchImageSnapshot();
  });
});
```



## Tooling

https://docs.cypress.io/plugins/#visual-testing / https://github.com/mojoaxel/awesome-regression-testing
* https://www.browserstack.com/
* https://applitools.com/
* https://percy.io/
* https://www.chromatic.com/
