import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import NoMatchPage from '@/components/layout/NoMatchPage';
import { useContainer } from '@/store/unstated';
import auth from '@/store/auth';
import NoAuth from '@/components/layout/NoAuth';
import configs from '@/routerConfig';

const ComponentMap = new Map();

configs.forEach((item) => {
  ComponentMap.set(
    item.path,
    React.lazy(() => import(`../../pages${item.path}`))
  );
});

function renderLazyPage(path: string) {
  const ItemComponent = ComponentMap.get(path);
  if (!ItemComponent) return null;
  return (
    <Suspense
      fallback={
        <div className="page-loading-container">
          <Spin size="large" />
        </div>
      }
    >
      <ItemComponent />
    </Suspense>
  );
}

export default function () {
  const { authKeys } = useContainer(auth);
  return (
    <Switch>
      {configs.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          render={({ location }) => {
            return authKeys.includes(item.path) ? (
              renderLazyPage(item.path)
            ) : (
              <Redirect
                to={{
                  pathname: '/noAuth',
                  state: { from: location },
                }}
              />
            );
          }}
        />
      ))}
      <Route path={'/noAuth'}>
        <NoAuth />
      </Route>
      <Route path={'/'} exact>
        home
      </Route>
      <Route path="*">
        <NoMatchPage />
      </Route>
    </Switch>
  );
}
