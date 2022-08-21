import React, {memo} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { employeeKeys } from '../../constants/employeesConst';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});
  
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
  );
});

const DeleteDetails = (props) => {
    const {isOpen, data, handleClose, onSubmit} = props;
    const {ID, NAME} = employeeKeys;
    const deleteData = () => {
        onSubmit(data[ID]);
        handleClose();
    }

    return (
        <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="edit-title" onClose={handleClose}>Delete</DialogTitle>
            <DialogContent>
                <h4>Employee id {data[ID]} - {data[NAME]}</h4>
                <DialogContentText style={{color:"red"}}>Are you sure to delete this employee record?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button data-testid="noBtn" onClick={handleClose} variant="outlined">
                    No
                </Button>
                <Button data-testid="yesBtn" onClick={deleteData} variant="outlined" color="secondary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 export default memo(DeleteDetails);