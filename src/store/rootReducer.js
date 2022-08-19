import { combineReducers } from 'redux';
import employeeSlice from './sliceFeatures/employeeSlice';

const rootReducer = combineReducers({
    employees: employeeSlice
});

export default rootReducer;