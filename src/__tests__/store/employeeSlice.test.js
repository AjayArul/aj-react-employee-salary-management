import employeeSlice, { 
    initialState, getEmployees, uploadEmployee, clearStatus
} from './../../store/sliceFeatures/employeeSlice'


describe('EMPLOYEE SLICE TESTS', () => {

    it('clearStatus', () => {
        const nextState = employeeSlice(initialState, clearStatus());
        expect(nextState.success).toBe(null); 
        expect(nextState.error).toBe(null); 
    });
    it('get data action is pending', () => {
        const nextState = employeeSlice(initialState, getEmployees.pending());
        expect(nextState.loading).toBe(true);
    })
    it('get data action is fulfilled', () => {
        const mockAsyncPayload = []
        const nextState = employeeSlice(initialState, getEmployees.fulfilled(mockAsyncPayload));
        expect(nextState.loading).toBe(false);
        expect(nextState.items).toBe(mockAsyncPayload);        
    })
    it('get data action is rejected', () => {
        const mockAsyncError = {responce: 'error message'}
        const nextState = employeeSlice(initialState, getEmployees.rejected(mockAsyncError));
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(undefined);    
    })
    it('upload data action is pending', () => {
        const nextState = employeeSlice(initialState, uploadEmployee.pending());
        expect(nextState.loading).toBe(true);   
    })
    it('upload data action is fulfilled', () => {
        const mockAsyncPayload = "success"
        const nextState = employeeSlice(initialState, uploadEmployee.fulfilled(mockAsyncPayload));
        expect(nextState.loading).toBe(false);     
        expect(nextState.success).toBe(mockAsyncPayload);   
    })
    it('upload data action is rejected', () => {
        const mockAsyncError = {responce: 'error message'}
        const nextState = employeeSlice(initialState, uploadEmployee.rejected(mockAsyncError));
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(undefined);    
    })

});