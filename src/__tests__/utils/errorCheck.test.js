import {errorValidation} from './../../utils/errorCheck';


it('Error validation for Network Error', () => {
    const data = {
        response: {
            status: 0
        }
    }
    expect(errorValidation(data)).toEqual({ response: 'Network Error! check the network or contact admin.' });
});

it('Error validation for not found', () => {
    
    const data1 = {
        response: {
            status: 404
        }
    }
    expect(errorValidation(data1)).toEqual({ response: "SORRY! we couldn't find the data." });
});

