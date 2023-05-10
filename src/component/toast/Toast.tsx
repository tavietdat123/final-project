import { toast } from 'react-hot-toast';
import icons from '../../assets/icons';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';
const cx = classNames.bind(styles);
function toastMessage(method: 'success' | 'error' | 'warn' | 'info' | 'loading', message: string) {
  if (method === 'success') {
    return toast(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#D9F3EE',
        color: '#12A594',
      },

      className: cx('toast'),
      icon: <img src={icons.success} alt="" />,
    });
  } else if (method === 'error') {
    return toast(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#FFEFEF',
        color: '#E5484D',
      },
      className: cx('toast'),
      icon: <img src={icons.dager} alt="" />,
    });
  } else if (method === 'warn') {
    return toast(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#FFEFEF',
        color: '#E5484D',
      },
      className: cx('toast'),
      icon: <img src={icons.dager} alt="" />,
    });
  } else if (method === 'info') {
    return toast(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#FFEFEF',
        color: '#E5484D',
      },
      className: cx('toast'),
      icon: <img src={icons.dager} alt="" />,
    });
  }
  return;
}

export default toastMessage;
