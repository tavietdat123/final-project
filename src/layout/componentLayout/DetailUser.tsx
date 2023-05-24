import { Card, CardActions, CardContent } from '@mui/material';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '../ManagerLayout.module.scss';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { detailUserSelector } from '../../modules/auth/redux/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../configs/routes';
import { memo, useCallback, useState } from 'react';
import ConfirmationDialog from '../../component/dialog/ConfirmationDialog';
import { logoutAuth } from '../../modules/auth/redux/authSlice';
import { logoutEmployeeManage } from '../../modules/employee/redux/managerEmployeeSlice';
import { logoutEmployee } from '../../modules/employee/redux/employeeSilce';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';

const cx = classNames.bind(styles);
function Deltai({ onClose }: { onClose: () => void }) {
  const detail = useSelector(detailUserSelector);
  const dispatch = useDispatch();
  const [comfirm, setComFirm] = useState(false);
  const handleSignOut = () => {
    setComFirm(true);
  };
  const navigate = useNavigate();
  const handleCloseComfirm = useCallback(() => {
    setComFirm(false);
  }, []);
  const handleClickYes = () => {
    dispatch(logoutAuth());
    dispatch(logoutEmployeeManage());
    dispatch(logoutEmployee());
    Cookies.remove(ACCESS_TOKEN_KEY);
    navigate(ROUTES.login);
  };
  return (
    <Card sx={{ minWidth: 275 }} className={cx('card_user')}>
      {comfirm && (
        <ConfirmationDialog
          open={comfirm}
          onConfirmDialogClose={handleCloseComfirm}
          text=""
          title="Do you wish to sign out?"
          onYesClick={handleClickYes}
          Yes="Yes"
          No="No"
        />
      )}
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
        <Button className={cx('btn_logout')} onClick={handleSignOut}>
          <FormattedMessage id="signout" />
        </Button>
        <Link to={ROUTES.changePassword} className={cx('btn_respas')} onClick={onClose}>
          <FormattedMessage id="resetPassword" />
        </Link>
      </CardActions>
    </Card>
  );
}

export default memo(Deltai);
