import DatePicker from 'react-datepicker';
import classNames from 'classnames/bind';
import styles from './Calendarinput.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, ClickAwayListener, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
const cx = classNames.bind(styles);

interface PropsCalendarinput {
  field: any;
  error: boolean;
  value?: any;
}

function Calendarinput({ field, error, value }: PropsCalendarinput) {
  const now = new Date();
  const year = now.getFullYear();
  const years = [year]; // Khởi tạo mảng với phần tử đầu tiên là năm hiện tại
  for (let i = 1; i < 30; i++) {
    years.push(years[i - 1] - 1); // Thêm phần tử mới vào mảng là phần tử trước -1
  }
  const month = now.getMonth();
  const [currentYear, getCurrentYear] = useState(year);

  const [currentMonth, setCurrentMonth] = useState(month);
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth > months.length - 1 ? 0 : currentMonth + 1);
  };
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <DatePicker
      className={cx('width', { errorDate: error })}
      popperPlacement="bottom-start"
      dateFormat="yyyy-MM-dd"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => {
        return (
          <div className={cx('wrapper_header')}>
            <IconButton
              className={cx('btn_icon')}
              onClick={() => {
                changeMonth(currentMonth);
                handlePrevMonth();
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>

            <div>
              <h6 className={cx('title_header')}>
                {months[currentMonth]} {date.getFullYear()}
              </h6>
              <div className="d-flex justify-content-center position-relative">
                <Button className={cx('btn_year')} ref={anchorRef} onClick={handleToggle}>
                  <KeyboardArrowDownIcon />
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  style={{ position: 'absolute', left: '-22px', top: '100%' }}
                  disablePortal
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        style={{
                          borderRadius: '8px',
                          border: '1px solid rgb(223, 227, 230)',
                          minHeight: ' 180px',
                          maxHeight: '180px',
                          overflow: 'overlay',
                        }}
                        onKeyDown={handleListKeyDown}
                      >
                        {years.map((el: number, index) => {
                          return (
                            <MenuItem
                              className="d-flex justify-content-center align-items-center position-relative"
                              style={{ padding: '8px 16px', width: '125px', minHeight: '40px' }}
                              key={index}
                              onClick={() => {
                                handleClose();
                                changeYear(el);
                              }}
                            >
                              {el == date.getFullYear() && (
                                <CheckIcon
                                  style={{ position: 'absolute', top: '12px', left: '14px', fontSize: '16px' }}
                                />
                              )}

                              {el}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popper>
              </div>
            </div>

            <IconButton
              className={cx('btn_icon')}
              onClick={() => {
                changeMonth(currentMonth);
                handleNextMonth();
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        );
      }}
      {...field}
      ref={(ref) => {
        field.ref({
          focus: ref?.setFocus,
        });
      }}
      selected={field.value === 'Invalid Date' ? '' : field.value}
    />
  );
}

export default Calendarinput;
