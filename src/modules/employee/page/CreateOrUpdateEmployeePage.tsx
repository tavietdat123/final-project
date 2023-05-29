import { FormattedMessage } from 'react-intl';
import Breadcrumb from '../../../component/breadcrumb/Breadcrumb';
import { ROUTES } from '../../../configs/routes';
import ManagerLayout from '../../../layout/ManagerLayout';
import classNames from 'classnames/bind';
import styles from './CreateOrUpdateEmployeePage.module.scss';
import { Box, Button, CircularProgress } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import EmployeeInformation from './componentCreateOrUpdate/EmployeeImformation';
import EmploymentDetails from './componentCreateOrUpdate/EmploymentDetails';
import ContractInformation from './componentCreateOrUpdate/ContractInformation';
import SalaryWages from './componentCreateOrUpdate/SalaryWages';
import Others from './componentCreateOrUpdate/Others';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEmployee,
  getBenefit,
  getDefaultSalary,
  getDepartment,
  getEmployeeById,
  getGrade,
  getMarriage,
  getPosition,
  resetCurrentEmployee,
  resetListDeleteDocumentUpdate,
  resetListDeleteUpdate,
  resetMultipleUpload,
  resetUpload,
  setMultipleUpload,
  setUpload,
  updateEmployee,
} from '../redux/managerEmployeeSlice';
import { WarnIcon } from '../../../component/icons';
import {
  currentEmpolyeeSelector,
  defaultSalaryEmployeeSelector,
  gradeEmployeeSelector,
  loadingAddOrUpdateSelector,
} from '../redux/employeeSelector';
import moment from 'moment';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return <div>{value === index && <Box>{children}</Box>}</div>;
}

