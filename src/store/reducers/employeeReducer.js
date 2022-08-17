import { 
  EMPLOYEES_ERROR_CLEAR,
  EMPLOYEES_SUCCESS_CLEAR,
  EMPLOYEES_REQUEST,
  EMPLOYEES_FAILURE,
  EMPLOYEES_UPLOAD_SUCCESS
} from '../types/employeeTypes';

const employeeInitialState = {
  loading: false,
  error: null,
  success: null
};

export const EmployeesReducer = (state = employeeInitialState, action) => {
  switch(action.type) {
    case EMPLOYEES_ERROR_CLEAR:
      return {
        ...state,
        error: null
      }
    case EMPLOYEES_SUCCESS_CLEAR:
      return {
        ...state,
        success: null,
      }
    case EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null
      }
    case EMPLOYEES_FAILURE:
      return {
        ...state,
        loading:false,
        error:action.error
      }
    case EMPLOYEES_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.success
      }
    default:
      return state;
  }
};