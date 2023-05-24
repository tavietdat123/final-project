import { Col, Row } from 'react-bootstrap';
import AuthLayout from '../../../layout/authLayout';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../redux/authSlice';
import { loadingAuthSelector } from '../redux/authSelector';
import { ROUTES } from '../../../configs/routes';
const cx = classNames.bind(styles);
export interface FormDataSignin {
  username: string;
  password: string;
  company_id: number;
}
const currencies = [
  { title: 'SBM', value: 1 },
  { title: 'BMF', value: 2 },
];
function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector(loadingAuthSelector);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignin>();
  const onSubmit = (data: FormDataSignin) => {
    dispatch<any>(getToken(data));
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12} className="mt-2">
            <Col md={12} className={cx('label')}>
              <FormattedMessage id="UserName" />
            </Col>
            <Controller
              name="username"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }: any) => (
                <input
                  {...field}
                  className={cx('input', {
                    error: errors.username,
                  })}
                />
              )}
            />
            <span className={cx('mes_error')}>
              {errors.username?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
          <Col md={12} className="mt-2">
            <Col md={12} className={cx('label')}>
              <FormattedMessage id="passWord" />
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
          <Col md={12} className="mt-2">
            <Col md={12} className={cx('label')}>
              <FormattedMessage id="factory" />
            </Col>
            <Controller
              name="company_id"
              control={control}
              defaultValue={0}
              rules={{ required: true, validate: (value) => value !== 0 }}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    className="select_default"
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) return <span>Select Factory</span>;
                      return currencies.find((el) => el.value === selected)?.title;
                    }}
                    error={!!errors.company_id}
                  >
                    <MenuItem value={0} hidden></MenuItem>
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
            <span className={cx('mes_error')}>{errors.company_id && <FormattedMessage id="require" />}</span>
          </Col>
          <Col md={12} className={cx('wrapper_btn')}>
            <Button className={cx('btn_submit', { disabled: loading })} type="submit" disabled={loading}>
              {(loading && <CircularProgress style={{ color: 'rgba(193, 200, 205, 0.8)' }} size={17} />) || (
                <FormattedMessage id="signin" />
              )}
            </Button>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Link to={ROUTES.forgotPassword} className={cx('fogot')}>
              <FormattedMessage id="fogotPassWord" />
            </Link>
          </Col>
        </Row>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
