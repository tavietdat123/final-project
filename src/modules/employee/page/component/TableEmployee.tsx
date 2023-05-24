import classNames from 'classnames/bind';
import styles from './TableEmployee.module.scss';
import { Button, Checkbox, CircularProgress, IconButton, Pagination, TableCell } from '@mui/material';
import { AddIcon, DeleteIcon, FileIcon } from '../../../../component/icons';
import { ChangeEvent, memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import TableItem from './TableItem';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Line from '../../../../component/line/Line';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, getEmployeeByPage } from '../../redux/employeeSilce';
import {
  currentPageEmployeeSelector,
  employeeSelector,
  firstPageEmployeeSelector,
  fromPageEmployeeSelector,
  getStateDeleteEmployeeSelector,
  lastPageEmployeeSelector,
  listPageEmployeeSelector,
  loadingEmployeeSelector,
  nextPageEmployeeSelector,
  prevPageEmployeeSelector,
  toPageEmployeeSelector,
  totalEmployeeSelector,
  totalPageEmployeeSelector,
} from '../../redux/employeeSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../configs/routes';
import Table from '../../../../component/table/Table';
import ConfirmationDialog from '../../../../component/dialog/ConfirmationDialog';
import { deleteMultipleEmployee, resetSuccessDeleteEmployee } from '../../redux/managerEmployeeSlice';
import { API_PATHS } from '../../../../configs/api';
import { searchEmployee } from '../../redux/employeeSilce';
const cx = classNames.bind(styles);
interface Column {
  id: string | string[];
  label: string;
  minWidth: string;
}

export const columns: readonly Column[] = [
  { id: 'staff_id', label: 'NIK', minWidth: '95px' },
  { id: 'name', label: 'Name', minWidth: '150px' },
  { id: 'gender', label: 'Gender', minWidth: '70px' },
  { id: 'card_number', label: 'Bank Card No.', minWidth: '130px' },
  { id: 'bank_account_no', label: 'Bank Account No.', minWidth: '150px' },
  { id: 'family_card_number', label: 'Family Card No.', minWidth: '150px' },
  { id: 'marriage_code', label: 'Marriage Status', minWidth: '130px' },
  { id: 'mother_name', label: 'Mother Name', minWidth: '150px' },
  { id: 'pob', label: 'Place of birth', minWidth: '115px' },
  { id: 'dob', label: 'Date of birth', minWidth: '115px' },
  { id: ['home_address_1', 'home_address_2'], label: 'Home Address', minWidth: '700px' },
  { id: 'nc_id', label: 'National Card ID No.', minWidth: '170px' },
  { id: 'contract_start_date', label: 'Date Start', minWidth: '90px' },
  { id: 'contracts', label: 'First Contract', minWidth: '110px' },
  { id: 'contracts', label: 'Second Contract', minWidth: '130px' },
  { id: 'contracts', label: 'End Contract', minWidth: '110px' },
  { id: 'department_name', label: 'Department', minWidth: '150px' },
  { id: 'type', label: 'Employee Type', minWidth: '120px' },
  { id: 'basic_salary', label: 'Salary Rp.', minWidth: '90px' },
  { id: 'position_name', label: 'Position', minWidth: '150px' },
  { id: 'entitle_ot', label: 'O/T Paid', minWidth: '80px' },
  { id: 'meal_allowance_paid', label: 'Meal paid', minWidth: '90px' },
  { id: 'meal_allowance', label: 'Meal Rp.', minWidth: '80px' },
  { id: 'grade_name', label: 'Grading', minWidth: '80px' },
];

