import { Button, Container } from 'react-bootstrap';
import images from '../../assets/img';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../configs/routes';

function NotFound() {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-column align-items-center">
        <img src={images.notFound} style={{ width: '400px' }} alt="" />
        <Button style={{ maxWidth: '200px', marginTop: '20px' }}>
          <Link to={ROUTES.home} style={{ color: '#fff', textDecoration: 'none' }}>
            Back to Home
          </Link>
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
