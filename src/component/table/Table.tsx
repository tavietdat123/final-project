import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { Paper, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import Line from '../line/Line';
const cx = classNames.bind(styles);
interface Props {
  renderHead: React.ReactNode;
  renderBody: React.ReactNode;
  pagition?: React.ReactNode;
  classContainer?: string;
  classWrapper?: string;
}
function Table({ renderHead, renderBody, pagition, classContainer, classWrapper }: Props) {
  return (
    <div className={cx('wrapper_table', classWrapper)}>
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
        <TableContainer className={cx('table_container', classContainer)}>
          <table>
            <TableHead>
              <TableRow style={{ backgroundColor: 'rgb(236, 238, 240)' }}>{renderHead}</TableRow>
            </TableHead>

            <TableBody>{renderBody}</TableBody>
          </table>
        </TableContainer>
        {pagition && <Line />}
        {pagition}
      </Paper>
    </div>
  );
}

export default Table;
