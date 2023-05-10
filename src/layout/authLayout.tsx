import { Container, Row, Col } from 'react-bootstrap';
import icons from '../assets/icons';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';
const cx = classNames.bind(styles);
function AuthLayout({ title = 'signIn', children }: any) {
  return (
    <Container fluid className="d-flex flex-column" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Row>
        <Col md={12} className="d-flex flex-column align-items-center">
          <img style={{ marginTop: '64px' }} src={icons.logo} alt="" />
          <h3 className={cx('title')}>
            <FormattedMessage id="titleAuthLayout" />
          </h3>
        </Col>
      </Row>
      <Row className="d-flex flex-column justify-content-between flex-grow-1">
        <Col md={12} className="d-flex flex-column align-items-center">
          <h3 className={cx('title_2')}>
            <FormattedMessage id={title} />
          </h3>
        </Col>
        <Col md={12} className="d-flex flex-column align-items-center">
          <div className={cx('form')}>{children}</div>
        </Col>
        <div className="flex-grow-1"></div>
        <Col md={12} className={cx('footer')}>
          <span>Copyright © 2022. All Rights Reserved</span>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthLayout;
