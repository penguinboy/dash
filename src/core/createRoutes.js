import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Dashboard from '../pages/dashboard';

const createRoutes = (baseApp, basepath = '/') => (
  <Route path={basepath} component={baseApp} >
    <IndexRedirect to="dashboard" />

    <Route name="dashboard" path="dashboard" component={Dashboard} />
  </Route>
);

export default createRoutes;