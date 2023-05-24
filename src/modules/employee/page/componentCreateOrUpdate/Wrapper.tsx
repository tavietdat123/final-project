import Line from '../../../../component/line/Line';
import { memo } from 'react';

function Wrapper({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div
      style={{
        padding: '10px',
        margin: '0 0 10px',
        boxShadow: 'rgb(241, 243, 245) 0px 5px 20px',
        borderRadius: '12px',
        backgroundColor: 'rgb(251, 252, 253)',
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h5 style={{ fontWeight: 500, lineHeight: 1.35, fontSize: '20px' }}>{title}</h5>
        <p style={{ fontWeight: 400, color: 'rgb(104, 112, 118)', fontSize: '14px' }}>
          Required (<span style={{ color: 'rgb(229, 72, 77)' }}>*</span>)
        </p>
      </div>
      <Line />
      <div>{children}</div>
    </div>
  );
}
export default memo(Wrapper);