function TableEmployee() {
  const [checked, setChecked] = useState(false);
  const [unCheck, setUnCheck] = useState(false);
  const [active, setActive] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState<number[]>([]);
  const loading = useSelector(loadingEmployeeSelector);
  const employeeList = useSelector(employeeSelector);
  const nextPage = useSelector(nextPageEmployeeSelector);
  const prevPage = useSelector(prevPageEmployeeSelector);
  const firstPage = useSelector(firstPageEmployeeSelector);
  const lastPage = useSelector(lastPageEmployeeSelector);
  const listPage = useSelector(listPageEmployeeSelector);
  const totalPage = useSelector(totalPageEmployeeSelector);
  const currentpage: any = useSelector(currentPageEmployeeSelector);
  const fromPage = useSelector(fromPageEmployeeSelector);
  const toPage = useSelector(toPageEmployeeSelector);
  const totalEmployee = useSelector(totalEmployeeSelector);
  const getStateDeleteEmployee = useSelector(getStateDeleteEmployeeSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [onDelete, setOndelete] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const searchValue = searchParams.get('search');
  useEffect(() => {
    if (searchValue) {
      dispatch<any>(searchEmployee(`${searchValue}&page=1`));
    }
  }, [searchValue]);
  useEffect(() => {
    if (searchValue) {
      dispatch<any>(searchEmployee(`${searchValue}&page=${page}`));
    } else if (page) {
      dispatch<any>(getEmployeeByPage(`${API_PATHS.employee}?page=${page}`));
    } else {
      dispatch<any>(getEmployee());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchValue]);
  useLayoutEffect(() => {
    if (page && parseInt(lastPage.substring(lastPage.lastIndexOf('=') + 1)) > 0 && employeeList.length === 0) {
      const page = lastPage.substring(lastPage.lastIndexOf('=') + 1);
      navigate(`/employee?page=${page}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeList, page, lastPage]);

  const currentListPage = listPage.filter((el, index) => {
    return (typeof parseInt(el.label) === 'number' && !Number.isNaN(parseInt(el.label))) || el.label === '...';
  });
  const handleSetDelete = useCallback((number: number, boo: boolean) => {
    if (!boo) {
      setDeleteEmployee((prev) => {
        return prev.filter((el) => el !== number);
      });
      return;
    }
    setDeleteEmployee((prev) => [...prev, number]);
  }, []);
  const handleOnDelete = () => {
    setOndelete(true);
  };
  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setDeleteEmployee([]);
    }
    setChecked(event.target.checked);
    setActive(event.target.checked);
    setUnCheck(!unCheck);
  };
  const handleFirstPage = () => {
    const page = firstPage.substring(firstPage.lastIndexOf('=') + 1);
    if (searchValue) {
      navigate(`/employee?search=${searchValue}&page=${page}`);
    } else {
      navigate(`/employee?page=${page}`);
    }
  };
  const handleLastPage = () => {
    const page = lastPage.substring(lastPage.lastIndexOf('=') + 1);
    if (searchValue) {
      navigate(`/employee?search=${searchValue}&page=${page}`);
    } else {
      navigate(`/employee?page=${page}`);
    }
  };

  const handlePrevPage = () => {
    const page = prevPage.substring(prevPage.lastIndexOf('=') + 1);
    if (searchValue) {
      navigate(`/employee?search=${searchValue}&page=${page}`);
    } else {
      navigate(`/employee?page=${page}`);
    }
  };
  const handleNextPage = () => {
    const page = nextPage.substring(nextPage.lastIndexOf('=') + 1);
    if (searchValue) {
      navigate(`/employee?search=${searchValue}&page=${page}`);
    } else {
      navigate(`/employee?page=${page}`);
    }
  };
  const handleClickpageNumber = (data: string) => {
    const page = data.substring(data.lastIndexOf('=') + 1);
    if (searchValue) {
      navigate(`/employee?search=${searchValue}&page=${page}`);
    } else {
      navigate(`/employee?page=${page}`);
    }
  };
  const handleClickAdd = () => {
    navigate(ROUTES.createOrUpdateEmployee);
  };
  const handleCloseDelete = useCallback(() => {
    setOndelete(false);
  }, []);
  useEffect(() => {
    if (getStateDeleteEmployee) {
      setDeleteEmployee([]);
      setChecked(false);
      setUnCheck(!unCheck);
      handleCloseDelete();
      dispatch(resetSuccessDeleteEmployee());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStateDeleteEmployee]);
  const handleYesDelete = () => {
    const check = employeeList.every((employee: any) => {
      if (!!deleteEmployee.find((el) => el === employee.id)) {
        return true;
      } else {
        return false;
      }
    });
    if (check) {
      if (page === lastPage.substring(lastPage.lastIndexOf('=') + 1)) {
        const newPage = parseInt(page) - 1;
        navigate(`/employee?page=${newPage}`);
      }
    }
    dispatch<any>(deleteMultipleEmployee(deleteEmployee));
  };
  useLayoutEffect(() => {
    if (employeeList.length !== 0) {
      const check = employeeList.every((employee: any) => {
        if (!!deleteEmployee.find((el) => el === employee.id)) {
          return true;
        } else {
          return false;
        }
      });
      if (check) {
        setChecked(true);
      } else {
        setChecked(false);
        setActive(false);
      }
    }
  }, [deleteEmployee, employeeList]);

  return (
    <div className={cx('wrapper')}>
      <div className="d-flex justify-content-end">
        <Button className={cx('add', 'btn')} onClick={handleClickAdd}>
          <AddIcon /> Add
        </Button>
        <Button className={cx('delete', 'btn')} disabled={deleteEmployee.length === 0} onClick={handleOnDelete}>
          <DeleteIcon /> Delete
        </Button>
        {onDelete && (
          <ConfirmationDialog
            open={onDelete}
            onConfirmDialogClose={handleCloseDelete}
            text="Are you sure you want to delete?"
            title="Delete"
            onYesClick={handleYesDelete}
            Yes="Yes"
            No="No"
          />
        )}
      </div>
      <Line />

      <Table
        classContainer={cx('table_container')}
        renderHead={
          <>
            <TableCell
              align="center"
              className={cx('tb_head')}
              style={{ minWidth: '36px', padding: 0, borderTopLeftRadius: '8px', zIndex: '2' }}
            >
              <Checkbox
                className={cx('check_box')}
                onChange={handleChecked}
                checked={checked}
                size="small"
                color="success"
                indeterminate={
                  deleteEmployee.length !== 0 &&
                  !employeeList.every((employee: any) => {
                    if (deleteEmployee.find((el) => el === employee.id)) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                }
              />
            </TableCell>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align="center"
                className={cx('tb_head')}
                style={{ minWidth: column.minWidth }}
                colSpan={column.label === 'Home Address' ? 2 : 1}
              >
                {column.label}
              </TableCell>
            ))}
          </>
        }
        renderBody={
          <>
            {employeeList.length === 0 && (
              <tr
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <td align="center" className=" d-flex border-0 flex-column">
                  <div>
                    <FileIcon />
                  </div>
                  No Data Your record will be synced here once it ready
                </td>
              </tr>
            )}
            {loading && (
              <tr
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <td align="center" className=" d-flex border-0">
                  <CircularProgress />
                </td>
              </tr>
            )}

            {employeeList.map((row: any, index: number) => {
              return (
                <TableItem
                  checked={active}
                  handleSetDelete={handleSetDelete}
                  unCheck={unCheck}
                  data={row}
                  key={row.id}
                  deleteEmployee={deleteEmployee}
                />
              );
            })}
          </>
        }
        pagition={
          <>
            <div className="d-flex align-items-center" style={{ padding: '10px 0' }}>
              <IconButton disabled={currentpage === 1 || loading} className={cx('ic')} onClick={handleFirstPage}>
                <KeyboardDoubleArrowLeftIcon />
              </IconButton>

              <IconButton disabled={currentpage === 1 || loading} className={cx('ic')} onClick={handlePrevPage}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Pagination
                page={currentpage ? currentpage : 0}
                count={currentListPage.length !== 0 ? currentListPage.length : 0}
                renderItem={(item) => {
                  if (item.type === 'page' && item.page && totalPage) {
                    const el = currentListPage[item.page - 1];
                    return (
                      <Button
                        disabled={loading}
                        className={cx('btn_paginate', {
                          active: el.active,
                        })}
                        onClick={() => {
                          if (!el.active) handleClickpageNumber(el.url);
                        }}
                      >
                        {el.label}
                      </Button>
                    );
                  } else if (item.type === 'end-ellipsis') {
                    return <div className={cx('ellipsis')}>...</div>;
                  } else if (item.type === 'start-ellipsis') {
                    return <div className={cx('ellipsis')}>...</div>;
                  }
                  return;
                }}
              />
              <IconButton disabled={currentpage === totalPage || loading} className={cx('ic')} onClick={handleNextPage}>
                <KeyboardArrowRightIcon />
              </IconButton>

              <IconButton disabled={currentpage === totalPage || loading} className={cx('ic')} onClick={handleLastPage}>
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
              <div className={cx('stack')}>
                {fromPage} - {toPage} of {totalEmployee}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default memo(TableEmployee);
