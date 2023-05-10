/* eslint-disable react/jsx-no-comment-textnodes */
import { Col, Row } from 'react-bootstrap';
import Wrapper from './Wrapper';
import { FormattedMessage } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const cx = classNames.bind(styles);

interface FormDataCU {
  name: string;
  gender: number;
  mother_name: string;
  dob: string; //Date of birth
  pob: string; //Place of birth
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string;
  mobile_no: string;
  tel_no: string;
  marriage_code: string;
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
const listMarriage_code = [
  { title: 'N/A', value: 0 },
  { title: 'Married', value: 1 },
  { title: 'Single', value: 2 },
  { title: 'Married with 1 kid', value: 3 },
];

function EmployeeInformation() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataCU>({
    mode: 'onBlur',
  });
  const [startDate, setStartDate] = useState(new Date());
  const onSubmit = (data: FormDataCU) => {};
  return (
    <Wrapper title="Personal Information">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('wrapper_info')}>
          <div className={cx('info_colum')}>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="name" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
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
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                <FormattedMessage id="gender" />
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="gender"
                  defaultValue={-1}
                  control={control}
                  rules={{ required: true, validate: (value) => value !== -1 }}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      className="select_default"
                      displayEmpty
                      renderValue={(selected) => {
                        if (selected === -1) return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose gender</span>;
                        return genderList.find((el) => el.value === selected)?.title;
                      }}
                      error={!!errors.gender}
                    >
                      <MenuItem value={-1} hidden></MenuItem>
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
                  {errors.gender?.type === 'validate' && <FormattedMessage id="require" />}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <div
                      className={cx('input', {
                        error: errors.dob,
                      })}
                      style={{ overflow: 'unset', padding: '0 12px' }}
                    >
                      <CalendarMonthIcon style={{ color: '#4fa3f0' }} />
                      <DatePicker
                        selected={startDate}
                        {...field}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        className={cx({ errorDate: errors.dob })}
                      />

                      <KeyboardArrowDownIcon />
                    </div>
                  )}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  name="marriage_code"
                  defaultValue={'0'}
                  control={control}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      className="select_default"
                      displayEmpty
                      renderValue={(selected) => {
                        if (selected === 0) return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose gender</span>;
                        return listMarriage_code.find((el) => el.value === selected)?.title;
                      }}
                      error={!!errors.marriage_code}
                    >
                      {listMarriage_code.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.marriage_code?.type === 'required' && <FormattedMessage id="require" />}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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
                  defaultValue=""
                  control={control}
                  render={({ field }: any) => (
                    <input
                      {...field}
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

export default EmployeeInformation;
