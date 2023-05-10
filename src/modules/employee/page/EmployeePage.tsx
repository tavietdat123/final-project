import ManagerLayout from '../../../layout/ManagerLayout';
import Breadcrumb from '../../../component/breadcrumb/Breadcrumb';
import { FormattedMessage } from 'react-intl';
import { InputAdornment, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import SearchIcon from '@mui/icons-material/Search';
import styles from './EmployeePage.module.scss';
import TableEmployee from './component/TableEmployee';
const cx = classNames.bind(styles);
function EmployeePage() {
  return (
    <ManagerLayout>
      <Breadcrumb routeSegments={[{ name: 'General', path: '/' }, { name: 'Employee Management' }]} />
      <div className={cx('wrapper_title')}>
        <h3>
          <FormattedMessage id="employeeManagement" />
        </h3>
        <TextField
          className={cx('search')}
          id="input-with-icon-textfield"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>
      <TableEmployee />
    </ManagerLayout>
  );
}

export default EmployeePage;
