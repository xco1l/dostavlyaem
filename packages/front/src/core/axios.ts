import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:3000';

export default axios;
