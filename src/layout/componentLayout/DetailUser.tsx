import { Card, CardActions, CardContent } from '@mui/material';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '../ManagerLayout.module.scss';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { detailUserSelector } from '../../modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../configs/routes';

const cx = classNames.bind(styles);
function Deltai({ onClose }: { onClose: () => void }) {
  const detail = useSelector(detailUserSelector);
  return (
    <Card sx={{ minWidth: 275 }} className={cx('card_user')}>
      <CardContent style={{ padding: 0 }}>
        <div className="d-flex">
          <div className={cx('name')}>{detail.username?.charAt(0)}</div>
          <h3 className={cx('title_detail')}>{detail.username}</h3>
        </div>
        <div className={cx('content_detail')}>
          <p>
            <FormattedMessage id="developer" />
          </p>
          <p>
            Staff ID: <span>test</span>
          </p>
        </div>
      </CardContent>
      <CardActions style={{ padding: 0 }} className="d-flex flex-column">
        <Button className={cx('btn_logout')} onClick={onClose}>
          <FormattedMessage id="signout" />
        </Button>
        <Link to={ROUTES.changePassword} className={cx('btn_respas')} onClick={onClose}>
          <FormattedMessage id="resetPassword" />
        </Link>
      </CardActions>
    </Card>
  );
}

export default Deltai;
