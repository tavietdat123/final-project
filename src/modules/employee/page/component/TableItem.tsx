import { Checkbox, TableCell, TableRow } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './TableEmployee.module.scss';
import { columns } from './TableEmployee';
import { ChangeEvent, useEffect, useState } from 'react';
import { EmployeeType, GenderCode } from '../../../../component/enums';
const cx = classNames.bind(styles);
function TableItem({ data, checked }: any) {
  const [active, setActive] = useState(false);
  const handleChangeActive = (e: ChangeEvent<HTMLInputElement>) => {
    setActive(!active);
  };
  useEffect(() => {
    setActive(checked);
  }, [checked]);
  return (
    <TableRow className={cx('tr_body', { active })} role="checkbox" tabIndex={-1}>
      <TableCell align="center" className={cx('td_body')} style={{ minWidth: '36px', padding: 0, textAlign: 'center' }}>
        <Checkbox
          className={cx('check_box')}
          size="small"
          onChange={handleChangeActive}
          checked={active}
          color="success"
        />
      </TableCell>
      {columns.map((column: any, index: number) => {
        if (column.id === 'contracts' && column.label === 'First Contract') {
          return (
            <TableCell className={cx('td_body')} key={index} align="left">
              {data[column.id][0] ? data[column.id][0].contract_date : ''}
            </TableCell>
          );
        } else if (column.id === 'contracts' && column.label === 'Second Contract') {
          return (
            <TableCell className={cx('td_body')} key={index} align="left">
              {data[column.id][1] ? data[column.id][1].contract_date : ''}
            </TableCell>
          );
        } else if (column.id === 'contracts' && column.label === 'End Contract') {
          return (
            <TableCell className={cx('td_body')} key={index} align="left">
              {data[column.id][2] ? data[column.id][2].contract_date : ''}
            </TableCell>
          );
        } else if (column.id === 'gender') {
          return (
            <TableCell className={cx('td_body')} key={index} align="left">
              {data[column.id] === 0 ? GenderCode.MALE.name : GenderCode.FEMALE.name}
            </TableCell>
          );
        } else if (column.id === 'type') {
          let value;
          if (data[column.id] === '0') {
            value = EmployeeType.PERMANENT.name;
          } else if (data[column.id] === '1') {
            value = EmployeeType.PART_TIME.name;
          } else if (data[column.id] === '2') {
            value = EmployeeType.IN_CONTRACT.name;
          }
          return (
            <TableCell className={cx('td_body')} key={index} align="left">
              {value}
            </TableCell>
          );
        } else if (column.id === 'entitle_ot' || column.id === 'meal_allowance_paid') {
          return (
            <TableCell className={cx('td_body')} key={index} align="left">
              {data[column.id] === 0 ? '' : 'Yes'}
            </TableCell>
          );
        } else if (column.label === 'Home Address') {
          return column.id.map((el: string) => {
            return (
              <TableCell className={cx('td_body')} key={el} align="left">
                {data[el]}
              </TableCell>
            );
          });
        }

        const value = data[column.id];

        return (
          <TableCell className={cx('td_body')} key={index} align="left">
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default TableItem;
