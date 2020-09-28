import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Categories from '../../contexts/Categories';
import { useCategories } from '../../hooks/useCategories/useCategories';

const ArticlePage = lazy(() => import('../ArticlePage/ArticlePage'));
const ArticlesPage = lazy(() => import('../ArticlesPage/ArticlesPage'));
const Header = lazy(() => import('../Header/Header'));

function App() {
  const categories = useCategories();

  return (
    <Categories.Provider value={categories}>
      <Router>
        <Suspense fallback="loading...">
          <Header />
          <Switch>
            <Route exact path="/" component={ArticlesPage}/>
            <Route exact path="/article/:id?" render={/* istanbul ignore next */({match}) => (
              <ArticlePage articleId={Number(match.params.id)} />
            )}/>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </Categories.Provider>
  );
}

export default App;
