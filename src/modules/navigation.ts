import icons from '../assets/icons';
import { ROUTES } from '../configs/routes';

export const navListMain = [
  {
    title: 'Attendance Management',
    path: '/1',
    icon: icons.nav1,
  },
  {
    title: 'Leave Management',
    path: '/2',
    icon: icons.nav2,
  },
  {
    title: 'Payroll Management',
    path: '/3',
    icon: icons.nav3,
  },
  {
    title: 'Employee Management',
    path: ROUTES.employee,
    icon: icons.nav4,
  },
  {
    title: 'User Management',
    path: '/5',
    icon: icons.nav5,
  },
  {
    title: 'Master Management',
    path: '/6',
    icon: icons.nav6,
  },
];
export const navListMore = [
  {
    title: 'Global Settings',
    path: '/settings',
    icon: icons.nav7,
  },
];
