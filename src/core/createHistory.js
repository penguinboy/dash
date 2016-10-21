import useNamedRoutes from 'use-named-routes';
import { useRouterHistory } from 'react-router';

const createHistory = (baseHistory, routes) => (
  useNamedRoutes(useRouterHistory(baseHistory))({ routes })
);

export default createHistory;