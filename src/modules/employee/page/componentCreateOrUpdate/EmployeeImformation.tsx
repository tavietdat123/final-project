/* eslint-disable react/jsx-no-comment-textnodes */
import { Button, Col } from 'react-bootstrap';
import Wrapper from './Wrapper';
import { FormattedMessage } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { MenuItem, Select } from '@mui/material';
import { memo, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Calendarinput from '../../../../component/Calendarinput/Calendarinput';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { currentEmpolyeeSelector, marriageEmployeeSelector } from '../../redux/employeeSelector';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const cx = classNames.bind(styles);

interface FormDataCU {
  name: string;
  gender: number | '';
  mother_name: string;
  dob: string; //Date of birth
  pob: string; //Place of birth
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string;
  mobile_no: string;
  tel_no: string;
  marriage_id: number | '';
  card_number: string;
  bank_account_no: string;
  bank_name: string;
  family_card_number: string;
  safety_insurance_no: string;
  health_insurance_no: string;
}
const genderList = [
  { title: 'Male', value: 0 },
  { title: 'Female', value: 1 },
];

function EmployeeInformation({
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
  const marriage = useSelector(marriageEmployeeSelector);
  const { id } = useParams<any>();
  const currentEmpolyee = useSelector(currentEmpolyeeSelector);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataCU>({
    mode: 'onBlur',
  });
  const onSubmit = (data: FormDataCU) => {};
  useEffect(() => {
    // if (id && Object.keys(currentEmpolyee).length !== 0) {
    const fieldsToCheck: ('name' | 'gender' | 'dob' | 'ktp_no' | 'nc_id')[] = [
      'name',
      'gender',
      'dob',
      'ktp_no',
      'nc_id',
    ];
    let test = true;
    fieldsToCheck.forEach((el) => {
      const value = data[el];
      if (value === '') {
        test = false;
      }
      return;
    });
    if (test) {
      if (id) {
        handleOnAdd(true);
      }

      handleError(0, true);
    } else {
      handleOnAdd(false);
      handleError(0);
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentEmpolyee]);
  return (
    <Wrapper title="Personal Information">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" hidden></Button>
        <div className={cx('wrapper_info')}>
          <div className={cx('info_colum')}>
            {!!id && (
              <Col md={12} className={cx('d-flex', 'align-items-center', { 'd-none': !id })}>
                <Col md={5} className={cx('label')}>
                  NIK
                </Col>
                <Col md={7}>
                  <input
                    value={data.staff_id ? data.staff_id : ''}
                    disabled
                    onChange={() => {}}
                    className={cx('input', 'disabled')}
                  />
                </Col>
              </Col>
            )}
            <Col md={12} className="d-flex align-items-center ">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="name" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="name"
                  defaultValue={data.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ name: e.target.value });
                      }}
                      value={data.name ? data.name : ''}
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
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="gender" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="gender"
                  defaultValue={data.gender}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      className="select_default"
                      displayEmpty
                      value={data.gender || data.gender === 0 ? data.gender : ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ gender: e.target.value });
                      }}
                      renderValue={(selected) => {
                        if (selected === '') {
                          return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose gender</span>;
                        }
                        return genderList.find((el) => {
                          return el.value === selected;
                        })?.title;
                      }}
                      error={!!errors.gender}
                    >
                      {genderList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.gender?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="motherName" />
              </Col>
              <Col md={7}>
                <Controller
                  name="mother_name"
                  defaultValue={data.mother_name}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ mother_name: e.target.value });
                      }}
                      value={data.mother_name ? data.mother_name : ''}
                      className={cx('input', {
                        error: errors.mother_name,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.mother_name?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="dateofbirth" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="dob"
                  defaultValue={data.dob}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => {
                    const newField = {
                      ...field,
                      value: data.dob ? moment(data.dob, 'YYYY-MM-DD').toDate() : '',

                      onChange: (e: any) => {
                        field.onChange(e);
                        handlleData({ dob: e });
                      },
                    };
                    return (
                      <div
                        className={cx('input', {
                          error: errors.dob,
                        })}
                        style={{ overflow: 'unset', padding: '0 12px' }}
                      >
                        <CalendarMonthIcon style={{ color: '#4fa3f0' }} />
                        <Calendarinput field={newField} error={errors.dob ? true : false} />
                        {data.dob && (
                          <CloseIcon
                            onClick={() => handlleData({ dob: '' })}
                            style={{ fontSize: '25px', padding: '5px', cursor: 'pointer' }}
                          />
                        )}
                        <KeyboardArrowDownIcon />
                      </div>
                    );
                  }}
                />
                <span className={cx('mes_error')}>
                  {errors.dob?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="placeofbirth" />
              </Col>
              <Col md={7}>
                <Controller
                  name="pob"
                  defaultValue={data.pob}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ pob: e.target.value });
                      }}
                      value={data.pob ? data.pob : ''}
                      className={cx('input', {
                        error: errors.pob,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.pob?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="KTPNo" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="ktp_no"
                  defaultValue={data.ktp_no}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ ktp_no: e.target.value });
                      }}
                      value={data.ktp_no ? data.ktp_no : ''}
                      className={cx('input', {
                        error: errors.ktp_no,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.ktp_no?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="NationalCardID" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="nc_id"
                  defaultValue={data.nc_id}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ nc_id: e.target.value });
                      }}
                      value={data.nc_id ? data.nc_id : ''}
                      className={cx('input', {
                        error: errors.nc_id,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.nc_id?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="homeAddress1" />
              </Col>
              <Col md={7}>
                <Controller
                  name="home_address_1"
                  defaultValue={data.home_address_1}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ home_address_1: e.target.value });
                      }}
                      value={data.home_address_1 ? data.home_address_1 : ''}
                      className={cx('input', {
                        error: errors.home_address_1,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.home_address_1?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="homeAddress2" />
              </Col>
              <Col md={7}>
                <Controller
                  name="home_address_2"
                  defaultValue={data.home_address_2}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ home_address_2: e.target.value });
                      }}
                      value={data.home_address_2 ? data.home_address_2 : ''}
                      className={cx('input', {
                        error: errors.home_address_2,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.home_address_2?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
          </div>

          <div className={cx('info_colum')}>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="mobileNo" />
              </Col>
              <Col md={7}>
                <Controller
                  name="mobile_no"
                  defaultValue={data.home_address_2}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ mobile_no: e.target.value });
                      }}
                      value={data.mobile_no ? data.mobile_no : ''}
                      className={cx('input', {
                        error: errors.mobile_no,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.mobile_no?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="TelNo" />
              </Col>
              <Col md={7}>
                <Controller
                  name="tel_no"
                  defaultValue={data.tel_no}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ tel_no: e.target.value });
                      }}
                      value={data.tel_no ? data.tel_no : ''}
                      className={cx('input', {
                        error: errors.tel_no,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.tel_no?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="marriageStatus" />
              </Col>
              <Col md={7}>
                <Controller
                  name="marriage_id"
                  defaultValue={data.marriage_id ? data.marriage_id : ''}
                  control={control}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      className="select_default"
                      displayEmpty
                      value={data.marriage_id ? (data.marriage_id ? data.marriage_id : '' ? data.marriage_id : '') : ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ marriage_id: e.target.value });
                      }}
                      renderValue={(selected) => {
                        if (!selected)
                          return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose Marriage Status</span>;
                        return marriage.find((el: any) => el.id === selected)?.name;
                      }}
                      error={!!errors.marriage_id}
                    >
                      <MenuItem selected value="">
                        N/A
                      </MenuItem>
                      {marriage.map((option: any) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.marriage_id?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="bankCardNo" />
              </Col>
              <Col md={7}>
                <Controller
                  name="card_number"
                  defaultValue={data.card_number}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ card_number: e.target.value });
                      }}
                      value={data.card_number ? data.card_number : ''}
                      className={cx('input', {
                        error: errors.card_number,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.card_number?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="bankAccountNo" />
              </Col>
              <Col md={7}>
                <Controller
                  name="bank_account_no"
                  defaultValue={data.bank_account_no}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ bank_account_no: e.target.value });
                      }}
                      value={data.bank_account_no ? data.bank_account_no : ''}
                      className={cx('input', {
                        error: errors.bank_account_no,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.bank_account_no?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="bankName" />
              </Col>
              <Col md={7}>
                <Controller
                  name="bank_name"
                  defaultValue={data.bank_name}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ bank_name: e.target.value });
                      }}
                      value={data.bank_name ? data.bank_name : ''}
                      className={cx('input', {
                        error: errors.bank_name,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.bank_name?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="familyCardNumber" />
              </Col>
              <Col md={7}>
                <Controller
                  name="family_card_number"
                  defaultValue={data.family_card_number}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ family_card_number: e.target.value });
                      }}
                      value={data.family_card_number ? data.family_card_number : ''}
                      className={cx('input', {
                        error: errors.family_card_number,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.family_card_number?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="safetyInsuranceNo" />
              </Col>
              <Col md={7}>
                <Controller
                  name="safety_insurance_no"
                  defaultValue={data.safety_insurance_no}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ safety_insurance_no: e.target.value });
                      }}
                      value={data.safety_insurance_no ? data.safety_insurance_no : ''}
                      className={cx('input', {
                        error: errors.safety_insurance_no,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.safety_insurance_no?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="healthInsuranceNo" />
              </Col>
              <Col md={7}>
                <Controller
                  name="health_insurance_no"
                  defaultValue={data.health_insurance_no}
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ health_insurance_no: e.target.value });
                      }}
                      value={data.health_insurance_no ? data.health_insurance_no : ''}
                      className={cx('input', {
                        error: errors.health_insurance_no,
                      })}
                    />
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.health_insurance_no?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default memo(EmployeeInformation);
