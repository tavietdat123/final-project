import Divider from '@mui/material/Divider';
import classNames from 'classnames/bind';
import styles from './Line.module.scss';
const cx = classNames.bind(styles);
function Line(props: any) {
  return <Divider className={cx('line')} {...props} />;
}

export default Line;