function CreateOrUpdateEmployeePage() {
  const [errors, setError] = useState<number[]>([]);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [onAdd, setOnAdd] = useState(false);
  const gradeList = useSelector(gradeEmployeeSelector);
  const { id } = useParams<any>();
  const currentEmpolyee = useSelector(currentEmpolyeeSelector);
  const loading = useSelector(loadingAddOrUpdateSelector);
  const [formValues, setFormValues] = useState<any>({
    account_user_id: null,
    attendance_allowance_paid: true,
    audit_salary: '',
    bank_account_no: '',
    bank_name: '',
    basic_salary: '',
    benefits: [],
    card_number: '',
    contract_start_date: '',
    contracts: [],
    deleted_ids: [],
    department_id: '',
    dob: '',
    document_upload: null,
    documents: [],
    entitle_ot: false,
    family_card_number: '',
    gender: '',
    grade: null,
    grade_id: null,
    health_insurance: '',
    health_insurance_no: '',
    home_address_1: '',
    home_address_2: '',
    ktp_no: '',
    marriage_id: '',
    meal_allowance: '',
    meal_allowance_paid: false,
    mobile_no: '',
    mother_name: '',
    name: '',
    nc_id: '',
    operational_allowance_paid: true,
    pob: '',
    position_id: '',
    remark: '',
    safety_insurance: '',
    safety_insurance_no: '',
    staff_id: '',
    tel_no: '',
    type: '',
    user: null,
    userAccount: null,
  });
  useEffect(() => {
    if (id) {
      dispatch<any>(getEmployeeById(id));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(currentEmpolyee).length !== 0 && id) {
      setFormValues((prev: any) => ({ ...prev, ...currentEmpolyee }));
      dispatch(setMultipleUpload(currentEmpolyee.contracts));
      dispatch(setUpload(currentEmpolyee.documents));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEmpolyee]);
  const defaultSalary = useSelector(defaultSalaryEmployeeSelector);
  const handleOnAdd = useCallback((boo: boolean) => {
    setOnAdd(boo);
  }, []);
  const handlleData = useCallback((data: any) => {
    setFormValues((prev: any) => ({ ...prev, ...data }));
  }, []);
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  const handleError = useCallback((number: number, boo?: boolean) => {
    if (boo) {
      setError((prev) => prev.filter((el) => el !== number));
      return;
    }
    setError((prev) => [...prev, number]);
  }, []);
  useEffect(() => {
    if (Object.keys(defaultSalary).length !== 0 && !id) {
      setFormValues((prev: any) => ({ ...prev, ...defaultSalary }));
    }
  }, [defaultSalary]);
  useEffect(() => {
    return () => {
      dispatch(resetMultipleUpload());
      dispatch(resetUpload());
      dispatch(resetCurrentEmployee());
      dispatch(resetListDeleteUpdate());
      dispatch(resetListDeleteDocumentUpdate());
    };
  }, []);
  useEffect(() => {
    dispatch<any>(getMarriage());
    dispatch<any>(getPosition());
    dispatch<any>(getDepartment());
    dispatch<any>(getDefaultSalary());
    dispatch<any>(getBenefit());
    dispatch<any>(getGrade());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddEmployee = () => {
    const newFormValue = {
      ...formValues,
      grade_id: formValues.grade_id
        ? formValues.grade_id.value
          ? formValues.grade_id.value
          : formValues.grade_id
        : null,
      grade: formValues.grade_id
        ? formValues.grade_id.value
          ? gradeList.find((el: any) => el.id === formValues.grade_id.value)
          : gradeList.find((el: any) => el.id === formValues.grade_id)
        : null,
      benefits:
        formValues.benefits.length !== 0
          ? formValues.benefits.map((el: any) => {
              if (el.id) {
                return parseInt(el.id);
              }
              return el.value;
            })
          : [],
      contract_start_date: moment(formValues.contract_start_date).format('YYYY-MM-DD'),
      dob: moment(formValues.dob).format('YYYY-MM-DD'),
    };
    if (id) {
      dispatch<any>(updateEmployee(newFormValue));
    } else {
      dispatch<any>(addEmployee(newFormValue));
    }
  };
  return (
    <ManagerLayout>
      <Breadcrumb
        routeSegments={[
          { name: 'General', path: '/' },
          { name: 'Employee Management', path: ROUTES.employee },
          { name: 'Add new employee' },
        ]}
      />
      <div className={cx('title')}>
        <h3>
          <FormattedMessage id="employeeManagement" />
        </h3>
        <Button
          disabled={!onAdd || errors.length !== 0 || loading}
          className={cx('btn_add', { disabled: !onAdd || errors.length !== 0 || loading })}
          onClick={handleAddEmployee}
        >
          {!loading ? (
            id ? (
              'Save change'
            ) : (
              'Add'
            )
          ) : (
            <CircularProgress style={{ color: 'rgba(193, 200, 205, 0.8)' }} size={17} />
          )}
        </Button>
      </div>
      <div className={cx('wrapper_btn')}>
        <Button
          className={cx('btn', {
            active: value === 0,
            error: errors.some((e) => e === 0),
          })}
          onClick={() => handleChange(0)}
        >
          <FormattedMessage id="employeeInformation" />
          {errors.some((e) => e === 0) && <WarnIcon />}
        </Button>
        <Button
          className={cx('btn', { active: value === 1, error: errors.some((e) => e === 1) })}
          onClick={() => handleChange(1)}
        >
          <FormattedMessage id="contractInformation" />
          {errors.some((e) => e === 1) && <WarnIcon />}
        </Button>
        <Button className={cx('btn', { active: value === 2 })} onClick={() => handleChange(2)}>
          <FormattedMessage id="employmentDetails" />
        </Button>
        <Button
          className={cx('btn', { active: value === 3, error: errors.some((e) => e === 3) })}
          onClick={() => handleChange(3)}
        >
          <FormattedMessage id="salary&Wages" />
          {errors.some((e) => e === 3) && <WarnIcon />}
        </Button>
        <Button className={cx('btn', { active: value === 4 })} onClick={() => handleChange(4)}>
          <FormattedMessage id="others" />
        </Button>
      </div>
      <TabPanel value={value} index={0}>
        <EmployeeInformation
          data={formValues}
          handleError={handleError}
          handleOnAdd={handleOnAdd}
          handlleData={handlleData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContractInformation
          data={formValues}
          handleError={handleError}
          handlleData={handlleData}
          handleOnAdd={handleOnAdd}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmploymentDetails data={formValues} handlleData={handlleData} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SalaryWages data={formValues} handleOnAdd={handleOnAdd} handleError={handleError} handlleData={handlleData} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Others data={formValues} handlleData={handlleData} />
      </TabPanel>
    </ManagerLayout>
  );
}

export default memo(CreateOrUpdateEmployeePage);
