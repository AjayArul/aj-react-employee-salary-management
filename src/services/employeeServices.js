import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _uploadEmployee = (body) => BackendClient.post(`${baseURL}/employees`, body);
export const _getEmplyees = () => BackendClient.get(`${baseURL}/employees`);
export const _updateEmplyee = (id, data) => BackendClient.put(`${baseURL}/employees/${id}`, data, false, false);
export const _deleteEmplyee = (id) => BackendClient.delete(`${baseURL}/employees/${id}`);