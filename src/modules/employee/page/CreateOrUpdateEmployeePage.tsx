import { FormattedMessage } from 'react-intl';
import Breadcrumb from '../../../component/breadcrumb/Breadcrumb';
import { ROUTES } from '../../../configs/routes';
import ManagerLayout from '../../../layout/ManagerLayout';
import classNames from 'classnames/bind';
import styles from './CreateOrUpdateEmployeePage.module.scss';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import EmployeeInformation from './componentCreateOrUpdate/EmployeeImformation';
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
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
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
        <Button disabled className={cx('btn_add', { disabled: true })}>
          Add
        </Button>
      </div>
      <div className={cx('wrapper_btn')}>
        <Button className={cx('btn', { active: value === 0 })} onClick={() => handleChange(0)}>
          <FormattedMessage id="employeeInformation" />
        </Button>
        <Button className={cx('btn', { active: value === 1 })} onClick={() => handleChange(1)}>
          <FormattedMessage id="contractInformation" />
        </Button>
        <Button className={cx('btn', { active: value === 2 })} onClick={() => handleChange(2)}>
          <FormattedMessage id="employmentDetails" />
        </Button>
        <Button className={cx('btn', { active: value === 3 })} onClick={() => handleChange(3)}>
          <FormattedMessage id="salary&Wages" />
        </Button>
        <Button className={cx('btn', { active: value === 4 })} onClick={() => handleChange(4)}>
          <FormattedMessage id="others" />
        </Button>
      </div>
      <TabPanel value={value} index={0}>
        <EmployeeInformation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item five
      </TabPanel>
    </ManagerLayout>
  );
}

export default CreateOrUpdateEmployeePage;
