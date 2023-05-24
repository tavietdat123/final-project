import Wrapper from './Wrapper';
import classNames from 'classnames/bind';
import style from './styles.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentEmpolyeeSelector } from '../../redux/employeeSelector';
const cx = classNames.bind(style);
interface FormDataSW {
  audit_salary: number | '';
  basic_salary: number | '';
  health_insurance: number | '';
  meal_allowance: number | '';
  safety_insurance: number | '';
}
function SalaryWages({
  data,
  handleError,
  handleOnAdd,
  handlleData,
}: {
  data: any;
  handleError: (number: number, boo?: boolean) => void;
  handleOnAdd: (boo: boolean) => void;
  handlleData: (data: any) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSW>({
    mode: 'onBlur',
  });
  const currentEmpolyee = useSelector(currentEmpolyeeSelector);
  const { id } = useParams();

  useEffect(() => {
    const fieldsToCheck: ('audit_salary' | 'basic_salary' | 'meal_allowance' | 'safety_insurance')[] = [
      'audit_salary',
      'basic_salary',
      'meal_allowance',
      'safety_insurance',
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
      handleOnAdd(true);
      handleError(3, true);
    } else {
      handleOnAdd(false);
      handleError(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentEmpolyee]);
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      handleOnAdd(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const onSubmit = (data: FormDataSW) => {};

  return (
    <Wrapper title="Salary & Wages">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('wrapper_contract')}>
          <div className={cx('salary_colum')}>
            <Col md={12} className="d-flex align-items-center ">
              <Col md={5} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Basic Salary
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="basic_salary"
                  control={control}
                  defaultValue={data.basic_salary}
                  rules={{ required: true }}
                  render={({ field }: any) => {
                    return (
                      <div
                        className={cx('input', {
                          error: errors.basic_salary,
                        })}
                      >
                        <span>Rp</span>
                        <input
                          className={cx('input_icon', { error: errors.basic_salary })}
                          type="number"
                          {...field}
                          value={data.basic_salary}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handlleData({ basic_salary: e.target.value });
                          }}
                        />
                      </div>
                    );
                  }}
                />
                <span className={cx('mes_error')}>
                  {errors.basic_salary?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Basic Salary (Audit)
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="audit_salary"
                  control={control}
                  defaultValue={data.audit_salary}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <div
                      className={cx('input', {
                        error: errors.audit_salary,
                      })}
                    >
                      <span>Rp</span>
                      <input
                        className={cx('input_icon', { error: errors.audit_salary })}
                        type="number"
                        {...field}
                        value={data.audit_salary}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handlleData({ audit_salary: e.target.value });
                        }}
                      />
                    </div>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.audit_salary?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Safety Insurance Amount
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="safety_insurance"
                  control={control}
                  defaultValue={data.safety_insurance}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <div
                      className={cx('input', {
                        error: errors.safety_insurance,
                      })}
                    >
                      <span>Rp</span>
                      <input
                        className={cx('input_icon', { error: errors.safety_insurance })}
                        type="number"
                        {...field}
                        value={data.safety_insurance}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handlleData({ safety_insurance: e.target.value });
                        }}
                      />
                    </div>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.safety_insurance?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Healthy Insurance Amount
              </Col>
              <Col md={7}>
                <Controller
                  name="health_insurance"
                  control={control}
                  defaultValue={data.health_insurance}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <div
                      className={cx('input', {
                        error: errors.health_insurance,
                      })}
                    >
                      <span>Rp</span>
                      <input
                        className={cx('input_icon', { error: errors.health_insurance })}
                        type="number"
                        {...field}
                        value={data.health_insurance}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handlleData({ health_insurance: e.target.value });
                        }}
                      />
                    </div>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.health_insurance?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
            <Col md={12} className="d-flex align-items-center">
              <Col md={5} className={cx('label')}>
                {/* <FormattedMessage id="placeofbirth" /> */}
                Meal Allowance
                <span style={{ color: 'rgb(229, 72, 77)' }}>*</span>
              </Col>
              <Col md={7}>
                <Controller
                  name="meal_allowance"
                  control={control}
                  defaultValue={data.meal_allowance}
                  rules={{ required: true }}
                  render={({ field }: any) => (
                    <div
                      className={cx('input', {
                        error: errors.meal_allowance,
                      })}
                    >
                      <span>Rp</span>
                      <input
                        className={cx('input_icon', { error: errors.meal_allowance })}
                        type="number"
                        {...field}
                        value={data.meal_allowance}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handlleData({ meal_allowance: e.target.value });
                        }}
                      />
                    </div>
                  )}
                />
                <span className={cx('mes_error')}>
                  {errors.meal_allowance?.type === 'required' && <FormattedMessage id="require" />}
                </span>
              </Col>
            </Col>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default memo(SalaryWages);
