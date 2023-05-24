import { Dialog, Button, DialogActions, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { memo } from 'react';
interface PropsConfirmationDialog {
  open: boolean;
  onConfirmDialogClose: () => void;
  text: string;
  title: string;
  onYesClick: () => void;
  Yes: string;
  No: string;
}
const useStyles: any = makeStyles({
  customDialog: {
    borderRadius: '10px',
    '& .MuiPaper-rounded': {
      borderRadius: '8px',
      maxWidth: '444px',
      maxHeight: 'calc(100% - 64px)',
      width: 'unset',
    },
  },
  title: { margin: '0px', padding: '20px 16px 4px 24px', fontWeight: 500, lineHeight: '1.375', fontSize: '24px' },
  text: {
    padding: ' 0 24px',
    fontWeight: 400,
    color: 'rgb(104, 112, 118)',
    fontSize: '16px',
  },
  btn: {
    borderRadius: '6px',
    height: '48px',
    fontSize: '16px',
    minWidth: '148px',
    textTransform: 'unset',
    boxShadow: 'none',
    padding: '8px 11px',
  },
});

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = 'confirm',
  onYesClick,
  Yes,
  No,
}: PropsConfirmationDialog) => {
  const classes = useStyles();
  return (
    <Dialog maxWidth="xs" className={classes.customDialog} fullWidth={true} open={open} onClose={onConfirmDialogClose}>
      <div>
        <h2 className={classes.title + ' capitalize' + ' d-flex' + ' justify-content-between ' + ' align-items-center'}>
          {title}{' '}
          <IconButton sx={{ color: '#333' }} onClick={onConfirmDialogClose}>
            <CloseIcon />
          </IconButton>
        </h2>
        {text && <p className={classes.text}>{text}</p>}
        <DialogActions sx={{ justifyContent: 'center', padding: '24px' }}>
          <div className="d-flex justify-content-center flex-middle ">
            {No && (
              <Button
                sx={{
                  color: 'rgb(17, 24, 28)',
                  backgroundColor: 'rgb(241, 243, 245)',
                  '&:hover': { backgroundColor: 'rgba(0, 145, 255, 0.08)', boxShadow: 'none' },
                }}
                className={classes.btn}
                onClick={onConfirmDialogClose}
                variant="contained"
                color="secondary"
              >
                {No}
              </Button>
            )}
            <Button
              className={`${classes.btn} ${classes.hoverNo}`}
              sx={{
                color: '#fff',
                backgroundColor: 'rgb(0, 145, 255)',
                '&:hover': { backgroundColor: 'rgb(0, 129, 241)', boxShadow: 'none' },
                marginLeft: '8px',
              }}
              onClick={onYesClick}
              variant="contained"
              color="primary"
            >
              {Yes}
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default memo(ConfirmationDialog);
