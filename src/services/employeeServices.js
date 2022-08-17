import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _uploadEmployee = (body) => BackendClient.post(`${baseURL}/employees/upload`, body, true);