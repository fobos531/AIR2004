import axios from 'axios';
import {API_URL} from '@env';

export default axios.create({
  baseURL: "http://192.168.43.150:8080/api",
});
