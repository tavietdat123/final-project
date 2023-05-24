import { Controller, useForm } from 'react-hook-form';
import Wrapper from './Wrapper';
import classNames from 'classnames/bind';
import style from './styles.module.scss';
import { Col } from 'react-bootstrap';
import { Checkbox, MenuItem, Select } from '@mui/material';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { departmentEmployeeSelector, positionEmployeeSelector } from '../../redux/employeeSelector';
const cx = classNames.bind(style);
interface FormDataED {
  department_id: number | '';
  position_id: number | '';
  entitle_ot: boolean;
  meal_allowance_paid: boolean;
  operational_allowance_paid: boolean;
  attendance_allowance_paid: boolean;
}

function EmploymentDetails({ data, handlleData }: { data: any; handlleData: (data: any) => void }) {
  const position = useSelector(positionEmployeeSelector);
  const department = useSelector(departmentEmployeeSelector);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormDataED>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FormDataED) => {
    console.log(data);
  };
  useEffect(() => {
    if (data.entitle_ot) {
      handlleData({ operational_allowance_paid: false });
      handlleData({ attendance_allowance_paid: false });
    } else {
      handlleData({ operational_allowance_paid: true });
      handlleData({ attendance_allowance_paid: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.entitle_ot]);
  return (
    <Wrapper title="Employment Details">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('wrapper_contract')}>
          <div className={cx('elDetail_colum')}>
            <Col md={12} style={{ maxWidth: '560px' }} className="d-flex align-items-center">
              <Col md={4} className={cx('label')}>
                Department
                {/* <FormattedMessage id="dateofbirth" /> */}
              </Col>
              <Col md={8}>
                <Controller
                  name="department_id"
                  defaultValue={''}
                  control={control}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ department_id: e.target.value });
                      }}
                      className="select_default"
                      displayEmpty
                      value={data.department_id ? data.department_id : ''}
                      renderValue={(selected) => {
                        if (!selected) return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose Department</span>;
                        return department.find((el: any) => el.id === selected)?.name;
                      }}
                      error={!!errors.department_id}
                    >
                      <MenuItem value={0}>N/A</MenuItem>
                      {department.map((option: any) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Col>
            </Col>
            <Col md={12} style={{ maxWidth: '560px' }} className="d-flex align-items-center">
              <Col md={4} className={cx('label')}>
                {/* <FormattedMessage id="gender" /> */}
                Position
              </Col>
              <Col md={8}>
                <Controller
                  name="position_id"
                  control={control}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handlleData({ position_id: e.target.value });
                      }}
                      className="select_default"
                      displayEmpty
                      value={data.position_id ? data.position_id : ''}
                      renderValue={(selected) => {
                        if (!selected) return <span style={{ color: 'rgb(104, 112, 118)' }}>Choose Position</span>;
                        return position.find((el: any) => el.id === selected)?.name;
                      }}
                    >
                      <MenuItem value={0}>N/A</MenuItem>
                      {position.map((option: any) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Col>
            </Col>

            <Col md={12} style={{ maxWidth: '560px', marginLeft: '-12px' }} className="d-flex align-items-center">
              <Controller
                name="entitle_ot"
                defaultValue={!!data.entitle_ot}
                control={control}
                render={({ field }: any) => {
                  return (
                    <Checkbox
                      {...field}
                      checked={!!data.entitle_ot ? !!data.entitle_ot : false}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handlleData({ entitle_ot: e.target.checked });
                      }}
                      id="checkbox1"
                      color="success"
                    />
                  );
                }}
              />
              {/* <FormattedMessage id="gender" /> */}
              <label htmlFor="checkbox1">Entitled OT</label>
            </Col>
            <Col md={12} style={{ maxWidth: '560px', marginLeft: '-12px' }} className="d-flex align-items-center">
              <Controller
                name="meal_allowance_paid"
                defaultValue={!!data.meal_allowance_paid}
                control={control}
                render={({ field }: any) => (
                  <Checkbox
                    {...field}
                    checked={data.meal_allowance_paid ? data.meal_allowance_paid : false}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      handlleData({ meal_allowance_paid: e.target.checked });
                    }}
                    id="checkbox2"
                    color="success"
                  />
                )}
              />
              {/* <FormattedMessage id="gender" /> */}
              <label htmlFor="checkbox2">Meal Allowance Paid</label>
            </Col>
            <Col md={12} style={{ maxWidth: '560px', marginLeft: '-12px' }} className="d-flex align-items-center">
              <Controller
                name="operational_allowance_paid"
                defaultValue={!!data.operational_allowance_paid}
                control={control}
                render={({ field }: any) => (
                  <Checkbox
                    {...field}
                    checked={!!data.operational_allowance_paid ? !!data.operational_allowance_paid : false}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      handlleData({ operational_allowance_paid: e.target.checked });
                    }}
                    disabled
                    color="success"
                  />
                )}
              />
              {/* <FormattedMessage id="gender" /> */}
              <label>Operational Allowance Paid</label>
            </Col>
            <Col md={12} style={{ maxWidth: '560px', marginLeft: '-12px' }} className="d-flex align-items-center">
              <Controller
                name="attendance_allowance_paid"
                control={control}
                defaultValue={!!data.attendance_allowance_paid ? !!data.attendance_allowance_paid : false}
                render={({ field }: any) => (
                  <Checkbox
                    {...field}
                    disabled
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      handlleData({ attendance_allowance_paid: e.target.checked });
                    }}
                    checked={!!data.attendance_allowance_paid}
                    color="success"
                  />
                )}
              />
              {/* <FormattedMessage id="gender" /> */}
              <label>Attendance Allowance Paid</label>
            </Col>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default memo(EmploymentDetails);
