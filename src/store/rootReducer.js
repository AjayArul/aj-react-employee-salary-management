import { combineReducers } from 'redux';
import { 
    EmployeesReducer
} from './reducers/employeeReducer';


const rootReducer = combineReducers({
    employees: EmployeesReducer
});

export default rootReducer;