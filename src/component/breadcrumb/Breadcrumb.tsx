import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import { ROUTES } from '../../configs/routes';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const cx = classNames.bind(styles);
interface Props {
  routeSegments: RouteSegments[];
}
interface RouteSegments {
  name: string;
  path?: string;
}
const Breadcrumb = ({ routeSegments }: Props) => {
  return (
    <div className="d-flex align-items-center">
      {/* <Link to={config.routesConfig.root}><HomeIcon color="primary" className="ms-2" /></Link> */}
      {routeSegments
        ? routeSegments.map((route: any, index: number) => (
            <div className="d-flex align-items-center" key={index}>
              {index !== 0 && <KeyboardArrowRightIcon className={cx('icon')} />}
              {route.path ? (
                <Link to={route.path}>
                  <span className={cx('link')}>{route.name}</span>
                </Link>
              ) : (
                <span className={cx('text')}>{route.name}</span>
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default Breadcrumb;
