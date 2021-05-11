import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BasicLayout from '@/components/layout/BasicLayout';

export default function () {
  return (
    <Switch>
      <Route path={'/login'}>login</Route>
      <Route path={'/'}>
        <BasicLayout />
      </Route>
    </Switch>
  );
}
