import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://localhost',
});

// Set the default headers for authorization
instance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('auth')}`;

export default instance;