import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  return auth ? children : <Navigate to={ROUTES.login} />;
};
export default PrivateRoute;
