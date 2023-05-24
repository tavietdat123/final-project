import { Button, Col, Row } from 'react-bootstrap';
import AuthLayout from '../../../layout/authLayout';
import { FormattedMessage } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { loadingForgotSelector } from '../redux/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import { forgotPassWord } from '../redux/authSlice';
const cx = classNames.bind(styles);
export interface FormDataForgot {
  email: string;
}
function ForgotPasswordPage() {
  const loading = useSelector(loadingForgotSelector);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataForgot>();
  const onSubmit = (data: FormDataForgot) => {
    dispatch<any>(forgotPassWord(data));
  };
  return (
    <AuthLayout title="titlePageForgotPassword">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12} className="mt-2 mb-1">
            <Col md={12} className={cx('label', 'mb-3')}>
              <FormattedMessage id="labelForgotEmail" />
            </Col>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }: any) => (
                <input
                  {...field}
                  className={cx('input', {
                    error: errors.email,
                  })}
                />
              )}
            />
            <span className={cx('mes_error')}>
              {errors.email?.type === 'required' && <FormattedMessage id="require" />}
              {errors.email?.type === 'pattern' && <FormattedMessage id="messageErrorEmail" />}
            </span>
          </Col>
          <Col md={12} className={cx('wrapper_btn')}>
            <Button className={cx('btn_submit', 'mt-1', { disabled: loading })} type="submit" disabled={loading}>
              {(loading && <CircularProgress style={{ color: 'rgba(193, 200, 205, 0.8)' }} size={17} />) ||
                'Confirm & Send OTP'}
            </Button>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Link to={ROUTES.login} className={cx('fogot')}>
              <FormattedMessage id="backToSignIn" />
            </Link>
          </Col>
        </Row>
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
