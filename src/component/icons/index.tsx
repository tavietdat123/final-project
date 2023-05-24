interface PropsIcons {
  width?: string;
  height?: string;
  className?: string;
}
export const AddIcon = ({ width = '13', height = '15', className }: PropsIcons) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 13 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.2333 1.63307C1.93875 1.63307 1.69997 1.87186 1.69997 2.16641V12.8331C1.69997 13.1276 1.93875 13.3664 2.2333 13.3664H10.7666C11.0611 13.3664 11.3 13.1276 11.3 12.8331V4.52066L8.41238 1.63307H2.2333ZM0.633301 2.16641C0.633301 1.28275 1.34964 0.566406 2.2333 0.566406H8.6333C8.77475 0.566406 8.91041 0.622598 9.01042 0.72262L12.1323 3.84451C12.2824 3.99454 12.3666 4.19802 12.3666 4.41019V12.8331C12.3666 13.7167 11.6503 14.4331 10.7666 14.4331H2.2333C1.34964 14.4331 0.633301 13.7167 0.633301 12.8331V2.16641ZM3.56663 7.49974C3.56663 7.20519 3.80542 6.96641 4.09997 6.96641H5.96663V5.09974C5.96663 4.80519 6.20542 4.56641 6.49997 4.56641C6.79452 4.56641 7.0333 4.80519 7.0333 5.09974V6.96641H8.89997C9.19447 6.96641 9.4333 7.20519 9.4333 7.49974C9.4333 7.79429 9.19447 8.03307 8.89997 8.03307H7.0333V9.89974C7.0333 10.1942 6.79452 10.4331 6.49997 10.4331C6.20542 10.4331 5.96663 10.1942 5.96663 9.89974V8.03307H4.09997C3.80542 8.03307 3.56663 7.79429 3.56663 7.49974Z"
      fill="#0091FF"
    />
  </svg>
);
export const DeleteIcon = ({ width = '10', height = '14', className }: PropsIcons) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 10 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M2.86662 0.566406C2.57207 0.566406 2.33328 0.80519 2.33328 1.09974C2.33328 1.39429 2.57207 1.63307 2.86662 1.63307H7.13329C7.42783 1.63307 7.66662 1.39429 7.66662 1.09974C7.66662 0.80519 7.42783 0.566406 7.13329 0.566406H2.86662ZM0.199951 3.23307C0.199951 2.93852 0.438735 2.69974 0.733285 2.69974H2.33328H7.66662H9.26662C9.56112 2.69974 9.79995 2.93852 9.79995 3.23307C9.79995 3.52762 9.56112 3.76641 9.26662 3.76641H8.73328V12.2997C8.73328 12.8889 8.25574 13.3664 7.66662 13.3664H2.33328C1.74419 13.3664 1.26662 12.8889 1.26662 12.2997V3.76641H0.733285C0.438735 3.76641 0.199951 3.52762 0.199951 3.23307ZM2.33328 3.76641H7.66662V12.2997H2.33328V3.76641Z"
      fill="currentColor"
    />
  </svg>
);
export const UploadIcon = ({ width = '15', height = '15', className }: PropsIcons) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 15 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.81825 1.18191C7.64251 1.00618 7.35759 1.00618 7.18185 1.18191L4.18185 4.18191C4.00611 4.35765 4.00611 4.64257 4.18185 4.81831C4.35759 4.99404 4.64251 4.99404 4.81825 4.81831L7.05005 2.58651V9.49999C7.05005 9.74852 7.25152 9.94999 7.50005 9.94999C7.74858 9.94999 7.95005 9.74852 7.95005 9.49999V2.58651L10.1819 4.81831C10.3576 4.99404 10.6425 4.99404 10.8182 4.81831C10.994 4.64257 10.994 4.35765 10.8182 4.18191L7.81825 1.18191ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const WarnIcon = ({ width = '21', height = '20', className }: PropsIcons) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4998 18.3337C15.1022 18.3337 18.8332 14.6027 18.8332 10.0003C18.8332 5.39795 15.1022 1.66699 10.4998 1.66699C5.89746 1.66699 2.1665 5.39795 2.1665 10.0003C2.1665 14.6027 5.89746 18.3337 10.4998 18.3337Z"
      stroke="#FFB7B9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M10.5 6.66699V10.0003"
      stroke="#FFB7B9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path d="M10.5 13.333H10.5083" stroke="#FFB7B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

