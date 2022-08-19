// API response error validations
export function errorValidation(data) {
    let  error = 'Something went Wrong! contact admin.';
    // TODO add more error validations
    if (data?.response?.status === 0) {
      error = "Network Error! check the network or contact admin."
    } else if (data?.response?.status === 404) {
      error = "SORRY! we couldn't find the data.";
    }
     return { response: error };
};