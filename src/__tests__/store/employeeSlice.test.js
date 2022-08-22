import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import employeeSlice, { 
    initialState, getEmployees, uploadEmployee, clearStatus, updateEmplyee, deleteEmplyee
} from './../../store/sliceFeatures/employeeSlice'


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('EMPLOYEE SLICE REDUCER TESTS', () => {

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
        expect(nextState.error).toBe(null);
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
        expect(nextState.error).toBe(null);  
    })
    it('update data action is fulfilled', () => {
        const mockAsyncPayload = {message: "success", data: []}
        const nextState = employeeSlice(initialState, uploadEmployee.fulfilled(mockAsyncPayload));
        expect(nextState.loading).toBe(false); 
        expect(nextState.success).toBe(mockAsyncPayload.message); 
        expect(nextState.items).toBe(mockAsyncPayload.data);
    })

});

describe('EMPLOYEE SLICE ACTION TESTS', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    const store = mockStore();
    function apiCall (responseCode = 200) {
        const responsePayload =  [{id: 123}, {id: 345}]
        // eslint-disable-next-line testing-library/await-async-utils
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: responseCode,
            response: responsePayload
            });
        });
    }

    it('getEmployees PASS', async() => {
        apiCall();
        const result = await store.dispatch(getEmployees())
        expect(result.type).toBe('employee/request/fulfilled')
    });
    it('getEmployees FAILS', async() => {
        apiCall(0);
        const result = await store.dispatch(getEmployees())
        expect(result.type).toBe('employee/request/rejected')
    });
    it('uploadEmployee PASS', async() => {
        apiCall();
        const file = new File(["file"], "ping.csv", {
            type: "text/csv",
        });
        const result = await store.dispatch(uploadEmployee(file))
        expect(result.type).toBe('employee/upload/fulfilled')
    });
    it('uploadEmployee FAILS', async() => {
        apiCall(0);
        const result = await store.dispatch(uploadEmployee())
        expect(result.type).toBe('employee/upload/rejected')
    });

    // TODO update and delete
    // it('updateEmplyee PASS', async() => {
    //     apiCall(200);
    //     const param = {id: 2, data: {id: 2, full_name: "new aj", login_id: "allok", salary:400}}
    //     const result = await store.dispatch(updateEmplyee(param))
    //     console.log(result)
    //     expect(await store.dispatch(getEmployees())).toBeCalled();
    //     // expect(result.type).toBe('employee/update/fulfilled')
    // });
});