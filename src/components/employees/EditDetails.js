import React, {memo, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

const EditDetails = (props) => {
    const {isOpen, data, handleClose, onSubmit} = props;
    const {ID, NAME, LOGIN, SALARY, PROFILE_PIC} = employeeKeys;

    const [eName, setEName] = useState(null);
    const [eLogin, setELogin] = useState(null);
    const [eSalary, setSalary] = useState(null);

    const onReset = () => {
        handleClose();
        setEName(null);
        setELogin(null);
        setSalary(null);   
    }
    const updateNewData = () => {
        const newData = {
            [NAME]: eName || data[NAME],
            [LOGIN]: eLogin || data[LOGIN],
            [SALARY]: eSalary || data[SALARY],
            [PROFILE_PIC]: data[PROFILE_PIC],
        }
        onSubmit(data.id, newData);
        onReset();
    }

    return (
        <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onReset} aria-labelledby="form-dialog-title">
            <DialogTitle id="edit-title" onClose={onReset}>Edit</DialogTitle>
            <DialogContent>
                <h1>Employee id {data[ID]}</h1>
                <TextField
                    variant="outlined"
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={eName || data[NAME]}
                    onChange={(e)=>setEName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    id="login"
                    label="Login"
                    type="text"
                    fullWidth
                    value={eLogin || data[LOGIN]}
                    onChange={(e)=>setELogin(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    id="salary"
                    label="Salary"
                    type="number"
                    fullWidth
                    value={eSalary || data[SALARY]}
                    onChange={(e)=>setSalary(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button data-testid="editCancelBtn" onClick={onReset} variant="outlined">
                    Cancel
                </Button>
                <Button data-testid="editSaveBtn" onClick={updateNewData} variant="outlined" color="primary" disabled={!(eName||eLogin||eSalary)?true:false}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 export default memo(EditDetails);