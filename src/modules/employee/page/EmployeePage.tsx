import ManagerLayout from '../../../layout/ManagerLayout';
import Breadcrumb from '../../../component/breadcrumb/Breadcrumb';
import { FormattedMessage } from 'react-intl';
import { InputAdornment, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import SearchIcon from '@mui/icons-material/Search';
import styles from './EmployeePage.module.scss';
import TableEmployee from './component/TableEmployee';
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
let test = false;

function EmployeePage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    test = true;
    setSearchValue(e.target.value);
  };
  const debounce = useDebounce(searchValue, 300);
  const navigate = useNavigate();
  useEffect(() => {
    const value = debounce.trim();
    if (test) {
      navigate(`/employee?search=${value}&page=1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  useEffect(() => {
    if (search) {
      setSearchValue(search);
    }
  }, []);
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
          onChange={handleChange}
          value={searchValue}
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
