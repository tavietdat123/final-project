import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import icons from '../assets/icons';
import { FormattedMessage } from 'react-intl';
import { Backdrop, MenuItem, Select } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ManagerLayout.module.scss';
import Deltai from './componentLayout/DetailUser';
import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navListMain, navListMore } from '../modules/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { detailUserSelector } from '../modules/auth/redux/authSelector';
import { getDetail } from '../modules/auth/redux/authSlice';
const drawerWidth = 329;
const cx = classNames.bind(styles);
const lang = [
  {
    title: 'en',
    img: icons.en,
    value: 'en',
  },
  {
    title: 'vi',
    img: icons.en,
    value: 'vi',
  },
];

function ManagerLayout({ children }: any) {
  const location = useLocation();
  const [detailUser, setDetailUser] = useState(false);
  const detail = useSelector(detailUserSelector);

  const dispatch = useDispatch();
  const handleCloseDetailUser = useCallback(() => {
    setDetailUser(false);
  }, []);
  const handleOpenDetailUser = useCallback(() => {
    setDetailUser(true);
  }, []);
  useEffect(() => {
    if (Object.keys(detail).length === 0) {
      dispatch<any>(getDetail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Typography component="h4" className={cx('title_list1')}>
          General
        </Typography>
        {navListMain.map((el, index) => (
          <Link key={index} to={el.path}>
            <ListItem disablePadding>
              <ListItemButton className={location.pathname.includes(el.path) ? 'active' : ''}>
                <ListItemIcon>
                  <img src={el.icon} alt="" />
                </ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <Typography component="h4" className={cx('title_list2')}>
          Advance
        </Typography>
        {navListMore.map((el, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton className={location.pathname.includes(el.path) ? 'active' : ''}>
              <ListItemIcon>
                <img src={el.icon} alt="" />
              </ListItemIcon>
              <ListItemText primary={el.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          zIndex: '2',
          backgroundColor: '#fff',
          boxShadow: 'rgb(236, 238, 240) 0px 3px 15px',
          height: '60px',
        }}
      >
        {' '}
        <Toolbar>
          <div>
            <img src={icons.logo} alt="" width={36} height={36} style={{ marginLeft: '6px', marginRight: '16px' }} />
          </div>
          <Typography
            variant="h4"
            noWrap
            component="div"
            style={{ color: 'var(--text-color)', fontSize: '24px', fontWeight: '500', flex: 1 }}
          >
            <FormattedMessage id="titleAuthLayout" />
          </Typography>
          <div className={cx('btn_header')}>
            <div>
              <Select defaultValue="en" className="btn_lang">
                {lang.map((el, index) => (
                  <MenuItem value={el.value} className="lang_item" key={index}>
                    <div className={cx('btn_lag')}>
                      <img src={el.img} alt="" />
                      <span>{el.title}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={cx('btn_user')}>
              <div className={cx('name')} onClick={handleOpenDetailUser}>
                {detail.username?.charAt(0)}
              </div>
              <Backdrop
                open={detailUser}
                style={{ backgroundColor: 'transparent' }}
                onClick={handleCloseDetailUser}
              ></Backdrop>
              {detailUser && <Deltai onClose={handleCloseDetailUser} />}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 1 }}
        aria-label="mailbox folders"
        className="wrapper_sidebar"
      >
        <Drawer
          open={true}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <div style={{ backgroundColor: '#f8f9fa', overflow: 'auto', maxHeight: '100vh', width: '100%' }}>
        <Box
          component="main"
          // width: { sm: `calc(100% - ${drawerWidth}px)` }
          sx={{ flexGrow: 1, p: 3 }}
          style={{ padding: '30px 46px 0px', minHeight: '100vh' }}
          className="d-flex flex-column"
        >
          <Toolbar />
          <div className="flex-grow-1">{children}</div>
          <div className={cx('footer')}>Copyright © 2022. All Rights Reserved</div>
        </Box>
      </div>
    </Box>
  );
}

export default ManagerLayout;
