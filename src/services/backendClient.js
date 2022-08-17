import axios from 'axios'
// import { LocalStorageService } from './localStorageService'


class BackendClient {

    createInstance = (excludeAccessToken) => {
        const instance = axios.create({
            timeout: 2000
        });

        if (excludeAccessToken) { delete instance.defaults.headers.authorization }
        return instance
    };

    getRequestHeader = excludeAccessToken => {
        let header = {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Authorization': excludeAccessToken ? '' : `123456}`
        };
        if (excludeAccessToken) { delete header.authorization }
        return header
    };

    enableRequestInterceptors = excludeAccessToken => {
        axios.interceptors.request.use(
            request => {
                request.headers = this.getRequestHeader(excludeAccessToken);
                return request
            },
            error => {
                console.log('enableRequestInterceptors ', error);
                Promise.reject(error)
            })
    };

    get = (path, excludeAccessToken = false) => {
        let instance = excludeAccessToken ? this.createInstance(excludeAccessToken) : axios;
        this.enableRequestInterceptors();

        return instance.get(path)
            .then(response => (response))
            .catch((error) => {error})
    };

    delete = path => {
        this.enableRequestInterceptors();
        return axios.delete(path)
            .then(response => (response))
            .catch((error) => { error })
    };

    put = (path, data, stringify = true, dataAsParam = true) => {
        this.enableRequestInterceptors();
        return axios.put(path, dataAsParam ? { data: stringify ? JSON.stringify(data) : data } : data, { headers: this.getRequestHeader(false) })
            .then(response => response)
            .catch((error) => error )
    };

    post = (path, body, isUploadRequest = false) => {
        this.enableRequestInterceptors();

        if (isUploadRequest) {
            const formData = new FormData();
            formData.append("file", body.file);
            return axios.post(path, formData, {
                //return axios({methos: 'post', url:path, data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then(data => data)
                .catch(error => error)
        } else {
            return axios.post(path, body)
                .then(response => response)
                .catch((error) =>  error)
        }
    };
}

export default new BackendClient();