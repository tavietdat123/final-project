import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Calendarinput from '../../../../component/Calendarinput/Calendarinput';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormattedMessage } from 'react-intl';
import { Button, Link, TableCell, TableRow } from '@mui/material';
import { DeleteIcon, UploadIcon } from '../../../../component/icons';
import Line from '../../../../component/line/Line';
import Table from '../../../../component/table/Table';
import { memo, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultipleUpload, setMultipleUpload } from '../../redux/managerEmployeeSlice';
import { multipleUploadTableSelector } from '../../redux/employeeSelector';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ConfirmationDialog from '../../../../component/dialog/ConfirmationDialog';
const cx = classNames.bind(styles);

interface UpLoadFile {
  contract_date: string;
  document: File | undefined;
  name: string;
}
interface Column {
  id: string | string[];
  label: string;
  minWidth: string;
}

const columns: Column[] = [
  { id: 'no', label: 'No', minWidth: '50px' },
  { id: 'name', label: 'Contract Name', minWidth: '150px' },
  { id: 'contract_date', label: 'Sign Date', minWidth: '150px' },
  { id: 'action', label: 'Action', minWidth: '294px' },
];
function FormMultiple() {
  const [fileName, setFileName] = useState('');
  const dataTable = useSelector(multipleUploadTableSelector);
  const dispatch = useDispatch();
  const [onDelete, setOnDelete] = useState(false);
  const [name, setName] = useState('');
  const [idDelete, setIdDelete] = useState<number>(0);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpLoadFile>({
    mode: 'onBlur',
  });
  const handleCloseDelete = () => {
    setOnDelete(false);
  };
  const handleOpenDelete = (name: string, id: number) => {
    setName(name);
    setIdDelete(id);
    setOnDelete(true);
  };
  const onSubmit = (data: UpLoadFile) => {
    const newData = { ...data, contract_date: moment(data.contract_date).format('YYYY-MM-DD') };
    dispatch(setMultipleUpload(newData));
    reset();
    setFileName('');
  };
  const handleDeleteData = (id: number) => {
    dispatch(deleteMultipleUpload(id));
  };
  const handleDeleteDataUpdate = (id: number) => {
    dispatch(deleteMultipleUpload(id));
    setOnDelete(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('ci_upload_content')}>
      <div className={cx('ci_upload_wrapper')}>
        <Col md={12} className="d-flex align-items-center ">
          <Col md={4} className={cx('label')}>
            {/* <FormattedMessage id="dateofbirth" /> */}
            Contract Date
          </Col>
          <Col md={8}>
            <Controller
              name="contract_date"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }: any) => {
                return (
                  <div
                    className={cx('input', {
                      error: errors.contract_date,
                    })}
                    style={{ overflow: 'unset', padding: '0 12px' }}
                  >
                    <CalendarMonthIcon style={{ color: '#4fa3f0' }} />
                    <Calendarinput field={field} error={errors.contract_date ? true : false} />
                    {field.value && (
                      <CloseIcon
                        onClick={() => setValue('contract_date', '')}
                        style={{ fontSize: '25px', padding: '5px', cursor: 'pointer' }}
                      />
                    )}
                    <KeyboardArrowDownIcon />
                  </div>
                );
              }}
            />
            <span className={cx('mes_error')}>
              {errors.contract_date?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
        </Col>
        <Col md={12} className="d-flex align-items-center">
          <Col md={4} className={cx('label')}>
            {/* <FormattedMessage id="name" /> */}
            Contract Name
          </Col>
          <Col md={8}>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }: any) => (
                <input
                  {...field}
                  className={cx('input', {
                    error: errors.name,
                  })}
                />
              )}
            />
            <span className={cx('mes_error')}>
              {errors.name?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
        </Col>
        <div className={cx('ci_wrapper_btn_upload')}>
          <Button className={cx('ci_btn_upload')}>
            <label className="">
              <span>
                <UploadIcon />
                Upload file
                <Controller
                  name="document"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => {
                    return (
                      <input
                        type="file"
                        onChange={(e: any) => {
                          setFileName(e.target.files[0].name);
                          field.onChange(e.target.files[0]);
                        }}
                        hidden
                      />
                    );
                  }}
                />
              </span>
            </label>
          </Button>
          <span className={cx('mes_error')}>
            {errors.document?.type === 'required' && <FormattedMessage id="require" />}
          </span>
          <Button className={cx('ci_btn_add')} type="submit">
            Add
          </Button>
        </div>
        {fileName && (
          <div className={cx('file_name')}>
            <span>{fileName}</span>
            <CloseIcon
              onClick={() => {
                setValue('document', undefined);
                setFileName('');
              }}
              style={{ fontSize: '18px' }}
            />
          </div>
        )}
      </div>
      <Line orientation="vertical" flexItem />
      <Table
        classContainer={cx('table_container')}
        classWrapper={cx('no_width')}
        renderHead={
          <>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align="center"
                className={cx('tb_head')}
                style={{
                  minWidth: column.minWidth,
                  borderTopLeftRadius: index === 0 || index === columns.length - 1 ? '8px' : '',
                }}
                colSpan={column.label === 'Home Address' ? 2 : 1}
              >
                {column.label}
              </TableCell>
            ))}
          </>
        }
        renderBody={
          <>
            {onDelete && (
              <ConfirmationDialog
                open={onDelete}
                onConfirmDialogClose={handleCloseDelete}
                text={`This will delete the ${name} record. Are you sure to continue?`}
                title="Delete"
                onYesClick={() => handleDeleteDataUpdate(idDelete)}
                Yes="Yes"
                No="No"
              />
            )}
            {dataTable.map((row: any, index1: number) => {
              return (
                <TableRow className={cx('tr_body')} key={index1} role="checkbox" tabIndex={-1}>
                  {columns.map((colum: any, index) => {
                    if (colum.id === 'no') {
                      return (
                        <TableCell className={cx('td_body')} key={index} align="left">
                          {index1 + 1}
                        </TableCell>
                      );
                    } else if (colum.id === 'action') {
                      return (
                        <TableCell
                          className={cx('td_body', 'd-flex', 'justify-content-center', 'align-items-center')}
                          key={index}
                          align="left"
                        >
                          {!!row.id && (
                            <Link variant="button" className={cx('btn_down')} href={row.document} target="_blank">
                              <span className={cx('ell')}>
                                {row.document.substring(row.document.lastIndexOf('/') + 1)}
                              </span>
                              <FileDownloadIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
                            </Link>
                          )}

                          <Button
                            className={cx('btn_delete')}
                            disabled={false}
                            onClick={
                              !!row.id
                                ? () => {
                                    handleOpenDelete(row.name, index1);
                                  }
                                : () => handleDeleteData(index1)
                            }
                          >
                            <DeleteIcon /> Delete
                          </Button>
                        </TableCell>
                      );
                    } else if (colum.id === 'contract_date') {
                      return (
                        <TableCell className={cx('td_body')} key={index} align="left">
                          {row[colum.id]}
                        </TableCell>
                      );
                    } else if (colum.id === 'name') {
                      return (
                        <TableCell className={cx('td_body')} key={index} align="left">
                          {row[colum.id]}
                        </TableCell>
                      );
                    }
                    // eslint-disable-next-line array-callback-return
                    return;
                  })}
                </TableRow>
              );
            })}
          </>
        }
      />
    </form>
  );
}

export default memo(FormMultiple);
