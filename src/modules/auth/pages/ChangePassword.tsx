import Breadcrumb from '../../../component/breadcrumb/Breadcrumb';
import Line from '../../../component/line/Line';
import ManagerLayout from '../../../layout/ManagerLayout';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import { Button, Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadingAuthSelector } from '../redux/authSelector';
import { changePassWord } from '../redux/authSlice';
const cx = classNames.bind(styles);
export interface FormDataChangePass {
  password: string;
  password_confirmation: string;
}
function ChangePassword() {
  const loading = useSelector(loadingAuthSelector);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataChangePass>();
  const onSubmit = (data: FormDataChangePass) => {
    dispatch<any>(changePassWord(data));
  };
  const password = watch('password');
  return (
    <ManagerLayout>
      <Breadcrumb routeSegments={[{ name: 'General', path: '' }, { name: 'Settings' }]} />
      <h3 className={cx('title_changePass')}>Settings</h3>
      <div className={cx('wrapper_repass')}>
        <h4>
          <FormattedMessage id="changePassword" />
        </h4>
        <Line />
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: '10px' }}>
          <Row className="d-flex flex-column" style={{ maxWidth: '290px' }}>
            <Col md={12} className="mt-2 mb-1">
              <Col md={12} className={cx('label')}>
                <FormattedMessage id="newPassword" />
              </Col>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                render={({ field }: any) => (
                  <input
                    {...field}
                    type="password"
                    className={cx('input', {
                      error: errors.password,
                    })}
                  />
                )}
              />
              <span className={cx('mes_error')}>
                {errors.password?.type === 'required' && <FormattedMessage id="require" />}
              </span>
            </Col>
            <Col md={12} className="mt-2 mb-1">
              <Col md={12} className={cx('label')}>
                <FormattedMessage id="confirmPassword" />
              </Col>
              <Controller
                name="password_confirmation"
                defaultValue=""
                control={control}
                rules={{ required: true, validate: (value) => password === value }}
                render={({ field }: any) => (
                  <input
                    {...field}
                    type="password"
                    className={cx('input', {
                      error: errors.password_confirmation,
                    })}
                  />
                )}
              />
              <span className={cx('mes_error')}>
                {errors.password_confirmation?.type === 'required' && <FormattedMessage id="require" />}
                {errors.password_confirmation?.type === 'validate' && <FormattedMessage id="notMatchPass" />}
              </span>
            </Col>
            <Col md={12} className={cx('wrapper_btn')}>
              <Button
                className={cx('btn_submit', 'mt-4', 'mb-2', { disabled: loading })}
                type="submit"
                disabled={loading}
              >
                {(loading && <CircularProgress style={{ color: 'rgba(193, 200, 205, 0.8)' }} size={17} />) || (
                  <FormattedMessage id="confirm" />
                )}
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </ManagerLayout>
  );
}

export default ChangePassword;
