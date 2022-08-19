import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { _getEmplyees, _uploadEmployee } from '../../services/employeeServices';
import { errorValidation } from '../../utils/errorCheck';

const initialState = {
    loading: false,
    error: null,
    success: null,
    items: []
};

export const getEmployees = createAsyncThunk(
    "employee/request",
    async (params, { rejectWithValue }) => {
        const response = await _getEmplyees() // api service call 
        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(errorValidation(response));
        }
    }
);

export const uploadEmployee = createAsyncThunk(
  "employee/upload",
  async (params, { dispatch,  fulfillWithValue, rejectWithValue }) => {
      const response = await _uploadEmployee() // api service call 
      if (response?.status === 200) {
        dispatch(getEmployees());
        return fulfillWithValue("Successfully created!"); 
      } else {
        return rejectWithValue(errorValidation(response));
      }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearStatus(state) {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: {
    [getEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getEmployees.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [getEmployees.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [uploadEmployee.pending]: (state) => {
      state.loading = true;
    },
    [uploadEmployee.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    },
    [uploadEmployee.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    
  },
})
export const {clearStatus} = employeeSlice.actions

export default employeeSlice.reducer;