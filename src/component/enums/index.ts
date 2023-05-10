export const ActiveType = {
  INACTIVE: {
    value: 0,
    name: 'In Active',
  },
  ACTIVE: {
    value: 1,
    name: 'Active',
  },
};
export const ActionType = {
  READ: {
    value: 'read',
    name: 'Read',
  },
  ADD: {
    value: 'add',
    name: 'Add',
  },
  EDIT: {
    value: 'edit',
    name: 'Edit',
  },
  REPORT: {
    value: 'export',
    name: 'Export',
  },
  UNLOCK: {
    value: 'unlock',
    name: 'Unlock',
  },
};
export const AttendanceCode = {
  ABSENT: {
    code: 0.1,
    value: 0,
    note: 'Not coming to work without information – we don’t pay – and deduct the salary',
    name: 'Absent',
  },
  WORK_HALF_DAY: {
    code: 0.5,
    value: 0.5,
    note: 'only working half day - we pay Half',
    name: 'Half',
  },
  PAID_LEAVE: {
    code: 0.9,
    value: 1,
    note: 'Not coming but show Doctor letter (or paid leave applied)– We pay Full – BUT Meal not pay',
    name: 'Paid Leave',
  },
  WORK_FULL_DAY: {
    code: 1,
    value: 1,
    note: 'Coming to work full days – we pay full with meal allowance (if employee have)',
    name: 'Full',
  },
};
export const BenefitType = {
  MONEY: {
    value: 0,
    name: 'Money',
  },
  LEAVE_DAY: {
    value: 1,
    name: 'Leave Day(s)',
  },
  OTHER: {
    value: 2,
    name: 'Other',
  },
};
export const RamadanPaid = {
  NO: {
    value: 0,
  },
  YES: {
    value: 1,
  },
};
export const EmployeeType = {
  PERMANENT: {
    value: 0,
    name: 'Permanent',
    code: 'P',
  },
  PART_TIME: {
    value: 1,
    name: 'Part-time ',
    code: 'T',
  },
  IN_CONTRACT: {
    value: 2,
    name: 'Contract',
    code: 'C',
  },
};
export const GenderCode = {
  MALE: {
    value: 0,
    name: 'Male',
  },
  FEMALE: {
    value: 1,
    name: 'Female',
  },
};
export const LockStatus = {
  UNLOCKED: {
    value: '0',
    name: 'unlock',
  },
  LOCKED: {
    value: 1,
    name: 'lock',
  },
};
export const PublicHolidayType = {
  NORMAL: {
    value: 0,
    name: 'Normal Holiday',
  },
  RAMADAN: {
    value: 1,
    name: 'Ramadan',
  },
};
export const OverTimeStatus = {
  PENDING: {
    value: 0,
    name: 'Pending',
  },
  APPROVE: {
    value: 1,
    name: 'Approved',
  },
  REJECT: {
    value: 2,
    name: 'Rejected',
  },
};
export const CheckBoxType = {
  UNCHECK: {
    value: 0,
    name: 'Un-check',
  },
  CHECK: {
    value: 1,
    name: 'Check',
  },
};
export const LeaveDurationUnitType = {
  DAY: {
    value: 'day',
    name: 'Day',
  },
  MONTH: {
    value: 'month',
    name: 'Month',
  },
};
export const LeaveStatusType = {
  PENDING: {
    value: 0,
    name: 'Pending',
  },
  APPROVAL: {
    value: 1,
    name: 'Approval',
  },
  REJECTED: {
    value: 2,
    name: 'Rejected',
  },
};
export const CompensationType = {
  INCENTIVE: {
    value: 0,
    name: 'Incentive',
  },
  LEAVE_DAY: {
    value: 1,
    name: 'Leave Day(s)',
  },
  COMMISSIONS: {
    value: 2,
    name: 'Commissions',
  },
};
export const Role = {
  SUPER_ADMIN: {
    value: 0,
    name: 'Super Admin',
  },
  ADMIN: {
    value: 1,
    name: 'Admin',
  },
  USER: {
    value: 2,
    name: 'User',
  },
};
export const UploadMaxFileSize = {
  DEFAULT: {
    value: 20480,
  },
};
export const DefaultMealAllowancePaid = {
  FACTORY: {
    value: 0,
    name: 'Factory',
  },
  EMPLOYEE: {
    value: 1,
    name: 'Employee',
  },
};
