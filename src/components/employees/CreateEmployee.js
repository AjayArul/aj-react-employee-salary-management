import React, {memo, useState, useCallback, useEffect} from 'react';
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

const CreateEmployee = (props) => {
    const {isOpen, handleClose, onSubmit} = props;
    const {ID, NAME, LOGIN, SALARY} = employeeKeys;

    const [employees, setEmployees] = useState({});
    const [isBlockNav, setIsBlockNav] = useState(true);

    const onReset = () => {
        handleClose();
        setEmployees(state => ({}));
        setIsBlockNav(true);
    }

    function createNewData(e) {
        e.preventDefault();

        onSubmit(employees);
        onReset();
    }

    const onChangeHandler = useCallback(
        ({target}) => {
            setEmployees(state => ({ ...state, [target.name]:target.value }));
            setIsBlockNav(false);
        } , []
    );
    
    // useEffect(()=>{
    //     data && Object.keys(data).length !== 0 && setEmployees(data);
    // },[data])


    return (
        <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onReset} aria-labelledby="form-dialog-title">
            <DialogTitle id="edit-title" onClose={onReset}>Create Employee</DialogTitle>
            <form noValidate autoComplete="off" onSubmit={createNewData}>
                <DialogContent>
                    {/* <h1>Employee id {data[ID]}</h1> */}
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id={NAME}
                        label="Name"
                        type="text"
                        fullWidth
                        name={NAME}
                        value={employees[NAME] || ''}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id={LOGIN}
                        label="Login"
                        type="text"
                        fullWidth
                        name={LOGIN}
                        value={employees[LOGIN] || ''}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        id={SALARY}
                        label="Salary"
                        type="number"
                        fullWidth
                        name={SALARY}
                        value={employees[SALARY] || ''}
                        onChange={onChangeHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button data-testid="cancelBtn" onClick={onReset} variant="outlined">
                        Cancel
                    </Button>
                    <Button data-testid="submitBtn" type="submit" variant="outlined" color="primary" disabled={isBlockNav}>
                        create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
 export default memo(CreateEmployee);