import classNames from 'classnames/bind';
import styles from './TableEmployee.module.scss';
import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Pagination,
  PaginationItem,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AddIcon, DeleteIcon } from '../../../../component/icons';
import { Table } from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react';
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
  lastPageEmployeeSelector,
  listPageEmployeeSelector,
  loadingEmployeeSelector,
  nextPageEmployeeSelector,
  prevPageEmployeeSelector,
  toPageEmployeeSelector,
  totalEmployeeSelector,
  totalPageEmployeeSelector,
} from '../../redux/employeeSelector';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../configs/routes';
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
  const loading = useSelector(loadingEmployeeSelector);
  const employeeList = useSelector(employeeSelector);
  const nextPage = useSelector(nextPageEmployeeSelector);
  const prevPage = useSelector(prevPageEmployeeSelector);
  const firstPage = useSelector(firstPageEmployeeSelector);
  const lastPage = useSelector(lastPageEmployeeSelector);
  const listPage = useSelector(listPageEmployeeSelector);
  const totalPage = useSelector(totalPageEmployeeSelector);
  const currentpage = useSelector(currentPageEmployeeSelector);
  const fromPage = useSelector(fromPageEmployeeSelector);
  const toPage = useSelector(toPageEmployeeSelector);
  const totalEmployee = useSelector(totalEmployeeSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getEmployee());
  }, []);
  const currentListPage = listPage.filter((el, index) => {
    return typeof parseInt(el.label) === 'number' && !Number.isNaN(parseInt(el.label));
  });

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };
  const handleFirstPage = () => {
    dispatch<any>(getEmployeeByPage(firstPage));
  };
  const handleLastPage = () => {
    dispatch<any>(getEmployeeByPage(lastPage));
  };

  const handlePrevPage = () => {
    dispatch<any>(getEmployeeByPage(prevPage));
  };
  const handleNextPage = () => {
    dispatch<any>(getEmployeeByPage(nextPage));
  };
  const handleClickpageNumber = (data: string) => {
    dispatch<any>(getEmployeeByPage(data));
  };
  const handleClickAdd = () => {
    navigate(ROUTES.createOrUpdateEmployee);
  };
  return (
    <div className={cx('wrapper')}>
      <div className="d-flex justify-content-end">
        <Button className={cx('add', 'btn')} onClick={handleClickAdd}>
          <AddIcon /> Add
        </Button>
        <Button className={cx('delete', 'btn')} disabled={false}>
          <DeleteIcon /> Delete
        </Button>
      </div>
      <Line />
      <div className={cx('wrapper_table')}>
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
          <TableContainer className={cx('table_container')}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'rgb(236, 238, 240)' }}>
                  <TableCell align="center" className={cx('tb_head')} style={{ minWidth: '36px', padding: 0 }}>
                    <Checkbox
                      className={cx('check_box')}
                      onChange={handleChecked}
                      value={checked}
                      size="small"
                      color="success"
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
                </TableRow>
              </TableHead>

              <TableBody>
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
                  return <TableItem checked={checked} data={row} key={index} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Line />
          <div className="d-flex align-items-center" style={{ padding: '10px 0' }}>
            <IconButton disabled={currentpage === 1 || loading} className={cx('ic')} onClick={handleFirstPage}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>

            <IconButton disabled={currentpage === 1 || loading} className={cx('ic')} onClick={handlePrevPage}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Pagination
              page={currentpage ? currentpage : 0}
              count={totalPage ? totalPage : 0}
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
        </Paper>
      </div>
    </div>
  );
}

export default TableEmployee;
