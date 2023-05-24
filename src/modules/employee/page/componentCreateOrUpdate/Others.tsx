import { Controller, useForm } from 'react-hook-form';
import Wrapper from './Wrapper';
import { Col } from 'react-bootstrap';
import { Chip, Button, TableCell, TableRow, Link } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { gradeEmployeeSelector, uploadTableSelector } from '../../redux/employeeSelector';
import Select, { components } from 'react-select';
import { benefitEmployeeSelector } from '../../redux/employeeSelector';
import { DeleteIcon, UploadIcon } from '../../../../component/icons';
import Table from '../../../../component/table/Table';
import { ChangeEvent, memo } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { deleteUpload, setUpload } from '../../redux/managerEmployeeSlice';
import moment from 'moment';
const cx = classNames.bind(styles);
interface FormDataO {
  grade_id: number | { value: number; label: string };
  benefits: number[];
  remark: string;
}
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '6px',
    borderColor: 'none',
    boxShadow: 'none',
    backgroundColor: 'rgb(241, 243, 245)',
  }),
};
interface Column {
  id: string | string[];
  label: string;
  minWidth: string;
}
const columns: Column[] = [
  { id: 'no', label: 'No', minWidth: '50px' },
  { id: 'name', label: 'Document Name', minWidth: '345px' },
  { id: 'created_at', label: 'Created At', minWidth: '345px' },
  { id: 'action', label: 'Action', minWidth: '345px' },
];
function Others({ data, handlleData }: { data: any; handlleData: (data: any) => void }) {
  const dispatch = useDispatch();
  const listUpload = useSelector(uploadTableSelector);
  const gradeList = useSelector(gradeEmployeeSelector).map((el: any) => ({
    value: el.id,
    label: el.name,
    benefits: el.benefits,
  }));
  const benifitList = useSelector(benefitEmployeeSelector).map((el: any) => ({
    value: el.id,
    label: el.name,
  }));

  const { control, handleSubmit,  } = useForm<FormDataO>({
    mode: 'onBlur',
  });
  const { ClearIndicator } = components;
  const onSubmit = (data: FormDataO) => {};
  const ClearIndicatorWithIcon = (props: any) => {
    const handleClearIndicatorClick = (e: any) => {
      e.stopPropagation();
      props.clearValue();
    };
    return (
      <ClearIndicator {...props}>
        <span className="clear-indicator-icon" onClick={handleClearIndicatorClick}>
          &#x2715;
        </span>
      </ClearIndicator>
    );
  };
  const handleChangeUpLoad = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUpload({ document: e.target.files?.[0], create_at: moment(new Date()).format('YYYY-MM-DD') }));
  };
  const handleDeleteData = (id: number) => {
    dispatch(deleteUpload(id));
  };
  return (
    <Wrapper title="Others">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('wrapper_contract')}>
          <div className={cx('salary_colum')}>
            <Col md={12} className="d-flex align-items-center ">
              <Col md={4} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Grade
              </Col>
              <Col md={8}>
                <Controller
                  name="grade_id"
                  control={control}
                  defaultValue={data.grade_id}
                  render={({ field }: any) => (
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="color"
                      options={gradeList}
                      styles={customStyles}
                      placeholder=""
                      defaultValue={null}
                      components={{ IndicatorSeparator: null, ClearIndicator: ClearIndicatorWithIcon }}
                      isClearable
                      {...field}
                      value={
                        data.grade_id
                          ? data.grade_id.label
                            ? data.grade_id
                            : gradeList.find((el: any) => el.value === data.grade_id)
                          : ''
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        handlleData({ grade_id: selectedOption });
                      }}
                    />
                  )}
                />
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center ">
              <Col md={4} className={cx('label')}></Col>
              <Col md={8}>
                <>
                  {(typeof data.grade_id === 'object' &&
                    data.grade_id &&
                    Object.keys(gradeList).length !== 0 &&
                    gradeList
                      .find((el: any) => {
                        return el.value === data.grade_id.value;
                      })
                      ?.benefits.map((el: any, index: string) => {
                        return <Chip className={cx('chip')} key={index} label={el.name} />;
                      })) ||
                    (typeof data.grade_id === 'number' &&
                      gradeList
                        .find((el: any) => el.value === data.grade_id)
                        ?.benefits.map((el: any, index: string) => {
                          return <Chip className={cx('chip')} key={index} label={el.name} />;
                        }))}
                </>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center ">
              <Col md={4} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Benefit
              </Col>
              <Col md={8}>
                <Controller
                  name="benefits"
                  control={control}
                  defaultValue={data.benefits}
                  render={({ field }: any) => (
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="color"
                      isMulti
                      options={benifitList}
                      styles={customStyles}
                      placeholder=""
                      defaultValue={null}
                      components={{ IndicatorSeparator: null, ClearIndicator: ClearIndicatorWithIcon }}
                      isClearable
                      {...field}
                      value={
                        data.benefits
                          ? data.benefits.map((el: any) => {
                              if (el.id) {
                                return {
                                  value: el.id,
                                  label: el.name,
                                  benefits: el.benefits,
                                };
                              } else {
                                return el;
                              }
                            })
                          : ''
                      }
                      onChange={(selectedOptions: any) => {
                        const selectedValues = selectedOptions ? selectedOptions : [];
                        field.onChange(selectedValues);
                        handlleData({ benefits: selectedValues });
                      }}
                    />
                  )}
                />
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center ">
              <Col md={4} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Remark
              </Col>
              <Col md={8}>
                <Controller
                  name="remark"
                  control={control}
                  defaultValue={data.remark}
                  render={({ field }: any) => (
                    <div className={cx('input')} style={{ height: '70px', padding: '6px 12px' }}>
                      <textarea
                        {...field}
                        value={data.remark ? data.remark : ''}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handlleData({ remark: e.target.value });
                        }}
                        style={{
                          // height: '70px',
                          maxHeight: '70px',
                          overflow: 'auto',
                          padding: 0,
                          resize: 'none',
                        }}
                        className={cx('input')}
                      ></textarea>
                    </div>
                  )}
                />
              </Col>
            </Col>
          </div>
          <div className={cx('ci_upload_container')}>
            <Col className={cx('wrapper_upload_O')}>
              <Col md={4}>Document</Col>
              <Col md={8}>
                <Button
                  className={cx('ci_btn_upload')}
                  style={{ minWidth: '98px', height: '32px', fontWeight: 400, fontSize: '14px' }}
                >
                  <label className="">
                    <span>
                      <UploadIcon />
                      Upload
                      <input hidden accept="image/*,.pdf,.csv,.xlsx,.docx" onChange={handleChangeUpLoad} type="file" />
                    </span>
                  </label>
                </Button>
              </Col>
            </Col>
            <div style={{ padding: '0 20px 20px' }}>
              <Table
                classContainer={cx('table_container')}
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
                    {listUpload.map((row: any, index1: number) => {
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
                                  align="center"
                                >
                                  {row.id && (
                                    <Link
                                      variant="button"
                                      className={cx('btn_down')}
                                      href={row.document}
                                      target="_blank"
                                      style={{ width: '40px', padding: '8px 12px', height: '24px' }}
                                    >
                                      <FileDownloadIcon sx={{ fontSize: '16px' }} />
                                    </Link>
                                  )}
                                  <Button
                                    className={cx('btn_delete')}
                                    disabled={false}
                                    onClick={() => handleDeleteData(index1)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </TableCell>
                              );
                            } else if (colum.id === 'created_at') {
                              return (
                                <TableCell className={cx('td_body')} key={index} align="left">
                                  {row.id ? moment(row.create_at).format('YYYY-MM-DD') : row?.create_at}
                                </TableCell>
                              );
                            } else if (colum.id === 'name') {
                              return (
                                <TableCell className={cx('td_body')} key={index} align="left">
                                  {row.id
                                    ? row.document.substring(row.document.lastIndexOf('/') + 1)
                                    : row?.document.name}
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
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default memo(Others);
