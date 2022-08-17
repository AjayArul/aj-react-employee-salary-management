import { 
  EMPLOYEES_REQUEST,
  EMPLOYEES_FAILURE,
  EMPLOYEES_UPLOAD_SUCCESS,
  EMPLOYEES_ERROR_CLEAR,
  EMPLOYEES_SUCCESS_CLEAR
} from '../types/employeeTypes';
import { 
  _uploadEmployee,
} from './../../services/employeeServices';

export const uploadEmployee = (employeeData, navigate) => async(dispatch, getState) => {   
  dispatch({ type: EMPLOYEES_REQUEST }); 
  const response = await _uploadEmployee(employeeData) // api service call 
  if (response?.status === 200) {
    dispatch({ type: EMPLOYEES_UPLOAD_SUCCESS, success: `Successfully created!`});
  } else {
    errorValidation(response, dispatch);
  }
};

// clear error or sucuess state data 
export const clearStatus = (status) => (dispatch, getState) => {
  status === 'success' ? dispatch({ type: EMPLOYEES_SUCCESS_CLEAR })
  : dispatch({ type: EMPLOYEES_ERROR_CLEAR });
}

// API response error validations
function errorValidation(data, dispatch) {
  let  error = 'Something went Wrong! contact admin.';
  // TODO add more error validations
  if (data?.response?.status === 0) {
    error = "Network Error! check the network or contact admin."
  } else if (data?.response?.status === 404) {
    error = "SORRY! we couldn't find the data.";
  }
   return dispatch({ type: EMPLOYEES_FAILURE, error:{response: error} });
};