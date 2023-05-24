import { Col } from 'react-bootstrap';
import Wrapper from './Wrapper';
import { FormattedMessage } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { MenuItem, Select } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Calendarinput from '../../../../component/Calendarinput/Calendarinput';
import CloseIcon from '@mui/icons-material/Close';
import Line from '../../../../component/line/Line';
import { memo, useEffect } from 'react';
import FormMultiple from './FormMultiple';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { currentEmpolyeeSelector } from '../../redux/employeeSelector';

const cx = classNames.bind(styles);
const employeeType = [
  { title: 'Permanent', value: '0' },
  { title: 'Part-time ', value: '1' },
  { title: 'Contract', value: '2' },
];

interface FormDataCI {
  contract_start_date: string;
  type: string;
}

function ContractInformation({
  data,
  handleError,
  handlleData,
  handleOnAdd,
}: {
  data: any;
  handleError: (number: number, boo?: boolean) => void;
  handlleData: (data: any) => void;
  handleOnAdd: (boo: boolean) => void;
}) {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormDataCI>({
    mode: 'onBlur',
  });
  const { id } = useParams<any>();
  const currentEmpolyee = useSelector(currentEmpolyeeSelector);

  const onSubmit = (data: FormDataCI) => {};
  // useEffect(() => {
  //   return () => {
  //     const fieldsToCheck: ('contract_start_date' | 'type')[] = ['contract_start_date', 'type'];

  //     let isError = false;
  //     fieldsToCheck.forEach((el) => {
  //       const value = watch(el);
  //       if (value === '') {
  //         isError = true;
  //       }
  //       return;
  //     });

  //     if (isError) {
  //       handleError(1);
  //     } else {
  //       handleError(1, true);
  //     }
  //   };
  // }, []);
  useEffect(() => {
    const fieldsToCheck: ('contract_start_date' | 'type')[] = ['contract_start_date', 'type'];
    let test = true;
    fieldsToCheck.forEach((el) => {
      const value = data[el];
      if (value === '') {
        test = false;
      }
      return;
    });
    if (test) {
      handleOnAdd(true);
      handleError(1, true);
    } else {
      handleOnAdd(false);
      handleError(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentEmpolyee]);
  return (
    <Wrapper title="Contract Information">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('wrapper_contract')}>
          <div className={cx('contract_colum')}>
            <Col md={12} style={{ maxWidth: '400px' }} className="d-flex align-items-center mb-2">
              <Col md={4} className={cx('label')}>
                Date Start
                {/* <FormattedMessage id="dateofbirth" /> */}
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={8}>
                <Controller
                  name="contract_start_date"
                  defaultValue={id ? moment(data.contract_start_date, 'YYYY-MM-DD').toDate() : data.contract_start_date}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => {
                    const newField = {
                      ...field,
                      value: data.contract_start_date ? moment(data.contract_start_date, 'YYYY-MM-DD').toDate() : '',

                      onChange: (e: any) => {
                        field.onChange(e);
                        handlleData({ contract_start_date: e });
                      },
                    };
                    return (
                      <div
                        className={cx('input', {
                          error: errors.contract_start_date,
                        })}
                        style={{ overflow: 'unset', padding: '0 12px' }}
                      >
                        <CalendarMonthIcon style={{ color: '#4fa3f0' }} />
                        <Calendarinput field={newField} error={errors.contract_start_date ? true : false} />
                        {data.contract_start_date && (
                          <CloseIcon
                            onClick={() => handlleData({ contract_start_date: '' })}
                            style={{ fontSize: '25px', padding: '5px', cursor: 'pointer' }}
                          />
                        )}
                        <KeyboardArrowDownIcon />
                      </div>
                    );
                  }}
                />
                <span className={cx('mes_error')}>
                  {errors.contract_start_date?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} style={{ maxWidth: '400px' }} className="d-flex align-items-center">
              <Col md={4} className={cx('label')}>
                {/* <FormattedMessage id="gender" /> */}
                Employee Type
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={8}>
                <Controller
                  name="type"
                  defaultValue={data.type}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <Select
                      disabled={!!id}
                      {...field}
                      className={cx({ disabled: !!id })}
                      displayEmpty
                      value={data.type ? data.type : ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ type: e.target.value });
                      }}
                      renderValue={(selected) => {
                        if (selected === '') return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose type</span>;
                        return employeeType.find((el) => el.value === selected)?.title;
                      }}
                      error={!!errors.type}
                    >
                      {employeeType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.type?.type === 'required' && <FormattedMessage id="require" />}
                  {errors.type?.type === 'validate' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
          </div>
        </div>
      </form>

      <div className={cx('ci_upload_container')}>
        <span className={cx('ci_upload_title')}>Contract:</span>
        <p className={cx('ci_upload_warn')}>Please upload pdf, png, xlsx, docx file format!</p>
        <Line style={{ margin: 0 }} />
        <FormMultiple />
      </div>
    </Wrapper>
  );
}

export default memo(ContractInformation);