export const FileIcon = ({ width = '113', height = '114', className }: PropsIcons) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 113 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="56" cy="55.5" r="55.5" fill="#6350FF" fillOpacity="0.1"></circle>
    <rect x="29.3599" y="34.4102" width="56.98" height="42.92" rx="2" fill="#6E56CF"></rect>
    <rect x="34.9097" y="49.9492" width="37.74" height="2.22" rx="1" fill="white" fillOpacity="0.2"></rect>
    <path
      d="M20.1099 50.9305C20.1099 49.8104 20.1099 49.2503 20.3279 48.8225C20.5196 48.4462 20.8256 48.1402 21.2019 47.9485C21.6297 47.7305 22.1898 47.7305 23.3099 47.7305H47.161C47.7691 47.7305 48.0731 47.7305 48.3505 47.8124C48.5961 47.885 48.8255 48.004 49.0262 48.1631C49.2529 48.3428 49.4278 48.5914 49.7778 49.0886L55.0439 56.5704C55.3939 57.0677 55.5689 57.3163 55.7955 57.4959C55.9963 57.655 56.2256 57.7741 56.4713 57.8466C56.7487 57.9286 57.0527 57.9286 57.6607 57.9286H88.6899C89.81 57.9286 90.37 57.9286 90.7978 58.1466C91.1742 58.3383 91.4801 58.6443 91.6719 59.0206C91.8899 59.4484 91.8899 60.0085 91.8899 61.1286V98.9205C91.8899 100.041 91.8899 100.601 91.6719 101.028C91.4801 101.405 91.1742 101.711 90.7978 101.902C90.37 102.12 89.81 102.12 88.6899 102.12H23.3099C22.1898 102.12 21.6297 102.12 21.2019 101.902C20.8256 101.711 20.5196 101.405 20.3279 101.028C20.1099 100.601 20.1099 100.041 20.1099 98.9205V50.9305Z"
      fill="#F7CE00"
    ></path>
    <rect x="57.48" y="93.6094" width="24.42" height="2.96" rx="1" fill="white"></rect>
    <rect x="34.9097" y="37.3691" width="45.14" height="2.96" rx="1" fill="white" fillOpacity="0.2"></rect>
    <rect x="34.9097" y="43.2891" width="24.42" height="1.48" rx="0.74" fill="white" fillOpacity="0.2"></rect>
    <rect x="83.3799" y="93.6094" width="2.96" height="2.96" rx="1" fill="white"></rect>
    <circle cx="5.6802" cy="92.8706" r="1.48" fill="#F7CE00"></circle>
    <circle cx="78.5698" cy="112.48" r="1.48" fill="#6E56CF"></circle>
    <circle cx="106.32" cy="94.7206" r="3.33" fill="#F7CE00"></circle>
    <circle cx="5.6801" cy="21.0898" r="3.33" fill="#6E56CF"></circle>
    <circle cx="91.8899" cy="70.3001" r="2.22" fill="#6E56CF"></circle>
    <g filter="url(#filter0_d_5951_39835)">
      <circle cx="96.3299" cy="17.7605" r="12.95" fill="#6E56CF"></circle>
      <path
        d="M95.5781 22.5462C96.8068 22.5459 98.0001 22.1346 98.968 21.3777L102.011 24.4207L102.99 23.4419L99.9469 20.3989C100.704 19.431 101.116 18.2374 101.116 17.0084C101.116 13.9551 98.6316 11.4707 95.5781 11.4707C92.5245 11.4707 90.04 13.9551 90.04 17.0084C90.04 20.0618 92.5245 22.5462 95.5781 22.5462ZM95.5781 12.8551C97.8687 12.8551 99.7316 14.7179 99.7316 17.0084C99.7316 19.299 97.8687 21.1617 95.5781 21.1617C93.2874 21.1617 91.4245 19.299 91.4245 17.0084C91.4245 14.7179 93.2874 12.8551 95.5781 12.8551Z"
        fill="white"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_d_5951_39835"
        x="76.3799"
        y="3.81055"
        width="35.8999"
        height="35.9004"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset dx="-2" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
        <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.313726 0 0 0 0 1 0 0 0 0.25 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5951_39835"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5951_39835" result="shape"></feBlend>
      </filter>
    </defs>
  </svg>
);
