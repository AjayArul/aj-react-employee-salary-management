import { createSlice, createAsyncThunk, isPending, isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit'
import { _getEmplyees, _uploadEmployee, _updateEmplyee, _deleteEmplyee } from '../../services/employeeServices';
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
  async (body, { dispatch, fulfillWithValue, rejectWithValue }) => {
      const response = await _uploadEmployee(body) // api service call 
      if (response?.status === 200) {
        dispatch(getEmployees());
        return fulfillWithValue("Successfully created!"); 
      } else {
        return rejectWithValue(errorValidation(response));
      }
  }
);

export const updateEmplyee = createAsyncThunk(
  "employee/update",
  async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
    const {id, data} = params;
    const response = await _updateEmplyee(id, data) // api service call 
    if (response?.status === 200) {
      dispatch(getEmployees());
      return fulfillWithValue(`Successfully updated!`); 
    } else {
      return rejectWithValue(errorValidation(response));
    }
  }
);

export const deleteEmplyee = createAsyncThunk(
  "employee/delete",
  async (id, { dispatch,  fulfillWithValue, rejectWithValue }) => {
      const response = await _deleteEmplyee(id) // api service call 
      if (response?.status === 200) {
        dispatch(getEmployees());
        return fulfillWithValue("Successfully Deleted!"); 
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
      return { ...state,
        error: null,
        success: null
      }
    }
  },
  extraReducers: builder => {
    
    builder.addCase(getEmployees.fulfilled, (state, {payload}) => ({
      ...state, 
      loading: false,
      items: payload
    }))

    builder.addMatcher(
      isPending(getEmployees, uploadEmployee, updateEmplyee, deleteEmplyee), // <-- thunk actions
      (state) => ({
        ...state, 
        loading: true
      })
    )

    builder.addMatcher(
      isRejectedWithValue(getEmployees, uploadEmployee, updateEmplyee, deleteEmplyee), // <-- thunk actions
      (state, {payload}) => ({
        ...state, 
        loading: false,
        error: payload
      })
    )

    builder.addMatcher(
      isFulfilled(uploadEmployee, updateEmplyee, deleteEmplyee), // <-- thunk actions
      (state, {payload}) => ({
        ...state,
        success: payload
      })
    )

  }

});
export const {clearStatus} = employeeSlice.actions

export default employeeSlice.reducer;